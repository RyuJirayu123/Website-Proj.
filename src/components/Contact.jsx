import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiPhone, HiMail, HiLocationMarker, HiClock } from 'react-icons/hi'

const info = [
  { icon: HiPhone, label: 'โทรศัพท์', value: '02-xxx-xxxx', href: 'tel:02xxxxxxxx' },
  { icon: HiMail, label: 'อีเมล', value: 'info@alphacapital.th', href: 'mailto:info@alphacapital.th' },
  { icon: HiLocationMarker, label: 'ที่อยู่', value: 'อาคาร XYZ ชั้น 20 ถนนสีลม กรุงเทพฯ 10500' },
  { icon: HiClock, label: 'เวลาทำการ', value: 'จันทร์ – ศุกร์ 08:30 – 17:30 น.' },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const [formData, setFormData] = useState({
    name: '', company: '', phone: '', email: '', service: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#d4a017] font-semibold text-sm uppercase tracking-widest">
            ติดต่อเรา
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mt-3 mb-5">
            เริ่มต้นการพูดคุย
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            กรอกข้อมูลด้านล่าง ทีมงานของเราจะติดต่อกลับภายใน 24 ชั่วโมง
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-[#0a1f44] rounded-2xl p-8 text-white">
              <h3 className="font-bold text-xl mb-6">ข้อมูลติดต่อ</h3>
              <div className="space-y-5">
                {info.map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="w-10 h-10 bg-[#d4a017]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-[#d4a017] text-lg" />
                    </div>
                    <div>
                      <div className="text-white/50 text-xs mb-0.5">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-white text-sm hover:text-[#d4a017] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-white text-sm">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#d4a017] rounded-2xl p-8 text-white">
              <h3 className="font-bold text-lg mb-2">การปรึกษาครั้งแรก</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                เราเสนอการปรึกษาเบื้องต้นฟรี 60 นาที เพื่อประเมินความต้องการของธุรกิจคุณและแนะนำแนวทางที่เหมาะสมที่สุด
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="bg-white rounded-2xl p-10 shadow-sm text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-500 text-3xl">✓</span>
                </div>
                <h3 className="text-[#0a1f44] font-bold text-xl mb-2">ส่งข้อมูลเรียบร้อยแล้ว!</h3>
                <p className="text-gray-500 text-sm">ทีมงานของเราจะติดต่อกลับภายใน 24 ชั่วโมง</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 shadow-sm space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">ชื่อ-นามสกุล *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#d4a017] transition-colors"
                      placeholder="กรอกชื่อของคุณ"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">บริษัท</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#d4a017] transition-colors"
                      placeholder="ชื่อบริษัท"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">อีเมล *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#d4a017] transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">เบอร์โทรศัพท์</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#d4a017] transition-colors"
                      placeholder="08x-xxx-xxxx"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">บริการที่สนใจ</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#d4a017] transition-colors bg-white"
                  >
                    <option value="">เลือกบริการ</option>
                    <option>M&A Advisory</option>
                    <option>การระดมทุน / IPO</option>
                    <option>Valuation & Due Diligence</option>
                    <option>กลยุทธ์องค์กร</option>
                    <option>Restructuring</option>
                    <option>Cross-Border Advisory</option>
                    <option>อื่นๆ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">รายละเอียดเพิ่มเติม</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#d4a017] transition-colors resize-none"
                    placeholder="บอกเราเกี่ยวกับโครงการหรือความต้องการของคุณ..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0a1f44] hover:bg-[#103578] text-white py-3.5 rounded-lg font-semibold text-sm transition-colors"
                >
                  ส่งข้อความ →
                </button>

                <p className="text-gray-400 text-xs text-center">
                  ข้อมูลของคุณจะถูกเก็บเป็นความลับและไม่ถูกเผยแพร่
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
