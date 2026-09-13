const jwt = require('jsonwebtoken')

/**
 * Middleware ตรวจสอบ JWT Token
 * ต้องส่ง Header: Authorization: Bearer <token>
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization']

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.admin = decoded   // แนบข้อมูล admin เข้ากับ request
    next()
  } catch (err) {
    return res.status(403).json({ error: 'Forbidden: Invalid or expired token' })
  }
}

module.exports = authMiddleware
