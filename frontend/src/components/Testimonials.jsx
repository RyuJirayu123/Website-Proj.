import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { useLang } from '../context/LanguageContext'

const testimonials = [
  {
    name_th: 'คุณอนันต์ ศิริวัฒน์',
    name_en: 'Anan Siriwat',
    title_th: 'Chief Executive Officer, บมจ. สยาม คอนโซลิเดทเท็ด โฮลดิ้ง',
    title_en: 'CEO, Siam Consolidated Holdings PLC',
    text_th: '“Apex Capital ช่วยให้เราปิดดีล M&A ข้ามพรมแดนที่ซับซ้อนได้สำเร็จภายใต้กรอบเวลาที่เข้มงวด ทีมพาร์ทเนอร์มีความเชี่ยวชาญสูงในการเจรจาและการวางโครงสร้างธุรกรรมที่ปกป้องมูลค่าผู้ถือหุ้นเดิมได้อย่างยอดเยี่ยม”',
    text_en: '“Apex Capital enabled us to successfully execute a highly complex cross-border M&A under strict timelines. Their partner-led negotiation and transaction structuring safeguarded shareholder value impeccably.”',
  },
  {
    name_th: 'คุณสิรินทร์ มหาวงศ์',
    name_en: 'Sirin Mahawong',
    title_th: 'Chief Financial Officer, บมจ. โลจิสเทค อินโนเวชั่นส์',
    title_en: 'CFO, Logistech Innovations PLC',
    text_th: '“เรามอบหมายให้ Apex Capital เป็นที่ปรึกษาทางการเงินในการเตรียมความพร้อมเข้าจดทะเบียนในตลาดหลักทรัพย์ ทีมงานดูแลและวางระบบการควบคุมภายในตลอดจน Equity Story อย่างยอดเยี่ยม ส่งผลให้ยอดจองซื้อหุ้น IPO ล้นหลาม”',
    text_en: '“Apex Capital served as our lead financial advisor for our public listing. Their strategic guidance on institutional equity positioning resulted in exceptional oversubscription.”',
  },
  {
    name_th: 'คุณวิทยา จิตรสุนทร',
    name_en: 'Wittaya Jitsunthorn',
    title_th: 'Managing Partner, Southeast Asia Private Equity Fund',
    text_th: '“รายงานความเห็นที่ปรึกษาทางการเงินอิสระ (IFA) และการประเมินมูลค่ากิจการของ Apex Capital มีความแม่นยำ เป็นกลาง และได้รับความเชื่อถือจากคณะกรรมการบริษัทและผู้ลงทุนสถาบันอย่างไม่มีข้อกังขา”',
    text_en: '“The independent financial advisory and statutory valuation reports by Apex Capital are rigorous, unbiased, and universally respected by institutional boards.”',
  },
]

export default function Testimonials() {
  const { t, lang } = useLang()
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  const item = testimonials[current]

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#FAF9F6] border-b border-[#E7E4DC]">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="font-sans text-[11px] font-semibold text-[#765A26] uppercase tracking-[0.2em] block mb-2">
            {t.testimonials.label}
          </span>
          <h2 className="font-serif text-[32px] sm:text-[38px] font-bold text-[#0B1528] mt-1">
            {t.testimonials.heading}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative"
        >
          {/* Institutional Quote Card */}
          <div className="bg-white border border-[#E7E4DC] p-8 sm:p-12 relative shadow-xs min-h-[260px] flex flex-col justify-between">
            <div className="font-serif text-7xl text-[#9A7B44]/20 absolute top-4 left-6 select-none leading-none">
              “
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 flex-1 flex flex-col justify-between"
              >
                <p className="font-serif text-lg sm:text-[21px] text-[#0B1528] leading-relaxed text-center max-w-3xl mx-auto italic mb-8">
                  {lang === 'th' ? item.text_th : item.text_en}
                </p>

                <div className="text-center border-t border-[#E7E4DC] pt-5">
                  <div className="font-serif text-base sm:text-lg font-bold text-[#0B1528]">
                    {lang === 'th' ? item.name_th : item.name_en}
                  </div>
                  <div className="font-sans text-xs text-[#765A26] uppercase tracking-wider font-semibold mt-0.5">
                    {lang === 'th' ? item.title_th : item.title_en}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 border border-[#E7E4DC] hover:border-[#9A7B44] bg-white flex items-center justify-center text-[#0B1528] hover:text-[#765A26] transition-colors shadow-2xs"
            >
              <HiChevronLeft className="text-xl" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 transition-all ${
                    i === current ? 'w-8 bg-[#765A26]' : 'w-2 bg-[#E7E4DC]'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 border border-[#E7E4DC] hover:border-[#9A7B44] bg-white flex items-center justify-center text-[#0B1528] hover:text-[#765A26] transition-colors shadow-2xs"
            >
              <HiChevronRight className="text-xl" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
