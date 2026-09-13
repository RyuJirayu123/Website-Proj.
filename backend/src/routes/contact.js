const express = require('express')
const router = express.Router()
const { db } = require('../db/database')

/**
 * POST /api/contact
 * รับข้อมูลจาก Contact Form และบันทึกลง DB
 */
router.post('/', async (req, res) => {
  const { name, company, email, phone, service, message } = req.body

  // Validate
  if (!name || !email) {
    return res.status(400).json({ error: 'กรุณากรอกชื่อและอีเมล' })
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'รูปแบบอีเมลไม่ถูกต้อง' })
  }

  try {
    const result = await db.execute({
      sql: `INSERT INTO contacts (name, company, email, phone, service, message)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [name, company || null, email, phone || null, service || null, message || null],
    })

    console.log(`📬 New contact from: ${name} <${email}>`)

    return res.status(201).json({
      success: true,
      message: 'ส่งข้อมูลเรียบร้อยแล้ว ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง',
      id: Number(result.lastInsertRowid),
    })
  } catch (err) {
    console.error('Contact insert error:', err)
    return res.status(500).json({ error: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' })
  }
})

module.exports = router
