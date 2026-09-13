import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiCheckCircle } from 'react-icons/hi'

const highlights = [
  'ที่ปรึกษาที่ได้รับใบอนุญาตจาก ก.ล.ต.',
  'ประสบการณ์ในตลาดทุนมากกว่า 20 ปี',
  'เชี่ยวชาญทั้งตลาดในและต่างประเทศ',
  'ทีมงานผู้เชี่ยวชาญเฉพาะทางทุกด้าน',
]

function AnimatedSection({ children }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left – visual */}
          <AnimatedSection>
            <div className="relative">
              <div className="bg-[#0a1f44] rounded-2xl p-10 text-white">
                <div className="text-[#d4a017] text-5xl font-bold mb-2">20+</div>
                <div className="text-white/70 mb-8">ปีแห่งความไว้วางใจ</div>

                <div className="space-y-4">
                  {[
                    { label: 'ดีล M&A ที่ปิดสำเร็จ', value: '120+ รายการ' },
                    { label: 'การระดมทุนสำเร็จ', value: '฿80B+ บาท' },
                    { label: 'บริษัทที่เข้าจดทะเบียน', value: '45+ บริษัท' },
                    { label: 'ความพึงพอใจลูกค้า', value: '98%' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between border-b border-white/10 pb-3">
                      <span className="text-white/70 text-sm">{item.label}</span>
                      <span className="text-[#d4a017] font-semibold text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative card */}
              <div className="absolute -bottom-6 -right-6 bg-[#d4a017] rounded-xl p-5 shadow-xl">
                <div className="text-white text-2xl font-bold">AAA</div>
                <div className="text-white/80 text-xs mt-1">Credit Rating</div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right – text */}
          <AnimatedSection>
            <div>
              <span className="text-[#d4a017] font-semibold text-sm uppercase tracking-widest">
                เกี่ยวกับเรา
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mt-3 mb-6 leading-tight">
                พันธมิตรทางการเงิน
                <br />
                ที่คุณเลือกไว้วางใจได้
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Alpha Capital Advisory คือบริษัทที่ปรึกษาทางการเงินองค์กรชั้นนำ
                ที่ให้บริการครบวงจรแก่บริษัทมหาชน บริษัทเอกชนขนาดใหญ่
                และผู้ลงทุนสถาบัน ตั้งแต่ปี 2548
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                เราเชื่อว่าการตัดสินใจทางการเงินที่ดีคือรากฐานของการเติบโตที่ยั่งยืน
                ทีมผู้เชี่ยวชาญของเราพร้อมให้คำปรึกษาเชิงลึกด้วยข้อมูลจริงและกลยุทธ์ที่ปรับแต่งเฉพาะสำหรับธุรกิจคุณ
              </p>

              <ul className="space-y-3">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <HiCheckCircle className="text-[#d4a017] text-xl flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-8 inline-flex items-center gap-2 bg-[#0a1f44] hover:bg-[#103578] text-white px-7 py-3 rounded font-semibold transition-colors"
              >
                ดูบริการทั้งหมด
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
