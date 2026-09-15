import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  HiLogout, HiRefresh, HiTrash, HiMail,
  HiOfficeBuilding, HiPhone, HiCalendar, HiInbox,
  HiDocumentText, HiBriefcase, HiKey
} from 'react-icons/hi'
import AdminPosts from './AdminPosts'
import AdminCases from './AdminCases'
import ChangePasswordModal from './ChangePasswordModal'
import { API_URL } from '../api'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('contacts') // 'contacts' | 'posts' | 'cases'
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [admin, setAdmin] = useState(null)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const navigate = useNavigate()

  const token = localStorage.getItem('adminToken')

  const fetchContacts = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/api/admin/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.status === 401 || res.status === 403) {
        handleLogout()
        return
      }

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'ดึงข้อมูลไม่สำเร็จ')

      setContacts(data.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/admin/login')
      return
    }

    const storedUser = localStorage.getItem('adminUser')
    if (storedUser) {
      try {
        setAdmin(JSON.parse(storedUser))
      } catch (e) {
        console.error(e)
      }
    }

    fetchContacts()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    navigate('/admin/login')
  }

  const handleDelete = async (id) => {
    if (!window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?')) return

    try {
      const res = await fetch(`${API_URL}/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'ลบไม่สำเร็จ')

      setContacts((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-[#1a2332] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="w-8 h-8 bg-[#9A7B44] flex items-center justify-center font-bold text-white font-serif">
              A
            </Link>
            <div>
              <span className="font-serif font-bold text-lg">Apex Capital</span>
              <span className="text-[#9A7B44] text-xs font-semibold ml-2 px-2 py-0.5 bg-[#9A7B44]/20">
                Admin Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-white/70 text-sm hidden sm:inline">
              สวัสดี, <strong className="text-white">{admin?.username || 'Admin'}</strong>
            </span>
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white border border-white/20 hover:border-[#c9a96e] px-3 py-1.5 rounded transition-colors"
            >
              <HiKey className="text-[#c9a96e]" /> เปลี่ยนรหัสผ่าน
            </button>
            <Link
              to="/"
              className="text-xs text-white/70 hover:text-white border border-white/20 px-3 py-1.5 rounded transition-colors hidden md:inline-block"
            >
              ไปหน้าเว็บหลัก
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded transition-colors"
            >
              <HiLogout /> ออกจากระบบ
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full">
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`pb-4 px-4 font-semibold text-sm flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'contacts'
                ? 'border-[#c9a96e] text-[#1a2332]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <HiInbox className="text-lg" /> ข้อความติดต่อ ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`pb-4 px-4 font-semibold text-sm flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'posts'
                ? 'border-[#c9a96e] text-[#1a2332]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <HiDocumentText className="text-lg" /> จัดการบทความ (Insights)
          </button>
          <button
            onClick={() => setActiveTab('cases')}
            className={`pb-4 px-4 font-semibold text-sm flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'cases'
                ? 'border-[#c9a96e] text-[#1a2332]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <HiBriefcase className="text-lg" /> จัดการผลงาน (Case Studies)
          </button>
        </div>

        {/* Tab 1: Contacts */}
        {activeTab === 'contacts' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-[#1a2332]">ข้อความติดต่อจากลูกค้า</h1>
                <p className="text-gray-500 text-sm mt-1">
                  ข้อมูลผู้ที่ส่งฟอร์มติดต่อสอบถามบริการผ่านหน้าเว็บไซต์
                </p>
              </div>

              <button
                onClick={fetchContacts}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-[#c9a96e] text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors shadow-sm self-start sm:self-auto"
              >
                <HiRefresh className={loading ? 'animate-spin' : ''} /> รีเฟรชข้อมูล
              </button>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">
                ⚠️ {error}
              </div>
            )}

            {loading ? (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                <div className="inline-block w-8 h-8 border-4 border-[#c9a96e] border-t-transparent rounded-full animate-spin mb-3" />
                <p className="text-gray-500 text-sm">กำลังโหลดข้อมูลข้อความ...</p>
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                <HiInbox className="text-5xl text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">ยังไม่มีข้อความติดต่อเข้ามา</p>
                <p className="text-gray-400 text-xs mt-1">เมื่อมีผู้ส่งฟอร์ม ข้อความจะแสดงที่นี่โดยอัตโนมัติ</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <th className="py-3.5 px-6">ผู้ติดต่อ</th>
                        <th className="py-3.5 px-6">ข้อมูลติดต่อ</th>
                        <th className="py-3.5 px-6">บริการที่สนใจ</th>
                        <th className="py-3.5 px-6">ข้อความ</th>
                        <th className="py-3.5 px-6">วันที่ส่ง</th>
                        <th className="py-3.5 px-6 text-right">จัดการ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {contacts.map((c) => (
                        <tr key={c.id} className="hover:bg-gray-50/60 transition-colors">
                          <td className="py-4 px-6 align-top">
                            <div className="font-semibold text-[#1a2332]">{c.name}</div>
                            {c.company && (
                              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                                <HiOfficeBuilding className="flex-shrink-0" /> {c.company}
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-6 align-top text-xs space-y-1">
                            <div className="flex items-center gap-1.5 text-gray-600">
                              <HiMail className="text-gray-400 flex-shrink-0" />
                              <a href={`mailto:${c.email}`} className="hover:underline text-blue-600">
                                {c.email}
                              </a>
                            </div>
                            {c.phone && (
                              <div className="flex items-center gap-1.5 text-gray-600">
                                <HiPhone className="text-gray-400 flex-shrink-0" />
                                <a href={`tel:${c.phone}`} className="hover:underline">
                                  {c.phone}
                                </a>
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-6 align-top">
                            {c.service ? (
                              <span className="inline-block bg-amber-50 text-amber-800 border border-amber-200 text-xs px-2.5 py-1 rounded-full font-medium">
                                {c.service}
                              </span>
                            ) : (
                              <span className="text-gray-400 text-xs">-</span>
                            )}
                          </td>
                          <td className="py-4 px-6 align-top max-w-xs">
                            <p className="text-gray-700 text-xs whitespace-pre-wrap leading-relaxed">
                              {c.message || <span className="text-gray-400 italic">ไม่มีรายละเอียด</span>}
                            </p>
                          </td>
                          <td className="py-4 px-6 align-top text-xs text-gray-500 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <HiCalendar className="text-gray-400" />
                              {c.created_at}
                            </div>
                          </td>
                          <td className="py-4 px-6 align-top text-right whitespace-nowrap">
                            <button
                              onClick={() => handleDelete(c.id)}
                              className="text-red-500 hover:text-red-700 p-1.5 rounded hover:bg-red-50 transition-colors"
                              title="ลบรายการนี้"
                            >
                              <HiTrash className="text-lg" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Posts */}
        {activeTab === 'posts' && <AdminPosts token={token} />}

        {/* Tab 3: Cases */}
        {activeTab === 'cases' && <AdminCases token={token} />}
      </main>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        token={token}
      />
    </div>
  )
}
