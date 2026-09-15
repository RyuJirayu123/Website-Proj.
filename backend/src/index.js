require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { initDB, seedAdmin, seedSampleData } = require('./db/database')

const contactRoutes = require('./routes/contact')
const adminRoutes  = require('./routes/admin')
const postsRoutes  = require('./routes/posts')
const casesRoutes  = require('./routes/cases')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ─── Routes ───────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Apex Capital Advisory API', timestamp: new Date().toISOString() })
})

app.use('/api/contact', contactRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/cases', casesRoutes)
app.use('/api/admin', adminRoutes)

app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` })
})

app.use((err, req, res, next) => {
  console.error('❌ Server error:', err)
  res.status(500).json({ error: 'Internal Server Error' })
})

// ─── Bootstrap ────────────────────────────────────────────────────
async function start() {
  await initDB()
  await seedAdmin()
  await seedSampleData()

  app.listen(PORT, () => {
    console.log('')
    console.log('  🚀 Apex Capital API is running!')
    console.log(`  ➜  Local:  http://localhost:${PORT}`)
    console.log(`  ➜  Health: http://localhost:${PORT}/api/health`)
    console.log(`  ➜  Posts:  http://localhost:${PORT}/api/posts`)
    console.log(`  ➜  Cases:  http://localhost:${PORT}/api/cases`)
    console.log('')
  })
}

start().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
