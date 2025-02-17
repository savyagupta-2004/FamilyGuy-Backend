import Link from 'next/link'
import Image from 'next/image'
import { TbArrowBigRightFilled } from 'react-icons/tb'
import { FaUser, FaInfoCircle, FaHome } from 'react-icons/fa'

export const Navigation = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-lg shadow-md border-b border-gray-700">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-bold text-lg"
        >
          <Image
            src="/logo.png"
            alt="Brand Logo"
            width={50}
            height={40}
            className="rounded-lg shadow-sm"
          />
          <span className="hidden md:inline-block">X Savya Gupta</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-6 text-white font-medium">
          <Link
            href="/"
            className="flex items-center  hover:text-blue-400 transition"
          >
            <FaHome className="text-cyan-400 space-x-3 text-2xl" />
            <span className="text-2xl "> Home</span>
          </Link>
          {/* <Link
            href="/about"
            className="flex items-center gap-1 hover:text-blue-400 transition"
          >
            <FaInfoCircle /> About Me
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-1 hover:text-blue-400 transition"
          >
            <FaUser /> Profile
          </Link> */}
        </nav>

        {/* CTA Button */}
        <Link
          href="/quiz"
          className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 text-white px-5 py-2 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          <TbArrowBigRightFilled className="text-lg" /> Take a Quiz
        </Link>
      </div>
    </header>
  )
}
