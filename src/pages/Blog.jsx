import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { blogArticles, blogCategories } from '../data/blogArticles.js';
import { blogArticlesHindi, blogCategoriesHindi } from '../data/blogArticlesHindi.js';
import { blogArticlesPunjabi, blogCategoriesPunjabi } from '../data/blogArticlesPunjabi.js';
import SeoHead from '../components/SeoHead';

export default function Blog({ onOpenApplyModal }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language ? i18n.language.substring(0, 2) : 'en';
  const isHi = currentLang === 'hi';
  const isPa = currentLang === 'pa';

  const defaultCategory = isHi ? 'सभी लेख' : isPa ? 'ਸਾਰੇ ਲੇਖ' : 'All Articles';
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [searchTerm, setSearchTerm] = useState('');

  const activeArticles = isHi ? blogArticlesHindi : isPa ? blogArticlesPunjabi : blogArticles;
  const activeCategories = isHi ? blogCategoriesHindi : isPa ? blogCategoriesPunjabi : blogCategories;
  const allCategoryLabel = isHi ? 'सभी लेख' : isPa ? 'ਸਾਰੇ ਲੇਖ' : 'All Articles';

  useEffect(() => {
    setSelectedCategory(isHi ? 'सभी लेख' : isPa ? 'ਸਾਰੇ ਲੇਖ' : 'All Articles');
  }, [isHi, isPa]);

  const getLocalePath = (path) => {
    if (currentLang === 'en') return path;
    if (path === '/') return `/${currentLang}`;
    return `/${currentLang}${path.startsWith('/') ? path : '/' + path}`;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredArticle = activeArticles.find(a => a.isFeatured) || activeArticles[0];

  const filteredArticles = activeArticles.filter(article => {
    const matchesCategory = selectedCategory === allCategoryLabel || article.category === selectedCategory;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = !term || 
      article.title.toLowerCase().includes(term) ||
      article.excerpt.toLowerCase().includes(term) ||
      article.category.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  // When on 'All Articles' with no search term, feature the top article separately
  const gridArticles = (selectedCategory === allCategoryLabel && !searchTerm.trim())
    ? filteredArticles.filter(a => !a.isFeatured)
    : filteredArticles;

  const breadcrumbs = [
    { name: isHi ? 'होम' : isPa ? 'ਹੋਮ' : 'Home', path: getLocalePath('/') },
    { name: isHi ? 'Loan Aasra ब्लॉग' : isPa ? 'Loan Aasra ਬਲੌਗ' : 'Loan Aasra Journal', path: getLocalePath('/blog') }
  ];

  const getBlogTitle = () => {
    if (isHi) return 'Loan Aasra ब्लॉग | लोन, ईएमआई और बचत की आसान जानकारी';
    if (isPa) return 'Loan Aasra ਬਲੌਗ | ਲੋਨ, ਕਿਸ਼ਤਾਂ ਅਤੇ ਬੱਚਤ ਦੀ ਸੌਖੀ ਜਾਣਕਾਰੀ';
    return t('seo.blogTitle', 'Loan Aasra Journal | Practical Insights on Loans, EMIs & Wealth');
  };

  const getBlogDesc = () => {
    if (isHi) return 'पर्सनल लोन, ब्याज दर, सिबिल स्कोर और सही लोन चुनने के आसान टिप्स। सीधे और सरल शब्दों में समझें।';
    if (isPa) return 'ਪਰਸਨਲ ਲੋਨ, ਵਿਆਜ ਦਰ, ਸਿਬਿਲ ਸਕੋਰ ਅਤੇ ਸਹੀ ਲੋਨ ਚੁਣਨ ਦੇ ਸੌਖੇ ਨੁਕਤੇ। ਸਿੱਧੇ ਅਤੇ ਸਾਦੇ ਸ਼ਬਦਾਂ ਵਿੱਚ ਸਮਝੋ।';
    return t('seo.blogDesc', 'Expert articles on personal finance, loan balance transfers, debt consolidation, CIBIL score optimization, and banking transparency in India.');
  };

  return (
    <main className="blog-page">
      <SeoHead 
        title={getBlogTitle()}
        description={getBlogDesc()}
        breadcrumbs={breadcrumbs}
      />

      {/* Breadcrumbs Navigation */}
      <nav className="breadcrumbs-bar" aria-label="Breadcrumb">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ul className="breadcrumbs">
            <li><Link to={getLocalePath('/')}>{isHi ? 'होम' : isPa ? 'ਹੋਮ' : 'Home'}</Link></li>
            <li className="separator">›</li>
            <li className="current" aria-current="page">{isHi ? 'Loan Aasra ब्लॉग' : isPa ? 'Loan Aasra ਬਲੌਗ' : 'Loan Aasra Journal'}</li>
          </ul>

          <Link 
            to={getLocalePath('/')} 
            className="btn btn-outline btn-small"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '6px 14px', 
              fontSize: '0.82rem',
              borderRadius: '9999px',
              textDecoration: 'none'
            }}
          >
            {isHi ? '← होम पर वापस जाएं' : isPa ? '← ਹੋਮ ਪੇਜ ਤੇ ਜਾਓ' : '← Back to Home'}
          </Link>
        </div>
      </nav>

      {/* Editorial Blog Container */}
      <section className="blog-editorial-section" style={{ borderTop: 'none', paddingTop: '48px' }}>
        <div className="container">
          {/* Blog Hero Header */}
          <div className="blog-editorial-head">
            <span className="eyebrow">{isHi ? 'LOAN AASRA ब्लॉग' : isPa ? 'LOAN AASRA ਬਲੌਗ' : 'LOAN AASRA JOURNAL'}</span>
            <h2>
              {isHi ? (
                <>पैसों और लोन से जुड़े <span className="text-gradient-blue">सही फैसले लें।</span></>
              ) : isPa ? (
                <>ਪੈਸਿਆਂ ਅਤੇ ਲੋਨ ਨਾਲ ਜੁੜੇ <span className="text-gradient-blue">ਸਹੀ ਫ਼ੈਸਲੇ ਲਵੋ।</span></>
              ) : (
                <>Make Smarter <span className="text-gradient-blue">Financial Decisions.</span></>
              )}
            </h2>
            <p>
              {isHi 
                ? 'लोन, ब्याज और ईएमआई से जुड़ी काम की जानकारी, ताकि आप बिना किसी उलझन के सही फैसला ले सकें।' 
                : isPa 
                ? 'ਲੋਨ, ਵਿਆਜ ਅਤੇ ਮਹੀਨਾਵਾਰ ਕਿਸ਼ਤ ਨਾਲ ਜੁੜੀ ਕੰਮ ਦੀ ਜਾਣਕਾਰੀ, ਤਾਂ ਜੋ ਤੁਸੀਂ ਬਿਨਾਂ ਕਿਸੇ ਉਲਝਣ ਦੇ ਸਹੀ ਫ਼ੈਸਲਾ ਲੈ ਸਕੋ।'
                : 'Practical insights on loans, EMIs, and financial planning to help you move forward with confidence.'}
            </p>
          </div>

          {/* Featured Article Card (Shown in 'All Articles' view without search) */}
          {selectedCategory === allCategoryLabel && !searchTerm.trim() && featuredArticle && (
            <article className="featured-article-card" aria-label="Featured Article">
              <Link to={getLocalePath(`/blog/${featuredArticle.slug}`)} className="featured-media-link" tabIndex={-1}>
                <img 
                  src={featuredArticle.coverImage} 
                  alt={featuredArticle.imageAlt || featuredArticle.title} 
                  loading="lazy" 
                />
                <span className="featured-pill-tag">{isHi ? 'खास जानकारी' : isPa ? 'ਖ਼ਾਸ ਜਾਣਕਾਰੀ' : 'Featured Insight'}</span>
              </Link>

              <div className="featured-content-pane">
                <div className="featured-meta-bar">
                  <span className="category-label">{featuredArticle.category}</span>
                  <span>•</span>
                  <span>{featuredArticle.readTime}</span>
                </div>

                <h3 className="featured-title">
                  <Link to={getLocalePath(`/blog/${featuredArticle.slug}`)}>
                    {featuredArticle.title}
                  </Link>
                </h3>

                <p className="featured-excerpt">
                  {featuredArticle.excerpt}
                </p>

                <div className="featured-author-row">
                  <div className="featured-author-info">
                    <div className="author-circle" aria-hidden="true">
                      {featuredArticle.author.charAt(0)}
                    </div>
                    <div className="author-meta-text">
                      <strong>{featuredArticle.author}</strong>
                      <span>{featuredArticle.date}</span>
                    </div>
                  </div>

                  <Link to={getLocalePath(`/blog/${featuredArticle.slug}`)} className="read-article-link">
                    {isHi ? 'पूरा लेख पढ़ें' : isPa ? 'ਪੂਰਾ ਲੇਖ ਪੜ੍ਹੋ' : 'Read Article'} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          )}

          {/* Category Filter Chips & Search Bar */}
          <div className="blog-controls-bar">
            <div className="category-filter-chips" role="tablist" aria-label="Filter articles by category">
              {activeCategories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="blog-search-box">
              <input
                type="text"
                className="blog-search-input"
                placeholder={isHi ? 'लेख या विषय खोजें...' : isPa ? 'ਲੇਖ ਜਾਂ ਵਿਸ਼ਾ ਲੱਭੋ...' : 'Search articles or topics...'}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                aria-label="Search articles"
              />
              {searchTerm && (
                <button 
                  type="button" 
                  className="search-clear-btn" 
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Results Summary / Count */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.86rem', color: '#64748B', fontWeight: 600 }}>
              {isHi ? (
                `कुल ${filteredArticles.length} लेख उपलब्ध${selectedCategory !== allCategoryLabel ? ` ("${selectedCategory}" में)` : ''}${searchTerm ? ` ("${searchTerm}" के लिए)` : ''}`
              ) : isPa ? (
                `ਕੁੱਲ ${filteredArticles.length} ਲੇਖ ਉਪਲਬਧ${selectedCategory !== allCategoryLabel ? ` ("${selectedCategory}" ਵਿੱਚ)` : ''}${searchTerm ? ` ("${searchTerm}" ਲਈ)` : ''}`
              ) : (
                `Showing ${filteredArticles.length} ${filteredArticles.length === 1 ? 'article' : 'articles'}${selectedCategory !== allCategoryLabel ? ` in "${selectedCategory}"` : ''}${searchTerm ? ` matching "${searchTerm}"` : ''}`
              )}
            </span>

            {(selectedCategory !== allCategoryLabel || searchTerm) && (
              <button
                type="button"
                className="text-link"
                style={{ fontSize: '0.82rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onClick={() => {
                  setSelectedCategory(allCategoryLabel);
                  setSearchTerm('');
                }}
              >
                {isHi ? 'सभी फिल्टर हटाएं' : isPa ? 'ਸਾਰੇ ਫਿਲਟਰ ਹਟਾਓ' : 'Reset filters'}
              </button>
            )}
          </div>

          {/* Article Cards Grid */}
          {gridArticles.length > 0 ? (
            <div className="editorial-cards-grid">
              {gridArticles.map(article => (
                <article key={article.id} className="editorial-card">
                  <Link to={getLocalePath(`/blog/${article.slug}`)} className="editorial-card-art" tabIndex={-1}>
                    <img 
                      src={article.coverImage} 
                      alt={article.imageAlt || article.title} 
                      loading="lazy" 
                    />
                    <span className="editorial-badge">{article.category}</span>
                  </Link>

                  <div className="editorial-card-body">
                    <div className="editorial-meta-row">
                      <time dateTime={article.date}>{article.date}</time>
                      <span className="dot" aria-hidden="true">•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="editorial-card-title">
                      <Link to={getLocalePath(`/blog/${article.slug}`)}>{article.title}</Link>
                    </h3>

                    <p className="editorial-card-excerpt">
                      {article.excerpt}
                    </p>

                    <div className="editorial-card-footer">
                      <Link to={getLocalePath(`/blog/${article.slug}`)} className="read-article-link">
                        {isHi ? 'पूरा लेख पढ़ें' : isPa ? 'ਪੂਰਾ ਲੇਖ ਪੜ੍ਹੋ' : 'Read Article'} <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="blog-empty-state">
              <h3>{isHi ? 'कोई लेख नहीं मिला' : isPa ? 'ਕੋਈ ਲੇਖ ਨਹੀਂ ਮਿਲਿਆ' : 'No articles found'}</h3>
              <p>{isHi ? 'आपकी खोज के अनुसार कोई लेख नहीं मिला। कृपया दूसरा शब्द खोजें।' : isPa ? 'ਤੁਹਾਡੀ ਖੋਜ ਮੁਤਾਬਕ ਕੋਈ ਲੇਖ ਨਹੀਂ ਮਿਲਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਕੋਈ ਹੋਰ ਸ਼ਬਦ ਲਿਖੋ।' : "We couldn't find any articles matching your search or category filter."}</p>
              <button
                type="button"
                className="btn btn-outline btn-small"
                onClick={() => {
                  setSelectedCategory(allCategoryLabel);
                  setSearchTerm('');
                }}
              >
                {isHi ? 'सभी लेख देखें' : isPa ? 'ਸਾਰੇ ਲੇਖ ਦੇਖੋ' : 'View All Articles'}
              </button>
            </div>
          )}

          {/* Advisory & Eligibility Callout */}
          <div className="article-bottom-banner" style={{ marginTop: '72px', marginBottom: '0' }}>
            <div>
              <span className="eyebrow">{isHi ? 'लोन विशेषज्ञों की मुफ्त सलाह' : isPa ? 'ਲੋਨ ਮਾਹਰਾਂ ਦੀ ਮੁਫ਼ਤ ਸਲਾਹ' : 'Expert Financial Guidance'}</span>
              <h3>{isHi ? 'लोन या किस्तों को लेकर कोई सवाल है?' : isPa ? 'ਲੋਨ ਜਾਂ ਕਿਸ਼ਤਾਂ ਨੂੰ ਲੈ ਕੇ ਕੋਈ ਸਵਾਲ ਹੈ?' : 'Have questions about borrowing or loan eligibility?'}</h3>
              <p>{isHi ? 'बिना किसी छिपे शुल्क के पारदर्शी लोन विकल्प देखें और कुछ ही मिनटों में अपनी पात्रता जानें।' : isPa ? 'ਬਿਨਾਂ ਕਿਸੇ ਲੁਕਵੀਂ ਫੀਸ ਦੇ ਪਾਰਦਰਸ਼ੀ ਲੋਨ ਵਿਕਲਪ ਦੇਖੋ ਅਤੇ ਮਿੰਟਾਂ ਵਿੱਚ ਆਪਣੀ ਯੋਗਤਾ ਜਾਣੋ।' : 'Compare transparent loan products with zero hidden fees and check your pre-approved options in minutes.'}</p>
            </div>
            <div className="banner-actions">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => onOpenApplyModal(isHi ? 'सामान्य पूछताछ' : isPa ? 'ਆਮ ਪੁੱਛਗਿੱਛ' : 'General Inquiry')}
              >
                {isHi ? 'जानें कि आप योग्य हैं या नहीं ↗' : isPa ? 'ਯੋਗਤਾ ਜਾਣੋ ↗' : 'Check Eligibility ↗'}
              </button>
              <Link to={getLocalePath('/#calculators')} className="btn btn-outline">
                {isHi ? 'कैलकुलेटर इस्तेमाल करें' : isPa ? 'ਕੈਲਕੁਲੇਟਰ ਵਰਤੋ' : 'Use Calculators'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
