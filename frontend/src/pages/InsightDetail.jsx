import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { API_URL } from '../api'

export default function InsightDetail() {
  const { slug } = useParams()
  const { lang } = useLang()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`${API_URL}/api/posts/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then((data) => {
        setPost(data.data || data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError(true)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-20 flex flex-col justify-center items-center">
        <div className="inline-block w-8 h-8 border-4 border-[#9A7B44] border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-[#5D6574] text-xs uppercase tracking-widest">Accessing Executive Briefing...</p>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] pt-36 pb-20">
        <div className="max-w-3xl mx-auto px-6 text-center py-20 bg-white border border-[#E7E4DC]">
          <h1 className="font-serif text-3xl text-[#070E1B] mb-4">Briefing Not Found</h1>
          <p className="text-[#5D6574] text-sm mb-6">The research briefing you requested is either archived or unavailable.</p>
          <Link
            to="/insights"
            className="inline-flex items-center text-xs uppercase tracking-widest font-semibold text-[#9A7B44] border-b border-[#9A7B44] pb-1"
          >
            ← Return to Research Library
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#070E1B]">
      {/* Header bar */}
      <section className="bg-[#070E1B] text-white pt-28 pb-12 border-b border-[#1E2B45]">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            to="/insights"
            className="inline-flex items-center gap-1.5 text-[#9A7B44] hover:text-[#B89758] text-xs uppercase tracking-widest font-semibold mb-6 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            {lang === 'th' ? 'กลับไปยังคลังบทวิเคราะห์' : 'Back to Research Library'}
          </Link>

          <div className="flex items-center space-x-3 text-[11px] text-[#8A92A0] mb-3">
            <span className="editorial-label text-[#9A7B44]">{post.category || 'M&A Advisory'}</span>
            <span>•</span>
            <span>
              {new Date(post.created_at).toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span>•</span>
            <span>ISSN 2821-9942</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight font-normal text-white">
            {lang === 'th' ? post.title_th : post.title_en}
          </h1>

          <p className="mt-4 text-[#8A92A0] text-base leading-relaxed">
            {lang === 'th' ? post.excerpt_th : post.excerpt_en}
          </p>
        </div>
      </section>

      {/* Main Reading Dossier */}
      <main className="max-w-4xl mx-auto px-6 py-14">
        <article className="bg-white border border-[#E7E4DC] p-8 sm:p-12 shadow-[0_4px_24px_rgba(7,14,27,0.04)]">
          {/* Executive Summary Callout */}
          <div className="border-l-2 border-[#9A7B44] bg-[#FAF9F6] p-6 mb-10">
            <span className="editorial-label text-[#9A7B44] block mb-1">Boardroom Executive Summary</span>
            <p className="text-[14px] text-[#070E1B] leading-relaxed italic font-serif">
              {lang === 'th'
                ? 'ข้อสรุปสำหรับคณะกรรมการบริหาร: การทำธุรกรรมในตลาดทุนต้องอาศัยการประเมินมูลค่าที่รัดกุม การจัดโครงสร้างทางกฎหมาย และการบริหารความเสี่ยงข้ามพรมแดนอย่างเป็นระบบ'
                : 'Executive takeaway for boardroom evaluation: Structured execution demands comprehensive valuation discipline, rigorous governance covenants, and proactive syndicate alignment.'}
            </p>
          </div>

          {/* Body Content */}
          <div className="text-[15px] sm:text-[16px] text-[#2d3748] leading-[1.85] whitespace-pre-wrap font-serif">
            {lang === 'th' ? post.content_th : post.content_en}
          </div>

          {/* Article Footer & Signature */}
          <div className="mt-14 pt-8 border-t border-[#E7E4DC] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="editorial-label text-[#9A7B44] block">Practice Leadership</span>
              <h4 className="text-sm font-semibold text-[#070E1B]">Apex Capital Advisory Group</h4>
              <p className="text-xs text-[#5D6574]">SEC Thailand Licensed Advisory Practice • Mandate Research Desk</p>
            </div>

            <Link
              to="/insights"
              className="inline-flex items-center gap-1.5 uppercase text-xs tracking-wider font-semibold text-[#070E1B] hover:text-[#9A7B44] border-b border-[#070E1B] hover:border-[#9A7B44] pb-0.5 transition-colors self-start sm:self-auto"
            >
              <span>{lang === 'th' ? 'บทวิเคราะห์อื่นๆ' : 'Read Other Briefings'}</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </article>
      </main>
    </div>
  )
}
