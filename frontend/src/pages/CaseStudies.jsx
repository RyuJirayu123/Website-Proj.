import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { API_URL } from '../api'

export default function CaseStudies() {
  const { lang } = useLang()
  const [cases, setCases] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSector, setSelectedSector] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  useEffect(() => {
    fetch(`${API_URL}/api/cases`)
      .then((res) => res.json())
      .then((data) => {
        setCases(data.data || data || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const sectorFilters = [
    { id: 'all', label_th: 'All Sectors (ทุกกลุ่ม)', label_en: 'All Sectors' },
    { id: 'Retail', label_th: 'Retail & Consumer', label_en: 'Retail & Consumer' },
    { id: 'Technology', label_th: 'Technology & SaaS', label_en: 'Technology & SaaS' },
    { id: 'Energy', label_th: 'Renewable Energy & Utilities', label_en: 'Renewable Energy' },
    { id: 'Infrastructure', label_th: 'Logistics & Infrastructure', label_en: 'Logistics & Infra' },
  ]

  const filteredCases = cases.filter((item) => {
    const matchSector =
      selectedSector === 'all' ||
      (item.sector && item.sector.toLowerCase().includes(selectedSector.toLowerCase()))
    return matchSector
  })

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#070E1B]">
      {/* Sovereign Monumental Header */}
      <section className="bg-[#0e1626] text-white border-b border-white/10 pt-28 pb-16 md:pb-24">
        <div className="max-w-[1360px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#B89758]" />
                <span className="font-sans text-[11px] uppercase tracking-[0.24em] text-[#B89758] font-semibold">
                  Institutional Credentials &amp; Tombstone Gallery
                </span>
                <span className="text-white/30 text-[12px]">|</span>
                <span className="text-white/60 text-[12px] tracking-widest uppercase">SEC Thailand Licensed</span>
              </div>

              <div>
                <h1 className="font-serif text-[40px] sm:text-[54px] lg:text-[62px] font-normal leading-[1.08] tracking-[-0.02em] text-white">
                  Advisory Credentials <br />
                  <span className="font-serif italic font-normal text-[#B89758]">&amp; Verified Mandates</span>
                </h1>
                <p className="font-serif text-[20px] text-white/80 font-normal mt-3">
                  {lang === 'th'
                    ? 'กรณีศึกษาและธุรกรรมความสำเร็จระดับสถาบันที่ผ่านการคัดสรร'
                    : 'Curated Institutional Mandates & Landmark Advisory Transactions'}
                </p>
              </div>

              <p className="font-sans text-[15px] text-white/70 max-w-2xl leading-relaxed">
                {lang === 'th'
                  ? 'Apex Capital Advisory Group ให้บริการเป็นที่ปรึกษาทางการเงินระดับคณะกรรมการบริหาร การทำธุรกรรม M&A การระดมทุนขนาดใหญ่ และการปรับโครงสร้างทุนสำหรับองค์กรชั้นนำทั้งในและต่างประเทศ'
                  : 'Apex Capital Advisory Group provides board-level M&A transaction execution, cross-border syndicate structuring, and recapitalization advisory for prominent institutional entities across Southeast Asia.'}
              </p>
            </div>

            <div className="lg:col-span-4 border-l border-white/15 pl-6 lg:pl-8 space-y-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B89758]">
                Confidentiality Protocol
              </div>
              <p className="text-[13px] text-white/70 leading-relaxed">
                Every mandate is executed under institutional non-disclosure covenants. Select counterparty designations have been abstracted in accordance with regulatory filing statutes.
              </p>
              <div className="pt-2 text-[12px] text-white/50 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#B89758]">shield</span>
                Dual-layer SEC Thailand Compliance Cleared
              </div>
            </div>
          </div>

          {/* Architectural Statistics Bar */}
          <div className="mt-14 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="border-l border-[#B89758]/40 pl-5">
              <div className="font-serif text-[36px] md:text-[44px] font-medium leading-none text-white tracking-tight">
                ฿48.5B<span className="text-[#B89758] text-[26px] font-light">+</span>
              </div>
              <div className="font-sans text-[11px] uppercase tracking-[0.16em] text-[#B89758] mt-2 font-semibold">
                Aggregate Deal Value
              </div>
              <div className="text-[12px] text-white/50 mt-0.5">มูลค่าธุรกรรมรวมที่ปรึกษา</div>
            </div>

            <div className="border-l border-white/20 pl-5">
              <div className="font-serif text-[36px] md:text-[44px] font-medium leading-none text-white tracking-tight">
                42<span className="text-white/50 text-[26px] font-light">+</span>
              </div>
              <div className="font-sans text-[11px] uppercase tracking-[0.16em] text-white/70 mt-2 font-semibold">
                Landmark Mandates
              </div>
              <div className="text-[12px] text-white/50 mt-0.5">ธุรกรรมปิดสำเร็จระดับสถาบัน</div>
            </div>

            <div className="border-l border-[#B89758]/40 pl-5">
              <div className="font-serif text-[36px] md:text-[44px] font-medium leading-none text-white tracking-tight">
                98.2<span className="text-[#B89758] text-[26px] font-light">%</span>
              </div>
              <div className="font-sans text-[11px] uppercase tracking-[0.16em] text-[#B89758] mt-2 font-semibold">
                Mandate Completion
              </div>
              <div className="text-[12px] text-white/50 mt-0.5">อัตราความสำเร็จตามเป้าหมาย</div>
            </div>

            <div className="border-l border-white/20 pl-5">
              <div className="font-serif text-[36px] md:text-[44px] font-medium leading-none text-white tracking-tight">
                20<span className="text-white/50 text-[26px] font-light"> Yrs</span>
              </div>
              <div className="font-sans text-[11px] uppercase tracking-[0.16em] text-white/70 mt-2 font-semibold">
                Capital Market Track Record
              </div>
              <div className="text-[12px] text-white/50 mt-0.5">ประสบการณ์นำพาบอร์ดบริหาร</div>
            </div>
          </div>
        </div>
      </section>

      {/* Understated Filter Controller */}
      <section className="sticky top-20 z-30 bg-white border-b border-[#E7E4DC] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1360px] mx-auto px-6 md:px-12 py-3.5">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              {sectorFilters.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSector(s.id)}
                  className={`text-[12px] uppercase tracking-[0.12em] px-3 py-1.5 border-b-2 transition-colors ${
                    selectedSector === s.id
                      ? 'border-[#070E1B] text-[#070E1B] font-semibold'
                      : 'border-transparent text-[#5D6574] hover:text-[#070E1B] font-medium'
                  }`}
                >
                  {lang === 'th' ? s.label_th : s.label_en}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between lg:justify-end gap-6 shrink-0 border-t lg:border-t-0 pt-2 lg:pt-0 border-[#E7E4DC]">
              <div className="text-[12px] text-[#5D6574]">
                Showing <span className="font-semibold text-[#070E1B]">{filteredCases.length}</span> verified tombstones
              </div>
              <button
                onClick={() => {
                  setSelectedSector('all')
                  setSelectedType('all')
                }}
                className="text-[11px] uppercase tracking-wider text-[#9A7B44] hover:text-[#070E1B] font-semibold"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-[1360px] mx-auto px-6 md:px-12 py-14 space-y-16">
        {/* Landmark Mandate of Record (Hero Feature Card) */}
        {filteredCases.length > 0 && selectedSector === 'all' && (
          <article className="bg-white border border-[#E7E4DC] shadow-sm">
            <div className="border-b border-[#E7E4DC] bg-[#FAF9F6] px-6 sm:px-10 py-3.5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#9A7B44]" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#070E1B]">
                  Landmark Transaction of Record • {filteredCases[0].deal_year || '2024'}
                </span>
                <span className="text-[#E7E4DC]">|</span>
                <span className="text-[11px] uppercase tracking-widest text-[#5D6574]">
                  Confidential Institutional Counterparty
                </span>
              </div>
              <div className="text-[11px] tracking-[0.16em] uppercase font-bold text-[#9A7B44] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]">verified</span> Officially Settled &amp; Funded
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-[#E7E4DC] bg-[#070E1B]">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80"
                  alt="Transaction Advisory"
                  className="w-full h-full object-cover grayscale-[25%] contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070E1B]/90 via-[#070E1B]/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#B89758] font-semibold">
                    Strategic Investment Mandate
                  </div>
                  <div className="font-serif text-[26px] font-normal leading-tight">
                    {lang === 'th' ? filteredCases[0].title_th : filteredCases[0].title_en}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#9A7B44]">
                      {filteredCases[0].sector || 'Corporate Advisory'} Practice
                    </div>
                    <h2 className="font-serif text-[26px] sm:text-[32px] font-normal leading-snug text-[#070E1B]">
                      {lang === 'th' ? filteredCases[0].title_th : filteredCases[0].title_en}
                    </h2>
                  </div>

                  {/* Transaction Valuation Stamp */}
                  <div className="p-6 bg-[#FAF9F6] border border-[#E7E4DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-[#5D6574] font-semibold">
                        Total Transaction Enterprise Value
                      </div>
                      <div className="font-serif text-[34px] sm:text-[40px] font-normal text-[#070E1B] tracking-tight leading-none mt-1">
                        {filteredCases[0].deal_value || '฿4,200,000,000'}
                      </div>
                      <div className="text-[12px] text-[#9A7B44] font-medium tracking-wide mt-1">
                        Settled in accordance with SEC guidelines
                      </div>
                    </div>
                    <div className="text-left sm:text-right border-t sm:border-t-0 sm:border-l border-[#E7E4DC] pt-3 sm:pt-0 sm:pl-6">
                      <div className="text-[10px] uppercase tracking-[0.16em] text-[#5D6574] font-semibold">
                        Mandate Timeline
                      </div>
                      <div className="font-sans text-[15px] font-semibold text-[#070E1B] mt-0.5">8 Months</div>
                      <div className="text-[11px] text-[#5D6574]">LOI to Financial Close</div>
                    </div>
                  </div>

                  {/* Mandate Outcome */}
                  <div className="p-5 border-l-4 border-[#9A7B44] bg-[#FAF9F6] space-y-1">
                    <div className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#070E1B]">
                      Strategic Outcome &amp; Value Realization
                    </div>
                    <p className="text-[13.5px] text-[#070E1B] leading-relaxed">
                      {lang === 'th' ? filteredCases[0].result_th : filteredCases[0].result_en}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E7E4DC] flex flex-wrap items-center justify-between gap-4 text-[12px] text-[#5D6574]">
                  <div>Settlement Verified • Registered Financial Advisor SEC Thailand</div>
                  <Link
                    to="/#contact"
                    className="text-[#070E1B] hover:text-[#9A7B44] font-semibold uppercase tracking-wider text-[11px] inline-flex items-center gap-1 group"
                  >
                    Request Mandate Consultation{' '}
                    <span className="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Official Tombstone Matrix Title */}
        <div className="pt-6 border-t border-[#E7E4DC] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-[#9A7B44] font-bold">
              Comprehensive Track Record
            </div>
            <h2 className="font-serif text-[30px] md:text-[36px] font-normal text-[#070E1B] mt-1">
              Verified Tombstone Matrix
            </h2>
            <p className="text-[14px] text-[#5D6574]">
              {lang === 'th'
                ? 'บันทึกธุรกรรมและประกาศเกียรติประวัติการให้คำปรึกษาทางการเงินระดับบอร์ดบริหาร'
                : 'Selected investment banking tombstones & fiduciary transactions.'}
            </p>
          </div>
          <div className="text-left md:text-right text-[12px] text-[#5D6574]">
            <div>Institutional Disclosures 2022–2025</div>
            <div className="text-[#9A7B44] font-medium text-[11px] uppercase tracking-wider">
              Executed under strict fiduciary mandates
            </div>
          </div>
        </div>

        {/* 3-Column Authentic Tombstone Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block w-8 h-8 border-4 border-[#9A7B44] border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-[#5D6574] text-xs uppercase tracking-widest">Loading Tombstone Records...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCases.map((deal) => (
              <article
                key={deal.id}
                className="tombstone-card bg-white border border-[#E7E4DC] p-8 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Tombstone Top Stamp */}
                  <div className="text-center pb-4 border-b border-[#E7E4DC]">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-[#5D6574] font-semibold">
                      {deal.sector || 'Advisory Practice'}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.16em] text-[#9A7B44] font-semibold mt-0.5">
                      Year {deal.deal_year || '2023'} • Completed
                    </div>
                  </div>

                  {/* Deal Header */}
                  <div className="text-center space-y-2">
                    <h3 className="font-serif text-[21px] leading-snug text-[#070E1B] font-normal">
                      {lang === 'th' ? deal.title_th : deal.title_en}
                    </h3>
                    <p className="text-[12px] text-[#5D6574] leading-relaxed">
                      {lang === 'th' ? deal.description_th : deal.description_en}
                    </p>
                  </div>

                  {/* Formal Tombstone Box */}
                  <div className="border border-[#E7E4DC] p-4 text-center bg-[#FAF9F6]">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#5D6574] font-semibold">
                      Transaction Mandate Value
                    </div>
                    <div className="font-serif text-[26px] font-normal text-[#070E1B] tracking-tight mt-1">
                      {deal.deal_value || 'Confidential'}
                    </div>
                    <div className="text-[11px] text-[#9A7B44] font-semibold uppercase tracking-wider mt-1">
                      Role: Financial Advisor
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className="text-[12.5px] text-[#5D6574] leading-relaxed border-t border-[#E7E4DC] pt-4">
                    <span className="font-semibold text-[#070E1B]">Outcome: </span>
                    {lang === 'th' ? deal.result_th : deal.result_en}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E7E4DC] flex items-center justify-between text-[11px] uppercase tracking-widest text-[#5D6574]">
                  <span>Verified Mandate</span>
                  <span className="text-[#070E1B] font-semibold">Apex Capital</span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Institutional Advisory Rigor Section */}
        <section className="border border-[#E7E4DC] bg-[#FAF9F6] p-8 md:p-12 space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="text-[11px] uppercase tracking-[0.24em] font-bold text-[#9A7B44]">
              Boardroom Execution Protocol
            </div>
            <h3 className="font-serif text-[28px] md:text-[34px] font-normal text-[#070E1B]">
              Our Institutional Advisory Rigor
            </h3>
            <p className="text-[14px] text-[#5D6574] leading-relaxed">
              ทุกธุรกรรมที่บริหารจัดการโดย Apex Capital ผ่านกระบวนการวิเคราะห์เชิงลึก การสร้างแบบจำลองทางการเงินที่รัดกุม และการปฏิบัติตามหลักเกณฑ์ของหน่วยงานกำกับดูแลอย่างเคร่งครัด
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4 border-t border-[#E7E4DC]">
            <div className="space-y-3 bg-white p-6 border border-[#E7E4DC]">
              <div className="font-serif text-[32px] text-[#9A7B44] font-light">01</div>
              <div className="font-sans text-[13px] uppercase tracking-wider font-semibold text-[#070E1B]">
                Strategic Feasibility &amp; Diligence
              </div>
              <p className="text-[12.5px] text-[#5D6574] leading-relaxed">
                การประเมินศักยภาพเชิงลึก วิจัยเชิงเปรียบเทียบและการวิเคราะห์อุปสรรคทางกฎระเบียบและข้อจำกัดของผู้ถือหุ้น
              </p>
            </div>
            <div className="space-y-3 bg-white p-6 border border-[#E7E4DC]">
              <div className="font-serif text-[32px] text-[#9A7B44] font-light">02</div>
              <div className="font-sans text-[13px] uppercase tracking-wider font-semibold text-[#070E1B]">
                Dynamic Financial Engineering
              </div>
              <p className="text-[12.5px] text-[#5D6574] leading-relaxed">
                จัดทำแบบจำลองกระแสเงินสดเชิงลึก วิเคราะห์ Sensitivity Analysis และออกแบบโครงสร้างเงินทุนและภาษีที่เหมาะสม
              </p>
            </div>
            <div className="space-y-3 bg-white p-6 border border-[#E7E4DC]">
              <div className="font-serif text-[32px] text-[#9A7B44] font-light">03</div>
              <div className="font-sans text-[13px] uppercase tracking-wider font-semibold text-[#070E1B]">
                Bespoke Syndicate Negotiation
              </div>
              <p className="text-[12.5px] text-[#5D6574] leading-relaxed">
                วางกลยุทธ์การเจรจาข้ามพรมแดน คุ้มครองผลประโยชน์เชิงโครงสร้าง จัดหาแหล่งทุนสถาบัน และรักษาความลับระดับสูง
              </p>
            </div>
            <div className="space-y-3 bg-white p-6 border border-[#E7E4DC]">
              <div className="font-serif text-[32px] text-[#9A7B44] font-light">04</div>
              <div className="font-sans text-[13px] uppercase tracking-wider font-semibold text-[#070E1B]">
                Institutional Closing &amp; Settlement
              </div>
              <p className="text-[12.5px] text-[#5D6574] leading-relaxed">
                บริหารจัดการ Financial Close ตรวจสอบสัญญาทางกฎหมายร่วมกับสำนักงานกฎหมายชั้นนำและองค์กรกำกับดูแล
              </p>
            </div>
          </div>
        </section>

        {/* Executive Consultation CTA */}
        <section className="bg-[#0c1524] text-white border border-white/10 p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#B89758]" />
                <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#B89758]">
                  Confidential Board Consultation
                </span>
              </div>
              <h2 className="font-serif text-[32px] sm:text-[42px] font-normal leading-tight text-white">
                มีโครงการหรือธุรกรรมที่ต้องการคำปรึกษาเชิงยุทธศาสตร์?
              </h2>
              <p className="font-serif text-[18px] text-white/80 font-normal">
                สนทนากับทีมวาณิชธนกิจและผู้เชี่ยวชาญการปรับโครงสร้างทุนของเรา เพื่อกำหนดทิศทางความสำเร็จขององค์กรคุณ
              </p>
            </div>
            <div className="lg:col-span-4">
              <Link
                to="/#contact"
                className="block w-full text-center bg-[#9A7B44] hover:bg-[#B89758] text-[#070E1B] font-sans text-[13px] uppercase tracking-[0.14em] font-bold py-4 px-6 transition-colors"
              >
                Schedule Mandate Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
