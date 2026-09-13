const express = require('express')
const router = express.Router()
const { db } = require('../db/database')

/**
 * GET /api/cases  – ดึง case studies ทั้งหมด
 */
router.get('/', async (req, res) => {
  try {
    const result = await db.execute(
      'SELECT * FROM case_studies WHERE published = 1 ORDER BY deal_year DESC, created_at DESC'
    )
    return res.json({ success: true, data: result.rows })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'เกิดข้อผิดพลาด' })
  }
})

/**
 * GET /api/cases/:id  – ดึง case study เดียว
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM case_studies WHERE id = ? AND published = 1',
      args: [req.params.id],
    })
    if (result.rows.length === 0) return res.status(404).json({ error: 'ไม่พบข้อมูล' })
    return res.json({ success: true, data: result.rows[0] })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'เกิดข้อผิดพลาด' })
  }
})

module.exports = router
