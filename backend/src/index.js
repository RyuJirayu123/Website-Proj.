require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { initDB, seedAdmin } = require('./db/database')

const contactRoutes = require('./routes/contact')
const adminRoutes  = require('./routes/admin')

const app = express()
const PORT = process.env.PORT || 4000

// ─── Middleware ───────────────────────────────────────────
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ─── Routes ───────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Alpha Capital Advisory API',
    timestamp: new Date().toISOString(),
  })
})

app.use('/api/contact', contactRoutes)
app.use('/api/admin', adminRoutes)

// 404
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err)
  res.status(500).json({ error: 'Internal Server Error' })
})

// ─── Bootstrap ────────────────────────────────────────────
async function start() {
  await initDB()      // สร้าง tables
  await seedAdmin()   // สร้าง admin เริ่มต้น

  app.listen(PORT, () => {
    console.log('')
    console.log('  🚀 Alpha Capital API is running!')
    console.log(`  ➜  Local:  http://localhost:${PORT}`)
    console.log(`  ➜  Health: http://localhost:${PORT}/api/health`)
    console.log('')
  })
}

start().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
