import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import ApexLogo from './ApexLogo'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="w-full bg-[#FAF9F6] border-t border-[#E7E4DC] text-[#1A1C1A] shadow-[0_1px_8px_rgba(0,0,0,0.04)] font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-14 border-b border-[#E7E4DC]">
          {/* Column 1: Brand & Regional Hubs */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="inline-block">
              <ApexLogo variant="dark" className="h-8 w-auto" />
            </Link>

            <p className="font-sans text-xs sm:text-[13px] text-[#45474D] leading-relaxed">
              {t.footer.desc}
            </p>

            <div className="flex flex-col gap-1 font-sans text-[11px] text-[#765A26] uppercase font-bold tracking-wider pt-2">
              <p>{t.footer.bangkokHub}</p>
              <p>{t.footer.singaporeHub}</p>
              <p>{t.footer.londonHub}</p>
            </div>
          </div>

          {/* Column 2: Advisory Practices */}
          <div className="flex flex-col gap-3">
            <p className="font-sans text-xs font-bold text-[#0B1528] uppercase tracking-[0.14em]">
              {t.footer.services}
            </p>
            <div className="flex flex-col gap-2 font-sans text-xs text-[#45474D]">
              <Link to="/case-studies" className="hover:text-[#0B1528] transition-colors">
                Mergers &amp; Acquisitions (M&amp;A)
              </Link>
              <Link to="/case-studies" className="hover:text-[#0B1528] transition-colors">
                Capital Markets &amp; Pre-IPO Advisory
              </Link>
              <Link to="/case-studies" className="hover:text-[#0B1528] transition-colors">
                Independent Corporate Valuation
              </Link>
              <Link to="/case-studies" className="hover:text-[#0B1528] transition-colors">
                Debt Restructuring &amp; Recapitalization
              </Link>
              <Link to="/case-studies" className="hover:text-[#0B1528] transition-colors">
                Fairness Opinions &amp; Board Advisory
              </Link>
            </div>
          </div>

          {/* Column 3: Governance & Disclosures */}
          <div className="flex flex-col gap-3">
            <p className="font-sans text-xs font-bold text-[#0B1528] uppercase tracking-[0.14em]">
              {t.footer.governance}
            </p>
            <div className="flex flex-col gap-2 font-sans text-xs text-[#45474D]">
              <span className="hover:text-[#0B1528] transition-colors cursor-pointer">
                SEC Thailand Statutory Filings
              </span>
              <span className="hover:text-[#0B1528] transition-colors cursor-pointer">
                Conflict of Interest Policy
              </span>
              <span className="hover:text-[#0B1528] transition-colors cursor-pointer">
                Institutional Privacy Protocol
              </span>
              <span className="hover:text-[#0B1528] transition-colors cursor-pointer">
                Virtual Data Room Encryption Security
              </span>
              <Link to="/admin/login" className="text-[#765A26] font-bold hover:text-[#0B1528] transition-colors flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                <span>{t.footer.admin}</span>
              </Link>
            </div>
          </div>

          {/* Column 4: Institutional Mandates */}
          <div className="flex flex-col gap-3">
            <p className="font-sans text-xs font-bold text-[#0B1528] uppercase tracking-[0.14em]">
              {t.footer.mandates}
            </p>
            <div className="flex flex-col gap-2 font-sans text-xs text-[#45474D]">
              <div>
                <span className="font-sans text-[10.5px] text-[#0B1528] uppercase font-bold tracking-wider block">
                  Mandate Advisory Hotline:
                </span>
                <span className="text-[#765A26] font-semibold">{t.footer.hotline}</span>
              </div>
              <div>
                <span className="font-sans text-[10.5px] text-[#0B1528] uppercase font-bold tracking-wider block">
                  Confidential Communications:
                </span>
                <span>{t.footer.emailMandates}</span>
              </div>
              <div className="mt-1 pt-1 border-t border-[#E7E4DC]">
                <span className="font-sans text-[10.5px] text-[#765A26] uppercase font-bold tracking-wider block">
                  Institutional Terminals:
                </span>
                <span className="font-mono text-[11px] text-[#0B1528]">{t.footer.terminals}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 font-sans text-[11px] text-[#45474D]">
          <p>{t.footer.copyright}</p>
          <p className="text-center md:text-right text-[#765A26] font-medium">
            {t.footer.license}
          </p>
        </div>
      </div>
    </footer>
  )
}
