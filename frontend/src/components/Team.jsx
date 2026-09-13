import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const team = [
  {
    name: 'ดร. สมชาย วงศ์สุวรรณ',
    title: 'ประธานกรรมการบริหาร',
    exp: '25 ปีประสบการณ์',
    bg: 'Goldman Sachs, ธนาคารแห่งประเทศไทย',
    initials: 'สว',
  },
  {
    name: 'คุณพิมพ์ใจ รัตนากร',
    title: 'กรรมการผู้จัดการ – M&A',
    exp: '18 ปีประสบการณ์',
    bg: 'Morgan Stanley, Lazard',
    initials: 'พร',
  },
  {
    name: 'คุณวรพล ธนาชัย',
    title: 'หัวหน้าฝ่าย Capital Markets',
    exp: '15 ปีประสบการณ์',
    bg: 'Credit Suisse, SCB Securities',
    initials: 'วธ',
  },
  {
    name: 'คุณนภัสสร เจริญกุล',
    title: 'หัวหน้าฝ่าย Valuation',
    exp: '12 ปีประสบการณ์',
    bg: 'KPMG Advisory, Deloitte',
    initials: 'นจ',
  },
]

export default function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="team" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#c9a96e] font-semibold text-sm uppercase tracking-widest">
            ทีมงานของเรา
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2332] mt-3 mb-5">
            ผู้เชี่ยวชาญระดับแนวหน้า
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            ทีมของเราประกอบด้วยผู้บริหารที่มีประสบการณ์จากสถาบันการเงินชั้นนำทั่วโลก
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              {/* Avatar */}
              <div className="bg-[#1a2332] h-40 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-white font-bold text-2xl">
                  {member.initials}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-bold text-[#1a2332] text-base mb-0.5 group-hover:text-[#c9a96e] transition-colors">
                  {member.name}
                </h3>
                <div className="text-[#c9a96e] text-sm font-medium mb-2">{member.title}</div>
                <div className="text-gray-500 text-xs mb-1">{member.exp}</div>
                <div className="text-gray-400 text-xs border-t border-gray-100 pt-3 mt-3">
                  Previously: {member.bg}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-gray-500 mt-10 text-sm"
        >
          และทีมผู้เชี่ยวชาญอีกกว่า 30 ท่าน พร้อมให้บริการคุณ
        </motion.p>
      </div>
    </section>
  )
}
