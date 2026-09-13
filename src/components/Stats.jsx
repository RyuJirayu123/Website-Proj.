import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { motion } from 'framer-motion'

const stats = [
  { value: 500, suffix: '+', label: 'ลูกค้าองค์กร', sub: 'ทั่วเอเชียตะวันออกเฉียงใต้' },
  { value: 200, suffix: 'B+', prefix: '฿', label: 'มูลค่าดีลสะสม', sub: 'ตลอด 20 ปีที่ผ่านมา' },
  { value: 120, suffix: '+', label: 'ดีล M&A', sub: 'ปิดสำเร็จแล้ว' },
  { value: 98, suffix: '%', label: 'ความพึงพอใจ', sub: 'จากการสำรวจลูกค้า' },
]

function CountUp({ target, suffix, prefix, isInView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span>
      {prefix}{count}{suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-[#d4a017] font-semibold text-sm uppercase tracking-widest">
            ตัวเลขที่พิสูจน์ตัวเอง
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mt-3">
            ผลงานที่ผ่านมาของเรา
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-gray-50 rounded-2xl p-7 text-center border border-gray-100 hover:border-[#d4a017]/30 hover:shadow-lg transition-all"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#d4a017] mb-2">
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix || ''}
                  isInView={isInView}
                />
              </div>
              <div className="text-[#0a1f44] font-semibold text-base mb-1">{stat.label}</div>
              <div className="text-gray-500 text-xs">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
