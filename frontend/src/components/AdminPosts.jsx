import React, { useState, useEffect } from 'react';

export default function AdminPosts({ token }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const initialFormState = {
    slug: '',
    title_th: '',
    title_en: '',
    excerpt_th: '',
    excerpt_en: '',
    content_th: '',
    content_en: '',
    category: 'general',
    published: '0'
  };

  const [formData, setFormData] = useState(initialFormState);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/admin/posts', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      setPosts(data.data || data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('ยืนยันการลบ?')) return;
    try {
      const res = await fetch(`http://localhost:4000/api/admin/posts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Delete failed');
      setPosts(posts.filter(p => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      ...post,
      published: post.published ? '1' : '0'
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingPost 
        ? `http://localhost:4000/api/admin/posts/${editingPost.id}`
        : 'http://localhost:4000/api/admin/posts';
      
      const method = editingPost ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        published: formData.published === '1'
      };

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Save failed');
      
      await fetchPosts();
      setShowForm(false);
      setEditingPost(null);
      setFormData(initialFormState);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (showForm) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-[#1a2332] mb-6">
          {editingPost ? 'แก้ไขบทความ' : 'สร้างบทความใหม่'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!editingPost && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
              <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} required className="border border-gray-200 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-[#c9a96e]" />
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อบทความ (TH)</label>
              <input type="text" name="title_th" value={formData.title_th} onChange={handleInputChange} required className="border border-gray-200 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-[#c9a96e]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อบทความ (EN)</label>
              <input type="text" name="title_en" value={formData.title_en} onChange={handleInputChange} required className="border border-gray-200 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-[#c9a96e]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">สรุปย่อ (TH)</label>
              <textarea name="excerpt_th" value={formData.excerpt_th} onChange={handleInputChange} rows="2" className="border border-gray-200 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-[#c9a96e]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">สรุปย่อ (EN)</label>
              <textarea name="excerpt_en" value={formData.excerpt_en} onChange={handleInputChange} rows="2" className="border border-gray-200 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-[#c9a96e]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">เนื้อหา (TH)</label>
              <textarea name="content_th" value={formData.content_th} onChange={handleInputChange} rows="5" className="border border-gray-200 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-[#c9a96e]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">เนื้อหา (EN)</label>
              <textarea name="content_en" value={formData.content_en} onChange={handleInputChange} rows="5" className="border border-gray-200 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-[#c9a96e]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">หมวดหมู่</label>
              <select name="category" value={formData.category} onChange={handleInputChange} className="border border-gray-200 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-[#c9a96e]">
                <option value="general">General</option>
                <option value="insights">Insights</option>
                <option value="knowledge">Knowledge</option>
                <option value="guide">Guide</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">สถานะ</label>
              <select name="published" value={formData.published} onChange={handleInputChange} className="border border-gray-200 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-[#c9a96e]">
                <option value="1">เผยแพร่</option>
                <option value="0">ฉบับร่าง</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" className="bg-[#1a2332] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#2d3748]">
              บันทึก
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditingPost(null); }} className="border border-gray-300 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#1a2332]">จัดการบทความ</h2>
        <button 
          onClick={() => { setFormData(initialFormState); setShowForm(true); }}
          className="bg-[#1a2332] text-white px-4 py-2 rounded text-sm hover:bg-[#2d3748]"
        >
          + สร้างบทความใหม่
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-700">ชื่อบทความ (TH)</th>
              <th className="px-6 py-3 font-medium text-gray-700">หมวดหมู่</th>
              <th className="px-6 py-3 font-medium text-gray-700">สถานะ</th>
              <th className="px-6 py-3 font-medium text-gray-700">วันที่</th>
              <th className="px-6 py-3 font-medium text-gray-700">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">Loading...</td></tr>
            ) : posts.length === 0 ? (
              <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">ไม่มีข้อมูล</td></tr>
            ) : (
              posts.map(post => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{post.title_th}</td>
                  <td className="px-6 py-4 capitalize">{post.category}</td>
                  <td className="px-6 py-4">
                    {post.published ? (
                      <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">เผยแพร่</span>
                    ) : (
                      <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs">ฉบับร่าง</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(post.created_at || Date.now()).toLocaleDateString('th-TH')}
                  </td>
                  <td className="px-6 py-4 space-x-3">
                    <button onClick={() => handleEdit(post)} className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:text-red-700">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
