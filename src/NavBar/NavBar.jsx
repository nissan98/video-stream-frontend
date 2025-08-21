import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Navbar() {
  const navigator = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const handleFileUpload = () => {
    setMenuOpen(false)
    navigator('/uploadvideo')
  }
  const handleHome = () => {
    setMenuOpen(false)
    navigator('/')
  }
  return (
    <nav className="w-full bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950/90 border-b border-gray-800 shadow-xl backdrop-blur-md z-50 select-none">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={handleHome}>
          <svg className="h-8 w-8 text-blue-500 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
          </svg>
          <span className="text-2xl font-extrabold text-blue-300 tracking-wide drop-shadow-lg">VStream</span>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/" className="text-gray-300 hover:text-blue-400 transition font-semibold text-lg relative group" onClick={handleHome}>
            Home
            <span className="block h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
          </a>
          <a className="text-gray-300 hover:text-blue-400 transition font-semibold text-lg relative group cursor-pointer" onClick={handleFileUpload}>
            Upload
            <span className="block h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
          </a>
          <a href="#" className="text-gray-300 hover:text-blue-400 transition font-semibold text-lg relative group">
            Explore
            <span className="block h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
          </a>
        </div>
        {/* Desktop Sign In */}
        <div className="hidden md:block">
          <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-5 py-2 rounded-xl font-bold shadow-lg transition-all duration-200">
            Sign In
          </button>
        </div>
        {/* Hamburger Icon */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <svg className="h-7 w-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-gray-950/95 border-t border-gray-800 shadow-xl flex flex-col items-center gap-4 py-6 z-50 md:hidden animate-fade-in">
            <a
              href="/"
              className="text-gray-300 hover:text-blue-400 transition font-semibold text-lg"
              onClick={handleHome}
            >
              Home
            </a>
            <a
              className="text-gray-300 hover:text-blue-400 transition font-semibold text-lg cursor-pointer"
              onClick={handleFileUpload}
            >
              Upload
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-blue-400 transition font-semibold text-lg"
            >
              Explore
            </a>
            <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-5 py-2 rounded-xl font-bold shadow-lg transition-all duration-200 mt-2">
              Sign In
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}