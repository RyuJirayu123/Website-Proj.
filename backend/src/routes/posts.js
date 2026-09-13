const express = require('express')
const router = express.Router()
const { db } = require('../db/database')

/**
 * GET /api/posts  – ดึงบทความทั้งหมด (published เท่านั้น)
 */
router.get('/', async (req, res) => {
  try {
    const result = await db.execute(
      'SELECT id, slug, title_th, title_en, excerpt_th, excerpt_en, category, created_at FROM posts WHERE published = 1 ORDER BY created_at DESC'
    )
    return res.json({ success: true, data: result.rows })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'เกิดข้อผิดพลาด' })
  }
})

/**
 * GET /api/posts/:slug  – ดึงบทความเดียว
 */
router.get('/:slug', async (req, res) => {
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM posts WHERE slug = ? AND published = 1',
      args: [req.params.slug],
    })
    if (result.rows.length === 0) return res.status(404).json({ error: 'ไม่พบบทความ' })
    return res.json({ success: true, data: result.rows[0] })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'เกิดข้อผิดพลาด' })
  }
})

module.exports = router
