import { motion } from 'framer-motion'
import { HiArrowRight, HiPhone } from 'react-icons/hi'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a2332]"
    >
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#c9a96e]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block bg-[#c9a96e]/10 text-[#c9a96e] text-sm font-semibold px-4 py-1.5 rounded-full border border-[#c9a96e]/20 mb-6">
            Corporate Financial Advisory
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          ที่ปรึกษาการเงิน
          <br />
          <span className="text-[#c9a96e]">ระดับองค์กร</span>
          <br />
          ที่คุณไว้วางใจได้
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          เราช่วยองค์กรของคุณตัดสินใจทางการเงินอย่างชาญฉลาด
          ด้วยประสบการณ์กว่า 20 ปีในตลาดทุนไทยและระดับนานาชาติ
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center justify-center gap-2 bg-[#c9a96e] hover:bg-[#a88b4a] text-white px-8 py-4 rounded-lg font-semibold text-base transition-colors duration-200"
          >
            ติดต่อที่ปรึกษา
            <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-[#c9a96e] text-white hover:text-[#c9a96e] px-8 py-4 rounded-lg font-semibold text-base transition-colors duration-200"
          >
            <HiPhone />
            ดูบริการของเรา
          </button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 grid grid-cols-3 gap-6 max-w-2xl mx-auto border-t border-white/10 pt-10"
        >
          {[
            { value: '20+', label: 'ปีประสบการณ์' },
            { value: '500+', label: 'ลูกค้าองค์กร' },
            { value: '฿200B+', label: 'มูลค่าดีลที่ปิด' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#c9a96e]">{item.value}</div>
              <div className="text-white/60 text-sm mt-1">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40"
      >
        <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-1 h-2.5 bg-white/60 rounded-full"
          />
        </div>
      </motion.div>

      {/* Subtle horizontal line separator near bottom */}
      <div className="absolute bottom-0 left-0 right-0 border-b border-white/10" />
    </section>
  )
}
