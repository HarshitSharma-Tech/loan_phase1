import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogArticles, blogCategories } from '../data/blogArticles.js';

export default function Blog({ onOpenApplyModal }) {
  const [selectedCategory, setSelectedCategory] = useState('All Articles');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.title = 'Finora Journal | Practical Insights on Loans, EMIs & Wealth';
    window.scrollTo(0, 0);
  }, []);

  const featuredArticle = blogArticles.find(a => a.isFeatured) || blogArticles[0];

  const filteredArticles = blogArticles.filter(article => {
    const matchesCategory = selectedCategory === 'All Articles' || article.category === selectedCategory;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = !term || 
      article.title.toLowerCase().includes(term) ||
      article.excerpt.toLowerCase().includes(term) ||
      article.category.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  // When on 'All Articles' with no search term, feature the top article separately
  const gridArticles = (selectedCategory === 'All Articles' && !searchTerm.trim())
    ? filteredArticles.filter(a => !a.isFeatured)
    : filteredArticles;

  return (
    <main className="blog-page">
      {/* Breadcrumbs Navigation */}
      <nav className="breadcrumbs-bar" aria-label="Breadcrumb">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ul className="breadcrumbs">
            <li><Link to="/">Home</Link></li>
            <li className="separator">›</li>
            <li className="current" aria-current="page">Finora Journal</li>
          </ul>

          <Link 
            to="/" 
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
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Editorial Blog Container */}
      <section className="blog-editorial-section" style={{ borderTop: 'none', paddingTop: '48px' }}>
        <div className="container">
          {/* Blog Hero Header */}
          <div className="blog-editorial-head">
            <span className="eyebrow">FINORA JOURNAL</span>
            <h2>Make Smarter <span className="text-gradient-blue">Financial Decisions.</span></h2>
            <p>Practical insights on loans, EMIs, and financial planning to help you move forward with confidence.</p>
          </div>

          {/* Featured Article Card (Shown in 'All Articles' view without search) */}
          {selectedCategory === 'All Articles' && !searchTerm.trim() && featuredArticle && (
            <article className="featured-article-card" aria-label="Featured Article">
              <Link to={`/blog/${featuredArticle.slug}`} className="featured-media-link" tabIndex={-1}>
                <img 
                  src={featuredArticle.coverImage} 
                  alt={featuredArticle.imageAlt || featuredArticle.title} 
                  loading="lazy" 
                />
                <span className="featured-pill-tag">Featured Insight</span>
              </Link>

              <div className="featured-content-pane">
                <div className="featured-meta-bar">
                  <span className="category-label">{featuredArticle.category}</span>
                  <span>•</span>
                  <span>{featuredArticle.readTime}</span>
                </div>

                <h3 className="featured-title">
                  <Link to={`/blog/${featuredArticle.slug}`}>
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

                  <Link to={`/blog/${featuredArticle.slug}`} className="read-article-link">
                    Read Article <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          )}

          {/* Category Filter Chips & Search Bar */}
          <div className="blog-controls-bar">
            <div className="category-filter-chips" role="tablist" aria-label="Filter articles by category">
              {blogCategories.map(cat => (
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
                placeholder="Search articles or topics..."
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
              Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
              {selectedCategory !== 'All Articles' && ` in "${selectedCategory}"`}
              {searchTerm && ` matching "${searchTerm}"`}
            </span>

            {(selectedCategory !== 'All Articles' || searchTerm) && (
              <button
                type="button"
                className="text-link"
                style={{ fontSize: '0.82rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onClick={() => {
                  setSelectedCategory('All Articles');
                  setSearchTerm('');
                }}
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Article Cards Grid */}
          {gridArticles.length > 0 ? (
            <div className="editorial-cards-grid">
              {gridArticles.map(article => (
                <article key={article.id} className="editorial-card">
                  <Link to={`/blog/${article.slug}`} className="editorial-card-art" tabIndex={-1}>
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
                      <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                    </h3>

                    <p className="editorial-card-excerpt">
                      {article.excerpt}
                    </p>

                    <div className="editorial-card-footer">
                      <Link to={`/blog/${article.slug}`} className="read-article-link">
                        Read Article <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="blog-empty-state">
              <h3>No articles found</h3>
              <p>We couldn't find any articles matching your search or category filter.</p>
              <button
                type="button"
                className="btn btn-outline btn-small"
                onClick={() => {
                  setSelectedCategory('All Articles');
                  setSearchTerm('');
                }}
              >
                View All Articles
              </button>
            </div>
          )}

          {/* Advisory & Eligibility Callout */}
          <div className="article-bottom-banner" style={{ marginTop: '72px', marginBottom: '0' }}>
            <div>
              <span className="eyebrow">Expert Financial Guidance</span>
              <h3>Have questions about borrowing or loan eligibility?</h3>
              <p>Compare transparent loan products with zero hidden fees and check your pre-approved options in minutes.</p>
            </div>
            <div className="banner-actions">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => onOpenApplyModal('General Inquiry')}
              >
                Check Eligibility ↗
              </button>
              <Link to="/#calculators" className="btn btn-outline">
                Use Calculators
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
