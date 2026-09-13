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
      ('ma-trends-2024', 'แนวโน้ม M&A ในประเทศไทย ปี 2567', 'M&A Trends in Thailand 2024',
       'ภาพรวมตลาดควบรวมกิจการในไทยที่กำลังเติบโต', 'Overview of growing M&A market in Thailand',
       'ตลาด M&A ในประเทศไทยมีการเติบโตอย่างต่อเนื่อง...', 'The M&A market in Thailand continues to grow...', 'insights');

      INSERT INTO posts (slug, title_th, title_en, excerpt_th, excerpt_en, content_th, content_en, category) VALUES
      ('valuation-methods', 'วิธีการประเมินมูลค่ากิจการที่ถูกต้อง', 'Correct Business Valuation Methods',
       'เรียนรู้วิธีการประเมินมูลค่าที่นักลงทุนสถาบันใช้', 'Learn the valuation methods institutional investors use',
       'การประเมินมูลค่ากิจการมีหลายวิธี...', 'Business valuation involves several approaches...', 'knowledge');

      INSERT INTO posts (slug, title_th, title_en, excerpt_th, excerpt_en, content_th, content_en, category) VALUES
      ('ipo-readiness', 'เตรียมความพร้อมก่อนเข้าตลาดหลักทรัพย์', 'IPO Readiness Checklist',
       'สิ่งที่บริษัทต้องเตรียมก่อนยื่นคำขอ IPO', 'What companies must prepare before filing for an IPO',
       'การเตรียม IPO ต้องใช้เวลาและการวางแผน...', 'IPO preparation requires time and careful planning...', 'guide');
    `)
    console.log('✅ Sample posts seeded')
  }

  // Seed ตัวอย่าง Case Studies
  const caseCount = await db.execute('SELECT COUNT(*) as cnt FROM case_studies')
  if (Number(caseCount.rows[0].cnt) === 0) {
    await db.executeMultiple(`
      INSERT INTO case_studies (title_th, title_en, sector, deal_value, description_th, description_en, result_th, result_en, deal_year) VALUES
      ('การควบรวมกิจการค้าปลีกชั้นนำ', 'Leading Retail Group Merger',
       'Retail', '฿4,200M', 'ให้คำปรึกษาการควบรวม 2 บริษัทค้าปลีกชั้นนำ', 'Advisory for merger of two leading retail companies',
       'ปิดดีลสำเร็จใน 8 เดือน สร้างมูลค่าผู้ถือหุ้นเพิ่มขึ้น 34%', 'Deal closed in 8 months, created 34% shareholder value', 2023);

      INSERT INTO case_studies (title_th, title_en, sector, deal_value, description_th, description_en, result_th, result_en, deal_year) VALUES
      ('IPO บริษัทเทคโนโลยีชั้นนำ', 'Leading Tech Company IPO',
       'Technology', '฿1,800M', 'ที่ปรึกษา IPO บริษัทพัฒนาซอฟต์แวร์สำหรับอุตสาหกรรม', 'IPO advisory for industrial software company',
       'ระดมทุนได้เกินเป้า 148% oversubscribed', 'Fundraising exceeded target 148% oversubscribed', 2023);

      INSERT INTO case_studies (title_th, title_en, sector, deal_value, description_th, description_en, result_th, result_en, deal_year) VALUES
      ('ปรับโครงสร้างหนี้กลุ่มธุรกิจพลังงาน', 'Energy Group Debt Restructuring',
       'Energy', '฿8,500M', 'ปรับโครงสร้างหนี้และระดมทุนใหม่ให้กลุ่มบริษัทพลังงาน', 'Debt restructuring and refinancing for energy group',
       'ลดภาระดอกเบี้ยได้ 2.3% ต่อปี ประหยัดเงิน ฿195M ต่อปี', 'Reduced interest burden by 2.3% p.a., saving ฿195M annually', 2022);
    `)
    console.log('✅ Sample case studies seeded')
  }
}

module.exports = { db, initDB, seedAdmin, seedSampleData }
