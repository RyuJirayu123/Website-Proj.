const { createClient } = require('@libsql/client')
const bcrypt = require('bcryptjs')
const path = require('path')

// ─── สร้าง SQLite client (ไฟล์ data.db อยู่ที่ root ของ backend/) ──────────
const db = createClient({
  url: `file:${path.join(__dirname, '../../data.db')}`,
})

// ─── สร้าง Tables ─────────────────────────────────────────────────────────
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
  `)
}

// ─── สร้าง Admin เริ่มต้น (ถ้ายังไม่มี) ──────────────────────────────────
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

module.exports = { db, initDB, seedAdmin }
