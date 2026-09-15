import { motion } from 'framer-motion'
import { useLang } from '../context/LanguageContext'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const { t } = useLang()
  const navigate = useNavigate()

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[#FAF9F6] pt-32 pb-16 lg:pt-36 lg:pb-24 border-b border-[#E7E4DC]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Column: Copy & Authority Callouts */}
          <div className="w-full lg:w-7/12 flex flex-col items-start gap-5 z-10">
            {/* Prestige Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#F4F3F1] border border-[#E7E4DC] shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#765A26] animate-pulse" />
              <span className="font-sans text-[11px] font-semibold text-[#765A26] uppercase tracking-[0.16em]">
                {t.hero.badge}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="font-serif text-[36px] sm:text-[48px] lg:text-[54px] font-bold text-[#0B1528] tracking-[-0.02em] leading-[1.12]">
                {t.hero.line1} {t.hero.line2} {t.hero.line3}
              </h1>
              <p className="font-serif italic text-lg sm:text-xl text-[#765A26]">
                {t.hero.subTitleEn}
              </p>
            </motion.div>

            {/* Descriptive Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-sans text-[#45474D] text-base lg:text-[16.5px] max-w-2xl leading-relaxed"
            >
              {t.hero.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2"
            >
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3.5 bg-[#0B1528] text-white hover:bg-[#1E2B45] font-sans text-xs font-bold uppercase tracking-[0.12em] text-center shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>{t.hero.cta1}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>

              <button
                onClick={() => navigate('/case-studies')}
                className="px-6 py-3.5 bg-[#F4F3F1] text-[#0B1528] hover:bg-[#E9E8E5] border border-[#E7E4DC] font-sans text-xs font-bold uppercase tracking-[0.12em] text-center shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>{t.hero.cta2}</span>
                <span className="material-symbols-outlined text-[16px]">stacked_line_chart</span>
              </button>
            </motion.div>

            {/* Accreditation Metadata Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-4 flex flex-wrap items-center gap-6 border-t border-[#E7E4DC]/80 w-full"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#765A26] text-[19px]">verified_user</span>
                <span className="font-sans text-[11px] font-semibold text-[#45474D] uppercase tracking-wider">
                  {t.hero.secBadge}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#765A26] text-[19px]">lock</span>
                <span className="font-sans text-[11px] font-semibold text-[#45474D] uppercase tracking-wider">
                  {t.hero.isoBadge}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual Frame with Terminal Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-5/12 flex flex-col items-center"
          >
            <div className="relative w-full shadow-lg bg-white p-2.5 border border-[#E7E4DC]">
              <div className="relative w-full bg-[#F4F3F1] overflow-hidden">
                <img
                  className="w-full h-[380px] sm:h-[440px] object-cover"
                  alt="Apex Capital Executive Boardroom overlooking Bangkok Financial District"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcf5rnNdLoPlNH7JMTTTe1ZSl66KBVTZ4gly4oZhuWlRarbIctMd9HYTDn_IZw3xhY8Mwenae97WDIPzrchUvVMvQi-mlv-gEqK08_-smBsKFkm91UpIFfYIzlAro0FE2QPWnybf0UkVXn3ddhwW5istkqT_AivZxg06zzQnbhW0HO1yLRIkWA9djWXLy0nD7ZKAZWZxvxPmt1bMtdZCszeCRlTQsFqeb3xC802WYvC4ngGd6400ue"
                />

                {/* Subtle scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528]/85 via-[#0B1528]/25 to-transparent" />

                {/* Real-time Credential Floating Matrix */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-4 border border-[#E7E4DC] shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-sans text-[10px] text-[#765A26] font-bold uppercase tracking-wider block">
                        {t.hero.bkkHq}
                      </span>
                      <span className="font-serif text-[15px] font-bold text-[#0B1528] block">
                        {t.hero.location}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-sans text-[10px] text-[#765A26] font-bold uppercase tracking-wider block">
                        {t.hero.terminalStatus}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-sans text-[11px] font-bold text-[#0B1528]">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        {t.hero.terminalActive}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
