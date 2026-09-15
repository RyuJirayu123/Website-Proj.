import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import { useLang } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLang()

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#070E1B] text-white pt-28 pb-16"
    >
      {/* Muted geometric architectural grid background */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 border border-[#9A7B44]/40 bg-[#0B1528] px-3.5 py-1 text-[11px] uppercase tracking-[0.22em] text-[#9A7B44] font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9A7B44] animate-pulse" />
            {t.hero.badge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl lg:text-[68px] font-normal leading-[1.12] text-white tracking-[-0.02em] mb-6"
        >
          {t.hero.line1}{' '}
          <span className="italic text-[#B89758]">{t.hero.line2}</span>
          <br />
          {t.hero.line3}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#8A92A0] text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#9A7B44] hover:bg-[#B89758] text-[#070E1B] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors"
          >
            <span>{t.hero.cta1}</span>
            <HiArrowRight className="text-sm" />
          </button>
          <button
            onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 hover:border-[#9A7B44] text-white/90 hover:text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors"
          >
            {t.hero.cta2}
          </button>
        </motion.div>

        {/* Architecturally Crisp Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-10 border-t border-[#1E2B45] grid grid-cols-3 gap-6 max-w-2xl mx-auto"
        >
          {[
            { value: t.hero.stat1Val, label: t.hero.stat1Label },
            { value: t.hero.stat2Val, label: t.hero.stat2Label },
            { value: t.hero.stat3Val, label: t.hero.stat3Label },
          ].map((item, idx) => (
            <div key={idx} className="border-l border-[#9A7B44]/40 pl-4 text-left">
              <div className="font-serif text-2xl md:text-3xl font-normal text-white">{item.value}</div>
              <div className="text-[#8A92A0] text-xs uppercase tracking-wider mt-0.5">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-b border-[#1E2B45]" />
    </section>
  )
}
