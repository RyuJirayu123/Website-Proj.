const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { db } = require('../db/database')
const authMiddleware = require('../middleware/auth')

// ─── AUTH ───────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password)
    return res.status(400).json({ error: 'กรุณากรอก username และ password' })

  try {
    const result = await db.execute({ sql: 'SELECT * FROM admins WHERE username = ?', args: [username] })
    if (result.rows.length === 0)
      return res.status(401).json({ error: 'username หรือ password ไม่ถูกต้อง' })

    const admin = result.rows[0]
    if (!bcrypt.compareSync(password, admin.password))
      return res.status(401).json({ error: 'username หรือ password ไม่ถูกต้อง' })

    const token = jwt.sign({ id: Number(admin.id), username: admin.username }, process.env.JWT_SECRET, { expiresIn: '8h' })
    console.log(`🔐 Admin "${username}" logged in`)
    return res.json({ success: true, token, admin: { id: Number(admin.id), username: admin.username } })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'เกิดข้อผิดพลาด' })
  }
})

// ─── CHANGE PASSWORD ────────────────────────────────────────
router.put('/change-password', authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body
  if (!currentPassword || !newPassword)
    return res.status(400).json({ error: 'กรุณากรอกรหัสผ่านเดิมและใหม่' })
  if (newPassword.length < 6)
    return res.status(400).json({ error: 'รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร' })

  try {
    const result = await db.execute({ sql: 'SELECT * FROM admins WHERE id = ?', args: [req.admin.id] })
    const admin = result.rows[0]
    if (!bcrypt.compareSync(currentPassword, admin.password))
      return res.status(401).json({ error: 'รหัสผ่านเดิมไม่ถูกต้อง' })

    const hashed = bcrypt.hashSync(newPassword, 10)
    await db.execute({ sql: 'UPDATE admins SET password = ? WHERE id = ?', args: [hashed, req.admin.id] })
    console.log(`🔑 Admin "${req.admin.username}" changed password`)
    return res.json({ success: true, message: 'เปลี่ยนรหัสผ่านเรียบร้อยแล้ว' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'เกิดข้อผิดพลาด' })
  }
})

// ─── CONTACTS ───────────────────────────────────────────────
router.get('/contacts', authMiddleware, async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM contacts ORDER BY created_at DESC')
    return res.json({ success: true, total: result.rows.length, data: result.rows })
  } catch (err) {
    return res.status(500).json({ error: 'เกิดข้อผิดพลาด' })
  }
})

router.delete('/contacts/:id', authMiddleware, async (req, res) => {
  try {
    const result = await db.execute({ sql: 'DELETE FROM contacts WHERE id = ?', args: [req.params.id] })
    if (result.rowsAffected === 0) return res.status(404).json({ error: 'ไม่พบข้อมูล' })
    return res.json({ success: true, message: `ลบข้อมูลเรียบร้อย` })
  } catch (err) {
    return res.status(500).json({ error: 'เกิดข้อผิดพลาด' })
  }
})

// ─── POSTS CRUD ─────────────────────────────────────────────
router.get('/posts', authMiddleware, async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM posts ORDER BY created_at DESC')
    return res.json({ success: true, data: result.rows })
  } catch (err) {
    return res.status(500).json({ error: 'เกิดข้อผิดพลาด' })
  }
})

router.post('/posts', authMiddleware, async (req, res) => {
  const { slug, title_th, title_en, excerpt_th, excerpt_en, content_th, content_en, category, published } = req.body
  if (!slug || !title_th || !title_en) return res.status(400).json({ error: 'กรุณากรอก slug, title_th, title_en' })
  try {
    const result = await db.execute({
      sql: `INSERT INTO posts (slug, title_th, title_en, excerpt_th, excerpt_en, content_th, content_en, category, published)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [slug, title_th, title_en, excerpt_th || null, excerpt_en || null, content_th || null, content_en || null, category || 'general', published !== undefined ? published : 1],
    })
    return res.status(201).json({ success: true, id: Number(result.lastInsertRowid) })
  } catch (err) {
    if (err.message?.includes('UNIQUE')) return res.status(400).json({ error: 'Slug นี้มีอยู่แล้ว' })
    return res.status(500).json({ error: 'เกิดข้อผิดพลาด' })
  }
})

router.put('/posts/:id', authMiddleware, async (req, res) => {
  const { title_th, title_en, excerpt_th, excerpt_en, content_th, content_en, category, published } = req.body
  try {
    await db.execute({
      sql: `UPDATE posts SET title_th=?, title_en=?, excerpt_th=?, excerpt_en=?, content_th=?, content_en=?, category=?, published=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`,
      args: [title_th, title_en, excerpt_th, excerpt_en, content_th, content_en, category, published, req.params.id],
    })
    return res.json({ success: true })
  } catch (err) {
    return res.status(500).json({ error: 'เกิดข้อผิดพลาด' })
  }
})

router.delete('/posts/:id', authMiddleware, async (req, res) => {
  try {
    await db.execute({ sql: 'DELETE FROM posts WHERE id = ?', args: [req.params.id] })
    return res.json({ success: true })
  } catch (err) {
    return res.status(500).json({ error: 'เกิดข้อผิดพลาด' })
  }
})

// ─── CASE STUDIES CRUD ──────────────────────────────────────
router.get('/cases', authMiddleware, async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM case_studies ORDER BY deal_year DESC, created_at DESC')
    return res.json({ success: true, data: result.rows })
  } catch (err) {
    return res.status(500).json({ error: 'เกิดข้อผิดพลาด' })
  }
})

router.post('/cases', authMiddleware, async (req, res) => {
  const { title_th, title_en, sector, deal_value, description_th, description_en, result_th, result_en, deal_year, published } = req.body
  if (!title_th || !title_en) return res.status(400).json({ error: 'กรุณากรอกชื่อผลงาน' })
  try {
    const r = await db.execute({
      sql: `INSERT INTO case_studies (title_th, title_en, sector, deal_value, description_th, description_en, result_th, result_en, deal_year, published)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [title_th, title_en, sector || null, deal_value || null, description_th || null, description_en || null, result_th || null, result_en || null, deal_year || null, published !== undefined ? published : 1],
    })
    return res.status(201).json({ success: true, id: Number(r.lastInsertRowid) })
  } catch (err) {
    return res.status(500).json({ error: 'เกิดข้อผิดพลาด' })
  }
})

router.put('/cases/:id', authMiddleware, async (req, res) => {
  const { title_th, title_en, sector, deal_value, description_th, description_en, result_th, result_en, deal_year, published } = req.body
  try {
    await db.execute({
      sql: `UPDATE case_studies SET title_th=?, title_en=?, sector=?, deal_value=?, description_th=?, description_en=?, result_th=?, result_en=?, deal_year=?, published=? WHERE id=?`,
      args: [title_th, title_en, sector, deal_value, description_th, description_en, result_th, result_en, deal_year, published, req.params.id],
    })
    return res.json({ success: true })
  } catch (err) {
    return res.status(500).json({ error: 'เกิดข้อผิดพลาด' })
  }
})

router.delete('/cases/:id', authMiddleware, async (req, res) => {
  try {
    await db.execute({ sql: 'DELETE FROM case_studies WHERE id = ?', args: [req.params.id] })
    return res.json({ success: true })
  } catch (err) {
    return res.status(500).json({ error: 'เกิดข้อผิดพลาด' })
  }
})

module.exports = router
