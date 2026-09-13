import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'

const navLinks = [
  { label: 'เกี่ยวกับเรา', href: '#about' },
  { label: 'บริการ', href: '#services' },
  { label: 'ทำไมต้องเรา', href: '#why-us' },
  { label: 'ทีมงาน', href: '#team' },
  { label: 'รีวิว', href: '#testimonials' },
  { label: 'ติดต่อ', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a1f44] shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="flex items-center gap-2 group"
        >
          <div className="w-9 h-9 bg-[#d4a017] rounded-sm flex items-center justify-center font-bold text-white text-lg">
            A
          </div>
          <span className="text-white font-bold text-lg tracking-wide">
            Alpha <span className="text-[#d4a017]">Capital</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-white/80 hover:text-[#d4a017] transition-colors duration-200 text-sm font-medium"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#contact')}
            className="ml-4 bg-[#d4a017] hover:bg-[#b8860b] text-white px-5 py-2 rounded text-sm font-semibold transition-colors duration-200"
          >
            ปรึกษาฟรี
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-[#0a1f44] border-t border-white/10 px-6 pb-6 pt-2"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="block w-full text-left text-white/80 hover:text-[#d4a017] py-3 text-sm font-medium border-b border-white/5"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('#contact')}
              className="mt-4 w-full bg-[#d4a017] hover:bg-[#b8860b] text-white py-2.5 rounded text-sm font-semibold transition-colors"
            >
              ปรึกษาฟรี
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
