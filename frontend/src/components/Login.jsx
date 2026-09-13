import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { HiLockClosed, HiUser, HiArrowLeft } from 'react-icons/hi'

const API_URL = 'http://localhost:4000'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'เข้าสู่ระบบไม่สำเร็จ')
      }

      // บันทึก token ลง localStorage
      localStorage.setItem('adminToken', data.token)
      localStorage.setItem('adminUser', JSON.stringify(data.admin))

      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a1f44] flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#d4a017]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back to Home Link */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-[#d4a017] transition-colors text-sm"
        >
          <HiArrowLeft /> กลับหน้าหลัก
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#0a1f44] text-[#d4a017] rounded-xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-md">
            A
          </div>
          <h1 className="text-2xl font-bold text-[#0a1f44]">เข้าสู่ระบบผู้ดูแล</h1>
          <p className="text-gray-500 text-sm mt-1">Alpha Capital Advisory Admin Portal</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 text-sm rounded-lg p-3 mb-6 text-center">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              ชื่อผู้ใช้ (Username)
            </label>
            <div className="relative">
              <HiUser className="absolute left-3.5 top-3.5 text-gray-400 text-lg" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#d4a017] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              รหัสผ่าน (Password)
            </label>
            <div className="relative">
              <HiLockClosed className="absolute left-3.5 top-3.5 text-gray-400 text-lg" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#d4a017] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0a1f44] hover:bg-[#103578] disabled:opacity-60 text-white font-semibold py-3 rounded-lg text-sm transition-colors shadow-md"
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-400 border-t border-gray-100 pt-4">
          ค่าเริ่มต้น: username: <span className="font-mono text-gray-600">admin</span> | password: <span className="font-mono text-gray-600">admin1234</span>
        </div>
      </div>
    </div>
  )
}
