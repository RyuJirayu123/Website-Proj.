import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

export default function Services() {
  const { t } = useLang()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const navigate = useNavigate()

  const practices = t.services.items || []

  return (
    <section id="services" className="w-full py-20 lg:py-24 bg-[#FAF9F6] border-b border-[#E7E4DC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="font-sans text-[11px] font-semibold text-[#765A26] uppercase tracking-[0.2em] block">
            {t.services.label}
          </span>
          <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-[#0B1528] mt-2">
            {t.services.heading}
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#45474D] mt-3 leading-relaxed">
            {t.services.sub}
          </p>
        </motion.div>

        {/* 4 Strategic Practice Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {practices.map((practice, i) => (
            <motion.div
              key={practice.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="bg-white p-8 lg:p-10 shadow-xs border border-[#E7E4DC] flex flex-col justify-between hover:border-[#9A7B44] hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-2xl font-bold text-[#765A26]">
                    {practice.num}
                  </span>
                  <span className="font-sans text-[10.5px] px-2.5 py-1 bg-[#EFEEEB] text-[#1A1C1A] uppercase font-bold tracking-wider">
                    {practice.tag}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-[22px] font-bold text-[#0B1528] mb-3">
                  {practice.title}
                </h3>

                <p className="font-sans text-sm text-[#45474D] mb-6 leading-relaxed">
                  {practice.desc}
                </p>

                <div className="bg-[#F4F3F1] border-l-2 border-[#765A26] p-4 mb-6">
                  <span className="font-sans text-[10.5px] font-bold text-[#765A26] uppercase tracking-wider block mb-1">
                    {practice.mandateLabel}
                  </span>
                  <p className="font-sans text-xs sm:text-[13px] text-[#1A1C1A] font-medium leading-normal">
                    {practice.mandateDesc}
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate('/case-studies')}
                className="font-sans text-xs font-bold uppercase tracking-wider text-[#765A26] hover:text-[#0B1528] transition-colors flex items-center gap-1.5 self-start pt-2"
              >
                <span>{practice.linkText}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
