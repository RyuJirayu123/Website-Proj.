import React, { useState, useEffect } from 'react';
import { API_URL } from '../api';

export default function AdminCases({ token }) {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCase, setEditingCase] = useState(null);

  const initialFormState = {
    title_th: '',
    title_en: '',
    sector: '',
    deal_value: '',
    deal_year: '',
    description_th: '',
    description_en: '',
    result_th: '',
    result_en: '',
    published: '0'
  };

  const [formData, setFormData] = useState(initialFormState);

  const fetchCases = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/cases`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch cases');
      const data = await res.json();
      setCases(data.data || data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('ยืนยันการลบ?')) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/cases/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Delete failed');
      setCases(cases.filter(c => c.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (caseItem) => {
    setEditingCase(caseItem);
    setFormData({
      ...caseItem,
      published: caseItem.published ? '1' : '0'
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingCase 
        ? `${API_URL}/api/admin/cases/${editingCase.id}`
        : `${API_URL}/api/admin/cases`;
      
      const method = editingCase ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        published: formData.published === '1',
        deal_year: formData.deal_year ? parseInt(formData.deal_year, 10) : null
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
      
      await fetchCases();
      setShowForm(false);
      setEditingCase(null);
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
          {editingCase ? 'แก้ไขผลงาน' : 'สร้างผลงานใหม่'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อผลงาน (TH)</label>
              <input type="text" name="title_th" value={formData.title_th} onChange={handleInputChange} required className="border border-gray-200 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-[#c9a96e]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อผลงาน (EN)</label>
              <input type="text" name="title_en" value={formData.title_en} onChange={handleInputChange} required className="border border-gray-200 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-[#c9a96e]" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">อุตสาหกรรม</label>
              <input type="text" name="sector" value={formData.sector || ''} onChange={handleInputChange} className="border border-gray-200 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-[#c9a96e]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">มูลค่าดีล</label>
              <input type="text" name="deal_value" value={formData.deal_value || ''} onChange={handleInputChange} className="border border-gray-200 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-[#c9a96e]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ปี (พ.ศ./ค.ศ.)</label>
              <input type="number" name="deal_year" value={formData.deal_year || ''} onChange={handleInputChange} className="border border-gray-200 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-[#c9a96e]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">คำอธิบาย (TH)</label>
              <textarea name="description_th" value={formData.description_th || ''} onChange={handleInputChange} rows="3" className="border border-gray-200 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-[#c9a96e]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">คำอธิบาย (EN)</label>
              <textarea name="description_en" value={formData.description_en || ''} onChange={handleInputChange} rows="3" className="border border-gray-200 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-[#c9a96e]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ผลลัพธ์ (TH)</label>
              <textarea name="result_th" value={formData.result_th || ''} onChange={handleInputChange} rows="2" className="border border-gray-200 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-[#c9a96e]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ผลลัพธ์ (EN)</label>
              <textarea name="result_en" value={formData.result_en || ''} onChange={handleInputChange} rows="2" className="border border-gray-200 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-[#c9a96e]" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">สถานะ</label>
            <select name="published" value={formData.published} onChange={handleInputChange} className="border border-gray-200 rounded-lg px-3 py-2 w-48 text-sm focus:outline-none focus:border-[#c9a96e]">
              <option value="1">เผยแพร่</option>
              <option value="0">ฉบับร่าง</option>
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" className="bg-[#1a2332] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#2d3748]">
              บันทึก
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditingCase(null); }} className="border border-gray-300 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
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
        <h2 className="text-xl font-bold text-[#1a2332]">จัดการผลงาน (Cases)</h2>
        <button 
          onClick={() => { setFormData(initialFormState); setShowForm(true); }}
          className="bg-[#1a2332] text-white px-4 py-2 rounded text-sm hover:bg-[#2d3748]"
        >
          + สร้างผลงานใหม่
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-700">ชื่อผลงาน (TH)</th>
              <th className="px-6 py-3 font-medium text-gray-700">Sector</th>
              <th className="px-6 py-3 font-medium text-gray-700">มูลค่า</th>
              <th className="px-6 py-3 font-medium text-gray-700">ปี</th>
              <th className="px-6 py-3 font-medium text-gray-700">สถานะ</th>
              <th className="px-6 py-3 font-medium text-gray-700">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan="6" className="px-6 py-4 text-center text-gray-500">Loading...</td></tr>
            ) : cases.length === 0 ? (
              <tr><td colSpan="6" className="px-6 py-4 text-center text-gray-500">ไม่มีข้อมูล</td></tr>
            ) : (
              cases.map(caseItem => (
                <tr key={caseItem.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{caseItem.title_th}</td>
                  <td className="px-6 py-4">{caseItem.sector || '-'}</td>
                  <td className="px-6 py-4">{caseItem.deal_value || '-'}</td>
                  <td className="px-6 py-4">{caseItem.deal_year || '-'}</td>
                  <td className="px-6 py-4">
                    {caseItem.published ? (
                      <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">เผยแพร่</span>
                    ) : (
                      <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs">ฉบับร่าง</span>
                    )}
                  </td>
                  <td className="px-6 py-4 space-x-3">
                    <button onClick={() => handleEdit(caseItem)} className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button onClick={() => handleDelete(caseItem.id)} className="text-red-500 hover:text-red-700">Delete</button>
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
