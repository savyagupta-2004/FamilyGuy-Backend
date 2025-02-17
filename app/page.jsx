'use client'

import { Container } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { getAllCharacters } from '@/lib/characters'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

export default function Page() {
  const [data, setData] = useState(null)
  const [visible, setVisible] = useState(false)
  const characterSectionRef = useRef(null)

  useEffect(() => {
    getAllCharacters().then(setData)
    setTimeout(() => setVisible(true), 500)
  }, [])

  const scrollToCharacters = () => {
    characterSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="flex flex-col items-center py-10 bg-black min-h-screen">
      <>
        <section className="relative w-full max-w-5xl mx-auto py-16 px-6 md:px-12 lg:px-20 text-white rounded-xl shadow-lg text-center">
          <AnimatePresence>
            {visible && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12"
              >
                {/* Left Side - Text */}
                <div className="flex flex-col space-y-6">
                  <h3 className="text-4xl font-bold">Hi there</h3>
                  <p className="text-gray-300 text-lg">
                    I’m Savya Gupta, Im a Softwar Developer at{' '}
                    <a href="https://kalkifi.com/" className="text-cyan-400">
                      Kalkini
                    </a>
                    . My projects include UX design, UI animations, and icon
                    illustration. Being comfortable with code allows me to
                    rapidly prototype and validate experiences. This is a quiz
                    application based on a famous show called The{' '}
                    <span className="text-cyan-400">Family Guy</span>
                  </p>
                  <p className="text-gray-300 text-lg">
                    In my spare time I like to play cricket, play video games,
                    and make food
                  </p>
                  <a
                    href="https://www.linkedin.com/in/-savyagupta"
                    target="blank"
                    className="inline-block bg-cyan-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-cyan-600 transition duration-300"
                  >
                    ➤ Send me a message
                  </a>
                </div>

                {/* Right Side - Image & Decorative Text */}
                <div className="relative flex justify-center items-center">
                  <motion.img
                    src="../savya.jpg"
                    alt="Hamish"
                    className="rounded-lg shadow-lg"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div
                    className="absolute top-0 right-0 text-white text-6xl font-bold rotate-90 translate-x-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    CODE
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
        {/* Quiz Instructions Section */}
        <section className="relative w-full max-w-5xl mx-auto py-16 px-6 md:px-12 lg:px-20 text-white rounded-xl shadow-lg text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {/* Left Side - Image */}
            <motion.img
              src="../wallpaper.jpg"
              alt="Hamish"
              className="rounded-lg shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />

            {/* Right Side - Instructions Text */}
            <div className="space-y-6">
              <h3 className="text-4xl font-bold">How to Play the Quiz</h3>
              {/* <p className="text-lg text-gray-300">
                Welcome to the Family Guy Quiz! Test your knowledge of your
                favorite characters, quotes, and moments from the iconic show.
                Here’s how to play:
              </p> */}
              <ul className="text-lg text-gray-300 space-y-3">
                <li>
                  <strong>1. Choose your character:</strong> Select your
                  favorite character from the list below.
                </li>
                <li>
                  <strong>2. Answer the questions:</strong> Each question will
                  appear after you select a character. Select the answer you
                  think is correct.
                </li>
                {/* <li>
                  <strong>3. Get your score:</strong> Once you complete the
                  quiz, you will see how well you know the Family Guy universe!
                </li> */}
              </ul>
              {/* <p className="text-lg text-gray-300">
                Ready to start? Scroll down and choose your favorite character
                to begin!
              </p> */}
              <button
                onClick={scrollToCharacters}
                className="inline-block bg-cyan-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-cyan-600 transition duration-300"
              >
                ↓ Scroll Down to Choose Character
              </button>
            </div>
          </motion.div>
        </section>

        <section ref={characterSectionRef} className="w-full">
          <h1 className="text-center font-extrabold text-4xl">
            Who's Your Favorite
            <span className="text-cyan-400"> Character?</span>
          </h1>
          <Container className="grid grid-cols-2 gap-1 py-5 md:grid-cols-3 lg:grid-cols-4">
            {data?.characters?.map((item, index) => (
              <Link
                href={`/characters/${item.slug}`}
                key={item.name}
                className="relative overflow-hidden rounded-md bg-gray-800 shadow-lg transform transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-2xl opacity-0 animate-fadeIn hover:brightness-125"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 "></div>
                <Image
                  src={item.avatar}
                  alt={item.name}
                  className="w-full h-full object-cover transition-all duration-500 hover:grayscale-0 hover:contrast-125"
                  width={500}
                  height={500}
                />
              </Link>
            ))}
          </Container>
        </section>

        <style global jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease forwards;
          }
        `}</style>
      </>
    </main>
  )
}
