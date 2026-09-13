import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  HiTrendingUp, HiCurrencyDollar, HiOfficeBuilding,
  HiChartBar, HiRefresh, HiGlobe
} from 'react-icons/hi'

const services = [
  {
    icon: HiTrendingUp,
    title: 'M&A Advisory',
    desc: 'ให้คำปรึกษาการควบรวมและซื้อกิจการ ทั้งฝั่งผู้ซื้อและผู้ขาย ด้วยกระบวนการที่รัดกุมและเครือข่ายนักลงทุนที่กว้างขวาง',
  },
  {
    icon: HiCurrencyDollar,
    title: 'การระดมทุน',
    desc: 'ออกแบบโครงสร้างการระดมทุนที่เหมาะสม ไม่ว่าจะเป็น IPO, PP, Rights Offering หรือ Bond Issuance',
  },
  {
    icon: HiOfficeBuilding,
    title: 'Valuation & Due Diligence',
    desc: 'ประเมินมูลค่ากิจการด้วยมาตรฐานสากล พร้อม Due Diligence รอบด้านทั้ง Financial, Legal และ Business',
  },
  {
    icon: HiChartBar,
    title: 'กลยุทธ์องค์กร',
    desc: 'วางแผนกลยุทธ์การเติบโต การขยายธุรกิจ และการปรับโครงสร้างองค์กรให้พร้อมรับการเปลี่ยนแปลง',
  },
  {
    icon: HiRefresh,
    title: 'Restructuring',
    desc: 'ปรับโครงสร้างทางการเงินและหนี้สิน เพื่อฟื้นฟูสภาพคล่องและเพิ่มความสามารถในการแข่งขัน',
  },
  {
    icon: HiGlobe,
    title: 'Cross-Border Advisory',
    desc: 'ให้คำปรึกษาธุรกรรมข้ามพรมแดน ด้วยเครือข่ายพันธมิตรนานาชาติในเอเชีย ยุโรป และสหรัฐอเมริกา',
  },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[#c9a96e] font-semibold text-sm uppercase tracking-widest">
            บริการของเรา
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2332] mt-3 mb-5">
            บริการที่ปรึกษาครบวงจร
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            เราให้บริการที่ปรึกษาทางการเงินอย่างครอบคลุม
            ออกแบบมาเพื่อตอบโจทย์ธุรกิจในทุกขั้นตอน
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group bg-white rounded-lg p-7 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-[#c9a96e]/40 cursor-default"
            >
              <div className="inline-flex p-3 rounded-lg bg-[#1a2332] text-white mb-5">
                <service.icon className="text-2xl" />
              </div>
              <h3 className="text-[#1a2332] font-bold text-lg mb-3 group-hover:text-[#c9a96e] transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#1a2332] hover:bg-[#2d3748] text-white px-8 py-3.5 rounded font-semibold transition-colors"
          >
            ปรึกษาผู้เชี่ยวชาญฟรี
          </button>
        </motion.div>
      </div>
    </section>
  )
}
