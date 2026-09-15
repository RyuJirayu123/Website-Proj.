import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../context/LanguageContext'
import { API_URL } from '../api'

export default function Contact() {
  const { t, lang } = useLang()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'เกิดข้อผิดพลาดในการส่งข้อมูล')
      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      className="w-full bg-[#0B1528] text-white py-20 lg:py-28 relative overflow-hidden border-b border-[#1E2B45]"
    >
      {/* Architectural Background Pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg className="w-full h-full" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern height="40" id="grid-pattern-contact" patternUnits="userSpaceOnUse" width="40">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect fill="url(#grid-pattern-contact)" height="100%" width="100%" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Banner Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="font-sans text-[11px] font-semibold text-[#9A7B44] uppercase tracking-[0.2em] block mb-2">
            {t.contact.label}
          </span>
          <h2 className="font-serif text-[32px] sm:text-[42px] font-bold text-white leading-tight">
            {t.contact.heading}
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-300 mt-4 leading-relaxed max-w-2xl mx-auto">
            {t.contact.sub}
          </p>
        </motion.div>

        {/* Contact Container */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Headquarters & Terminal Metadata */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 bg-[#121B2F] border border-[#1E2B45] p-8 space-y-6"
          >
            <div>
              <span className="font-sans text-[10.5px] font-bold text-[#9A7B44] uppercase tracking-wider block mb-1">
                {t.contact.infoHeading}
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                Apex Capital Advisory Group
              </h3>
            </div>

            <div className="space-y-4 font-sans text-xs sm:text-[13px] text-slate-300 border-t border-white/10 pt-4">
              <div>
                <span className="font-bold text-white uppercase text-[11px] tracking-wider block mb-1">
                  Bangkok Headquarters
                </span>
                <p>Gaysorn Tower, Floor 28, 127 Ratchadamri Rd, Bangkok 10330</p>
              </div>

              <div>
                <span className="font-bold text-white uppercase text-[11px] tracking-wider block mb-1">
                  Regional Hubs
                </span>
                <p>Singapore • Marina Bay Financial Centre, Tower 2</p>
                <p className="mt-0.5">London • 100 Bishopsgate, Level 19</p>
              </div>

              <div>
                <span className="font-bold text-white uppercase text-[11px] tracking-wider block mb-1">
                  Mandate Hotline
                </span>
                <p className="text-[#9A7B44] font-semibold text-sm">+66 2 088 7900</p>
                <p className="text-slate-400 text-xs">Direct to Partner Desk: mandates@apexcapital.co.th</p>
              </div>

              <div>
                <span className="font-bold text-[#9A7B44] uppercase text-[11px] tracking-wider block mb-1">
                  Institutional Terminals
                </span>
                <p className="font-mono text-xs text-white">Bloomberg: APEX &lt;GO&gt; | Refinitiv: APEXCAP</p>
              </div>
            </div>

            <div className="bg-[#0B1528] p-4 border border-[#9A7B44]/30">
              <span className="font-sans text-[10.5px] font-bold text-[#9A7B44] uppercase tracking-wider block mb-1">
                {t.contact.freeLabel}
              </span>
              <p className="font-sans text-xs text-slate-300 leading-relaxed">
                {t.contact.freeDesc}
              </p>
            </div>
          </motion.div>

          {/* Right: Confidential Mandate Intake Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 bg-white text-[#0B1528] p-8 sm:p-10 border border-[#E7E4DC] shadow-xl"
          >
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-[32px]">check_circle</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0B1528]">
                  {t.contact.successTitle}
                </h3>
                <p className="font-sans text-sm text-[#45474D] max-w-md mx-auto leading-relaxed">
                  {t.contact.successSub}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: '', company: '', phone: '', email: '', service: '', message: '' })
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#0B1528] text-white font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#1E2B45] transition-colors"
                >
                  ส่งข้อมูลเพิ่มเติม
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                {error && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs border border-red-200">
                    {error}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#0B1528] font-bold uppercase tracking-wider mb-1.5 text-[11px]">
                      {t.contact.nameLabel}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.contact.namePlaceholder}
                      className="w-full px-3.5 py-2.5 bg-[#F4F3F1] border border-[#E7E4DC] text-sm text-[#0B1528] placeholder-[#76777D] focus:outline-none focus:border-[#765A26] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[#0B1528] font-bold uppercase tracking-wider mb-1.5 text-[11px]">
                      {t.contact.companyLabel}
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t.contact.companyPlaceholder}
                      className="w-full px-3.5 py-2.5 bg-[#F4F3F1] border border-[#E7E4DC] text-sm text-[#0B1528] placeholder-[#76777D] focus:outline-none focus:border-[#765A26] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#0B1528] font-bold uppercase tracking-wider mb-1.5 text-[11px]">
                      {t.contact.emailLabel}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.contact.emailPlaceholder}
                      className="w-full px-3.5 py-2.5 bg-[#F4F3F1] border border-[#E7E4DC] text-sm text-[#0B1528] placeholder-[#76777D] focus:outline-none focus:border-[#765A26] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[#0B1528] font-bold uppercase tracking-wider mb-1.5 text-[11px]">
                      {t.contact.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t.contact.phonePlaceholder}
                      className="w-full px-3.5 py-2.5 bg-[#F4F3F1] border border-[#E7E4DC] text-sm text-[#0B1528] placeholder-[#76777D] focus:outline-none focus:border-[#765A26] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#0B1528] font-bold uppercase tracking-wider mb-1.5 text-[11px]">
                    {t.contact.serviceLabel}
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-[#F4F3F1] border border-[#E7E4DC] text-sm text-[#0B1528] focus:outline-none focus:border-[#765A26] focus:bg-white"
                  >
                    <option value="">{t.contact.servicePlaceholder}</option>
                    {t.contact.serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#0B1528] font-bold uppercase tracking-wider mb-1.5 text-[11px]">
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full px-3.5 py-2.5 bg-[#F4F3F1] border border-[#E7E4DC] text-sm text-[#0B1528] placeholder-[#76777D] focus:outline-none focus:border-[#765A26] focus:bg-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-[#765A26] hover:bg-[#5B4210] text-white font-sans text-xs font-bold uppercase tracking-[0.14em] transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <span>{loading ? t.contact.submitting : t.contact.submit}</span>
                    {!loading && <span className="material-symbols-outlined text-[16px]">arrow_forward</span>}
                  </button>
                  <p className="font-sans text-[10.5px] text-[#45474D] text-center mt-2.5">
                    {t.contact.privacy}
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        {/* Trust Badges & Contact Numbers Footer Strip */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-[11px] text-slate-300 uppercase tracking-wider font-sans">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9A7B44] text-[18px]">phone_in_talk</span>
            <span>สายด่วนฝ่ายวาณิชธนกิจ: +66 2 088 7900</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9A7B44] text-[18px]">verified</span>
            <span>กำกับดูแลตาม พ.ร.บ. หลักทรัพย์และตลาดหลักทรัพย์ พ.ศ. 2535</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9A7B44] text-[18px]">security</span>
            <span>Standard Fiduciary NDA Protected</span>
          </div>
        </div>
      </div>
    </section>
  )
}
