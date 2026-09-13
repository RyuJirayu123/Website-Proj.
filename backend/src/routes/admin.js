const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { db } = require('../db/database')
const authMiddleware = require('../middleware/auth')

/**
 * POST /api/admin/login
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'กรุณากรอก username และ password' })
  }

  try {
    const result = await db.execute({
      sql: 'SELECT * FROM admins WHERE username = ?',
      args: [username],
    })

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'username หรือ password ไม่ถูกต้อง' })
    }

    const admin = result.rows[0]
    const isMatch = bcrypt.compareSync(password, admin.password)
    if (!isMatch) {
      return res.status(401).json({ error: 'username หรือ password ไม่ถูกต้อง' })
    }

    // JWT หมดอายุใน 8 ชั่วโมง
    const token = jwt.sign(
      { id: Number(admin.id), username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    )

    console.log(`🔐 Admin "${username}" logged in`)

    return res.json({
      success: true,
      token,
      admin: { id: Number(admin.id), username: admin.username },
    })
  } catch (err) {
    console.error('Admin login error:', err)
    return res.status(500).json({ error: 'เกิดข้อผิดพลาด' })
  }
})

/**
 * GET /api/admin/contacts
 * ดึงรายการ Contact ทั้งหมด (ต้อง login)
 */
router.get('/contacts', authMiddleware, async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM contacts ORDER BY created_at DESC')
    return res.json({
      success: true,
      total: result.rows.length,
      data: result.rows,
    })
  } catch (err) {
    console.error('Get contacts error:', err)
    return res.status(500).json({ error: 'เกิดข้อผิดพลาด' })
  }
})

/**
 * DELETE /api/admin/contacts/:id
 */
router.delete('/contacts/:id', authMiddleware, async (req, res) => {
  const { id } = req.params
  try {
    const result = await db.execute({
      sql: 'DELETE FROM contacts WHERE id = ?',
      args: [id],
    })

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'ไม่พบข้อมูล' })
    }

    console.log(`🗑️  Contact id=${id} deleted by ${req.admin.username}`)
    return res.json({ success: true, message: `ลบข้อมูล id=${id} เรียบร้อย` })
  } catch (err) {
    console.error('Delete contact error:', err)
    return res.status(500).json({ error: 'เกิดข้อผิดพลาด' })
  }
})

module.exports = router
