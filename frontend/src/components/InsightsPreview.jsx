import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLang } from '../context/LanguageContext'

const previewArticles = [
  {
    slug: 'ma-trends-2025',
    category: 'M&A Outlook',
    date_th: '15 มกราคม 2025',
    date_en: 'Jan 15, 2025',
    readTime_th: '8 นาทีอ่าน',
    readTime_en: '8 min read',
    title_th: 'Thailand M&A Outlook 2025: ทิศทางการควบรวมกิจการในยุคดอกเบี้ยปรับตัวลง',
    title_en: 'Thailand M&A Outlook 2025: Strategic Consolidation in Lower Rate Regime',
    desc_th: 'วิเคราะห์การรวมตัวของกลุ่มธุรกิจพลังงานทดแทน ดาต้าเซ็นเตอร์ และกลุ่มอาหารพร้อมบริโภคข้ามพรมแดนในภูมิภาคอาเซียน',
    desc_en: 'Comprehensive assessment of cross-border consolidation in renewables, data centers, and consumer food sectors across ASEAN.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGdFVDFK58tQRkV58B7SVtJQnPu9zt61x9bpa0Zmo6hDmrK-XdJ1sgGddtU33ruqK1h2sck9o_vIy2EitB45oyh95jogK3Kde7AyT0P502YWvLucpSPQ9i0rgBSB0-KgDjvOf0G2L2D6KG85c1ruHmEWNSDjI_cotxklTrzHN6hyehMFIDiioA0LJkpShXWlN42GEpEy9GfPALa9jXJKrVboPbtpzYkAA3r3c8_3FlihyXC8I7apG_',
  },
  {
    slug: 'ipo-governance-checklist',
    category: 'Governance & Pre-IPO',
    date_th: '08 มกราคม 2025',
    date_en: 'Jan 08, 2025',
    readTime_th: '12 นาทีอ่าน',
    readTime_en: '12 min read',
    title_th: 'Pre-IPO Governance Checklist: การเตรียมความพร้อมด้านธรรมาภิบาลสำหรับธุรกิจครอบครัว',
    title_en: 'Pre-IPO Governance Checklist: Corporate Governance Architecture for Family Enterprises',
    desc_th: 'แนวทางจัดการความขัดแย้งทางผลประโยชน์ (Conflict of Interest) และการวางโครงสร้างกรรมการอิสระตามเกณฑ์ใหม่ ก.ล.ต.',
    desc_en: 'Structuring conflict clearance and independent board mechanisms conforming to enhanced SEC Thailand listing standards.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOz3UBCuyMM6cIUHrYtAnrAKfyp1MRNRRxc3yYFiKZEd7iQArGVy1BuG66TDrYPN8eZXMdRug1vG1P1OiYLT_C8b_AA5ktEVHsYYlpuu5-uKsFytVGIdI7uFP6cHVLDkm4GbO0pODn5EL3RYktusgxx5qKEsAwdCZzb48Z8arwo0YpWDzPaXCW59ftPaprwJzGudQHhJsRFebjrRElPc1Q2BF_3IaWRJJSIxbFBEi1kK5VrM7J6AuI',
  },
  {
    slug: 'ev-ebitda-multiples',
    category: 'Valuation Benchmarks',
    date_th: '28 ธันวาคม 2024',
    date_en: 'Dec 28, 2024',
    readTime_th: '6 นาทีอ่าน',
    readTime_en: '6 min read',
    title_th: 'EV/EBITDA Multiples Benchmark: ดัชนีเปรียบเทียบมูลค่ากิจการในตลาดหลักทรัพย์ SET',
    title_en: 'EV/EBITDA Multiples Benchmark: Sector Valuation Index Across SET & Regional Exchanges',
    desc_th: 'รายงานสถิติมูลค่าตัวคูณในกลุ่มโลจิสติกส์ เทคโนโลยี และพลังงานทดแทน เพื่อการวางแผนควบรวมหรือกำหนดราคา IPO',
    desc_en: 'Empirical valuation multiple analysis across logistics, enterprise tech, and renewables to inform transaction pricing.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbEd-hy4N1E091mQ-vrK08peRIXamzjqrPZ4BP4P5uUM93SnQLlKLezH8Lf21FGDY7tPVqBa8rfgGQ-lWzc6dTEuVpkxZJ0FYY4AOM5N-9ohkriUl21RjlVNR9wDpJRZh-69mOrbPqIkBmfuoA3KFyPKxET6T3HQzI4a68cEGy5GCuuUanfMeFvK8N2hfUbfH0trXnInp6l0XFgWCRIm30L_BBKPU7NweOJm9LhrpMPWqjiP4dbAnR',
  },
]

export default function InsightsPreview() {
  const { t, lang } = useLang()

  return (
    <section className="w-full py-20 lg:py-24 bg-[#FAF9F6] border-b border-[#E7E4DC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-sans text-[11px] font-semibold text-[#765A26] uppercase tracking-[0.2em] block">
              {t.insights.label}
            </span>
            <h2 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#0B1528] mt-1">
              {t.insights.heading}
            </h2>
          </div>

          <Link
            to="/insights"
            className="font-sans text-xs font-bold uppercase tracking-wider text-[#765A26] hover:text-[#0B1528] transition-colors flex items-center gap-1.5"
          >
            <span>{lang === 'th' ? 'เข้าสู่ศูนย์ข้อมูลงานวิจัยทั้งหมด' : 'View All Research Publications'}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewArticles.map((article, i) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white border border-[#E7E4DC] shadow-xs flex flex-col hover:border-[#9A7B44] hover:shadow-md transition-all group overflow-hidden"
            >
              <div className="relative w-full h-48 bg-[#F4F3F1] overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={article.title_en}
                  src={article.image}
                />
                <div className="absolute top-3 left-3 bg-[#0B1528] text-white px-2.5 py-1 font-sans text-[10px] uppercase font-bold tracking-wider">
                  {article.category}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 font-sans text-[11px] text-[#45474D] mb-2.5">
                    <span>{lang === 'th' ? article.date_th : article.date_en}</span>
                    <span>•</span>
                    <span>{lang === 'th' ? article.readTime_th : article.readTime_en}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#0B1528] leading-snug mb-2.5 group-hover:text-[#765A26] transition-colors">
                    <Link to={`/insights/${article.slug}`}>
                      {lang === 'th' ? article.title_th : article.title_en}
                    </Link>
                  </h3>

                  <p className="font-sans text-xs text-[#45474D] leading-relaxed line-clamp-3">
                    {lang === 'th' ? article.desc_th : article.desc_en}
                  </p>
                </div>

                <Link
                  to={`/insights/${article.slug}`}
                  className="mt-6 font-sans text-xs font-bold uppercase tracking-wider text-[#765A26] hover:text-[#0B1528] flex items-center gap-1 transition-colors pt-3 border-t border-[#E7E4DC]"
                >
                  <span>{t.insights.readMore}</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

