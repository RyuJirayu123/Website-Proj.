import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../context/LanguageContext'

export default function Stats() {
  const { t } = useLang()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const items = [
    {
      tag: t.stats.items[0]?.tag || 'Cumulative Value',
      icon: 'account_balance',
      value: t.stats.items[0]?.val || '฿85,000M+',
      title: t.stats.items[0]?.label || 'มูลค่าธุรกรรมสะสมรวม',
      desc: t.stats.items[0]?.desc || 'Cumulative M&A and Capital Advisory completed mandates since inception.',
    },
    {
      tag: t.stats.items[1]?.tag || 'Executive Pedigree',
      icon: 'military_tech',
      value: t.stats.items[1]?.val || '35+ ปี',
      title: t.stats.items[1]?.label || 'ประสบการณ์เฉลี่ยพาร์ทเนอร์',
      desc: t.stats.items[1]?.desc || 'Tier-1 global investment banking background with SET & international markets.',
    },
    {
      tag: t.stats.items[2]?.tag || 'Regulatory Rigor',
      icon: 'gavel',
      value: t.stats.items[2]?.val || '100%',
      title: t.stats.items[2]?.label || 'SEC Fiduciary License',
      desc: t.stats.items[2]?.desc || 'Licensed by SEC Thailand to issue Independent Financial Advisor (IFA) opinions.',
    },
    {
      tag: t.stats.items[3]?.tag || 'Execution Mandates',
      icon: 'handshake',
      value: t.stats.items[3]?.val || '48+ ดีล',
      title: t.stats.items[3]?.label || 'ธุรกรรมระดับภูมิภาคสำเร็จ',
      desc: t.stats.items[3]?.desc || 'Successful completions across Thailand, Singapore, Vietnam, and Indonesia.',
    },
  ]

  return (
    <section className="w-full bg-[#F4F3F1] py-16 lg:py-20 border-b border-[#E7E4DC] shadow-xs">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-sans text-[11px] font-semibold text-[#765A26] uppercase tracking-[0.18em] block">
              {t.stats.label}
            </span>
            <h2 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#0B1528] mt-1">
              {t.stats.heading}
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-[13px] text-[#45474D] max-w-md leading-relaxed">
            {t.stats.sub}
          </p>
        </div>

        {/* 4 High-Impact Metric Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.tag}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white p-6 shadow-xs border border-[#E7E4DC] flex flex-col justify-between h-full hover:border-[#9A7B44] transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-[10.5px] font-bold text-[#765A26] uppercase tracking-wider">
                  {item.tag}
                </span>
                <span className="material-symbols-outlined text-[#765A26] text-[22px]">
                  {item.icon}
                </span>
              </div>
              <div>
                <div className="font-serif text-[38px] lg:text-[42px] font-bold text-[#0B1528] leading-tight mb-1">
                  {item.value}
                </div>
                <p className="font-sans text-[14.5px] font-semibold text-[#0B1528]">
                  {item.title}
                </p>
                <p className="font-sans text-xs text-[#45474D] mt-1.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
