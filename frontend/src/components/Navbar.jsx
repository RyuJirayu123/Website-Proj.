import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { useLang } from '../context/LanguageContext'
import ApexLogo from './ApexLogo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, lang, setLang } = useLang()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
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

  const navLinks = [
    { label: t.nav.about || 'About Firm', href: '#about' },
    { label: t.nav.services || 'Advisory Services', href: '#services' },
    { label: t.nav.caseStudies || 'Track Record & Tombstones', path: '/case-studies' },
    { label: t.nav.insights || 'Insights & Research', path: '/insights' },
    { label: t.nav.contact || 'Client Portal', href: '#contact' },
  ]

  return (
    <>
      {/* Top Institutional Ticker & Accreditation Bar */}
      <aside className="w-full bg-[#070E1B] text-[#8A92A0] text-[11px] border-b border-[#1E2B45] hidden md:block fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-8 flex items-center justify-between font-sans">
          <div className="flex items-center space-x-5 tracking-wide">
            <span className="inline-flex items-center text-[#9A7B44] font-semibold">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#9A7B44] mr-2 animate-pulse" />
              SEC THAILAND LICENSED ADVISOR
            </span>
            <span className="text-[#334155]">|</span>
            <span>SET Index: <strong className="text-white font-medium">1,418.32</strong> (+0.42%)</span>
            <span className="text-[#334155]">|</span>
            <span>THB/USD: <strong className="text-white font-medium">34.62</strong></span>
            <span className="text-[#334155]">|</span>
            <span>M&A Volume (SEA): <strong className="text-[#9A7B44] font-medium">$18.4B</strong></span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-[#8A92A0]">Bangkok • Singapore • London</span>
            <span className="text-[#334155]">/</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              APEX &lt;GO&gt; ONLINE
            </span>
          </div>
        </div>
      </aside>

      {/* Main Stitch Navigation Header */}
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 top-0 md:top-8 ${
          scrolled || !isHome
            ? 'bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E7E4DC] text-[#0B1528] shadow-[0_1px_8px_rgba(0,0,0,0.04)]'
            : 'bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E7E4DC]/60 text-[#0B1528]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo & SEC Tag */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              onClick={() => {
                if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="flex items-center gap-2 group"
            >
              <ApexLogo variant="dark" className="h-9 w-auto" />
            </Link>

            <div className="hidden xl:flex items-center bg-[#F4F3F1] border border-[#E7E4DC] px-2.5 py-0.5">
              <span className="font-sans text-[10px] text-[#765A26] font-semibold tracking-wider uppercase">
                SEC Thailand Licensed Advisor
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link)}
                className="font-sans text-[12.5px] font-semibold uppercase tracking-[0.06em] text-[#45474D] hover:text-[#0B1528] transition-colors py-1"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Area: Language Switch, Data Room, Consultation, Admin */}
          <div className="flex items-center gap-3">
            {/* TH / EN Switcher */}
            <div className="hidden sm:flex items-center bg-[#F4F3F1] border border-[#E7E4DC] px-1.5 py-0.5">
              <button
                type="button"
                onClick={() => setLang('th')}
                className={`font-sans text-[11px] px-2 py-0.5 transition-colors font-bold ${
                  lang === 'th' ? 'text-[#0B1528] bg-white shadow-xs' : 'text-[#76777D] hover:text-[#0B1528]'
                }`}
              >
                TH
              </button>
              <span className="text-[#C6C6CD] text-xs">|</span>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`font-sans text-[11px] px-2 py-0.5 transition-colors font-bold ${
                  lang === 'en' ? 'text-[#0B1528] bg-white shadow-xs' : 'text-[#76777D] hover:text-[#0B1528]'
                }`}
              >
                EN
              </button>
            </div>

            {/* Data Room Link */}
            <Link
              to="/admin/login"
              className="hidden md:inline-flex items-center font-sans text-[11.5px] font-semibold uppercase tracking-wider px-3.5 py-2 text-[#0B1528] bg-[#F4F3F1] hover:bg-[#E9E8E5] border border-[#E7E4DC] transition-colors"
            >
              {t.nav.dataRoom || 'Data Room'}
            </Link>

            {/* Main Consultation CTA */}
            <button
              onClick={() => handleNav({ href: '#contact' })}
              className="font-sans text-[11.5px] font-bold uppercase tracking-wider px-4 py-2 bg-[#765A26] text-white hover:bg-[#5B4210] shadow-sm transition-colors"
            >
              {t.nav.consult || 'นัดหมายปรึกษา'}
            </button>

            {/* User/Admin Profile Icon */}
            <Link
              to="/admin/login"
              title="Admin Portal"
              className="w-8 h-8 rounded-full bg-[#0B1528] flex items-center justify-center text-white hover:bg-[#9A7B44] transition-colors"
            >
              <span className="material-symbols-outlined text-[17px]">person</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden text-2xl text-[#0B1528] p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Flyout Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden bg-[#070E1B] text-white border-t border-[#1E2B45] px-6 pb-6 pt-3"
            >
              <div className="flex items-center justify-between py-2 border-b border-white/10 mb-2">
                <span className="font-sans text-[11px] text-[#9A7B44] uppercase tracking-wider">
                  SEC THAILAND LICENSED ADVISOR
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLang('th')}
                    className={`text-xs px-2 py-0.5 ${lang === 'th' ? 'bg-[#9A7B44] text-[#070E1B] font-bold' : 'text-white/60'}`}
                  >
                    TH
                  </button>
                  <button
                    onClick={() => setLang('en')}
                    className={`text-xs px-2 py-0.5 ${lang === 'en' ? 'bg-[#9A7B44] text-[#070E1B] font-bold' : 'text-white/60'}`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link)}
                  className="block w-full text-left text-white/90 hover:text-[#9A7B44] py-3 text-sm font-medium border-b border-white/5 uppercase tracking-wider font-sans"
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-4 flex flex-col gap-2">
                <button
                  onClick={() => handleNav({ href: '#contact' })}
                  className="w-full bg-[#9A7B44] hover:bg-[#B89758] text-[#070E1B] py-3 font-bold text-xs uppercase tracking-wider text-center transition-colors shadow-sm"
                >
                  {t.nav.consult || 'นัดหมายรับคำปรึกษา'}
                </button>
                <Link
                  to="/admin/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-2.5 border border-white/20 text-white text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:border-[#9A7B44]"
                >
                  <span className="material-symbols-outlined text-[15px] text-[#9A7B44]">lock</span>
                  <span>Data Room / Client Portal</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
