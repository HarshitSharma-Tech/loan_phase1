import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { blogArticles } from '../data/blogArticles.js';
import { blogArticlesHindi } from '../data/blogArticlesHindi.js';
import { blogArticlesPunjabi } from '../data/blogArticlesPunjabi.js';
import SeoHead from '../components/SeoHead';

export default function ArticleDetail({ onOpenApplyModal }) {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();

  const currentLang = i18n.language ? i18n.language.substring(0, 2) : 'en';
  const isHi = currentLang === 'hi';
  const isPa = currentLang === 'pa';

  const getLocalePath = (path) => {
    if (currentLang === 'en') return path;
    if (path === '/') return `/${currentLang}`;
    return `/${currentLang}${path.startsWith('/') ? path : '/' + path}`;
  };

  // Find active articles based on language
  const activeArticles = isHi ? blogArticlesHindi : isPa ? blogArticlesPunjabi : blogArticles;

  // Find article by slug or default to first
  const article = activeArticles.find(a => a.slug === slug) || activeArticles[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article]);

  // Find related articles
  const relatedArticles = activeArticles
    .filter(a => a.id !== article.id && (article.relatedSlugs?.includes(a.slug) || a.category === article.category))
    .slice(0, 3);

  const breadcrumbs = [
    { name: isHi ? 'होम' : isPa ? 'ਹੋਮ' : 'Home', path: getLocalePath('/') },
    { name: isHi ? 'Loan Aasra ब्लॉग' : isPa ? 'Loan Aasra ਬਲੌਗ' : 'Loan Aasra Journal', path: getLocalePath('/blog') },
    { name: article.title, path: getLocalePath(`/blog/${article.slug}`) }
  ];

  return (
    <main className="article-detail-page">
      <SeoHead 
        title={`${article.title} | ${isHi ? 'Loan Aasra ब्लॉग' : isPa ? 'Loan Aasra ਬਲੌਗ' : 'Loan Aasra Journal'}`}
        description={article.excerpt}
        breadcrumbs={breadcrumbs}
      />

      {/* Top Breadcrumb Navigation */}
      <nav className="breadcrumbs-bar" aria-label="Breadcrumb">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ul className="breadcrumbs">
            <li><Link to={getLocalePath('/')}>{isHi ? 'होम' : isPa ? 'ਹੋਮ' : 'Home'}</Link></li>
            <li className="separator">›</li>
            <li><Link to={getLocalePath('/blog')}>{isHi ? 'ब्लॉग' : isPa ? 'ਬਲੌਗ' : 'Journal'}</Link></li>
            <li className="separator">›</li>
            <li className="current" aria-current="page">{article.category}</li>
          </ul>

          <Link 
            to={getLocalePath('/blog')} 
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
            {isHi ? '← ब्लॉग पर वापस जाएं' : isPa ? '← ਬਲੌਗ ਤੇ ਵਾਪਸ ਜਾਓ' : '← Back to Journal'}
          </Link>
        </div>
      </nav>

      {/* Article Editorial Header */}
      <article className="article-container container" itemScope itemType="https://schema.org/Article">
        <header className="article-header">
          <div className="article-category-badge">{article.category}</div>
          <h1 className="article-title" itemProp="headline">{article.title}</h1>
          <p className="article-lead-text">{article.excerpt}</p>

          <div className="article-meta-row">
            <div className="article-author-info">
              <div className="article-author-avatar">
                <span>{article.author.charAt(0)}</span>
              </div>
              <div>
                <strong className="article-author-name" itemProp="author">{article.author}</strong>
                <span className="article-author-role">{article.authorRole || (isHi ? 'लोन सलाहकार' : isPa ? 'ਲੋਨ ਸਲਾਹਕਾਰ' : 'Financial Insights Desk')}</span>
              </div>
            </div>

            <div className="article-meta-timing">
              <time dateTime={article.date} itemProp="datePublished">{article.date}</time>
              <span className="dot-sep">•</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </header>

        {/* Hero Cover Image */}
        <div className="article-hero-media">
          <img 
            src={article.coverImage} 
            alt={article.imageAlt || article.title} 
            className="article-hero-img"
            loading="eager"
            itemProp="image"
          />
          {article.imageAlt && (
            <p className="article-hero-caption">{article.imageAlt}</p>
          )}
        </div>

        {/* Main Article Body */}
        <div className="article-body-wrapper">
          <div className="article-body" itemProp="articleBody">
            {article.content && article.content.map((block, idx) => {
              switch (block.type) {
                case 'lead':
                  return <p key={idx} className="body-lead">{block.text}</p>;
                case 'heading':
                  return block.level === 3 ? (
                    <h3 key={idx} className="article-h3">{block.text}</h3>
                  ) : (
                    <h2 key={idx} className="article-h2">{block.text}</h2>
                  );
                case 'paragraph':
                  return <p key={idx} className="body-para">{block.text}</p>;
                case 'callout':
                  return (
                    <aside key={idx} className="article-callout-box">
                      <div className="callout-icon">💡</div>
                      <div>
                        {block.title && <h4 className="callout-title">{block.title}</h4>}
                        <p className="callout-text">{block.text}</p>
                      </div>
                    </aside>
                  );
                case 'table':
                  return (
                    <div key={idx} className="article-table-container">
                      {block.caption && <div className="table-caption">{block.caption}</div>}
                      <table className="article-table">
                        <thead>
                          <tr>
                            {block.headers.map((h, hIdx) => (
                              <th key={hIdx}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {block.rows.map((row, rIdx) => (
                            <tr key={rIdx}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                case 'checklist':
                  return (
                    <div key={idx} className="article-checklist-card">
                      {block.title && <h4 className="checklist-title">{block.title}</h4>}
                      <ul className="checklist-items">
                        {block.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <span className="check-bullet">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>

          {/* Actionable Sidebar / Floating Callout */}
          <aside className="article-sidebar">
            <div className="sidebar-sticky-box">
              <div className="sidebar-card action-card">
                <span className="eyebrow" style={{ fontSize: '0.72rem', letterSpacing: '0.12em' }}>
                  {isHi ? 'LOAN AASRA टूल' : isPa ? 'LOAN AASRA ਟੂਲ' : 'Loan Aasra Tools'}
                </span>
                <h4>{isHi ? 'सटीक ईएमआई जानना चाहते हैं?' : isPa ? 'ਸਹੀ ਮਹੀਨਾਵਾਰ ਕਿਸ਼ਤ (EMI) ਜਾਣਨਾ ਚਾਹੁੰਦੇ ਹੋ?' : 'Need an accurate EMI estimate?'}</h4>
                <p>
                  {isHi 
                    ? 'बैंक से बात करने से पहले हमारे आसान ईएमआई कैलकुलेटर से अपनी मासिक किस्त जानें।' 
                    : isPa
                    ? 'ਬੈਂਕ ਨਾਲ ਗੱਲ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਸਾਡੇ ਸੌਖੇ ਕਿਸ਼ਤ ਕੈਲਕੁਲੇਟਰ ਨਾਲ ਆਪਣੀ ਮਹੀਨਾਵਾਰ ਕਿਸ਼ਤ ਜਾਣੋ।'
                    : 'Run the numbers with our instant reducing-balance calculator before speaking to lenders.'}
                </p>
                <Link to={getLocalePath('/#calculators')} className="btn btn-primary btn-block" style={{ marginTop: '14px' }}>
                  {isHi ? 'ईएमआई कैलकुलेटर खोलें →' : isPa ? 'ਕਿਸ਼ਤ ਕੈਲਕੁਲੇਟਰ ਖੋਲ੍ਹੋ →' : 'Open EMI Calculator →'}
                </Link>
                <button 
                  type="button" 
                  className="btn btn-outline btn-block" 
                  style={{ marginTop: '8px' }}
                  onClick={() => onOpenApplyModal(isHi ? 'सामान्य पूछताछ' : isPa ? 'ਆਮ ਪੁੱਛਗਿੱਛ' : 'General Inquiry')}
                >
                  {isHi ? 'जानें कि आप योग्य हैं या नहीं ↗' : isPa ? 'ਯੋਗਤਾ ਜਾਣੋ ↗' : 'Check Eligibility ↗'}
                </button>
              </div>

              {article.relatedLoans && article.relatedLoans.length > 0 && (
                <div className="sidebar-card">
                  <span className="eyebrow" style={{ fontSize: '0.72rem', letterSpacing: '0.12em' }}>
                    {isHi ? 'संबंधित लोन विकल्प' : isPa ? 'ਸੰਬੰਧਿਤ ਲੋਨ ਵਿਕਲਪ' : 'Related Loan Options'}
                  </span>
                  <ul className="sidebar-loan-links">
                    {article.relatedLoans.map((loan, idx) => (
                      <li key={idx}>
                        <Link to={getLocalePath(`/${loan.slug}`)}>
                          <strong>{loan.name}</strong>
                          <span className="arrow-link">{isHi ? 'पूरी जानकारी देखें →' : isPa ? 'ਪੂਰੀ ਜਾਣਕਾਰੀ ਦੇਖੋ →' : 'View details →'}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Contextual Bottom Action Banner */}
        <div className="article-bottom-banner">
          <div>
            <span className="eyebrow">{isHi ? 'स्पष्ट और पारदर्शी लोन' : isPa ? 'ਸਾਫ਼ ਅਤੇ ਪਾਰਦਰਸ਼ੀ ਲੋਨ' : 'Clear Lending Information'}</span>
            <h3>{isHi ? 'अपनी ज़रूरत के अनुसार सही लोन चुनना चाहते हैं?' : isPa ? 'ਆਪਣੀ ਲੋੜ ਮੁਤਾਬਕ ਸਹੀ ਲੋਨ ਚੁਣਨਾ ਚਾਹੁੰਦੇ ਹੋ?' : 'Ready to explore tailored financing options?'}</h3>
            <p>{isHi ? 'बिना किसी छिपे शुल्क और पूरी स्पष्टता के साथ हमारे भरोसेमंद लोन विकल्प देखें।' : isPa ? 'ਬਿਨਾਂ ਕਿਸੇ ਲੁਕਵੀਂ ਫੀਸ ਅਤੇ ਪੂਰੀ ਸਪਸ਼ਟਤਾ ਨਾਲ ਸਾਡੇ ਭਰੋਸੇਮੰਦ ਲੋਨ ਵਿਕਲਪ ਦੇਖੋ।' : 'Compare transparent loan products with no hidden charges and complete policy clarity.'}</p>
          </div>
          <div className="banner-actions">
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => onOpenApplyModal(isHi ? 'सामान्य पूछताछ' : isPa ? 'ਆਮ ਪੁੱਛਗਿੱਛ' : 'General Inquiry')}
            >
              {isHi ? 'जानें कि आप योग्य हैं या नहीं ↗' : isPa ? 'ਯੋਗਤਾ ਜਾਣੋ ↗' : 'Check Eligibility ↗'}
            </button>
            <Link to={getLocalePath('/#loans')} className="btn btn-outline">
              {isHi ? 'सभी लोन देखें' : isPa ? 'ਸਾਰੇ ਲੋਨ ਦੇਖੋ' : 'Compare All Loans'}
            </Link>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="article-related-section">
            <div className="related-head">
              <div>
                <span className="eyebrow">{isHi ? 'और भी पढ़ें' : isPa ? 'ਹੋਰ ਵੀ ਪੜ੍ਹੋ' : 'Continue Reading'}</span>
                <h2>
                  {isHi ? (
                    <>काम के <span className="text-gradient-blue">अन्य लेख</span></>
                  ) : isPa ? (
                    <>ਕੰਮ ਦੇ <span className="text-gradient-blue">ਹੋਰ ਲੇਖ</span></>
                  ) : (
                    <>Related <span className="text-gradient-blue">Articles</span></>
                  )}
                </h2>
              </div>
              <Link to={getLocalePath('/blog')} className="text-link">
                {isHi ? 'सभी लेख देखें →' : isPa ? 'ਸਾਰੇ ਲੇਖ ਦੇਖੋ →' : 'View all journal articles →'}
              </Link>
            </div>

            <div className="editorial-cards-grid">
              {relatedArticles.map((rel) => (
                <article key={rel.id} className="editorial-card">
                  <Link to={getLocalePath(`/blog/${rel.slug}`)} className="editorial-card-art">
                    <img src={rel.coverImage} alt={rel.imageAlt || rel.title} loading="lazy" />
                    <span className="editorial-badge">{rel.category}</span>
                  </Link>
                  <div className="editorial-card-body">
                    <div className="editorial-meta-row">
                      <time>{rel.date}</time>
                      <span className="dot">•</span>
                      <span>{rel.readTime}</span>
                    </div>
                    <h3 className="editorial-card-title">
                      <Link to={getLocalePath(`/blog/${rel.slug}`)}>{rel.title}</Link>
                    </h3>
                    <p className="editorial-card-excerpt">{rel.excerpt}</p>
                    <div className="editorial-card-footer">
                      <Link to={getLocalePath(`/blog/${rel.slug}`)} className="read-article-link">
                        {isHi ? 'पूरा लेख पढ़ें' : isPa ? 'ਪੂਰਾ ਲੇਖ ਪੜ੍ਹੋ' : 'Read Article'} <span>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
