'use client'
/**
Renders a Next.js page component that displays a quiz question and its answer options with interactive features.
@component
@param {Object} props - The component props.
@param {Object} props.params - The parameters passed to the page component.
@param {string} props.params.id - The ID of the quiz question.
@returns {JSX.Element} The rendered page component.
*/

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Container } from '@/components'
import { Answer } from '@/components/Answer'
import { getQuizQuestion } from '@/lib/quiz'
import { OrbitSpace } from 'orbit-space'
import { motion } from 'framer-motion'
import { ChevronDown, Timer, Star, RefreshCcw } from 'lucide-react'

export default function Page({ params }) {
  const [question, setQuestion] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const hints = question?.hints || []

  // Load score from localStorage on mount
  useEffect(() => {
    const savedScore = localStorage.getItem('quizScore')
    if (savedScore) setScore(parseInt(savedScore, 10))
  }, [])

  // Save score to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('quizScore', score)
  }, [score])

  useEffect(() => {
    async function fetchQuestion() {
      const { question } = await getQuizQuestion(params.id)
      setQuestion(question)
    }
    fetchQuestion()
  }, [params.id])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
      return () => clearInterval(timer)
    }
  }, [timeLeft])

  const resetQuiz = () => {
    setScore(0)
    localStorage.setItem('quizScore', 0)
  }

  if (!question) return <div>Loading...</div>

  return (
    <OrbitSpace speed={2000000000} density={20000000} brightness={10.5}>
      <Container as="main" className="flex flex-col gap-5 py-5">
        {/* Image at the top */}
        {/* <div className="w-full mb-4">
          <img
            src="../savya.jpg"
            alt="Quiz Image"
            className="w-fit h-fit rounded-lg shadow-lg"
          />
        </div> */}
        <div className="md:w-full">
          <Image src="/wallpaper.jpg" alt="" width={700} height={60} />
        </div>

        {/* Question and timer side by side */}
        <div className="flex items-center  gap-5">
          <QuizTimer timeLeft={timeLeft} />
          <h1 className="text-lg font-semibold text-cyan-400 ">
            {question.title}
          </h1>
        </div>

        <Answer
          answers={question.answers}
          questionId={params.id}
          setScore={setScore}
        />
        <HintBox hints={hints} />
        <ScoreTracker score={score} resetQuiz={resetQuiz} />
      </Container>
    </OrbitSpace>
  )
}

function HintBox({ hints }) {
  const [isOpen, setIsOpen] = useState(false)

  // If hints is a string, turn it into an array with a single element
  const safeHints = Array.isArray(hints)
    ? hints
    : typeof hints === 'string'
    ? [hints]
    : []

  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-lg text-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-cyan-400 font-semibold text-lg"
      >
        Show Hints
        <ChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-3 space-y-2"
        >
          {safeHints.length > 0 ? (
            safeHints.map((hint, index) => (
              <li key={index} className="bg-gray-700 p-3 rounded-lg text-sm">
                {hint}
              </li>
            ))
          ) : (
            <li className="text-gray-400">No hints available</li>
          )}
        </motion.ul>
      )}
    </div>
  )
}

function QuizTimer({ timeLeft }) {
  return (
    <div className="flex items-center gap-2 text-cyan-400 bg-gray-900 p-3 rounded-lg w-max">
      <Timer className="w-5 h-5" />
      <span>Time Remaining: {timeLeft}s</span>
    </div>
  )
}

function ScoreTracker({ score, resetQuiz }) {
  return (
    <div className="flex items-center gap-4 text-yellow-400 bg-gray-900 p-3 rounded-lg w-max">
      <div className="flex items-center gap-2">
        <Star className="w-5 h-5" />
        <span>Score: {score}</span>
      </div>
      <button
        onClick={resetQuiz}
        className="flex items-center gap-1 bg-red-600 px-3 py-1 rounded-md text-white text-sm"
      >
        <RefreshCcw className="w-4 h-4" />
        Restart Quiz
      </button>
    </div>
  )
}
