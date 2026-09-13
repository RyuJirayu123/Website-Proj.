import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { HiChevronLeft, HiChevronRight, HiStar } from 'react-icons/hi'

const testimonials = [
  {
    name: 'คุณอนันต์ ศิริวัฒน์',
    title: 'CEO, บมจ. ไทยโฮลดิ้ง กรุ๊ป',
    text: 'Alpha Capital ช่วยให้เราปิดดีล M&A ที่ซับซ้อนได้สำเร็จในเวลาที่กระชั้นชิด ทีมงานมีความเชี่ยวชาญสูงและให้คำปรึกษาที่ตรงประเด็นมาก',
  },
  {
    name: 'คุณสิรินทร์ มหาวงศ์',
    title: 'CFO, บมจ. เอเชีย เทคโนโลยี',
    text: 'เราเลือก Alpha Capital สำหรับการทำ IPO ทีมงานดูแลทุกขั้นตอนอย่างละเอียด ผลลัพธ์ดีเกินคาด หุ้นได้รับการตอบรับจากนักลงทุนอย่างล้นหลาม',
  },
  {
    name: 'คุณวิทยา จิตรสุนทร',
    title: 'Managing Director, Private Equity Fund',
    text: 'ความสามารถในการวิเคราะห์และ Valuation ของทีม Alpha Capital นั้นยอดเยี่ยมมาก รายงานของพวกเขามีความละเอียดและเชื่อถือได้ เราใช้บริการมา 5 ปีแล้ว',
  },
  {
    name: 'คุณมณีรัตน์ ทองดี',
    title: 'Founder, StartTech Ventures',
    text: 'การระดมทุน Series B ของบริษัทเราประสบความสำเร็จเพราะ Alpha Capital ที่ช่วย connect เราเข้ากับ VCs ระดับนานาชาติ และดูแลการเจรจาทุกขั้นตอน',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#d4a017] font-semibold text-sm uppercase tracking-widest">
            เสียงจากลูกค้า
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mt-3">
            พวกเขาพูดถึงเราอย่างไร
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <HiStar key={i} className="text-[#d4a017] text-2xl" />
            ))}
          </div>

          {/* Testimonial Card */}
          <div className="bg-gray-50 rounded-2xl p-10 relative min-h-[220px]">
            <div className="text-6xl text-[#d4a017]/20 font-serif absolute top-6 left-8">&ldquo;</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-gray-700 text-lg leading-relaxed text-center mb-8 relative z-10">
                  {testimonials[current].text}
                </p>
                <div className="text-center">
                  <div className="inline-block w-12 h-12 rounded-full bg-[#0a1f44] text-white flex items-center justify-center font-bold text-base mx-auto mb-3">
                    {testimonials[current].name.charAt(4)}
                  </div>
                  <div className="font-bold text-[#0a1f44]">{testimonials[current].name}</div>
                  <div className="text-gray-500 text-sm">{testimonials[current].title}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-[#d4a017] flex items-center justify-center text-gray-600 hover:text-[#d4a017] transition-colors"
            >
              <HiChevronLeft className="text-xl" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? 'bg-[#d4a017] w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-[#d4a017] flex items-center justify-center text-gray-600 hover:text-[#d4a017] transition-colors"
            >
              <HiChevronRight className="text-xl" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
