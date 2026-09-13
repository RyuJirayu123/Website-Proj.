import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'
import { FaLinkedinIn, FaFacebookF, FaLine } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

export default function Footer() {
  const { t, lang } = useLang()

  const footerLinks = {
    [t.footer.services]: [
      'M&A Advisory',
      lang === 'th' ? 'การระดมทุน' : 'Capital Raising',
      'Valuation & Due Diligence',
      lang === 'th' ? 'กลยุทธ์องค์กร' : 'Corporate Strategy',
      'Restructuring',
    ],
    [t.footer.about]: [
      lang === 'th' ? 'เกี่ยวกับเรา' : 'About Us',
      lang === 'th' ? 'ทีมงาน' : 'Our Team',
      lang === 'th' ? 'ผลงาน' : 'Case Studies',
      lang === 'th' ? 'บทความ' : 'Insights',
    ],
    [t.footer.legal]: [
      lang === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy',
      lang === 'th' ? 'ข้อกำหนดการใช้งาน' : 'Terms of Service',
      lang === 'th' ? 'เปิดเผยข้อมูล ก.ล.ต.' : 'SEC Disclosures',
    ],
  }

  return (
    <footer className="bg-[#0f1520] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 bg-[#c9a96e] rounded-sm flex items-center justify-center font-bold text-lg">A</div>
              <span className="font-bold text-lg">
                Alpha <span className="text-[#c9a96e]">Capital</span> Advisory
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              {t.footer.desc}
            </p>

            {/* Contact */}
            <div className="space-y-2">
              {[
                { icon: HiPhone, text: '02-xxx-xxxx' },
                { icon: HiMail, text: 'info@alphacapital.th' },
                { icon: HiLocationMarker, text: lang === 'th' ? 'อาคาร XYZ ชั้น 20 ถนนสีลม กรุงเทพฯ' : 'XYZ Tower, 20th Floor, Silom Rd., Bangkok' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-white/50 text-sm">
                  <item.icon className="text-[#c9a96e] flex-shrink-0" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[FaLinkedinIn, FaFacebookF, FaLine].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#c9a96e] flex items-center justify-center transition-colors"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white text-sm mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/50 hover:text-[#c9a96e] text-sm transition-colors"
                      onClick={(e) => e.preventDefault()}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <div className="flex items-center gap-4">
            <span>{t.footer.license}</span>
            <Link
              to="/admin/login"
              className="text-[#c9a96e] hover:underline"
            >
              {t.footer.admin}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
