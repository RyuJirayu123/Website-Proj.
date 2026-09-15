import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX, HiLockClosed } from 'react-icons/hi'
import { useLang } from '../context/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, lang, setLang } = useLang()
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

  const isHome = location.pathname === '/'

  return (
    <>
      {/* Top Ticker Bar */}
      <aside className="w-full bg-[#070E1B] text-[#8A92A0] text-[11px] border-b border-[#1E2B45] hidden md:block fixed top-0 left-0 right-0 z-50">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 h-8 flex items-center justify-between font-sans">
          <div className="flex items-center space-x-6 tracking-wide">
            <span className="inline-flex items-center text-[#9A7B44]">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#9A7B44] mr-2 animate-pulse" />
              SEC THAILAND LICENSED ADVISORY
            </span>
            <span className="text-[#5D6574]">|</span>
            <span>SET Index: <strong className="text-white font-medium">1,418.32</strong> (+0.42%)</span>
            <span className="text-[#5D6574]">|</span>
            <span>THB/USD: <strong className="text-white font-medium">34.62</strong></span>
            <span className="text-[#5D6574]">|</span>
            <span>M&A Volume (SEA): <strong className="text-[#9A7B44] font-medium">$18.4B</strong></span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-[#8A92A0]">Bangkok • Singapore • London</span>
            <span className="text-[#5D6574]">/</span>
            <button
              onClick={() => handleNav({ href: '#contact' })}
              className="text-[#8A92A0] hover:text-white transition-colors"
            >
              Institutional Inquiries
            </button>
          </div>
        </div>
      </aside>

      {/* Main Navigation Header */}
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 top-0 md:top-8 ${
          scrolled || !isHome
            ? 'bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E7E4DC] text-[#070E1B] shadow-sm'
            : 'bg-transparent text-white'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          {/* Brand Crest & Monogram */}
          <Link
            to="/"
            onClick={() => {
              if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 border border-[#9A7B44]/40 flex items-center justify-center bg-[#070E1B] text-white transition-colors group-hover:border-[#9A7B44]">
              <span className="font-serif text-xl font-bold tracking-widest text-[#9A7B44]">A</span>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-serif text-[19px] tracking-[0.08em] uppercase font-semibold leading-tight transition-colors ${
                  scrolled || !isHome ? 'text-[#070E1B] group-hover:text-[#9A7B44]' : 'text-white group-hover:text-[#B89758]'
                }`}
              >
                Alpha Capital
              </span>
              <span className="editorial-label text-[#9A7B44] font-semibold tracking-[0.22em]">
                Advisory Group
              </span>
            </div>
          </Link>

          {/* Refined Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-[12.5px] tracking-[0.08em] font-medium uppercase">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link)}
                className={`transition-colors py-1 ${
                  scrolled || !isHome
                    ? 'text-[#5D6574] hover:text-[#070E1B]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions & Language Switch */}
          <div className="flex items-center gap-4">
            {/* Understated Bilingual Toggle */}
            <div className="inline-flex items-center text-[11px] font-semibold tracking-wider uppercase border border-[#E7E4DC]">
              <button
                type="button"
                onClick={() => setLang('th')}
                className={`px-2.5 py-1 transition-colors ${
                  lang === 'th' ? 'bg-[#070E1B] text-white' : 'bg-transparent text-[#5D6574] hover:text-[#070E1B]'
                }`}
              >
                TH
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 transition-colors ${
                  lang === 'en' ? 'bg-[#070E1B] text-white' : 'bg-transparent text-[#5D6574] hover:text-[#070E1B]'
                }`}
              >
                EN
              </button>
            </div>

            {/* Portal Action Link */}
            <Link
              to="/admin/login"
              className={`hidden sm:inline-flex items-center text-[11.5px] font-medium tracking-wider uppercase px-3.5 py-1.5 transition-colors border ${
                scrolled || !isHome
                  ? 'border-[#070E1B] text-[#070E1B] hover:bg-[#070E1B] hover:text-white'
                  : 'border-white/40 text-white hover:border-white hover:bg-white/10'
              }`}
            >
              <span>{t.nav.login}</span>
              <span className="material-symbols-outlined text-[13px] ml-1.5">lock</span>
            </Link>

            {/* Mobile menu hamburger */}
            <button
              className={`lg:hidden text-2xl ${scrolled || !isHome ? 'text-[#070E1B]' : 'text-white'}`}
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
              className="lg:hidden bg-[#070E1B] text-white border-t border-[#1E2B45] px-6 pb-6 pt-3"
            >
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link)}
                  className="block w-full text-left text-white/80 hover:text-[#9A7B44] py-3 text-sm font-medium border-b border-white/5"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 flex gap-2">
                <button
                  onClick={() => handleNav({ href: '#contact' })}
                  className="flex-1 bg-[#9A7B44] hover:bg-[#B89758] text-[#070E1B] py-2.5 font-semibold text-xs uppercase tracking-wider text-center transition-colors"
                >
                  {t.nav.consult}
                </button>
                <Link
                  to="/admin/login"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2.5 border border-white/20 text-white text-xs uppercase tracking-wider flex items-center justify-center gap-1 hover:border-[#9A7B44]"
                >
                  <HiLockClosed className="text-[#9A7B44]" />
                  <span>Portal</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
