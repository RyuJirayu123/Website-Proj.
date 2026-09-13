import React, { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';

const CaseStudies = () => {
  const { t, lang } = useLang();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/api/cases')
      .then(res => res.json())
      .then(data => {
        setCases(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[#c9a96e] font-semibold uppercase tracking-wider text-sm">{t?.cases?.label || 'Case Studies'}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a2332] mt-2 mb-4">{t?.cases?.heading || 'Our Track Record'}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{t?.cases?.sub || 'Explore our successful transactions'}</p>
        </div>

        {loading ? (
          <div className="flex justify-center my-20">
            <div className="inline-block w-8 h-8 border-4 border-[#c9a96e] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : cases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 hover:border-[#c9a96e]/30 p-6 flex flex-col transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-[#1a2332] text-white text-xs px-2 py-1 rounded font-medium">
                    {lang === 'th' ? item.sector_th : item.sector_en}
                  </span>
                  <span className="text-gray-400 text-sm">{item.year}</span>
                </div>
                
                <h2 className="text-[#1a2332] font-bold text-lg mb-2">
                  {lang === 'th' ? item.title_th : item.title_en}
                </h2>
                
                {item.deal_value && (
                  <div className="flex items-center text-[#c9a96e] font-semibold mb-3">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item.deal_value}
                  </div>
                )}
                
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6">
                  {lang === 'th' ? item.description_th : item.description_en}
                </p>
                
                <div className="mt-auto">
                  <hr className="border-gray-100 mb-3" />
                  <p className="text-sm text-gray-700 italic">
                    {lang === 'th' ? item.result_th : item.result_en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            {t?.cases?.empty || 'No case studies available at the moment.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseStudies;
