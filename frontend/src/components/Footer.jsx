import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

export default function Footer() {
  const { t, lang } = useLang()

  return (
    <footer className="w-full bg-[#070E1B] text-[#8A92A0] border-t border-[#1E2B45] font-sans">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#1E2B45]">
          {/* Column 1: Firm Overview */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-[#9A7B44]/50 flex items-center justify-center bg-[#0B1528] text-white">
                <span className="font-serif text-base font-bold text-[#9A7B44]">A</span>
              </div>
              <span className="font-serif text-[18px] tracking-[0.08em] uppercase text-white font-semibold">
                Alpha Capital
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-[#8A92A0] max-w-sm">
              {lang === 'th'
                ? 'ที่ปรึกษาทางการเงินระดับคณะกรรมการบริหาร การควบรวมกิจการ (M&A) ข้ามพรมแดน และการวางโครงสร้างทุนเชิงยุทธศาสตร์ ภายใต้การกำกับดูแลของสำนักงาน ก.ล.ต.'
                : 'Independent board-level financial consultancy, cross-border M&A advisory, and strategic capital structuring. Regulated by the Securities and Exchange Commission, Thailand.'}
            </p>
            <div className="pt-2 flex items-center space-x-2 text-[11px] text-[#9A7B44] uppercase tracking-wider font-semibold">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#9A7B44]" />
              <span>SEC Licensed Advisory • Mandate ID #TH-8902</span>
            </div>
          </div>

          {/* Column 2: Advisory Practices */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="editorial-label text-white tracking-[0.18em]">Advisory Practices</h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <Link to="/#services" className="hover:text-[#9A7B44] transition-colors">
                  Cross-Border M&amp;A
                </Link>
              </li>
              <li>
                <Link to="/#services" className="hover:text-[#9A7B44] transition-colors">
                  Capital Markets &amp; Pre-IPO Advisory
                </Link>
              </li>
              <li>
                <Link to="/#services" className="hover:text-[#9A7B44] transition-colors">
                  Debt Restructuring &amp; Turnaround
                </Link>
              </li>
              <li>
                <Link to="/#services" className="hover:text-[#9A7B44] transition-colors">
                  Strategic Boardroom Valuation
                </Link>
              </li>
              <li>
                <Link to="/#services" className="hover:text-[#9A7B44] transition-colors">
                  Family Office Succession &amp; Governance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Intelligence & Records */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="editorial-label text-white tracking-[0.18em]">Intelligence &amp; Record</h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <Link to="/case-studies" className="hover:text-[#9A7B44] transition-colors">
                  Tombstone Directory
                </Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-[#9A7B44] transition-colors">
                  Research Briefings
                </Link>
              </li>
              <li>
                <Link to="/#team" className="hover:text-[#9A7B44] transition-colors">
                  Leadership &amp; Partners
                </Link>
              </li>
              <li>
                <Link to="/#why-us" className="hover:text-[#9A7B44] transition-colors">
                  Code of Conduct
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-[#9A7B44] text-[#9A7B44] font-medium transition-colors">
                  {t.footer.admin}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Bangkok Headquarters */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="editorial-label text-white tracking-[0.18em]">Bangkok Headquarters</h4>
            <p className="text-[13px] leading-relaxed text-[#8A92A0]">
              Gaysorn Tower, Level 28<br />
              127 Ratchadamri Road, Lumpini<br />
              Pathumwan, Bangkok 10330, Thailand
            </p>
            <p className="text-[12px] text-[#9A7B44] pt-1 font-mono">
              advisory@alphacapital.th
            </p>
            <p className="text-[12px] text-[#8A92A0] font-mono">
              Direct Boardroom: +66 (0) 2 656 1800
            </p>
          </div>
        </div>

        {/* Bottom Compliance Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between text-[11px] text-[#5D6574] gap-4">
          <p>© {new Date().getFullYear()} Alpha Capital Advisory Group Co., Ltd. All rights reserved. Materials prepared for institutional and executive assessment.</p>
          <div className="flex flex-wrap items-center space-x-6 text-[#8A92A0]">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
              Terms of Mandate
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
              Confidentiality Standard
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
              SEC Thailand Compliance
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
