import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLang } from '../context/LanguageContext'
import { API_URL } from '../api'

// Default fallback tombstones straight from Stitch design
const defaultTombstones = [
  {
    id: 1,
    category: 'Cross-Border Acquisition',
    title: 'SIAM RENEWABLE HOLDINGS',
    subtitle: 'Acquisition of 65% Equity Interest in Mekong Solar Infrastructure (Vietnam)',
    value: '฿14,200,000,000',
    role: 'Sole Financial Advisor to Buyer',
  },
  {
    id: 2,
    category: 'Capital Market • SET mai Pre-IPO',
    title: 'LOGISTECH INNOVATIONS PLC',
    subtitle: 'Private Placement Equity Expansion & Initial Public Offering Underwriting',
    value: '฿4,850,000,000',
    role: 'Joint Financial Advisor & Lead Arranger',
  },
  {
    id: 3,
    category: 'Recapitalization & Synergies',
    title: 'PACIFIC HEALTHCARE CORP',
    subtitle: 'Strategic Divestment of Non-Core Diagnostic Facilities & Senior Debt Refinancing',
    value: '฿7,600,000,000',
    role: 'Exclusive Fiduciary Advisor to the Board',
  },
]

export default function FeaturedCases() {
  const { t, lang } = useLang()
  const navigate = useNavigate()
  const [cases, setCases] = useState(defaultTombstones)

  useEffect(() => {
    fetch(`${API_URL}/api/cases`)
      .then((r) => r.json())
      .then((d) => {
        const fetched = d.data || d || []
        if (Array.isArray(fetched) && fetched.length > 0) {
          const mapped = fetched.slice(0, 3).map((item) => ({
            id: item.id,
            category: item.sector || 'Financial Advisory',
            title: (lang === 'th' ? item.title_th : item.title_en) || 'CORPORATE TRANSACTION',
            subtitle: (lang === 'th' ? item.description_th : item.description_en) || '',
            value: item.deal_value || '฿10,000,000,000',
            role: (lang === 'th' ? item.result_th : item.result_en) || 'Financial Advisor',
          }))
          setCases(mapped)
        }
      })
      .catch(() => {
        // keep defaultTombstones from Stitch
      })
  }, [lang])

  return (
    <section className="w-full bg-[#EFEEEB] py-16 lg:py-20 border-b border-[#E7E4DC] shadow-xs">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-sans text-[11px] font-semibold text-[#765A26] uppercase tracking-[0.18em] block">
              {t.cases.featuredLabel}
            </span>
            <h2 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#0B1528] mt-1">
              {t.cases.featuredHeading}
            </h2>
          </div>

          <Link
            to="/case-studies"
            className="font-sans text-xs font-bold uppercase tracking-wider text-[#765A26] hover:text-[#0B1528] transition-colors flex items-center gap-1.5"
          >
            <span>{t.cases.viewAll}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        {/* 3 Classic Financial Tombstone Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white p-7 lg:p-8 shadow-xs border border-[#E7E4DC] flex flex-col items-center text-center justify-between min-h-[360px] tombstone-card"
            >
              <div className="w-full">
                <span className="font-sans text-[10.5px] font-bold text-[#765A26] uppercase tracking-wider block mb-3">
                  {item.category}
                </span>

                <div className="font-serif text-[20px] font-bold text-[#0B1528] tracking-tight py-1 uppercase">
                  {item.title}
                </div>

                <p className="font-sans text-xs text-[#45474D] max-w-xs mx-auto mt-2 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>

              <div className="w-full my-6 bg-[#F4F3F1] py-3.5 px-4 border-y border-[#E7E4DC]">
                <div className="font-serif text-[26px] sm:text-[30px] font-bold text-[#0B1528] tracking-tight">
                  {item.value}
                </div>
              </div>

              <div className="w-full border-t border-[#E7E4DC]/80 pt-3">
                <span className="font-sans text-[11px] text-[#765A26] uppercase block font-bold tracking-wider">
                  {item.role}
                </span>
                <span className="font-sans text-[10px] text-[#45474D]/70 block mt-1 uppercase tracking-wider">
                  Apex Capital Advisory Group
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
