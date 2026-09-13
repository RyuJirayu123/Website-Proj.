import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX, HiLockClosed, HiGlobeAlt } from 'react-icons/hi'
import { useLang } from '../context/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, lang, toggle } = useLang()
  const location = useLocation()
  const navigate = useNavigate()

  const navLinks = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.whyUs, href: '#why-us' },
    { label: t.nav.caseStudies, path: '/case-studies' },
    { label: t.nav.insights, path: '/insights' },
    { label: t.nav.team, href: '#team' },
    { label: t.nav.testimonials, href: '#testimonials' },
    { label: t.nav.contact, href: '#contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (item) => {
    setMenuOpen(false)
    if (item.path) {
      navigate(item.path)
      return
    }
    if (item.href) {
      if (location.pathname !== '/') {
        navigate(`/${item.href}`)
        return
      }
      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || location.pathname !== '/' ? 'bg-[#1a2332] shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => {
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
          className="flex items-center gap-2 group"
        >
          <div className="w-9 h-9 bg-[#c9a96e] rounded-sm flex items-center justify-center font-bold text-white text-lg">
            A
          </div>
          <span className="text-white font-bold text-lg tracking-wide">
            Alpha <span className="text-[#c9a96e]">Capital</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link)}
              className="text-white/80 hover:text-[#c9a96e] transition-colors duration-200 text-sm font-medium"
            >
              {link.label}
            </button>
          ))}

          {/* Language Toggle Button */}
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded border border-white/20 hover:border-[#c9a96e] text-white transition-colors"
            title="Switch Language / สลับภาษา"
          >
            <HiGlobeAlt className="text-[#c9a96e] text-sm" />
            <span className={lang === 'th' ? 'text-[#c9a96e]' : 'text-white/70'}>TH</span>
            <span className="text-white/40">/</span>
            <span className={lang === 'en' ? 'text-[#c9a96e]' : 'text-white/70'}>EN</span>
          </button>

          <button
            onClick={() => handleNav({ href: '#contact' })}
            className="bg-[#c9a96e] hover:bg-[#a88b4a] text-white px-4 py-2 rounded text-sm font-semibold transition-colors duration-200"
          >
            {t.nav.consult}
          </button>

          <Link
            to="/admin/login"
            className="inline-flex items-center gap-1.5 border border-white/20 hover:border-[#c9a96e] text-white/90 hover:text-[#c9a96e] px-3.5 py-1.5 rounded text-sm font-medium transition-all duration-200"
            title={t.nav.login}
          >
            <HiLockClosed className="text-xs text-[#c9a96e]" /> {t.nav.login}
          </Link>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Language Toggle Mobile */}
          <button
            onClick={toggle}
            className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded border border-white/20 text-white"
          >
            <span className={lang === 'th' ? 'text-[#c9a96e]' : 'text-white/70'}>TH</span>
            <span className="text-white/40">/</span>
            <span className={lang === 'en' ? 'text-[#c9a96e]' : 'text-white/70'}>EN</span>
          </button>

          <button
            className="text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-[#1a2332] border-t border-white/10 px-6 pb-6 pt-2"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link)}
                className="block w-full text-left text-white/80 hover:text-[#c9a96e] py-3 text-sm font-medium border-b border-white/5"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav({ href: '#contact' })}
              className="mt-4 w-full bg-[#c9a96e] hover:bg-[#a88b4a] text-white py-2.5 rounded text-sm font-semibold transition-colors"
            >
              {t.nav.consult}
            </button>
            <Link
              to="/admin/login"
              onClick={() => setMenuOpen(false)}
              className="mt-3 w-full border border-white/20 hover:border-[#c9a96e] text-white/90 hover:text-[#c9a96e] text-center py-2.5 rounded text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
            >
              <HiLockClosed className="text-[#c9a96e]" /> {t.nav.login}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
