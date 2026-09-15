import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import { useLang } from '../context/LanguageContext'

const API_URL = 'http://localhost:4000'

export default function FeaturedCases() {
  const { t, lang } = useLang()
  const [cases, setCases] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/api/cases`)
      .then((r) => r.json())
      .then((d) => {
        setCases((d.data || d || []).slice(0, 3))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading || cases.length === 0) return null

  return (
    <section className="py-20 bg-[#FAF9F6] border-t border-[#E7E4DC]">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 pb-5 border-b border-[#E7E4DC]"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9A7B44]" />
            <span className="editorial-label text-[#9A7B44]">{t.cases.featuredLabel}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#070E1B] font-normal">
                {t.cases.featuredHeading}
              </h2>
              <p className="text-[#5D6574] text-sm mt-1 max-w-xl font-sans">
                {t.cases.featuredSub}
              </p>
            </div>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#070E1B] hover:text-[#9A7B44] border-b border-[#070E1B] hover:border-[#9A7B44] pb-0.5 transition-colors whitespace-nowrap"
            >
              {t.cases.viewAll} <HiArrowRight />
            </Link>
          </div>
        </motion.div>

        {/* Tombstone Card Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="tombstone-card bg-white border border-[#E7E4DC] p-7 flex flex-col justify-between"
            >
              <div>
                {/* Header Stamp */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E4DC] text-[11px] mb-4">
                  <span className="editorial-label text-[#9A7B44] font-semibold">{item.sector || 'Advisory'}</span>
                  <span className="text-[#5D6574]">{item.deal_year}</span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-[20px] leading-snug text-[#070E1B] font-normal mb-2 hover:text-[#9A7B44] transition-colors">
                  <Link to="/case-studies">
                    {lang === 'th' ? item.title_th : item.title_en}
                  </Link>
                </h3>

                {/* Description */}
                <p className="text-[#5D6574] text-xs leading-relaxed mb-6 line-clamp-2">
                  {lang === 'th' ? item.description_th : item.description_en}
                </p>

                {/* Formal Deal Value box */}
                {item.deal_value && (
                  <div className="border border-[#E7E4DC] bg-[#FAF9F6] p-3.5 text-center mb-4">
                    <div className="editorial-label text-[#5D6574] text-[10px]">Transaction Mandate Value</div>
                    <div className="font-serif text-2xl font-normal text-[#070E1B] mt-0.5">{item.deal_value}</div>
                  </div>
                )}
              </div>

              <div className="border-t border-[#E7E4DC] pt-3 flex items-center justify-between text-[11px]">
                <span className="text-[#5D6574]">Verified Mandate</span>
                <span className="text-[#9A7B44] font-semibold">Alpha Capital</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
