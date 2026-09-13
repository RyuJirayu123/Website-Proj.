import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

const InsightDetail = () => {
  const { slug } = useParams();
  const { t, lang } = useLang();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/api/posts/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-16 flex justify-center items-center">
        <div className="inline-block w-8 h-8 border-4 border-[#c9a96e] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6 text-center py-20">
          <h1 className="text-2xl font-bold text-[#1a2332] mb-4">Post Not Found</h1>
          <Link to="/insights" className="text-[#c9a96e] hover:underline font-medium">
            {t?.insights?.backBtn || '← Back to Insights'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link to="/insights" className="inline-block mb-8 text-[#c9a96e] hover:underline font-medium">
          {t?.insights?.backBtn || '← Back to Insights'}
        </Link>
        
        <div className="mb-8">
          <span className="bg-[#1a2332]/5 text-[#1a2332] text-xs px-2 py-1 rounded uppercase font-semibold">
            {post.category || 'general'}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a2332] mt-4 mb-2">
            {lang === 'th' ? post.title_th : post.title_en}
          </h1>
          <p className="text-gray-400 text-sm">
            {new Date(post.created_at).toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US')}
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
          {lang === 'th' ? post.content_th : post.content_en}
        </div>
      </div>
    </div>
  );
};

export default InsightDetail;
