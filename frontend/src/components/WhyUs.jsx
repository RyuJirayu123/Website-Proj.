import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiShieldCheck, HiLightBulb, HiUserGroup, HiDocumentText } from 'react-icons/hi'

const reasons = [
  {
    icon: HiShieldCheck,
    title: 'น่าเชื่อถือและมีจรรยาบรรณ',
    desc: 'ได้รับใบอนุญาตประกอบธุรกิจหลักทรัพย์จาก ก.ล.ต. และปฏิบัติตามมาตรฐานสากลในทุกธุรกรรม',
  },
  {
    icon: HiLightBulb,
    title: 'คำปรึกษาที่ปรับเฉพาะบุคคล',
    desc: 'ไม่มี One-size-fits-all เราวิเคราะห์สถานการณ์เฉพาะของธุรกิจคุณและออกแบบแนวทางที่เหมาะสมที่สุด',
  },
  {
    icon: HiUserGroup,
    title: 'ทีมผู้เชี่ยวชาญหลายสาขา',
    desc: 'ผู้บริหารและที่ปรึกษาของเราผ่านประสบการณ์จาก Investment Banks ชั้นนำระดับโลก',
  },
  {
    icon: HiDocumentText,
    title: 'เครือข่ายที่กว้างขวาง',
    desc: 'มีพันธมิตรนักลงทุนสถาบัน กองทุน PE/VC และ Strategic Partners ทั้งในและต่างประเทศ',
  },
]

export default function WhyUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="why-us" className="py-24 bg-[#1a2332]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[#c9a96e] font-semibold text-sm uppercase tracking-widest">
            ทำไมต้องเรา
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-5">
            ความแตกต่างที่สร้างผลลัพธ์จริง
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            เราไม่ใช่แค่ที่ปรึกษา — เราคือพันธมิตรที่มีเป้าหมายร่วมกับคุณ
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex gap-5 group"
            >
              <div className="flex-shrink-0 w-14 h-14 bg-[#c9a96e]/10 border border-[#c9a96e]/20 rounded-lg flex items-center justify-center group-hover:bg-[#c9a96e] transition-colors duration-300">
                <r.icon className="text-[#c9a96e] group-hover:text-white text-2xl transition-colors duration-300" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">{r.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 bg-[#c9a96e]/10 border border-[#c9a96e]/20 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <div className="text-white font-bold text-xl mb-1">พร้อมเริ่มต้นแล้วหรือยัง?</div>
            <div className="text-white/60">รับการปรึกษาครั้งแรกฟรี ไม่มีข้อผูกมัด</div>
          </div>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#c9a96e] hover:bg-[#a88b4a] text-white px-8 py-3.5 rounded font-semibold whitespace-nowrap transition-colors"
          >
            ขอนัดหมาย
          </button>
        </motion.div>
      </div>
    </section>
  )
}
