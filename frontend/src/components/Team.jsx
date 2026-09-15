import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../context/LanguageContext'

const executivePartners = [
  {
    name_th: 'ดร. สมชาย วงศ์สุวรรณ',
    name_en: 'Dr. Somchai Wongsuwan',
    title_th: 'ประธานกรรมการบริหาร (Senior Partner & Chairman)',
    title_en: 'Senior Partner & Chairman',
    exp_th: '30+ ปีประสบการณ์',
    exp_en: '30+ Years Experience',
    bg: 'Goldman Sachs (MD), Bank of Thailand Advisor',
    photo: 'https://lh3.googleusercontent.com/aida/AEtjO1Vj-ecoe_ogVgpr9vYGUeMEN1Di-MZvc-dY_aFemBjlaZLLbx4pmuoghLvtsUwNd0BlR-B7AhHenw2gNk2oGzJ7zk21bYVep5vpwan1kKeD1JwRG-KUhhwuVYOW3VBnB9WsiqqEyCfI_UiHN6HK4t3GY2UzK5QdcOMZDaGqsqtIwoH3EfNnkCRDcMMiearUs5n1Mccr2cKyOlrVA0Eh4YFOaESqEBN2Cn-TgIrgmE85EX7hdZwGpMExIhs',
  },
  {
    name_th: 'คุณพิมพ์ใจ รัตนากร',
    name_en: 'Pimjai Rattanakorn',
    title_th: 'Managing Director – M&A Practice',
    title_en: 'Managing Director – M&A Practice',
    exp_th: '22+ ปีประสบการณ์',
    exp_en: '22+ Years Experience',
    bg: 'Morgan Stanley, Lazard Mergers Advisory',
    photo: null,
    initials: 'PR',
  },
  {
    name_th: 'คุณวรพล ธนาชัย',
    name_en: 'Worapol Thanachai',
    title_th: 'Managing Director – Capital Markets & IPO',
    title_en: 'Managing Director – Capital Markets & IPO',
    exp_th: '18+ ปีประสบการณ์',
    exp_en: '18+ Years Experience',
    bg: 'Credit Suisse, SEC Thailand Working Committee',
    photo: null,
    initials: 'WT',
  },
  {
    name_th: 'คุณนภัสสร เจริญกุล',
    name_en: 'Napatsorn Charoenkul',
    title_th: 'Managing Director – Valuation & IFA Opinions',
    title_en: 'Managing Director – Valuation & IFA Opinions',
    exp_th: '16+ ปีประสบการณ์',
    exp_en: '16+ Years Experience',
    bg: 'KPMG Advisory, CFA Charterholder',
    photo: null,
    initials: 'NC',
  },
]

export default function Team() {
  const { t, lang } = useLang()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="team" className="py-20 lg:py-28 bg-[#FAF9F6] border-b border-[#E7E4DC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="font-sans text-[11px] font-semibold text-[#765A26] uppercase tracking-[0.2em] block mb-2">
            {t.team.label}
          </span>
          <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-[#0B1528] mt-2 mb-3">
            {t.team.heading}
          </h2>
          <p className="font-sans text-sm text-[#45474D]">
            {t.team.sub}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {executivePartners.map((member, i) => (
            <motion.div
              key={member.name_en}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="bg-white border border-[#E7E4DC] overflow-hidden flex flex-col justify-between hover:border-[#9A7B44] transition-all shadow-xs"
            >
              {/* Photo or Monogram */}
              <div className="bg-[#0B1528] h-48 relative flex items-center justify-center overflow-hidden">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name_en}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full border border-[#9A7B44]/50 bg-[#121B2F] flex items-center justify-center text-[#9A7B44] font-serif text-2xl font-bold">
                    {member.initials}
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-[#0B1528]/80 backdrop-blur-xs px-2 py-0.5 border border-white/10 text-[10px] text-white/90 font-sans uppercase tracking-wider">
                  Partner
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#0B1528] mb-1">
                    {lang === 'th' ? member.name_th : member.name_en}
                  </h3>
                  <div className="font-sans text-[11.5px] font-semibold text-[#765A26] mb-2 leading-snug">
                    {lang === 'th' ? member.title_th : member.title_en}
                  </div>
                  <div className="font-sans text-xs text-[#45474D] mb-3">
                    {lang === 'th' ? member.exp_th : member.exp_en}
                  </div>
                </div>

                <div className="text-[11px] text-[#45474D] border-t border-[#E7E4DC] pt-3 mt-2">
                  <span className="font-bold text-[#0B1528] block mb-0.5">{t.team.prevLabel}</span>
                  <span>{member.bg}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center font-sans text-xs text-[#45474D] mt-12 tracking-wide uppercase"
        >
          {t.team.more}
        </motion.p>
      </div>
    </section>
  )
}
