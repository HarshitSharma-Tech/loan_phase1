import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import loanProducts from '../data/loanProducts.json';
import { loanGalleries } from '../data/loanGalleries';
import { loanProductsHindi } from '../data/loanProductsHindi';
import { loanGalleriesHindi } from '../data/loanGalleriesHindi';
import { loanProductsPunjabi } from '../data/loanProductsPunjabi';
import { loanGalleriesPunjabi } from '../data/loanGalleriesPunjabi';
import WhyChoosePersonalLoan from '../components/WhyChoosePersonalLoan';
import SeoHead from '../components/SeoHead';

export default function LoanDetail({ onOpenApplyModal }) {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();

  const currentLang = i18n.language ? i18n.language.substring(0, 2) : 'en';
  const isHi = currentLang === 'hi';
  const isPa = currentLang === 'pa';

  const rawProduct = loanProducts.find(p => p.slug === slug || p.id === slug) || loanProducts[0];
  const hindiProduct = loanProductsHindi[rawProduct.slug] || loanProductsHindi[rawProduct.id];
  const punjabiProduct = loanProductsPunjabi[rawProduct.slug] || loanProductsPunjabi[rawProduct.id];
  const product = (isHi && hindiProduct) 
    ? { ...rawProduct, ...hindiProduct } 
    : (isPa && punjabiProduct)
    ? { ...rawProduct, ...punjabiProduct }
    : rawProduct;

  const getLocalePath = (path) => {
    if (currentLang === 'en') return path;
    if (path === '/') return `/${currentLang}`;
    return `/${currentLang}${path.startsWith('/') ? path : '/' + path}`;
  };

  const parseStartRate = (rangeStr) => {
    if (!rangeStr) return 9.0;
    const match = rangeStr.match(/(\d+\.?\d*)\s*%/);
    return match ? parseFloat(match[1]) : 9.0;
  };

  // Calculator State
  const [calcAmount, setCalcAmount] = useState(500000);
  const [calcTenure, setCalcTenure] = useState(5);
  const [calcRate, setCalcRate] = useState(() => parseStartRate(rawProduct.rate_range));
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    setCalcRate(parseStartRate(rawProduct.rate_range));
    setActiveFaq(null);
    window.scrollTo(0, 0);
  }, [slug, rawProduct.rate_range, rawProduct.name]);

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

  const breadcrumbs = [
    { name: isHi ? 'होम' : isPa ? 'ਹੋਮ' : 'Home', path: getLocalePath('/') },
    { name: isHi ? 'सभी लोन' : isPa ? 'ਸਾਰੇ ਲੋਨ' : 'Loans', path: getLocalePath('/#loans') },
    { name: product.name, path: getLocalePath(`/${product.slug}`) }
  ];

  return (
    <main>
      <SeoHead 
        title={`${product.name} | Loan Aasra - ${isHi ? 'आपके सपने, हमारा सहारा' : isPa ? 'ਤੁਹਾਡੇ ਸੁਪਨੇ, ਸਾਡਾ ਆਸਰਾ' : 'Your Dreams, Our Support'}`}
        description={product.description || `${product.name} with competitive interest rates and flexible EMIs from Loan Aasra.`}
        productName={product.name}
        breadcrumbs={breadcrumbs}
      />

      {/* Breadcrumbs & Back Navigation */}
      <nav className="breadcrumbs-bar" aria-label="Breadcrumb">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ul className="breadcrumbs">
            <li><Link to={getLocalePath('/')}>{isHi ? 'होम' : isPa ? 'ਹੋਮ' : 'Home'}</Link></li>
            <li className="separator">›</li>
            <li><Link to={getLocalePath('/#loans')}>{isHi ? 'सभी लोन' : isPa ? 'ਸਾਰੇ ਲੋਨ' : 'Loans'}</Link></li>
            <li className="separator">›</li>
            <li className="current" aria-current="page">{product.name}</li>
          </ul>

          <Link 
            to={getLocalePath('/#loans')} 
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
            {isHi ? '← सभी लोन पर वापस जाएं' : isPa ? '← ਸਾਰੇ ਲੋਨ ਦੇਖੋ' : '← Back to All Loans'}
          </Link>
        </div>
      </nav>

      {/* Split Hero Section */}
      <section className="product-hero" id="overview">
        <div className="container product-hero-grid">
          <div className="product-hero-copy">
            <div className="eyebrow">{product.category || (isHi ? 'Loan Aasra सेवाएं' : isPa ? 'Loan Aasra ਸੇਵਾਵਾਂ' : 'Loan Aasra Financing')}</div>
            <h1>{product.headline || `${product.name} Made Clear and Accessible`}</h1>
            <p className="lead">{product.description}</p>

            {/* Persona Hero Card */}
            <div className="hero-persona-card">
              <div className="persona-image-holder">
                <img src={product.hero_img ? `/${product.hero_img}` : '/images/personal-loan-hero.jpg'} alt={product.name} className="persona-img" />
                <div className="persona-badge-float top-right">
                  <span className="badge-icon">{product.badge1_icon || '⚡'}</span>
                  <div>
                    <strong>{product.badge1_title || (isHi ? 'तुरंत पैसे खाते में' : isPa ? 'ਤੁਰੰਤ ਪੈਸੇ ਖਾਤੇ ਵਿੱਚ' : 'Instant Disbursal')}</strong>
                    <small>{product.badge1_sub || (isHi ? '100% डिजिटल प्रक्रिया' : isPa ? '100% ਡਿਜੀਟਲ ਪ੍ਰਕਿਰਿਆ' : '100% Digital Journey')}</small>
                  </div>
                </div>
                <div className="persona-badge-float bottom-left">
                  <span className="badge-icon">{product.badge2_icon || '🛡️'}</span>
                  <div>
                    <strong>{product.badge2_title || (isHi ? 'बिना कुछ गिरवी रखे' : isPa ? 'ਬਿਨਾਂ ਕੁਝ ਗਿਰਵੀ ਰੱਖੇ' : 'Zero Collateral')}</strong>
                    <small>{product.badge2_sub || (isHi ? 'किसी गारंटर की जरूरत नहीं' : isPa ? 'ਕਿਸੇ ਗਾਰੰਟਰ ਦੀ ਲੋੜ ਨਹੀਂ' : 'No guarantor required')}</small>
                  </div>
                </div>
              </div>
              <div className="persona-card-footer">
                <div className="persona-caption">
                  <strong>{product.caption_title || `${product.name}`}</strong>
                  <span>{product.caption_sub || (isHi ? 'आकर्षक ब्याज दरें, आसान अवधि और डिजिटल मंजूरी।' : isPa ? 'ਘੱਟ ਵਿਆਜ ਦਰਾਂ, ਆਸਾਨ ਕਿਸ਼ਤਾਂ ਅਤੇ ਤੁਰੰਤ ਮਨਜ਼ੂਰੀ।' : 'Competitive rates, flexible tenures & digital approval.')}</span>
                </div>
                <div className="persona-user-stats">
                  <div className="stars">★★★★★</div>
                  <small>{isHi ? '4.9/5 सत्यापित' : isPa ? '4.9/5 ਭਰੋਸੇਮੰਦ' : '4.9/5 Verified'}</small>
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
                {isHi ? `${product.name} के लिए आवेदन करें` : isPa ? `${product.name} ਲਈ ਅਪਲਾਈ ਕਰੋ` : `Apply for ${product.name}`} <span>↗</span>
              </button>
              <a className="btn btn-outline" href="#calculator">
                {isHi ? 'मासिक किस्त जानें' : isPa ? 'ਮਹੀਨਾਵਾਰ ਕਿਸ਼ਤ ਜਾਣੋ' : 'Calculate EMI'}
              </a>
            </div>

            <div className="hero-rating-badge">
              <span className="stars">★★★★★</span>
              <span>{isHi ? '42,000+ भारतीय ग्राहकों द्वारा 4.9/5 स्टार रेटिंग' : isPa ? '42,000+ ਖ਼ੁਸ਼ਹਾਲ ਗ੍ਰਾਹਕਾਂ ਵੱਲੋਂ 4.9/5 ਸਟਾਰ ਰੇਟਿੰਗ' : '4.9/5 verified rating from over 42,000+ Indian borrowers'}</span>
            </div>
          </div>

          {/* Product Calculator */}
          <div className="product-hero-calc" id="calculator">
            <div className="product-calc-card">
              <div className="calc-header">
                <div>
                  <small className="calc-tag">{product.calc_badge || (isHi ? 'तुरंत अनुमान' : isPa ? 'ਤੁਰੰਤ ਅੰਦਾਜ਼ਾ' : 'INSTANT ESTIMATE')}</small>
                  <h3>{product.calc_title || (isHi ? `${product.name} ईएमआई कैलकुलेटर` : isPa ? `${product.name} ਕਿਸ਼ਤ ਕੈਲਕੁਲੇਟਰ` : `${product.name} EMI Calculator`)}</h3>
                  <p>{isHi ? 'ताजा ब्याज दरों के आधार पर अपनी मासिक किस्त का अनुमान लगाएं' : isPa ? 'ਮੌਜੂਦਾ ਵਿਆਜ ਦਰਾਂ ਮੁਤਾਬਕ ਆਪਣੀ ਮਹੀਨਾਵਾਰ ਕਿਸ਼ਤ ਦਾ ਅੰਦਾਜ਼ਾ ਲਗਾਓ' : 'Instant estimate based on current lender slabs'}</p>
                </div>
              </div>

              {/* Amount Slider */}
              <div className="calc-group">
                <div className="calc-label-row">
                  <label htmlFor="prodAmount">{isHi ? 'लोन की राशि' : isPa ? 'ਲੋਨ ਦੀ ਰਕਮ' : 'Loan Amount'}</label>
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
                  <span>{isHi ? '₹50 हजार' : isPa ? '₹50 ਹਜ਼ਾਰ' : '₹50K'}</span>
                  <span>{isHi ? '₹50 लाख' : isPa ? '₹50 ਲੱਖ' : '₹50 Lakhs'}</span>
                </div>
                <div className="calc-chips">
                  {[100000, 500000, 1000000, 2500000, 5000000].map(val => (
                    <button 
                      key={val} 
                      type="button" 
                      className={`calc-chip ${calcAmount === val ? 'active' : ''}`}
                      onClick={() => setCalcAmount(val)}
                    >
                      ₹{val >= 100000 ? (isHi ? `${val / 100000} लाख` : isPa ? `${val / 100000} ਲੱਖ` : `${val / 100000}L`) : val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tenure and Rate */}
              <div className="form-grid-2">
                <div className="calc-group">
                  <div className="calc-label-row">
                    <label htmlFor="prodTenure">{isHi ? 'लोन की अवधि' : isPa ? 'ਲੋਨ ਦਾ ਸਮਾਂ' : 'Tenure'}</label>
                    <output>{calcTenure} {calcTenure === 1 ? (isHi ? 'साल' : isPa ? 'ਸਾਲ' : 'Year') : (isHi ? 'साल' : isPa ? 'ਸਾਲ' : 'Years')}</output>
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
                  <div className="calc-range-limits"><span>{isHi ? '1 साल' : isPa ? '1 ਸਾਲ' : '1 Yr'}</span><span>{isHi ? '10 साल' : isPa ? '10 ਸਾਲ' : '10 Yrs'}</span></div>
                </div>

                <div className="calc-group">
                  <div className="calc-label-row">
                    <label htmlFor="prodRate">{isHi ? 'वार्षिक ब्याज दर' : isPa ? 'ਸਾਲਾਨਾ ਵਿਆਜ ਦਰ' : 'Interest Rate'}</label>
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
                  <small>{isHi ? 'अनुमानित मासिक किस्त (EMI)' : isPa ? 'ਅੰਦਾਜ਼ਨ ਮਹੀਨਾਵਾਰ ਕਿਸ਼ਤ (EMI)' : 'Estimated Monthly EMI'}</small>
                  <div className="calc-emi-val">{formatINR(emi)}</div>
                </div>
                <div className="calc-submetrics">
                  <div className="calc-submetric">
                    <small>{isHi ? 'कुल ब्याज' : isPa ? 'ਕੁੱਲ ਵਿਆਜ' : 'Total Interest Payable'}</small>
                    <strong>{formatINR(totalInterest)}</strong>
                  </div>
                  <div className="calc-submetric">
                    <small>{isHi ? 'कुल भुगतान' : isPa ? 'ਕੁੱਲ ਰਕਮ' : 'Total Repayment'}</small>
                    <strong>{formatINR(totalRepayment)}</strong>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="btn btn-primary calc-apply-btn"
                  onClick={() => onOpenApplyModal(product.name)}
                >
                  {isHi ? 'इस लोन के लिए आवेदन करें ↗' : isPa ? 'ਇਸ ਲੋਨ ਲਈ ਅਪਲਾਈ ਕਰੋ ↗' : 'Apply for this Loan ↗'}
                </button>
                <p className="calc-disclaimer">
                  {isHi 
                    ? 'यह केवल अनुमानित गणना है। वास्तविक शर्तें बैंक के नियमों और सिबिल स्कोर पर निर्भर करती हैं।'
                    : isPa
                    ? 'ਇਹ ਸਿਰਫ਼ ਅੰਦਾਜ਼ਾ ਹੈ। ਅਸਲ ਸ਼ਰਤਾਂ ਬੈਂਕ ਦੇ ਨਿਯਮਾਂ ਅਤੇ ਸਿਬਿਲ ਸਕੋਰ ਤੇ ਨਿਰਭਰ ਕਰਦੀਆਂ ਹਨ।'
                    : 'Illustrative estimation only. Actual terms subject to lender underwriting.'}
                </p>
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
          <a className="subnav-link active" href="#overview">{isHi ? 'विवरण' : isPa ? 'ਜਾਣਕਾਰੀ' : 'Overview'}</a>
          <a className="subnav-link" href="#calculator">{isHi ? 'ईएमआई कैलकुलेटर' : isPa ? 'ਕਿਸ਼ਤ ਕੈਲਕੁਲੇਟਰ' : 'EMI Calculator'}</a>
          <a className="subnav-link" href="#gallery">{isHi ? 'तस्वीरें' : isPa ? 'ਤਸਵੀਰਾਂ' : 'Gallery'}</a>
          {product.has_purposes && <a className="subnav-link" href="#purposes">{isHi ? 'जीवन के लक्ष्य' : isPa ? 'ਜ਼ਿੰਦਗੀ ਦੇ ਟੀਚੇ' : 'Life Goals'}</a>}
          <a className="subnav-link" href="#features">{isHi ? 'खासियतें' : isPa ? 'ਖੂਬੀਆਂ' : 'Features'}</a>
          <a className="subnav-link" href="#eligibility">{isHi ? 'योग्यता' : isPa ? 'ਯੋਗਤਾ' : 'Eligibility'}</a>
          <a className="subnav-link" href="#faqs">{isHi ? 'सवाल-जवाब' : isPa ? 'ਸਵਾਲ-ਜਵਾਬ' : 'FAQs'}</a>
        </div>
      </nav>

      {/* Premium Editorial Image Gallery Section */}
      {(() => {
        const rawGallery = loanGalleries[product.slug] || loanGalleries[product.id] || loanGalleries['personal-loan'];
        const hindiGallery = loanGalleriesHindi[product.slug] || loanGalleriesHindi[product.id];
        const punjabiGallery = loanGalleriesPunjabi[product.slug] || loanGalleriesPunjabi[product.id];
        const gallery = (isHi && hindiGallery) 
          ? hindiGallery 
          : (isPa && punjabiGallery) 
          ? punjabiGallery 
          : rawGallery;
        if (!gallery) return null;
        return (
          <section className="product-gallery-section" id="gallery" aria-label={`${product.name} Showcase Gallery`}>
            <div className="container">
              <div className="section-head">
                <span className="eyebrow">{gallery.eyebrow}</span>
                <h2>{isHi ? <>फोटो गैलरी: <span className="text-gradient-blue">{gallery.heading}</span></> : isPa ? <>ਤਸਵੀਰਾਂ ਦੀ ਕਹਾਣੀ: <span className="text-gradient-blue">{gallery.heading}</span></> : <>Visual Story: <span className="text-gradient-blue">{gallery.heading}</span></>}</h2>
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
              <span className="eyebrow">{isHi ? 'असंख्य संभावनाएं' : isPa ? 'ਬੇਅੰਤ ਸੰਭਾਵਨਾਵਾਂ' : 'Infinite Possibilities'}</span>
              <h2>{isHi ? <>जीवन के हर पड़ाव के लिए <span className="text-gradient-blue">Loan Aasra {product.name}</span></> : isPa ? <>ਜ਼ਿੰਦਗੀ ਦੇ ਹਰ ਮੋੜ ਲਈ <span className="text-gradient-blue">Loan Aasra {product.name}</span></> : <>Loan Aasra Personal Loan for <span className="text-gradient-blue">all your life milestones</span></>}</h2>
              <p>{isHi ? 'कोई पाबंदी नहीं। चाहे शादी हो, छुट्टियां हों या अचानक आया कोई जरूरी काम—बिना कुछ गिरवी रखे अपनी जरूरतें पूरी करें।' : isPa ? 'ਕੋਈ ਪਾਬੰਦੀ ਨਹੀਂ। ਚਾਹੇ ਵਿਆਹ ਹੋਵੇ, ਘੁੰਮਣਾ-ਫਿਰਨਾ ਜਾਂ ਕੋਈ ਅਚਾਨਕ ਜ਼ਰੂਰੀ ਕੰਮ—ਬਿਨਾਂ ਕੁਝ ਗਿਰਵੀ ਰੱਖੇ ਆਪਣੀਆਂ ਲੋੜਾਂ ਪੂਰੀਆਂ ਕਰੋ।' : 'No end-use restrictions. Whether planned celebrations or unforeseen moments, finance your aspirations with zero collateral.'}</p>
            </div>

            <div className="purpose-grid">
              {(isHi ? [
                { title: 'शादी और पारिवारिक उत्सव', badge: '₹40 लाख तक', img: '/images/purpose-wedding.jpg?v=2', desc: 'विवाह स्थल, डिजाइनर कपड़े, जेवर, खान-पान और मेहमानों के स्वागत के सभी खर्च आसानी से पूरे करें।' },
                { title: 'घर का नया रूप और इंटीरियर', badge: 'तुरंत पैसे', img: '/images/purpose-renovation.jpg?v=2', desc: 'मॉड्यूलर किचन, नया फर्नीचर, होम अप्लायंसेज या घर के विस्तार का काम बिना किसी रुकावट के पूरा करें।' },
                { title: 'मनपसंद यात्रा और छुट्टियां', badge: 'आसान किस्तें', img: '/images/purpose-travel.jpg?v=2', desc: 'देश-विदेश में घूमने का सपना पूरा करें। होटल, फ्लाइट और टूर पैकेज के लिए किफायती किस्तों की सुविधा।' },
                { title: 'परिवार का स्वास्थ्य और इलाज', badge: '2 घंटे में पैसे', img: '/images/purpose-medical.jpg?v=2', desc: 'अचानक आई बीमारी, अस्पताल के बिल और आवश्यक सर्जरी के लिए बिना किसी देरी के तुरंत वित्तीय सहायता।' },
                { title: 'पुराने कर्जों से मुक्ति', badge: 'मासिक किस्त में 40% तक बचत', img: '/images/loan-consolidation.jpg?v=3', desc: 'क्रेडिट कार्ड के भारी ब्याज और छोटे-छोटे कर्जों को मिलाकर एक आसान, सस्ती मासिक किस्त में बदलें।' },
                { title: 'उच्च शिक्षा और कौशल विकास', badge: 'बिना कुछ गिरवी रखे', img: '/images/loan-education.jpg?v=2', desc: 'एग्जीक्यूटिव एमबीए, वोकेशनल ट्रेनिंग या इंटरनेशनल सर्टिफिकेशन के साथ अपने करियर को नई ऊंचाई दें।' }
              ] : isPa ? [
                { title: 'ਵਿਆਹ ਅਤੇ ਖ਼ੁਸ਼ੀਆਂ ਦੇ ਪਲ', badge: '₹40 ਲੱਖ ਤੱਕ', img: '/images/purpose-wedding.jpg?v=2', desc: 'ਪੈਲੇਸ ਬੁਕਿੰਗ, ਗਹਿਣੇ, ਕੱਪੜੇ, ਕੈਟਰਿੰਗ ਅਤੇ ਮਹਿਮਾਨਾਂ ਦੀ ਸੇਵਾ ਦੇ ਸਾਰੇ ਖ਼ਰਚੇ ਆਸਾਨੀ ਨਾਲ ਪੂਰੇ ਕਰੋ।' },
                { title: 'ਘਰ ਦੀ ਨਵੀਂ ਦਿੱਖ ਅਤੇ ਮੁਰੰਮਤ', badge: 'ਤੁਰੰਤ ਪੈਸੇ', img: '/images/purpose-renovation.jpg?v=2', desc: 'ਮਾਡਿਊਲਰ ਕਿਚਨ, ਨਵਾਂ ਫਰਨੀਚਰ ਜਾਂ ਘਰ ਨੂੰ ਵੱਡਾ ਕਰਨ ਦਾ ਕੰਮ ਬਿਨਾਂ ਕਿਸੇ ਰੁਕਾਵਟ ਦੇ ਪੂਰਾ ਕਰੋ।' },
                { title: 'ਮਨਪਸੰਦ ਯਾਤਰਾ ਅਤੇ ਛੁੱਟੀਆਂ', badge: 'ਆਸਾਨ ਕਿਸ਼ਤਾਂ', img: '/images/purpose-travel.jpg?v=2', desc: 'ਦੇਸ਼-ਵਿਦੇਸ਼ ਘੁੰਮਣ ਦਾ ਸੁਪਨਾ ਪੂਰਾ ਕਰੋ। ਹੋਟਲ, ਫਲਾਈਟਾਂ ਅਤੇ ਟੂਰ ਪੈਕੇਜ ਲਈ ਸਸਤੀਆਂ ਕਿਸ਼ਤਾਂ ਦੀ ਸਹੂਲਤ।' },
                { title: 'ਪਰਿਵਾਰ ਦੀ ਸਿਹਤ ਅਤੇ ਇਲਾਜ', badge: '2 ਘੰਟਿਆਂ ਵਿੱਚ ਪੈਸੇ', img: '/images/purpose-medical.jpg?v=2', desc: 'ਅਚਾਨਕ ਆਈ ਬਿਮਾਰੀ, ਹਸਪਤਾਲ ਦੇ ਬਿੱਲ ਅਤੇ ਜ਼ਰੂਰੀ ਇਲਾਜ ਲਈ ਬਿਨਾਂ ਕਿਸੇ ਦੇਰੀ ਦੇ ਤੁਰੰਤ ਮਦਦ।' },
                { title: 'ਪੁਰਾਣੇ ਕਰਜ਼ਿਆਂ ਤੋਂ ਮੁਕਤੀ', badge: 'ਕਿਸ਼ਤ ਵਿੱਚ 40% ਤੱਕ ਬੱਚਤ', img: '/images/loan-consolidation.jpg?v=3', desc: 'ਕ੍ਰੈਡਿਟ ਕਾਰਡ ਦੇ ਭਾਰੀ ਵਿਆਜ ਅਤੇ ਛੋਟੇ-ਛੋਟੇ ਕਰਜ਼ਿਆਂ ਨੂੰ ਮਿਲਾ ਕੇ ਇੱਕ ਸਸਤੀ ਮਹੀਨਾਵਾਰ ਕਿਸ਼ਤ ਵਿੱਚ ਬਦਲੋ।' },
                { title: 'ਉੱਚ ਸਿੱਖਿਆ ਅਤੇ ਨਵਾਂ ਹੁਨਰ', badge: 'ਬਿਨਾਂ ਕੁਝ ਗਿਰਵੀ ਰੱਖੇ', img: '/images/loan-education.jpg?v=2', desc: 'ਵੱਡੀਆਂ ਡਿਗਰੀਆਂ, ਪ੍ਰੋਫੈਸ਼ਨਲ ਕੋਰਸ ਜਾਂ ਵਿਦੇਸ਼ ਪੜ੍ਹਾਈ ਨਾਲ ਆਪਣੇ ਕਰੀਅਰ ਨੂੰ ਨਵੀਂ ਉਡਾਣ ਦਿਓ।' }
              ] : [
                { title: 'Wedding & Celebrations', badge: 'Up to ₹40 Lakhs', img: '/images/purpose-wedding.jpg?v=2', desc: 'Cover luxury banquet bookings, designer attire, gold jewellery, catering, and guest accommodation without exhausting long-term investments.' },
                { title: 'Home Makeover & Interiors', badge: 'Instant Transfer', img: '/images/purpose-renovation.jpg?v=2', desc: 'Redesign your modular kitchen, upgrade luxury living room furniture, install smart electronics, or fund home expansion projects with ease.' },
                { title: 'Dream Vacations & Travel', badge: 'Flexible EMIs', img: '/images/purpose-travel.jpg?v=2', desc: 'Explore international travel destinations in Europe or Southeast Asia, book luxury flights and hotels with pocket-friendly repayment schedules.' },
                { title: 'Medical & Family Health', badge: '2-Hour Disbursal', img: '/images/purpose-medical.jpg?v=2', desc: 'Handle unexpected surgeries, specialized therapies, and family hospital bills immediately with fast-track digital approval.' },
                { title: 'Debt & Card Consolidation', badge: 'Save up to 40% EMI', img: '/images/loan-consolidation.jpg?v=3', desc: 'Merge multiple high-interest credit card balances and scattered micro-loans into one consolidated low-rate monthly installment.' },
                { title: 'Higher Education & Upskilling', badge: 'Zero Collateral', img: '/images/loan-education.jpg?v=2', desc: 'Finance executive MBA programs, international certifications, technical bootcamps, and professional career transitions.' }
              ]).map((p, idx) => (
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
                      {isHi ? `${p.title} के लिए आवेदन करें →` : isPa ? `${p.title} ਲਈ ਅਪਲਾਈ ਕਰੋ →` : `Apply for ${p.title} →`}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section / Why Choose Section */}
      {product.slug === 'personal-loan' || product.slug === 'insta-personal-loan' ? (
        <WhyChoosePersonalLoan onOpenApplyModal={onOpenApplyModal} />
      ) : (
        <section className="section" id="features">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">{isHi ? 'लोन के फायदे' : isPa ? 'ਲੋਨ ਦੇ ਫ਼ਾਇਦੇ' : 'Product Advantages'}</span>
              <h2>{isHi ? <>{product.name} के लिए <span className="text-gradient-blue">Loan Aasra क्यों चुनें?</span></> : isPa ? <>{product.name} ਲਈ <span className="text-gradient-blue">Loan Aasra ਕਿਉਂ ਚੁਣੀਏ?</span></> : <>Why choose Loan Aasra for your <span className="text-gradient-blue">{product.name}?</span></>}</h2>
              <p>{isHi ? 'बिना किसी छिपे हुए शुल्क के पारदर्शी और भरोसेमंद लोन प्रक्रिया का अनुभव लें।' : isPa ? 'ਬਿਨਾਂ ਕਿਸੇ ਲੁਕਵੀਂ ਫੀਸ ਦੇ ਪਾਰਦਰਸ਼ੀ ਅਤੇ ਭਰੋਸੇਮੰਦ ਲੋਨ ਦਾ ਅਨੁਭਵ ਲਵੋ।' : 'Experience transparent credit designed to empower your financial decisions with zero surprises.'}</p>
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
      )}

      {/* Eligibility Section */}
      <section className="section soft-section" id="eligibility">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{isHi ? 'आसान शर्तें' : isPa ? 'ਸੌਖੀਆਂ ਸ਼ਰਤਾਂ' : 'Clear Requirements'}</span>
            <h2>{isHi ? <>{product.name} के लिए <span className="text-gradient-blue">पात्रता की शर्तें</span></> : isPa ? <>{product.name} ਲਈ <span className="text-gradient-blue">ਲੋਨ ਦੀਆਂ ਸ਼ਰਤਾਂ</span></> : <>Eligibility criteria for <span className="text-gradient-blue">{product.name}</span></>}</h2>
            <p>{isHi ? 'सैलरी पाने वाले और अपना काम करने वाले दोनों के लिए सरल और आसान शर्तें।' : isPa ? 'ਤਨਖ਼ਾਹਦਾਰ ਅਤੇ ਆਪਣਾ ਕੰਮ ਕਰਨ ਵਾਲੇ ਦੋਵਾਂ ਲਈ ਸੌਖੀਆਂ ਅਤੇ ਆਸਾਨ ਸ਼ਰਤਾਂ।' : 'Flexible, achievable eligibility parameters for both salaried and self-employed applicants.'}</p>
          </div>

          <div className="eligibility-split">
            <div className="eligibility-profile-card">
              <div className="profile-card-head">
                <img src="/images/profile-salaried.jpg?v=2" alt="Salaried Professional" className="eligibility-avatar" />
                <div>
                  <h3>{isHi ? 'सैलरी पाने वाले कर्मचारी' : isPa ? 'ਤਨਖ਼ਾਹਦਾਰ ਮੁਲਾਜ਼ਮ' : 'Salaried Applicants'}</h3>
                  <small>{isHi ? 'प्राइवेट लिमिटेड, एमएनसी, बैंक और सरकारी कर्मचारी' : isPa ? 'ਪ੍ਰਾਈਵੇਟ, ਐਮਐਨਸੀ, ਬੈਂਕ ਅਤੇ ਸਰਕਾਰੀ ਮੁਲਾਜ਼ਮ' : 'MNC, Private Ltd, PSU & Govt Employees'}</small>
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
                  <h3>{isHi ? 'स्वरोजगार और व्यापारी' : isPa ? 'ਕਾਰੋਬਾਰੀ ਅਤੇ ਵਪਾਰੀ' : 'Self-Employed Individuals'}</h3>
                  <small>{isHi ? 'दुकानदार, डॉक्टर, सीए, उद्यमी और सलाहकार' : isPa ? 'ਦੁਕਾਨਦਾਰ, ਡਾਕਟਰ, ਸੀਏ, ਵਪਾਰੀ ਅਤੇ ਸਲਾਹਕਾਰ' : 'Doctors, CAs, Entrepreneurs & Consultants'}</small>
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
            <span className="eyebrow">{isHi ? 'सीधे और स्पष्ट जवाब' : isPa ? 'ਸਿੱਧੇ ਅਤੇ ਸਪਸ਼ਟ ਜਵਾਬ' : 'Clear Answers'}</span>
            <h2>{isHi ? <>अक्सर पूछे जाने वाले <span className="text-gradient-blue">सवाल</span></> : isPa ? <>ਅਕਸਰ ਪੁੱਛੇ ਜਾਂਦੇ <span className="text-gradient-blue">ਸਵਾਲ</span></> : <>Frequently Asked <span className="text-gradient-blue">Questions</span></>}</h2>
            <p>{isHi ? <>{product.name} की प्रक्रिया, समय और ब्याज से जुड़े सामान्य सवालों के आसान जवाब।</> : isPa ? <>{product.name} ਦੀ ਪ੍ਰਕਿਰਿਆ, ਸਮੇਂ ਅਤੇ ਵਿਆਜ ਨਾਲ ਜੁੜੇ ਆਮ ਸਵਾਲਾਂ ਦੇ ਸੌਖੇ ਜਵਾਬ।</> : <>Get answers to common queries about {product.name} processing, tenures and terms.</>}</p>
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
              <h4>{isHi ? 'क्या आपके मन में अभी भी कोई सवाल है?' : isPa ? 'ਕੀ ਤੁਹਾਡੇ ਮਨ ਵਿੱਚ ਹਾਲੇ ਵੀ ਕੋਈ ਸਵਾਲ ਹੈ?' : 'Still have questions regarding your application?'}</h4>
              <p>{isHi ? 'हमारे समर्पित लोन सलाहकार बिना किसी शुल्क के आपको सही जानकारी और मार्गदर्शन देंगे।' : isPa ? 'ਸਾਡੇ ਲੋਨ ਸਲਾਹਕਾਰ ਬਿਨਾਂ ਕਿਸੇ ਫੀਸ ਦੇ ਤੁਹਾਨੂੰ ਸਹੀ ਜਾਣਕਾਰੀ ਅਤੇ ਮਦਦ ਦੇਣਗੇ।' : 'Our dedicated loan advisors can walk you through personalized documentation and instant approval.'}</p>
            </div>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => onOpenApplyModal(`${product.name} (${isHi ? 'सहायता' : isPa ? 'ਸਹਾਇਤਾ' : 'FAQ Assistance'})`)}
              style={{ whiteSpace: 'nowrap' }}
            >
              {isHi ? 'सलाहकार से बात करें →' : isPa ? 'ਸਲਾਹਕਾਰ ਨਾਲ ਗੱਲ ਕਰੋ →' : 'Ask an Advisor →'}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
