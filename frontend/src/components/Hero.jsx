import { motion } from 'framer-motion'
import { HiArrowRight, HiPhone } from 'react-icons/hi'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a1f44 0%, #0d2a5e 50%, #0a1f44 100%)',
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#d4a017]" />

      {/* Floating shapes */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#d4a017]/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-[#d4a017]/20 text-[#d4a017] text-sm font-semibold px-4 py-1.5 rounded-full border border-[#d4a017]/30 mb-6">
            Corporate Financial Advisory
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          ที่ปรึกษาการเงิน
          <br />
          <span className="text-[#d4a017]">ระดับองค์กร</span>
          <br />
          ที่คุณไว้วางใจได้
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          เราช่วยองค์กรของคุณตัดสินใจทางการเงินอย่างชาญฉลาด
          ด้วยประสบการณ์กว่า 20 ปีในตลาดทุนไทยและระดับนานาชาติ
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 bg-[#d4a017] hover:bg-[#b8860b] text-white px-8 py-4 rounded font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-[#d4a017]/30"
          >
            ติดต่อที่ปรึกษา
            <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 border border-white/30 hover:border-[#d4a017] text-white hover:text-[#d4a017] px-8 py-4 rounded font-semibold text-base transition-all duration-200"
          >
            <HiPhone />
            ดูบริการของเรา
          </button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-3 gap-6 max-w-2xl mx-auto border-t border-white/10 pt-10"
        >
          {[
            { value: '20+', label: 'ปีประสบการณ์' },
            { value: '500+', label: 'ลูกค้าองค์กร' },
            { value: '฿200B+', label: 'มูลค่าดีลที่ปิด' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#d4a017]">{item.value}</div>
              <div className="text-white/60 text-sm mt-1">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/40 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
