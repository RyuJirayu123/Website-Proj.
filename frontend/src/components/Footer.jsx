import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'
import { FaLinkedinIn, FaFacebookF, FaLine } from 'react-icons/fa'

const footerLinks = {
  บริการ: [
    'M&A Advisory',
    'การระดมทุน',
    'Valuation',
    'กลยุทธ์องค์กร',
    'Restructuring',
  ],
  'เกี่ยวกับ': [
    'เกี่ยวกับเรา',
    'ทีมงาน',
    'ข่าวสาร',
    'ร่วมงานกับเรา',
  ],
  'กฎหมาย': [
    'นโยบายความเป็นส่วนตัว',
    'ข้อกำหนดการใช้งาน',
    'เปิดเผยข้อมูล ก.ล.ต.',
  ],
}

export default function Footer() {
  const scrollTo = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="bg-[#060f22] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 bg-[#d4a017] rounded-sm flex items-center justify-center font-bold text-lg">A</div>
              <span className="font-bold text-lg">
                Alpha <span className="text-[#d4a017]">Capital</span> Advisory
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              ที่ปรึกษาทางการเงินองค์กรชั้นนำ ให้บริการครบวงจรด้านการควบรวมกิจการ
              การระดมทุน และกลยุทธ์ทางการเงินสำหรับธุรกิจทุกขนาด
            </p>

            {/* Contact */}
            <div className="space-y-2">
              {[
                { icon: HiPhone, text: '02-xxx-xxxx' },
                { icon: HiMail, text: 'info@alphacapital.th' },
                { icon: HiLocationMarker, text: 'อาคาร XYZ ชั้น 20 ถนนสีลม กรุงเทพฯ' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-white/50 text-sm">
                  <item.icon className="text-[#d4a017] flex-shrink-0" />
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
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#d4a017] flex items-center justify-center transition-colors"
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
                      className="text-white/50 hover:text-[#d4a017] text-sm transition-colors"
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
            © {new Date().getFullYear()} Alpha Capital Advisory Co., Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span>ได้รับใบอนุญาตประกอบธุรกิจหลักทรัพย์ จาก ก.ล.ต.</span>
            <a
              href="/admin/login"
              className="text-[#d4a017] hover:underline"
            >
              🔒 ผู้ดูแลระบบ (Admin)
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
