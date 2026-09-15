import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../context/LanguageContext'

export default function WhyUs() {
  const { t } = useLang()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const icons = ['verified_user', 'tune', 'military_tech', 'public']

  const reasons = t.whyUs.items || []

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-[#0B1528] text-white border-b border-[#1E2B45] relative overflow-hidden">
      {/* Background Architectural Watermark */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <span className="font-sans text-[11px] font-semibold text-[#9A7B44] uppercase tracking-[0.2em] block mb-2">
            {t.whyUs.label}
          </span>
          <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-white mt-2 mb-4">
            {t.whyUs.heading}
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
            {t.whyUs.sub}
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="flex gap-5 p-6 bg-[#121B2F]/60 border border-[#1E2B45] hover:border-[#9A7B44] transition-colors duration-300"
            >
              <div className="shrink-0 w-12 h-12 bg-[#9A7B44]/15 border border-[#9A7B44]/40 flex items-center justify-center text-[#9A7B44]">
                <span className="material-symbols-outlined text-[24px]">
                  {icons[i % icons.length]}
                </span>
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white mb-2">{r.title}</h3>
                <p className="font-sans text-xs sm:text-[13px] text-slate-300 leading-relaxed">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 bg-[#121B2F] border border-[#9A7B44]/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <div className="font-serif text-xl sm:text-2xl font-bold text-white mb-1">
              {t.whyUs.ctaTitle}
            </div>
            <div className="font-sans text-xs sm:text-sm text-slate-300">
              {t.whyUs.ctaSub}
            </div>
          </div>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#9A7B44] hover:bg-[#B89758] text-[#070E1B] px-7 py-3 font-sans text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors shadow-xs"
          >
            {t.whyUs.ctaBtn}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
