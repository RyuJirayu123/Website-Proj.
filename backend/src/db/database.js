const { createClient } = require('@libsql/client')
const bcrypt = require('bcryptjs')
const path = require('path')

const db = createClient({
  url: `file:${path.join(__dirname, '../../data.db')}`,
})

async function initDB() {
  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS contacts (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT    NOT NULL,
      company    TEXT,
      email      TEXT    NOT NULL,
      phone      TEXT,
      service    TEXT,
      message    TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS admins (
      id       INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS posts (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      slug         TEXT UNIQUE NOT NULL,
      title_th     TEXT NOT NULL,
      title_en     TEXT NOT NULL,
      excerpt_th   TEXT,
      excerpt_en   TEXT,
      content_th   TEXT,
      content_en   TEXT,
      category     TEXT DEFAULT 'general',
      published    INTEGER DEFAULT 1,
      created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS case_studies (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      title_th       TEXT NOT NULL,
      title_en       TEXT NOT NULL,
      sector         TEXT,
      deal_value     TEXT,
      description_th TEXT,
      description_en TEXT,
      result_th      TEXT,
      result_en      TEXT,
      deal_year      INTEGER,
      published      INTEGER DEFAULT 1,
      created_at     DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)
}

async function seedAdmin() {
  const result = await db.execute({
    sql: 'SELECT id FROM admins WHERE username = ?',
    args: [process.env.ADMIN_USERNAME],
  })
  if (result.rows.length === 0) {
    const hashed = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10)
    await db.execute({
      sql: 'INSERT INTO admins (username, password) VALUES (?, ?)',
      args: [process.env.ADMIN_USERNAME, hashed],
    })
    console.log(`✅ Admin "${process.env.ADMIN_USERNAME}" created`)
  }
}

async function seedSampleData() {
  // Seed ตัวอย่างบทความ
  const postCount = await db.execute('SELECT COUNT(*) as cnt FROM posts')
  if (Number(postCount.rows[0].cnt) === 0) {
    await db.executeMultiple(`
      INSERT INTO posts (slug, title_th, title_en, excerpt_th, excerpt_en, content_th, content_en, category) VALUES
      ('ma-trends-2025', 'Thailand M&A Outlook 2025: ทิศทางการควบรวมกิจการในยุคดอกเบี้ยปรับตัวลง', 'Thailand M&A Outlook 2025: Strategic Consolidation in Lower Rate Regime',
       'วิเคราะห์การรวมตัวของกลุ่มธุรกิจพลังงานทดแทน ดาต้าเซ็นเตอร์ และกลุ่มอาหารพร้อมบริโภคข้ามพรมแดนในภูมิภาคอาเซียน',
       'Comprehensive assessment of cross-border consolidation in renewables, data centers, and consumer food sectors across ASEAN.',
       'ตลาดควบรวมกิจการ (M&A) ในภูมิภาคเอเชียตะวันออกเฉียงใต้มีทิศทางฟื้นตัวอย่างมีนัยสำคัญในปี 2025 โดยเฉพาะในประเทศไทยที่ได้รับปัจจัยหนุนจากทิศทางอัตราดอกเบี้ยนโยบายที่เริ่มปรับตัวลดลง ประกอบกับความต้องการขยายกำลังการผลิตด้านพลังงานสะอาดและการลงทุนโครงสร้างพื้นฐานดิจิทัล (Digital Infrastructure / Data Center)\n\nApex Capital Advisory Group ได้รวบรวมข้อมูลเชิงสถิติและแบบจำลองการประเมินมูลค่ากิจการ เพื่อนำเสนอมุมมองยุทธศาสตร์สำหรับผู้ถือหุ้นและคณะกรรมการบริษัทในการพิจารณาโอกาสและจังหวะเวลาในการทำธุรกรรมควบรวมกิจการอย่างมีประสิทธิภาพสูงสุด',
       'The Southeast Asian M&A landscape is experiencing a meaningful resurgence in 2025, particularly in Thailand, supported by monetary easing cycles, cross-border renewable energy initiatives, and substantial digital infrastructure investments.\n\nApex Capital Advisory Group provides empirical valuation benchmarks and strategic insights for boards and controlling shareholders evaluating strategic consolidation windows.',
       'insights');

      INSERT INTO posts (slug, title_th, title_en, excerpt_th, excerpt_en, content_th, content_en, category) VALUES
      ('ipo-governance-checklist', 'Pre-IPO Governance Checklist: การเตรียมความพร้อมด้านธรรมาภิบาลสำหรับธุรกิจครอบครัว', 'Pre-IPO Governance Checklist: Corporate Governance Architecture for Family Enterprises',
       'แนวทางจัดการความขัดแย้งทางผลประโยชน์ (Conflict of Interest) และการวางโครงสร้างกรรมการอิสระตามเกณฑ์ใหม่ ก.ล.ต.',
       'Structuring conflict clearance and independent board mechanisms conforming to enhanced SEC Thailand listing standards.',
       'การแปรสภาพจากธุรกิจครอบครัว (Family Business) สู่การเป็นบริษัทจดทะเบียนในตลาดหลักทรัพย์ (Public Company) จำเป็นต้องมีการปรับโครงสร้างธรรมาภิบาลและการควบคุมภายในอย่างเป็นระบบ เพื่อให้สอดคล้องกับเกณฑ์กำกับดูแลของสำนักงาน ก.ล.ต. และตลาดหลักทรัพย์แห่งประเทศไทย\n\nคู่มือนี้ระบุถึง 5 ประเด็นสำคัญที่ต้องดำเนินการล่วงหน้าอย่างน้อย 18-24 เดือนก่อนการยื่นคำขออนุญาตเสนอขายหุ้น IPO รวมถึงการจัดการรายการระหว่างกันและการจัดตั้งคณะกรรมการชุดย่อย',
       'Transitioning from private family ownership to a publicly listed entity requires systematic governance restructuring and internal control institutionalization conforming to SEC Thailand regulations.\n\nThis guide outlines 5 mission-critical governance milestones that must be initiated 18-24 months prior to formal IPO submission.',
       'guide');

      INSERT INTO posts (slug, title_th, title_en, excerpt_th, excerpt_en, content_th, content_en, category) VALUES
      ('ev-ebitda-multiples', 'EV/EBITDA Multiples Benchmark: ดัชนีเปรียบเทียบมูลค่ากิจการในตลาดหลักทรัพย์ SET', 'EV/EBITDA Multiples Benchmark: Sector Valuation Index Across SET & Regional Exchanges',
       'รายงานสถิติมูลค่าตัวคูณในกลุ่มโลจิสติกส์ เทคโนโลยี และพลังงานทดแทน เพื่อการวางแผนควบรวมหรือกำหนดราคา IPO',
       'Empirical valuation multiple analysis across logistics, enterprise tech, and renewables to inform transaction pricing.',
       'รายงานเปรียบเทียบตัวคูณมูลค่ากิจการ (Valuation Multiples) ที่จัดทำโดยฝ่ายวิเคราะห์ของ Apex Capital Advisory Group รวบรวมข้อมูลย้อนหลัง 5 ปี ในกลุ่มอุตสาหกรรมเป้าหมายหลักในตลาดหลักทรัพย์ SET และ mai เพื่อใช้เป็นแนวทางอ้างอิงในการกำหนดราคาเสนอซื้อหรือราคาเสนอขายหุ้นต่อประชาชนครั้งแรก',
       'Empirical sector multiple benchmark compiled by Apex Capital Advisory Group research desk, evaluating 5-year historical valuation ranges across SET and regional exchanges to inform transaction pricing.',
       'knowledge');
    `)
    console.log('✅ Sample posts seeded')
  }

  // Seed ตัวอย่าง Case Studies
  const caseCount = await db.execute('SELECT COUNT(*) as cnt FROM case_studies')
  if (Number(caseCount.rows[0].cnt) === 0) {
    await db.executeMultiple(`
      INSERT INTO case_studies (title_th, title_en, sector, deal_value, description_th, description_en, result_th, result_en, deal_year) VALUES
      ('SIAM RENEWABLE HOLDINGS', 'SIAM RENEWABLE HOLDINGS',
       'Cross-Border Acquisition', '฿14,200,000,000',
       'การเข้าซื้อหุ้น 65% ในโครงการโครงสร้างพื้นฐานโรงไฟฟ้าพลังงานแสงอาทิตย์ Mekong Solar (เวียดนาม)',
       'Acquisition of 65% Equity Interest in Mekong Solar Infrastructure (Vietnam)',
       'Sole Financial Advisor to Buyer',
       'Sole Financial Advisor to Buyer', 2024);

      INSERT INTO case_studies (title_th, title_en, sector, deal_value, description_th, description_en, result_th, result_en, deal_year) VALUES
      ('LOGISTECH INNOVATIONS PLC', 'LOGISTECH INNOVATIONS PLC',
       'Capital Market • SET mai Pre-IPO', '฿4,850,000,000',
       'การจัดสรรหุ้นเพิ่มทุนแบบเฉพาะเจาะจง (Private Placement) และการเตรียมความพร้อมนำหุ้นเข้าจดทะเบียนในตลาดหลักทรัพย์ mai',
       'Private Placement Equity Expansion & Initial Public Offering Underwriting',
       'Joint Financial Advisor & Lead Arranger',
       'Joint Financial Advisor & Lead Arranger', 2024);

      INSERT INTO case_studies (title_th, title_en, sector, deal_value, description_th, description_en, result_th, result_en, deal_year) VALUES
      ('PACIFIC HEALTHCARE CORP', 'PACIFIC HEALTHCARE CORP',
       'Recapitalization & Synergies', '฿7,600,000,000',
       'การขายสินทรัพย์ศูนย์วินิจฉัยที่ไม่ใช่ธุรกิจหลักและการปรับโครงสร้างหนี้ระยะยาว (Senior Debt Refinancing)',
       'Strategic Divestment of Non-Core Diagnostic Facilities & Senior Debt Refinancing',
       'Exclusive Fiduciary Advisor to the Board',
       'Exclusive Fiduciary Advisor to the Board', 2023);
    `)
    console.log('✅ Sample case studies seeded')
  }
}

module.exports = { db, initDB, seedAdmin, seedSampleData }
