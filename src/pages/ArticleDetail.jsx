import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogArticles } from '../data/blogArticles.js';

export default function ArticleDetail({ onOpenApplyModal }) {
  const { slug } = useParams();

  // Find article by slug or default to first
  const article = blogArticles.find(a => a.slug === slug) || blogArticles[0];

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Finora Journal`;
      window.scrollTo(0, 0);
    }
  }, [article]);

  // Find related articles
  const relatedArticles = blogArticles
    .filter(a => a.id !== article.id && (article.relatedSlugs?.includes(a.slug) || a.category === article.category))
    .slice(0, 3);

  return (
    <main className="article-detail-page">
      {/* Top Breadcrumb Navigation */}
      <nav className="breadcrumbs-bar" aria-label="Breadcrumb">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ul className="breadcrumbs">
            <li><Link to="/">Home</Link></li>
            <li className="separator">›</li>
            <li><Link to="/#blog">Journal</Link></li>
            <li className="separator">›</li>
            <li className="current" aria-current="page">{article.category}</li>
          </ul>

          <Link 
            to="/#blog" 
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
            ← Back to Journal
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
                <span className="article-author-role">{article.authorRole || 'Financial Insights Desk'}</span>
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
                <span className="eyebrow" style={{ fontSize: '0.72rem', letterSpacing: '0.12em' }}>Finora Tools</span>
                <h4>Need an accurate EMI estimate?</h4>
                <p>Run the numbers with our instant reducing-balance calculator before speaking to lenders.</p>
                <Link to="/#calculators" className="btn btn-primary btn-block" style={{ marginTop: '14px' }}>
                  Open EMI Calculator →
                </Link>
                <button 
                  type="button" 
                  className="btn btn-outline btn-block" 
                  style={{ marginTop: '8px' }}
                  onClick={() => onOpenApplyModal('General Inquiry')}
                >
                  Check Eligibility ↗
                </button>
              </div>

              {article.relatedLoans && article.relatedLoans.length > 0 && (
                <div className="sidebar-card">
                  <span className="eyebrow" style={{ fontSize: '0.72rem', letterSpacing: '0.12em' }}>Related Loan Options</span>
                  <ul className="sidebar-loan-links">
                    {article.relatedLoans.map((loan, idx) => (
                      <li key={idx}>
                        <Link to={`/${loan.slug}`}>
                          <strong>{loan.name}</strong>
                          <span className="arrow-link">View details →</span>
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
            <span className="eyebrow">Clear Lending Information</span>
            <h3>Ready to explore tailored financing options?</h3>
            <p>Compare transparent loan products with no hidden charges and complete policy clarity.</p>
          </div>
          <div className="banner-actions">
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => onOpenApplyModal('General Inquiry')}
            >
              Check Eligibility ↗
            </button>
            <Link to="/#loans" className="btn btn-outline">
              Compare All Loans
            </Link>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="article-related-section">
            <div className="related-head">
              <div>
                <span className="eyebrow">Continue Reading</span>
                <h2>Related <span className="text-gradient-blue">Articles</span></h2>
              </div>
              <Link to="/#blog" className="text-link">View all journal articles →</Link>
            </div>

            <div className="editorial-cards-grid">
              {relatedArticles.map((rel) => (
                <article key={rel.id} className="editorial-card">
                  <Link to={`/blog/${rel.slug}`} className="editorial-card-art">
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
                      <Link to={`/blog/${rel.slug}`}>{rel.title}</Link>
                    </h3>
                    <p className="editorial-card-excerpt">{rel.excerpt}</p>
                    <div className="editorial-card-footer">
                      <Link to={`/blog/${rel.slug}`} className="read-article-link">
                        Read Article <span>→</span>
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
