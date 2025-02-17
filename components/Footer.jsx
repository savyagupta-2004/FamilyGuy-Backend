import Link from 'next/link' // <-- Add this import

export const Footer = () => {
  return (
    <footer className="bg-white/10 backdrop-blur-lg shadow-md border-t border-gray-700 py-4 mt-10 text-center text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <p className="text-sm text-center">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
        {/* <nav className="flex gap-6 text-sm">
          <Link href="/privacy" className="hover:text-blue-400 transition">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-blue-400 transition">
            Terms of Service
          </Link>
          <Link href="/contact" className="hover:text-blue-400 transition">
            Contact
          </Link>
        </nav> */}
      </div>
    </footer>
  )
}
