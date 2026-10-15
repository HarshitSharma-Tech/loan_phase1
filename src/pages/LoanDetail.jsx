import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import loanProducts from '../data/loanProducts.json';
import { loanGalleries } from '../data/loanGalleries';

export default function LoanDetail({ onOpenApplyModal }) {
  const { slug } = useParams();
  const product = loanProducts.find(p => p.slug === slug || p.id === slug) || loanProducts[0];

  const parseStartRate = (rangeStr) => {
    if (!rangeStr) return 9.0;
    const match = rangeStr.match(/(\d+\.?\d*)\s*%/);
    return match ? parseFloat(match[1]) : 9.0;
  };

  // Calculator State
  const [calcAmount, setCalcAmount] = useState(500000);
  const [calcTenure, setCalcTenure] = useState(5);
  const [calcRate, setCalcRate] = useState(() => parseStartRate(product.rate_range));
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    setCalcRate(parseStartRate(product.rate_range));
    setActiveFaq(null);
    window.scrollTo(0, 0);
  }, [slug, product.rate_range]);

  const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  // EMI calculation
  const mRate = (calcRate || 10.5) / 1200;
  const tMonths = (calcTenure || 5) * 12;
  const emi = Math.round(
    mRate === 0
      ? calcAmount / tMonths
      : (calcAmount * mRate * Math.pow(1 + mRate, tMonths)) / (Math.pow(1 + mRate, tMonths) - 1)
  );
  const totalRepayment = Math.round(emi * tMonths);
  const totalInterest = Math.max(0, totalRepayment - calcAmount);

  return (
    <main>
      {/* Breadcrumbs & Back Navigation */}
      <nav className="breadcrumbs-bar" aria-label="Breadcrumb">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ul className="breadcrumbs">
            <li><Link to="/">Home</Link></li>
            <li className="separator">›</li>
            <li><Link to="/#loans">Loans</Link></li>
            <li className="separator">›</li>
            <li className="current" aria-current="page">{product.name}</li>
          </ul>

          <Link 
            to="/#loans" 
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
            ← Back to All Loans
          </Link>
        </div>
      </nav>

      {/* Split Hero Section */}
      <section className="product-hero" id="overview">
        <div className="container product-hero-grid">
          <div className="product-hero-copy">
            <div className="eyebrow">{product.category || 'Finora Financing'}</div>
            <h1>{product.headline || `${product.name} Made Clear and Accessible`}</h1>
            <p className="lead">{product.description}</p>

            {/* Persona Hero Card */}
            <div className="hero-persona-card">
              <div className="persona-image-holder">
                <img src={product.hero_img ? `/${product.hero_img}` : '/images/personal-loan-hero.jpg'} alt={product.name} className="persona-img" />
                <div className="persona-badge-float top-right">
                  <span className="badge-icon">{product.badge1_icon || '⚡'}</span>
                  <div>
                    <strong>{product.badge1_title || 'Instant Disbursal'}</strong>
                    <small>{product.badge1_sub || '100% Digital Journey'}</small>
                  </div>
                </div>
                <div className="persona-badge-float bottom-left">
                  <span className="badge-icon">{product.badge2_icon || '🛡️'}</span>
                  <div>
                    <strong>{product.badge2_title || 'Zero Collateral'}</strong>
                    <small>{product.badge2_sub || 'No guarantor required'}</small>
                  </div>
                </div>
              </div>
              <div className="persona-card-footer">
                <div className="persona-caption">
                  <strong>{product.caption_title || `${product.name} tailored for milestones`}</strong>
                  <span>{product.caption_sub || 'Competitive rates, flexible tenures & digital approval.'}</span>
                </div>
                <div className="persona-user-stats">
                  <div className="stars">★★★★★</div>
                  <small>4.9/5 Verified</small>
                </div>
              </div>
            </div>

            {/* Hero Pills */}
            <div className="hero-pill-list">
              {(product.pills || []).map((pill, i) => (
                <span key={i} className="hero-pill">
                  <span className="dot"></span> {pill}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => onOpenApplyModal(product.name)}
              >
                Apply for {product.name} <span>↗</span>
              </button>
              <a className="btn btn-outline" href="#calculator">
                Calculate EMI
              </a>
            </div>

            <div className="hero-rating-badge">
              <span className="stars">★★★★★</span>
              <span>4.9/5 verified rating from over 42,000+ Indian borrowers</span>
            </div>
          </div>

          {/* Product Calculator */}
          <div className="product-hero-calc" id="calculator">
            <div className="product-calc-card">
              <div className="calc-header">
                <div>
                  <small className="calc-tag">{product.calc_badge || 'INSTANT ESTIMATE'}</small>
                  <h3>{product.calc_title || `${product.name} EMI Calculator`}</h3>
                  <p>Instant estimate based on current lender slabs</p>
                </div>
              </div>

              {/* Amount Slider */}
              <div className="calc-group">
                <div className="calc-label-row">
                  <label htmlFor="prodAmount">Loan Amount</label>
                  <output>{formatINR(calcAmount)}</output>
                </div>
                <input 
                  id="prodAmount" 
                  className="calc-range" 
                  type="range" 
                  min="50000" 
                  max="5000000" 
                  step="25000" 
                  value={calcAmount} 
                  onChange={e => setCalcAmount(Number(e.target.value))}
                />
                <div className="calc-range-limits">
                  <span>₹50K</span>
                  <span>₹50 Lakhs</span>
                </div>
                <div className="calc-chips">
                  {[100000, 500000, 1000000, 2500000, 5000000].map(val => (
                    <button 
                      key={val} 
                      type="button" 
                      className={`calc-chip ${calcAmount === val ? 'active' : ''}`}
                      onClick={() => setCalcAmount(val)}
                    >
                      ₹{val >= 100000 ? `${val / 100000}L` : val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tenure and Rate */}
              <div className="form-grid-2">
                <div className="calc-group">
                  <div className="calc-label-row">
                    <label htmlFor="prodTenure">Tenure</label>
                    <output>{calcTenure} {calcTenure === 1 ? 'Year' : 'Years'}</output>
                  </div>
                  <input 
                    id="prodTenure" 
                    className="calc-range" 
                    type="range" 
                    min="1" 
                    max="10" 
                    step="1" 
                    value={calcTenure} 
                    onChange={e => setCalcTenure(Number(e.target.value))}
                  />
                  <div className="calc-range-limits"><span>1 Yr</span><span>10 Yrs</span></div>
                </div>

                <div className="calc-group">
                  <div className="calc-label-row">
                    <label htmlFor="prodRate">Interest Rate</label>
                    <output>{calcRate}%</output>
                  </div>
                  <input 
                    id="prodRate" 
                    className="calc-range" 
                    type="range" 
                    min="5" 
                    max="36" 
                    step="0.05" 
                    value={calcRate} 
                    onChange={e => setCalcRate(Number(e.target.value))}
                  />
                  <div className="calc-range-limits"><span>5%</span><span>36%</span></div>
                </div>
              </div>

              {/* Calculator Output */}
              <div className="calc-result-box">
                <div className="calc-emi-headline">
                  <small>Estimated Monthly EMI</small>
                  <div className="calc-emi-val">{formatINR(emi)}</div>
                </div>
                <div className="calc-submetrics">
                  <div className="calc-submetric">
                    <small>Total Interest Payable</small>
                    <strong>{formatINR(totalInterest)}</strong>
                  </div>
                  <div className="calc-submetric">
                    <small>Total Repayment</small>
                    <strong>{formatINR(totalRepayment)}</strong>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="btn btn-primary calc-apply-btn"
                  onClick={() => onOpenApplyModal(product.name)}
                >
                  Apply for this Loan ↗
                </button>
                <p className="calc-disclaimer">Illustrative estimation only. Actual terms subject to lender underwriting.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="benefits-strip" aria-label="Key Product Benefits">
        <div className="container benefits-grid">
          {(product.benefits || []).map((b, idx) => (
            <div key={idx} className="benefit-card">
              <div className="benefit-icon">{b[0]}</div>
              <div>
                <strong>{b[1]}</strong>
                <p>{b[2]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky In-Page Subnav */}
      <nav className="sticky-subnav" aria-label="Product Sections Navigation">
        <div className="container subnav-track">
          <a className="subnav-link active" href="#overview">Overview</a>
          <a className="subnav-link" href="#calculator">EMI Calculator</a>
          <a className="subnav-link" href="#gallery">Gallery</a>
          {product.has_purposes && <a className="subnav-link" href="#purposes">Life Goals</a>}
          <a className="subnav-link" href="#features">Features</a>
          <a className="subnav-link" href="#eligibility">Eligibility</a>
          <a className="subnav-link" href="#faqs">FAQs</a>
        </div>
      </nav>

      {/* Premium Editorial Image Gallery Section */}
      {(() => {
        const gallery = loanGalleries[product.slug] || loanGalleries[product.id] || loanGalleries['personal-loan'];
        if (!gallery) return null;
        return (
          <section className="product-gallery-section" id="gallery" aria-label={`${product.name} Showcase Gallery`}>
            <div className="container">
              <div className="section-head">
                <span className="eyebrow">{gallery.eyebrow}</span>
                <h2>Visual Story: <span className="text-gradient-blue">{gallery.heading}</span></h2>
                <p>{gallery.description}</p>
              </div>

              <div className="gallery-grid-editorial">
                {/* Large Featured Story Card */}
                <div className="gallery-featured-card">
                  <img 
                    src={gallery.featured.img} 
                    alt={gallery.featured.title} 
                    className="gallery-featured-img" 
                    loading="lazy" 
                  />
                  <div className="gallery-featured-overlay">
                    <span className="tag">{gallery.featured.tag}</span>
                    <h3>{gallery.featured.title}</h3>
                    <p>{gallery.featured.desc}</p>
                  </div>
                </div>

                {/* Supporting Cards Column (3 context-specific cards) */}
                <div className="gallery-supporting-col">
                  {gallery.supporting.map((item, idx) => (
                    <div key={idx} className="gallery-sub-card">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="gallery-sub-img" 
                        loading="lazy" 
                      />
                      <div className="gallery-sub-body">
                        <span className="badge-sm">{item.badge}</span>
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Purposes Section for Personal Loan */}
      {product.has_purposes && (
        <section className="purpose-section" id="purposes">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Infinite Possibilities</span>
              <h2>Finora Personal Loan for <span className="text-gradient-blue">all your life milestones</span></h2>
              <p>No end-use restrictions. Whether planned celebrations or unforeseen moments, finance your aspirations with zero collateral.</p>
            </div>

            <div className="purpose-grid">
              {[
                { title: 'Wedding & Celebrations', badge: 'Up to ₹40 Lakhs', img: '/images/purpose-wedding.jpg?v=2', desc: 'Cover luxury banquet bookings, designer attire, gold jewellery, catering, and guest accommodation without exhausting long-term investments.' },
                { title: 'Home Makeover & Interiors', badge: 'Instant Transfer', img: '/images/purpose-renovation.jpg?v=2', desc: 'Redesign your modular kitchen, upgrade luxury living room furniture, install smart electronics, or fund home expansion projects with ease.' },
                { title: 'Dream Vacations & Travel', badge: 'Flexible EMIs', img: '/images/purpose-travel.jpg?v=2', desc: 'Explore international travel destinations in Europe or Southeast Asia, book luxury flights and hotels with pocket-friendly repayment schedules.' },
                { title: 'Medical & Family Health', badge: '2-Hour Disbursal', img: '/images/purpose-medical.jpg?v=2', desc: 'Handle unexpected surgeries, specialized therapies, and family hospital bills immediately with fast-track digital approval.' },
                { title: 'Debt & Card Consolidation', badge: 'Save up to 40% EMI', img: '/images/loan-consolidation.jpg?v=2', desc: 'Merge multiple high-interest credit card balances and scattered micro-loans into one consolidated low-rate monthly installment.' },
                { title: 'Higher Education & Upskilling', badge: 'Zero Collateral', img: '/images/loan-education.jpg?v=2', desc: 'Finance executive MBA programs, international certifications, technical bootcamps, and professional career transitions.' }
              ].map((p, idx) => (
                <div key={idx} className="purpose-card">
                  <div className="purpose-img-wrap">
                    <img src={p.img} alt={p.title} loading="lazy" />
                    <span className="purpose-badge">{p.badge}</span>
                  </div>
                  <div className="purpose-body">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <button 
                      type="button" 
                      className="purpose-link"
                      onClick={() => onOpenApplyModal(`${product.name} (${p.title})`)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      Apply for {p.title} →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="section" id="features">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Product Advantages</span>
            <h2>Why choose Finora for your <span className="text-gradient-blue">{product.name}?</span></h2>
            <p>Experience transparent credit designed to empower your financial decisions with zero surprises.</p>
          </div>

          <div className="features-grid">
            {(product.features || []).map((f, idx) => (
              <div key={idx} className="feature-box">
                <div className="feature-box-icon">{f[0]}</div>
                <h3>{f[1]}</h3>
                <p>{f[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="section soft-section" id="eligibility">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Clear Requirements</span>
            <h2>Eligibility criteria for <span className="text-gradient-blue">{product.name}</span></h2>
            <p>Flexible, achievable eligibility parameters for both salaried and self-employed applicants.</p>
          </div>

          <div className="eligibility-split">
            <div className="eligibility-profile-card">
              <div className="profile-card-head">
                <img src="/images/profile-salaried.jpg?v=2" alt="Salaried Professional" className="eligibility-avatar" />
                <div>
                  <h3>Salaried Applicants</h3>
                  <small>MNC, Private Ltd, PSU & Govt Employees</small>
                </div>
              </div>
              <ul className="eligibility-list">
                {(product.eligibility_salaried || []).map((req, i) => (
                  <li key={i}><span className="check-icon">✓</span> <span>{req}</span></li>
                ))}
              </ul>
            </div>

            <div className="eligibility-profile-card">
              <div className="profile-card-head">
                <img src="/images/profile-doctor.jpg?v=2" alt="Self-Employed Professional" className="eligibility-avatar" />
                <div>
                  <h3>Self-Employed Individuals</h3>
                  <small>Doctors, CAs, Entrepreneurs & Consultants</small>
                </div>
              </div>
              <ul className="eligibility-list">
                {(product.eligibility_self || []).map((req, i) => (
                  <li key={i}><span className="check-icon">✓</span> <span>{req}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section" id="faqs">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Clear Answers</span>
            <h2>Frequently Asked <span className="text-gradient-blue">Questions</span></h2>
            <p>Get answers to common queries about {product.name} processing, tenures and terms.</p>
          </div>

          <div className="faq-accordion-container">
            <div className="faq-accordion-list">
              {(product.faqs || []).map((faq, idx) => (
                <div key={idx} className={`faq-card ${activeFaq === idx ? 'active' : ''}`}>
                  <button 
                    type="button" 
                    className="faq-card-header"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    aria-expanded={activeFaq === idx}
                  >
                    <span className="faq-card-title">{faq[0]}</span>
                    <span className="faq-card-toggle">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        {activeFaq === idx ? (
                          <line x1="2" y1="7" x2="12" y2="7" />
                        ) : (
                          <>
                            <line x1="7" y1="2" x2="7" y2="12" />
                            <line x1="2" y1="7" x2="12" y2="7" />
                          </>
                        )}
                      </svg>
                    </span>
                  </button>
                  {activeFaq === idx && (
                    <div className="faq-card-body">
                      <div className="faq-card-text">
                        <p>{faq[1]}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="faq-help-box">
            <div className="faq-help-content">
              <h4>Still have questions regarding your application?</h4>
              <p>Our dedicated loan advisors can walk you through personalized documentation and instant approval.</p>
            </div>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => onOpenApplyModal(`${product.name} (FAQ Assistance)`)}
              style={{ whiteSpace: 'nowrap' }}
            >
              Ask an Advisor →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
