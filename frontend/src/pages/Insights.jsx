import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { API_URL } from '../api'

export default function Insights() {
  const { t, lang } = useLang()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recent')

  useEffect(() => {
    fetch(`${API_URL}/api/posts`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data || data || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const categories = [
    { id: 'all', label_th: 'บทวิเคราะห์ทั้งหมด', label_en: 'All Research Briefs' },
    { id: 'insights', label_th: 'การควบรวมกิจการ (M&A)', label_en: 'Mergers & Acquisitions' },
    { id: 'guide', label_th: 'ตลาดทุนและ IPO', label_en: 'Capital Markets & IPO' },
    { id: 'knowledge', label_th: 'การประเมินมูลค่า (Valuation)', label_en: 'Valuation & Due Diligence' },
    { id: 'general', label_th: 'กลยุทธ์และบรรษัทภิบาล', label_en: 'Corporate Restructuring' },
  ]

  const filteredPosts = posts.filter((post) => {
    const matchCategory = activeCategory === 'all' || post.category === activeCategory
    const title = (lang === 'th' ? post.title_th : post.title_en) || ''
    const excerpt = (lang === 'th' ? post.excerpt_th : post.excerpt_en) || ''
    const matchSearch =
      searchQuery === '' ||
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#070E1B]">
      {/* Masthead Header Banner */}
      <section className="bg-[#070E1B] text-white pt-28 pb-14 border-b border-[#1E2B45] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#1E2B45] gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-3 mb-4">
                <span className="editorial-label text-[#9A7B44] tracking-[0.2em]">
                  {lang === 'th' ? 'งานวิเคราะห์และข้อมูลข่าวกรองระดับสถาบัน' : 'Institutional Research & Intelligence'}
                </span>
                <span className="text-[#8A92A0]">•</span>
                <span className="editorial-label text-[#8A92A0]">Vol. IX — 2025</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] leading-[1.15] font-normal tracking-[-0.02em] text-white">
                {lang === 'th' ? (
                  <>
                    บทวิเคราะห์ยุทธศาสตร์ & <span className="italic font-normal text-[#B89758]">ข้อมูลเชิงลึกตลาดทุน</span>
                  </>
                ) : (
                  <>
                    Financial Insights & <span className="italic font-normal text-[#B89758]">Market Intelligence</span>
                  </>
                )}
              </h1>
              <p className="mt-4 text-[#8A92A0] text-[15px] sm:text-[16px] leading-relaxed max-w-2xl font-normal">
                {lang === 'th'
                  ? 'บทวิเคราะห์ยุทธศาสตร์ตลาดทุน การควบรวมกิจการ (M&A) โครงสร้างหนี้ และการประเมินมูลค่ากิจการเพื่อการตัดสินใจระดับคณะกรรมการบริหาร'
                  : 'Board-level strategic capital market intelligence, M&A trends, debt restructuring, and quantitative corporate valuation briefings.'}
              </p>
            </div>

            {/* Search Input Box */}
            <div className="w-full md:w-80 lg:w-96">
              <label className="block editorial-label text-[#8A92A0] mb-2">
                {lang === 'th' ? 'ค้นหาบทวิเคราะห์' : 'Search Library'}
              </label>
              <div className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === 'th' ? 'ค้นหาตามชื่อ, อุตสาหกรรม, ดีล...' : 'Search insights, deal volume, sector...'}
                  className="w-full bg-[#0B1528] border border-[#1E2B45] text-white placeholder-[#5D6574] text-[13px] px-3.5 py-2.5 focus:outline-none focus:border-[#9A7B44] transition-colors"
                />
                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9A7B44] text-lg pointer-events-none">
                  search
                </span>
              </div>
            </div>
          </div>

          {/* Editorial Category Filter Bar */}
          <div className="flex items-center justify-between pt-5 text-[12px] font-medium uppercase tracking-wider overflow-x-auto scrollbar-none gap-6">
            <div className="flex items-center space-x-6 text-[#8A92A0]">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`pb-2 whitespace-nowrap transition-colors ${
                    activeCategory === cat.id
                      ? 'text-white border-b-2 border-[#9A7B44] font-semibold'
                      : 'hover:text-white border-b-2 border-transparent'
                  }`}
                >
                  {lang === 'th' ? cat.label_th : cat.label_en}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-2 text-[#8A92A0] text-[11px] normal-case shrink-0">
              <span className="editorial-label text-[#9A7B44] mr-1">Trending:</span>
              <span className="hover:text-white underline decoration-[#1E2B45] underline-offset-4 cursor-pointer">
                Cross-Border SEA
              </span>
              <span>•</span>
              <span className="hover:text-white underline decoration-[#1E2B45] underline-offset-4 cursor-pointer">
                SET IPO Readiness
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-[1360px] mx-auto px-6 sm:px-8 py-14">
        {/* Flagship Featured Editorial (Hero Dossier) */}
        {filteredPosts.length > 0 && activeCategory === 'all' && searchQuery === '' && (
          <section className="mb-14">
            <article className="bg-white border border-[#E7E4DC] shadow-[0_4px_24px_rgba(7,14,27,0.06)]">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Visual frame with dark fine-border */}
                <div className="lg:col-span-7 relative bg-[#070E1B] p-4 sm:p-5 border-b lg:border-b-0 lg:border-r border-[#E7E4DC]">
                  <div className="relative w-full h-[300px] sm:h-[380px] lg:h-full min-h-[340px] overflow-hidden border border-[#9A7B44]/30">
                    <img
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                      alt="Corporate Boardroom Advisory"
                      className="w-full h-full object-cover grayscale contrast-125 brightness-90 hover:grayscale-0 transition-all duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070E1B]/95 via-transparent to-transparent" />

                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <span className="bg-[#070E1B]/90 text-[#9A7B44] border border-[#9A7B44]/40 px-2.5 py-1 editorial-label text-[10px]">
                        Flagship Briefing
                      </span>
                      <span className="bg-[#070E1B]/80 text-white/80 border border-white/10 px-2.5 py-1 editorial-label text-[10px]">
                        Special Report
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white/70 text-[11px] flex items-center justify-between border-t border-white/15 pt-2 font-sans">
                      <span>Figure 1.1 — Executive Boardroom Advisory Desk, Bangkok</span>
                      <span className="font-mono text-[10px] text-[#9A7B44]">ISSN 2821-9942</span>
                    </div>
                  </div>
                </div>

                {/* Editorial text panel */}
                <div className="lg:col-span-5 p-7 sm:p-9 lg:p-10 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center justify-between text-[#5D6574] text-[11px] pb-4 border-b border-[#E7E4DC]">
                      <span className="editorial-label text-[#9A7B44] font-semibold">
                        Special Edition M&A Outlook
                      </span>
                      <div className="flex items-center space-x-2 text-[#5D6574]">
                        <span>Q1 2025</span>
                        <span>•</span>
                        <span className="font-medium text-[#070E1B]">6 min read</span>
                      </div>
                    </div>

                    <h2 className="mt-5 font-serif text-2xl sm:text-3xl leading-[1.2] text-[#070E1B] font-normal hover:text-[#9A7B44] transition-colors">
                      <Link to={`/insights/${filteredPosts[0].slug}`}>
                        {lang === 'th' ? filteredPosts[0].title_th : filteredPosts[0].title_en}
                      </Link>
                    </h2>

                    <p className="mt-4 text-[14px] leading-relaxed text-[#5D6574] font-normal">
                      {lang === 'th' ? filteredPosts[0].excerpt_th : filteredPosts[0].excerpt_en}
                    </p>

                    {/* High-impact Banking Tabular Metrics */}
                    <div className="mt-6 border border-[#E7E4DC] bg-[#FAF9F6] p-4">
                      <div className="grid grid-cols-2 divide-x divide-[#E7E4DC]">
                        <div className="pr-4">
                          <span className="editorial-label text-[#5D6574] block mb-1">SEA Deal Flow Estimate</span>
                          <span className="font-serif text-2xl lg:text-3xl font-normal text-[#070E1B]">
                            $78.4 <span className="text-sm font-sans text-[#9A7B44] font-medium">Billion</span>
                          </span>
                          <span className="block text-[11px] text-[#5D6574] mt-0.5">Projected aggregate volume</span>
                        </div>
                        <div className="pl-4">
                          <span className="editorial-label text-[#5D6574] block mb-1">YoY Cross-Border Volume</span>
                          <span className="font-serif text-2xl lg:text-3xl font-normal text-[#9A7B44]">+18.2%</span>
                          <span className="block text-[11px] text-[#5D6574] mt-0.5">Inbound private equity deals</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#E7E4DC] flex items-center justify-between">
                    <div>
                      <h4 className="text-[13px] font-semibold text-[#070E1B]">Alpha Advisory Practice</h4>
                      <p className="text-[11px] text-[#5D6574]">Senior Partner & Research Practice</p>
                    </div>
                    <Link
                      to={`/insights/${filteredPosts[0].slug}`}
                      className="inline-flex items-center text-[12px] uppercase tracking-wider font-semibold text-[#070E1B] hover:text-[#9A7B44] transition-colors group"
                    >
                      <span className="border-b border-[#070E1B] pb-0.5 group-hover:border-[#9A7B44]">
                        {lang === 'th' ? 'อ่านฉบับเต็ม' : 'Read Dossier'}
                      </span>
                      <span className="material-symbols-outlined text-[16px] ml-1 group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </section>
        )}

        {/* Section Header with Sort Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-[#E7E4DC] mb-8 gap-4">
          <div>
            <span className="editorial-label text-[#9A7B44] block mb-1">Executive Research Library</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#070E1B] font-normal">
              {lang === 'th' ? 'บทวิเคราะห์ล่าสุด (Research Briefings)' : 'Latest Briefings & Research Dossiers'}
            </h2>
          </div>
          <div className="flex items-center space-x-3 text-[12px] text-[#5D6574]">
            <span>{lang === 'th' ? 'จัดเรียงตาม:' : 'Sort by:'}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#E7E4DC] text-[#070E1B] text-[12px] py-1.5 pl-3 pr-8 focus:outline-none focus:border-[#9A7B44] cursor-pointer rounded-none uppercase tracking-wider font-medium"
            >
              <option value="recent">{lang === 'th' ? 'ล่าสุด (Most Recent)' : 'Most Recent'}</option>
              <option value="popular">{lang === 'th' ? 'ยอดนิยมโดยผู้บริหาร' : 'Most Read by C-Suite'}</option>
            </select>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="inline-block w-8 h-8 border-4 border-[#9A7B44] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-[#5D6574] text-sm">
              {lang === 'th' ? 'กำลังโหลดข้อมูลบทวิเคราะห์...' : 'Accessing intelligence archive...'}
            </p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#E7E4DC]">
            <span className="material-symbols-outlined text-4xl text-[#8A92A0] mb-2">article</span>
            <p className="text-[#070E1B] font-serif text-xl">
              {lang === 'th' ? 'ไม่พบบทวิเคราะห์ตามเงื่อนไข' : 'No research briefings match your criteria'}
            </p>
            <p className="text-[#5D6574] text-xs mt-1">
              {lang === 'th' ? 'กรุณาลองเปลี่ยนคำค้นหาหรือตัวกรองหมวดหมู่' : 'Try adjusting your search terms or filter selection.'}
            </p>
          </div>
        ) : (
          /* Dossier Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-[#E7E4DC] p-7 flex flex-col justify-between hover:border-[#9A7B44]/60 transition-all group duration-300 shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between pb-3.5 border-b border-[#E7E4DC] text-[11px]">
                    <span className="editorial-label text-[#9A7B44] font-semibold">
                      {post.category || 'M&A Strategy'}
                    </span>
                    <span className="text-[#5D6574]">
                      {new Date(post.created_at).toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-[22px] leading-snug text-[#070E1B] font-medium group-hover:text-[#9A7B44] transition-colors">
                    <Link to={`/insights/${post.slug}`}>
                      {lang === 'th' ? post.title_th : post.title_en}
                    </Link>
                  </h3>

                  <p className="mt-3 text-[13px] leading-relaxed text-[#5D6574] line-clamp-3">
                    {lang === 'th' ? post.excerpt_th : post.excerpt_en}
                  </p>

                  {/* Institutional Metric Box */}
                  <div className="mt-6 border border-[#E7E4DC] bg-[#FAF9F6] p-3.5">
                    <div className="flex justify-between items-center text-[11px] mb-1.5">
                      <span className="editorial-label text-[#5D6574]">Institutional Focus</span>
                      <span className="font-mono font-semibold text-[#070E1B]">Tier-1 Governance</span>
                    </div>
                    <div className="w-full bg-[#E7E4DC] h-[2px]">
                      <div className="bg-[#9A7B44] h-[2px] w-4/5" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E7E4DC] flex items-center justify-between text-[11px]">
                  <span className="text-[#5D6574] flex items-center">
                    <span className="material-symbols-outlined text-[13px] mr-1 text-[#8A92A0]">schedule</span>
                    5 min read
                  </span>
                  <Link
                    to={`/insights/${post.slug}`}
                    className="inline-flex items-center uppercase tracking-wider text-[11px] font-semibold text-[#070E1B] group-hover:text-[#9A7B44] transition-colors"
                  >
                    <span className="border-b border-[#070E1B] pb-0.5 group-hover:border-[#9A7B44]">
                      {lang === 'th' ? 'อ่านฉบับเต็ม' : 'Read Briefing'}
                    </span>
                    <span className="material-symbols-outlined text-[14px] ml-1 group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bespoke Private Subscription Banner */}
        <section className="mt-20 border border-[#1E2B45] p-8 sm:p-12 lg:p-14 bg-[#070E1B] text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="editorial-label text-[#9A7B44] block mb-2">Executive Intelligence Dispatch</span>
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
                {lang === 'th'
                  ? 'รับบทวิเคราะห์เจาะลึกส่งตรงถึงอีเมลผู้บริหารทุกสัปดาห์'
                  : 'Receive Institutional Research Briefs Directly in Your Inbox'}
              </h3>
              <p className="mt-4 text-[#8A92A0] text-[14px] leading-relaxed max-w-xl">
                {lang === 'th'
                  ? 'สรุปความเคลื่อนไหว M&A ตลาดทุน และการประเมินมูลค่ากิจการก่อนใคร ไม่พลาดทุกจังหวะการตัดสินใจเชิงกลยุทธ์ คัดสรรโดยทีม Research และ Managing Partners'
                  : 'Exclusive weekly intelligence syntheses on cross-border M&A, equity market windows, and syndicate pricing for boards and C-suite decision-makers.'}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-6 text-[12px] text-[#8A92A0]">
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9A7B44] mr-2" /> Confidential Distribution
                </span>
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9A7B44] mr-2" /> Boardroom-Grade Dispatches
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#0B1528] p-6 sm:p-8 border border-[#1E2B45]">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block editorial-label text-[#8A92A0] mb-2">
                    {lang === 'th' ? 'Corporate Email / อีเมลองค์กร' : 'Corporate Email'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="executive@company.com"
                    className="w-full h-11 px-3.5 bg-[#070E1B] border border-[#1E2B45] text-white text-[13px] placeholder-[#5D6574] focus:outline-none focus:border-[#9A7B44] transition-colors"
                  />
                </div>
                <div>
                  <label className="block editorial-label text-[#8A92A0] mb-2">
                    {lang === 'th' ? 'Practice Area Focus' : 'Advisory Focus'}
                  </label>
                  <select className="w-full h-11 px-3 bg-[#070E1B] border border-[#1E2B45] text-white text-[13px] focus:outline-none focus:border-[#9A7B44] cursor-pointer transition-colors">
                    <option>{lang === 'th' ? 'ครอบคลุมทุกด้าน (Complete Coverage)' : 'Complete Strategic Coverage'}</option>
                    <option>Mergers & Acquisitions Focus</option>
                    <option>Capital Markets & Pre-IPO Advisory</option>
                    <option>Debt Restructuring & Turnaround</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full h-11 bg-[#9A7B44] hover:bg-[#B89758] text-[#070E1B] font-semibold uppercase tracking-[0.14em] text-[12px] transition-colors mt-2"
                >
                  {lang === 'th' ? 'สมัครรับบทวิเคราะห์' : 'Subscribe to Dispatches'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
