import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

const Insights = () => {
  const { t, lang } = useLang();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetch('http://localhost:4000/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = ['all', 'insights', 'knowledge', 'guide', 'general'];

  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[#c9a96e] font-semibold uppercase tracking-wider text-sm">{t?.insights?.label || 'Insights'}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a2332] mt-2 mb-4">{t?.insights?.heading || 'Latest Insights'}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{t?.insights?.sub || 'Read our latest insights'}</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                activeCategory === cat
                  ? 'bg-[#1a2332] text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#c9a96e]'
              }`}
            >
              {t?.insights?.categories?.[cat] || cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center my-20">
            <div className="inline-block w-8 h-8 border-4 border-[#c9a96e] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 hover:border-[#c9a96e]/30 p-6 transition-all flex flex-col">
                <div className="mb-4">
                  <span className="bg-[#1a2332]/5 text-[#1a2332] text-xs px-2 py-0.5 rounded uppercase font-semibold">
                    {post.category || 'general'}
                  </span>
                </div>
                <h2 className="text-[#1a2332] font-bold text-lg mb-2">
                  {lang === 'th' ? post.title_th : post.title_en}
                </h2>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                  {lang === 'th' ? post.excerpt_th : post.excerpt_en}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <span className="text-xs text-gray-400">
                    {new Date(post.created_at).toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US')}
                  </span>
                  <Link to={`/insights/${post.slug}`} className="text-[#c9a96e] text-sm font-medium hover:underline">
                    {t?.insights?.readMore || 'Read more →'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            {t?.insights?.empty || 'No insights found.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights;
