import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight, HiOfficeBuilding } from 'react-icons/hi'
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
        setCases((d.data || []).slice(0, 3))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading || cases.length === 0) return null

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-[#c9a96e] text-sm font-semibold uppercase tracking-widest mb-3">
            {t.cases.featuredLabel}
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a2332]">
                {t.cases.featuredHeading}
              </h2>
              <p className="text-gray-500 mt-2 max-w-xl">
                {t.cases.featuredSub}
              </p>
            </div>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-[#c9a96e] font-semibold hover:gap-3 transition-all text-sm whitespace-nowrap"
            >
              {t.cases.viewAll} <HiArrowRight />
            </Link>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-gray-50 rounded-lg border border-gray-100 hover:border-[#c9a96e]/30 hover:shadow-md transition-all p-6 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <span className="bg-[#1a2332] text-white text-xs px-2.5 py-1 rounded font-medium">
                  {item.sector || 'Advisory'}
                </span>
                <span className="text-gray-400 text-xs">{item.deal_year}</span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-[#1a2332] group-hover:text-[#c9a96e] transition-colors mb-2 leading-snug">
                {lang === 'th' ? item.title_th : item.title_en}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                {lang === 'th' ? item.description_th : item.description_en}
              </p>

              {/* Deal Value */}
              {item.deal_value && (
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-xs text-gray-400 mb-0.5">{t.cases.dealValue}</p>
                  <p className="text-[#c9a96e] font-bold text-lg">{item.deal_value}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
