import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

export default function About() {
  const { t } = useLang()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const navigate = useNavigate()

  const highlights = [
    t.about.h1,
    t.about.h2,
    t.about.h3,
    t.about.h4,
  ]

  const stats = [
    { label: t.about.stat1Label, value: t.about.stat1Val },
    { label: t.about.stat2Label, value: t.about.stat2Val },
    { label: t.about.stat3Label, value: t.about.stat3Val },
    { label: t.about.stat4Label, value: t.about.stat4Val },
  ]

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FAF9F6] border-b border-[#E7E4DC]">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left – Visual Architectural Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-[#0B1528] p-8 lg:p-10 text-white border border-[#1E2B45] shadow-md">
              <div className="flex items-baseline justify-between border-b border-white/15 pb-4 mb-6">
                <div>
                  <div className="font-serif text-5xl font-bold text-[#9A7B44]">
                    {t.about.years}
                  </div>
                  <div className="font-sans text-xs uppercase tracking-wider text-slate-400 mt-1">
                    {t.about.yearsLabel}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-sans text-[11px] text-[#9A7B44] font-semibold uppercase tracking-widest block">
                    Fiduciary Standard
                  </span>
                  <span className="font-serif text-lg font-bold text-white">SEC Accredited</span>
                </div>
              </div>

              <div className="space-y-4">
                {stats.map((item) => (
                  <div key={item.label} className="flex justify-between border-b border-white/10 pb-3 items-center">
                    <span className="font-sans text-slate-300 text-xs sm:text-sm">{item.label}</span>
                    <span className="font-serif text-[#9A7B44] font-bold text-base sm:text-lg">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Corner Prestige Card */}
            <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-[#765A26] p-4 text-white shadow-lg border border-[#B89758]/50">
              <div className="font-serif text-2xl font-bold tracking-tight">FA-094</div>
              <div className="font-sans text-[10px] uppercase tracking-wider text-white/90 mt-0.5">
                SEC License No.
              </div>
            </div>
          </motion.div>

          {/* Right – Text content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span className="font-sans text-[11px] font-semibold text-[#765A26] uppercase tracking-[0.2em] block mb-2">
              {t.about.label}
            </span>
            <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-[#0B1528] leading-[1.18] mb-5">
              {t.about.heading}
            </h2>
            <p className="font-sans text-sm sm:text-[15px] text-[#45474D] leading-relaxed mb-4">
              {t.about.p1}
            </p>
            <p className="font-sans text-sm sm:text-[15px] text-[#45474D] leading-relaxed mb-6">
              {t.about.p2}
            </p>

            <div className="grid sm:grid-cols-2 gap-3.5 mb-8">
              {highlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#765A26] text-[20px] shrink-0 mt-0.5">
                    verified
                  </span>
                  <span className="font-sans text-xs sm:text-[13px] font-medium text-[#1A1C1A]">
                    {h}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/case-studies')}
              className="px-6 py-3.5 bg-[#0B1528] text-white hover:bg-[#1E2B45] font-sans text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-xs"
            >
              <span>{t.about.btn}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
