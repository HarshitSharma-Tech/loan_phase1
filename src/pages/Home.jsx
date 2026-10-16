import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TrustMarquee from '../components/TrustMarquee';
import WhyChoosePersonalLoan from '../components/WhyChoosePersonalLoan';
import SeoHead from '../components/SeoHead';
import { LOAN_CARDS_HI, PRIMARY_CITIES_HI, ALL_CITIES_HI, RATE_ROWS_HI, HOME_FAQS_HI } from '../data/homeHindi';
import { LOAN_CARDS_PA, PRIMARY_CITIES_PA, ALL_CITIES_PA, RATE_ROWS_PA, HOME_FAQS_PA } from '../data/homePunjabi';

const LOAN_CARDS = [
  { slug: 'personal-loan', name: 'Personal Loan', category: 'personal', badge: 'Instant Disbursal', img: '/images/loan-personal.jpg', desc: 'For planned expenses, unexpected costs or a financial need that calls for flexibility.' },
  { slug: 'business-loan', name: 'Business Loan', category: 'business', badge: 'Collateral Free', img: '/images/loan-business.jpg', desc: 'Working capital, inventory expansion, machinery purchase and business scaling.' },
  { slug: 'home-loan', name: 'Home Loan', category: 'property', badge: 'From 8.40% p.a.', img: '/images/loan-home.jpg', desc: 'Turn home ownership into reality with lowest APRs and Sec 24(b) tax advantages.' },
  { slug: 'loan-against-property', name: 'Loan Against Property', category: 'property', badge: 'Up to 70% LTV', img: '/images/loan-property.jpg', desc: 'Unlock high loan limits against your residential or commercial real estate equity.' },
  { slug: 'gold-loan', name: 'Gold Loan', category: 'business', badge: 'From 0.75%/mo', img: '/images/loan-gold.jpg', desc: 'Instant cash liquidity against hallmarked gold jewellery with RBI 75% valuation.' },
  { slug: 'education-loan', name: 'Education Loan', category: 'business', badge: 'India & Abroad', img: '/images/loan-education.jpg', desc: 'Fund tuition fees and living costs with convenient 1-year post-study moratorium.' },
  { slug: 'car-loan', name: 'Car Loan', category: 'personal', badge: '100% On-Road', img: '/images/loan-vehicle.jpg', desc: 'Drive home your dream new or pre-owned car with attractive financing terms.' },
  { slug: 'two-wheeler-loan', name: 'Two-Wheeler Loan', category: 'personal', badge: 'Zero Down Payment', img: '/images/loan-twowheeler.jpg', desc: 'Instant digital approval for commuter motorcycles, scooters, and electric bikes.' },
  { slug: 'medical-loan', name: 'Medical Loan', category: 'personal', badge: '4-Hr Emergency', img: '/images/loan-medical.jpg', desc: 'Emergency medical credit for unexpected hospitalisation, surgeries, and therapies.' },
  { slug: 'loan-against-securities', name: 'Loan Against Securities', category: 'business', badge: 'Flexible Overdraft', img: '/images/loan-securities.jpg', desc: 'Instant credit line against shares and mutual funds. Pay interest only on drawn funds.' },
  { slug: 'debt-consolidation-loan', name: 'Debt Consolidation Loan', category: 'personal', badge: 'Save 40% EMI', img: '/images/loan-consolidation.jpg?v=3', desc: 'Combine multiple high-cost credit cards and personal loans into one lower monthly EMI.' },
  { slug: 'easy-emi-loan', name: 'Easy EMI Loan', category: 'personal', badge: '0% No-Cost EMI', img: '/images/loan-easyemi.jpg', desc: 'Flexible split payments for electronics, gadgets, appliances, and home shopping.' }
];

const PRIMARY_CITIES = [
  'Personal Loan in Mumbai',
  'Personal Loan in Pune',
  'Personal Loan in Delhi',
  'Personal Loan in Noida',
  'Personal Loan in Hyderabad',
  'Personal Loan in Bangalore',
  'Personal Loan in Gurgaon'
];

const ALL_CITIES = [
  'Personal Loan in Mumbai',
  'Personal Loan in Pune',
  'Personal Loan in Delhi',
  'Personal Loan in Noida',
  'Personal Loan in Hyderabad',
  'Personal Loan in Bangalore',
  'Personal Loan in Gurgaon',
  'Personal Loan in Chandigarh',
  'Personal Loan in Chennai',
  'Personal Loan in Kolkata',
  'Personal Loan in Ahmedabad',
  'Personal Loan in Coimbatore',
  'Personal Loan in Jaipur',
  'Personal Loan in Kochi',
  'Personal Loan in Indore',
  'Personal Loan in Guwahati',
  'Personal Loan in Surat',
  'Personal Loan in Nagpur',
  'Personal Loan in Rajkot',
  'Personal Loan in Vadodara'
];

const RATE_ROWS = [
  { sno: '1', name: 'Personal Loan', slug: 'personal-loan', rate: '9.00% to 22.00%+ p.a.', note: 'Zero collateral, same-day disbursal, 1-7 yrs flexible tenure' },
  { sno: '2', name: 'Business Loan', slug: 'business-loan', rate: '9.50% to 36.00% p.a.', note: 'Working capital & machinery, tax-deductible interest' },
  { sno: '3', name: 'Home Loan', slug: 'home-loan', rate: '7.15% to 8.40%+ p.a.', note: 'RBI repo linked, extended 30-yr tenure, Sec 24/80C tax rebates' },
  { sno: '4', name: 'Loan Against Property', slug: 'loan-against-property', rate: '8.40% to 12.50% p.a.', note: 'High loan quantum up to ₹10 Cr on residential & commercial assets' },
  { sno: '5', name: 'Gold Loan', slug: 'gold-loan', rate: '6.90% to 18.00% p.a.', note: 'Instant 30-min sanction, zero income proof needed' },
  { sno: '6', name: 'Education Loan', slug: 'education-loan', rate: '8.00% to 16.00% p.a.', note: 'India & overseas university programs, moratorium repayment' },
  { sno: '7', name: 'Car Loan', slug: 'car-loan', rate: '8.50% p.a. onwards', note: 'Up to 100% on-road financing for new & pre-owned vehicles' },
  { sno: '8', name: 'Two-Wheeler Loan', slug: 'two-wheeler-loan', rate: '7.60% to 28.00% p.a.', note: 'Zero down payment options, special EV subsidies supported' },
  { sno: '9', name: 'Medical Loan', slug: 'medical-loan', rate: '8.90% to 30.50% p.a.', note: 'Fast 4-hr emergency disbursal, zero prepayment charges' },
  { sno: '10', name: 'Loan Against Securities', slug: 'loan-against-securities', rate: '7.50% to 15.00% p.a.', note: 'Overdraft on shares & mutual funds without liquidating portfolio' },
  { sno: '11', name: 'Debt Consolidation Loan', slug: 'debt-consolidation-loan', rate: '9.99% to 30.00% p.a.', note: 'Unify multiple high-interest cards & micro-loans, reduce EMI up to 40%' },
  { sno: '12', name: 'Easy EMI Loan', slug: 'easy-emi-loan', rate: '8.75% to 36.00% p.a.', note: 'Instant point-of-sale financing, flexible ticket sizes' }
];

const HOME_FAQS = [
  {
    num: "01",
    category: "EMI & Planning",
    group: "planning",
    q: "How do I estimate my monthly EMI?",
    a: "Enter your desired loan amount, annual interest rate, and tenure into our interactive EMI calculator. It calculates your scheduled repayment using standard reducing-balance math, detailing exact monthly payouts and total interest."
  },
  {
    num: "02",
    category: "Eligibility & CIBIL",
    group: "eligibility",
    q: "What affects loan eligibility?",
    a: "Lenders evaluate monthly net take-home salary, employer stability (minimum 6–12 months vintage), credit/CIBIL score (ideally 700+), existing monthly fixed obligations (FOIR), and individual lender underwriting criteria."
  },
  {
    num: "03",
    category: "Approval & Sanction",
    group: "eligibility",
    q: "Does checking eligibility guarantee approval?",
    a: "No. Checking eligibility provides an indicative pre-sanction estimate without harming your credit score. Formal approval, final loan amount, and APR are confirmed after digital document submission and underwriting checks."
  },
  {
    num: "04",
    category: "Fees & Charges",
    group: "charges",
    q: "What charges should I check besides interest?",
    a: "Always review processing fees (typically 0.5% to 2.5% + GST), documentation charges, late payment charges, bounce fees, and prepayment/foreclosure conditions before signing the agreement."
  },
  {
    num: "05",
    category: "Disbursal Speed",
    group: "process",
    q: "How fast can I receive funds after approval?",
    a: "Instant and pre-approved personal loans are typically credited to your bank account within 30 minutes to 24 hours. Secured loans (such as Home Loans or LAP) generally take 3 to 7 working days for legal verification."
  },
  {
    num: "06",
    category: "KYC & Documents",
    group: "process",
    q: "What documents do I need to prepare?",
    a: "Standard requirements include PAN card, Aadhaar / Passport for identity and address proof, latest 3 to 6 months bank statement showing income credits, and recent 3 salary slips or last 2 years ITR."
  },
  {
    num: "07",
    category: "Repayment & Closure",
    group: "charges",
    q: "Can I repay a loan early?",
    a: "Yes! Individual floating-rate personal and home loans have 0% foreclosure or part-prepayment penalties per RBI directives. Fixed-rate or business loans may feature nominal prepayment fees after a standard 6-month lock-in."
  },
  {
    num: "08",
    category: "Disclosures & Risk",
    group: "planning",
    q: "Are investment returns guaranteed?",
    a: "Not always. Mutual funds, equities, and market-linked products carry market risks. Fixed deposits and sovereign bonds provide assured returns. Always inspect product documents, expense ratios, and risk factors before investing."
  }
];

export default function Home({ onOpenApplyModal }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language ? i18n.language.substring(0, 2) : 'en';
  const isHi = currentLang === 'hi';
  const isPa = currentLang === 'pa';

  const cards = isHi ? LOAN_CARDS_HI : isPa ? LOAN_CARDS_PA : LOAN_CARDS;
  const primaryCities = isHi ? PRIMARY_CITIES_HI : isPa ? PRIMARY_CITIES_PA : PRIMARY_CITIES;
  const allCities = isHi ? ALL_CITIES_HI : isPa ? ALL_CITIES_PA : ALL_CITIES;
  const rateRows = isHi ? RATE_ROWS_HI : isPa ? RATE_ROWS_PA : RATE_ROWS;
  const homeFaqs = isHi ? HOME_FAQS_HI : isPa ? HOME_FAQS_PA : HOME_FAQS;

  const getLocalePath = (path) => {
    if (currentLang === 'en') return path;
    if (path === '/') return `/${currentLang}`;
    return `/${currentLang}${path.startsWith('/') ? path : '/' + path}`;
  };

  // 1. Hero Calculator State
  const [heroAmount, setHeroAmount] = useState(500000);
  const [heroTenure, setHeroTenure] = useState(5);
  const [heroRate, setHeroRate] = useState(12);

  // 2. Dedicated Section EMI Calculator State
  const [calcAmount, setCalcAmount] = useState(500000);
  const [calcRate, setCalcRate] = useState(12);
  const [calcTenure, setCalcTenure] = useState(5);

  // 3. Category Filter State for Loans Section
  const [filter, setFilter] = useState('all');

  // 4. Contact Enquiry Form State
  const [contactForm, setContactForm] = useState({ fullName: '', email: '', loanType: isHi ? 'पर्सनल लोन' : isPa ? 'ਪਰਸਨਲ ਲੋਨ' : 'Personal loan' });
  const [contactSuccess, setContactSuccess] = useState('');

  // 5. Locations Showcase State (Top 7 vs All 20)
  const [showAllLocations, setShowAllLocations] = useState(false);

  // 6. Interest Rates Showcase State (Top 5 vs All 12)
  const [showAllRates, setShowAllRates] = useState(false);

  // 7. Common Questions State (Matching design reference)
  const [activeHomeFaq, setActiveHomeFaq] = useState(null);

  const commonQuestions = [
    homeFaqs[0], // How do I estimate my monthly EMI?
    homeFaqs[1], // What affects loan eligibility?
    homeFaqs[2], // Does checking eligibility guarantee approval?
    homeFaqs[3], // What charges should I check besides interest?
    homeFaqs[6], // Can I repay a loan early?
    homeFaqs[7]  // Are investment returns guaranteed?
  ].filter(Boolean);

  // 5. Hero EMI Math
  const heroMRate = heroRate / 1200;
  const heroTMonths = heroTenure * 12;
  const heroEmi = Math.round(
    heroMRate === 0
      ? heroAmount / heroTMonths
      : (heroAmount * heroMRate * Math.pow(1 + heroMRate, heroTMonths)) / (Math.pow(1 + heroMRate, heroTMonths) - 1)
  );
  const heroTotalPayment = Math.round(heroEmi * heroTMonths);
  const heroTotalInterest = Math.max(0, heroTotalPayment - heroAmount);

  // 6. Section EMI Math
  const cMRate = calcRate / 1200;
  const cTMonths = calcTenure * 12;
  const cEmi = Math.round(
    cMRate === 0
      ? calcAmount / cTMonths
      : (calcAmount * cMRate * Math.pow(1 + cMRate, cTMonths)) / (Math.pow(1 + cMRate, cTMonths) - 1)
  );
  const cTotalPayment = Math.round(cEmi * cTMonths);
  const cTotalInterest = Math.max(0, cTotalPayment - calcAmount);
  const principalPercent = cTotalPayment > 0 ? Math.round((calcAmount / cTotalPayment) * 100) : 75;
  const interestPercent = 100 - principalPercent;

  const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const filteredCards = filter === 'all' 
    ? cards 
    : cards.filter(c => c.category === filter);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (isHi) {
      setContactSuccess(`✓ धन्यवाद, ${contactForm.fullName}! ${contactForm.loanType} के लिए आपकी पूछताछ दर्ज कर ली गई है। हमारे लोन सलाहकार जल्द आपसे संपर्क करेंगे।`);
    } else if (isPa) {
      setContactSuccess(`✓ ਧੰਨਵਾਦ, ${contactForm.fullName}! ${contactForm.loanType} ਲਈ ਤੁਹਾਡੀ ਪੁੱਛਗਿੱਛ ਦਰਜ ਕਰ ਲਈ ਗਈ ਹੈ। ਸਾਡੇ ਲੋਨ ਸਲਾਹਕਾਰ ਜਲਦੀ ਹੀ ਤੁਹਾਡੇ ਨਾਲ ਰਾਬਤਾ ਕਰਨਗੇ।`);
    } else {
      setContactSuccess(`✓ Thank you, ${contactForm.fullName}! Your sample enquiry for ${contactForm.loanType} has been recorded. Our financial advisor will connect shortly.`);
    }
    setContactForm({ fullName: '', email: '', loanType: isHi ? 'पर्सनल लोन' : isPa ? 'ਪਰਸਨਲ ਲੋਨ' : 'Personal loan' });
  };

  return (
    <main>
      <SeoHead 
        title={t('seo.homeTitle', 'Loan Aasra | Your Dreams, Our Support - Compare, Calculate & Apply for Loans')}
        description={t('seo.homeDesc', 'Compare personal, home, business & gold loans with Loan Aasra. Calculate instant reducing-balance EMIs, check eligibility without CIBIL impact, and apply online.')}
      />

      {/* 1. Hero Section */}
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="eyebrow-dash"></span>
              <span className="eyebrow-text">{t('hero.badge', 'LOAN OPTIONS | EMI CALCULATORS | FINANCIAL GUIDANCE')}</span>
            </div>
            <h1>
              {t('hero.titleLine1', 'Looking for a Loan?')}<br />
              {t('hero.titleLine2', 'Start With a')}<br />
              <span className="hero-blue text-gradient-blue">{t('hero.titleLine3', 'Clear Plan.')}</span>
            </h1>
            <p>{t('hero.subtitle', 'Compare loan options, estimate your monthly EMI and understand your next steps with clear, straightforward information.')}</p>
            
            <div className="hero-actions">
              <a className="btn btn-primary" href="#loans">
                {t('common.exploreLoanOptions', 'Explore loan options')} <span>→</span>
              </a>
              <a className="btn btn-outline" href="#calculators">
                {t('common.calculateMyEmi', 'Calculate my EMI')}
              </a>
            </div>

            <div className="trust-row">
              <span><i className="check">✓</i> {t('trust.pill1', '100% Paperless Journey')}</span>
              <span><i className="check">✓</i> {t('trust.pill2', 'Zero Collateral Options')}</span>
              <span><i className="check">✓</i> {t('trust.pill3', '30+ Lending Partners')}</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Interactive Loan Calculator">
            <div className="visual-blob"></div>
            <div className="hero-calculator-card">
              <div className="card-top">
                <div>
                  <small className="hero-calc-badge">{t('calculator.eyebrow', 'TACTILE REPAYMENT ENGINE')}</small>
                  <h3 style={{ margin: '5px 0 0', fontSize: '1.25rem' }}>{t('calculator.heading', 'Calculate your monthly EMI with mathematical precision')}</h3>
                </div>
                <div className="card-icon">₹</div>
              </div>

              {/* Amount Field */}
              <div className="hero-calc-field">
                <div className="hero-calc-head">
                  <label htmlFor="heroAmount">{t('calculator.amountLabel', 'Loan amount')}</label>
                  <output id="heroAmountOut">{formatINR(heroAmount)}</output>
                </div>
                <input 
                  id="heroAmount" 
                  type="range" 
                  min="50000" 
                  max="5000000" 
                  step="25000" 
                  value={heroAmount} 
                  onChange={e => setHeroAmount(Number(e.target.value))}
                  aria-label="Loan amount in Rupees"
                />
                <div className="hero-calc-presets">
                  {[100000, 500000, 1000000, 2500000, 5000000].map(val => (
                    <button 
                      key={val} 
                      type="button" 
                      className={`hero-preset-btn ${heroAmount === val ? 'active' : ''}`}
                      onClick={() => setHeroAmount(val)}
                    >
                      ₹{val >= 100000 ? `${val / 100000}L` : val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tenure & Rate Sliders */}
              <div className="hero-calc-row">
                <div className="hero-calc-field-half">
                  <div className="hero-calc-head-sm">
                    <label htmlFor="heroTenure">{t('calculator.tenureLabel', 'Tenure')}</label>
                    <output id="heroTenureOut">{heroTenure} {heroTenure === 1 ? t('common.years', 'year') : t('common.years', 'years')}</output>
                  </div>
                  <input 
                    id="heroTenure" 
                    type="range" 
                    min="1" 
                    max="30" 
                    step="1" 
                    value={heroTenure} 
                    onChange={e => setHeroTenure(Number(e.target.value))}
                    aria-label="Loan tenure in years"
                  />
                </div>
                <div className="hero-calc-field-half">
                  <div className="hero-calc-head-sm">
                    <label htmlFor="heroRate">{t('calculator.rateLabel', 'Interest')}</label>
                    <output id="heroRateOut">{heroRate}%</output>
                  </div>
                  <input 
                    id="heroRate" 
                    type="range" 
                    min="7" 
                    max="24" 
                    step="0.25" 
                    value={heroRate} 
                    onChange={e => setHeroRate(Number(e.target.value))}
                    aria-label="Annual interest rate percentage"
                  />
                </div>
              </div>

              {/* Dynamic Result Card */}
              <div className="hero-calc-result">
                <div className="hero-result-main">
                  <small>{t('calculator.monthlyEmi', 'Estimated monthly EMI')}</small>
                  <div className="hero-emi-val" id="heroEmiOut">{formatINR(heroEmi)}</div>
                </div>
                <div className="hero-result-sub">
                  <div>
                    <small>{t('calculator.totalInterest', 'Total interest')}</small>
                    <strong id="heroTotalInterest">{formatINR(heroTotalInterest)}</strong>
                  </div>
                  <div>
                    <small>{t('calculator.totalAmount', 'Total repayment')}</small>
                    <strong id="heroTotalPayment">{formatINR(heroTotalPayment)}</strong>
                  </div>
                </div>
              </div>

              <div className="hero-calc-actions">
                <button 
                  type="button"
                  className="btn btn-primary btn-calc" 
                  onClick={() => onOpenApplyModal('Snapshot Loan')}
                >
                  {t('calculator.applyWithAmount', 'Apply based on this estimate')} ↗
                </button>
              </div>
            </div>

            <div className="floating-note">
              <strong>{isHi ? 'आवेदन से पहले सही योजना बनाएं' : isPa ? 'ਅਰਜ਼ੀ ਦੇਣ ਤੋਂ ਪਹਿਲਾਂ ਸਹੀ ਯੋਜਨਾ ਬਣਾਓ' : 'Plan before you apply'}</strong>
              <span>{isHi ? 'तुलना करें • किस्त जानें • सही फैसला लें' : isPa ? 'ਤੁਲਨਾ ਕਰੋ • ਕਿਸ਼ਤ ਜਾਣੋ • ਸਹੀ ਫ਼ੈਸਲਾ ਲਵੋ' : 'Compare. Calculate. Decide.'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Strip Links */}
      <section className="quick-strip" aria-label="Quick links">
        <div className="container quick-grid">
          <a className="quick-item" href="#calculators">
            <span className="quick-icon">⌗</span>
            <span>
              <strong>{isHi ? 'अपनी मासिक किस्त जानें' : isPa ? 'ਆਪਣੀ ਮਹੀਨਾਵਾਰ ਕਿਸ਼ਤ ਜਾਣੋ' : 'Calculate your EMI'}</strong>
              <small>{isHi ? 'हर महीने की किस्त का हिसाब लगाएं' : isPa ? 'ਹਰ ਮਹੀਨੇ ਦੀ ਕਿਸ਼ਤ ਦਾ ਹਿਸਾਬ ਲਗਾਓ' : 'Estimate monthly payments'}</small>
            </span>
          </a>
          <a className="quick-item" href="#eligibility">
            <span className="quick-icon">✓</span>
            <span>
              <strong>{isHi ? 'लोन की योग्यता जांचें' : isPa ? 'ਲੋਨ ਦੀ ਯੋਗਤਾ ਜਾਣੋ' : 'Check eligibility'}</strong>
              <small>{isHi ? 'जानें किन बातों का ध्यान रखना है' : isPa ? 'ਜਾਣੋ ਕਿਹੜੀਆਂ ਗੱਲਾਂ ਦਾ ਧਿਆਨ ਰੱਖਣਾ ਹੈ' : 'Understand what matters'}</small>
            </span>
          </a>
          <a className="quick-item" href="#rates">
            <span className="quick-icon">％</span>
            <span>
              <strong>{isHi ? 'ब्याज दरें देखें' : isPa ? 'ਵਿਆਜ ਦਰਾਂ ਦੇਖੋ' : 'View interest rates'}</strong>
              <small>{isHi ? 'सभी शुल्कों की जानकारी लें' : isPa ? 'ਸਾਰੇ ਖ਼ਰਚਿਆਂ ਦੀ ਜਾਣਕਾਰੀ ਲਵੋ' : 'Review key charges'}</small>
            </span>
          </a>
          <a className="quick-item" href="#investment">
            <span className="quick-icon">↗</span>
            <span>
              <strong>{isHi ? 'बचत और निवेश देखें' : isPa ? 'ਬੱਚਤ ਅਤੇ ਨਿਵੇਸ਼ ਦੇਖੋ' : 'Explore investments'}</strong>
              <small>{isHi ? 'सुरक्षित बचत के विकल्प जानें' : isPa ? 'ਸੁਰੱਖਿਅਤ ਬੱਚਤ ਦੇ ਵਿਕਲਪ ਜਾਣੋ' : 'Review savings options'}</small>
            </span>
          </a>
        </div>
      </section>

      {/* Continuously Scrolling Trust-Benefits Marquee */}
      <TrustMarquee />

      {/* 3. Loans Section (Preserved Exactly As-Is with all cards and links) */}
      <section className="section" id="loans">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{t('categories.eyebrow', 'Borrow with purpose')}</span>
            <h2>{isHi ? <>तुरंत वित्तीय जरूरत के लिए <span className="text-gradient-blue">क्विक लोन</span></> : isPa ? <>ਤੁਰੰਤ ਵਿੱਤੀ ਲੋੜ ਲਈ <span className="text-gradient-blue">ਕਵਿੱਕ ਲੋਨ</span></> : <>Quick loan for <span className="text-gradient-blue">immediate financial need</span></>}</h2>
            <p>{t('categories.subheading', 'Pick your reason for borrowing to see personalized options and compare real cost breakdowns before you commit.')}</p>
          </div>

          {/* Interactive Category Filter */}
          <div className="filter-bar" role="tablist" aria-label="Filter loans by category">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>{t('categories.filterAll', 'All Loans')} (12)</button>
            <button className={`filter-btn ${filter === 'personal' ? 'active' : ''}`} onClick={() => setFilter('personal')}>{t('categories.filterPersonal', 'Personal & Instant')}</button>
            <button className={`filter-btn ${filter === 'property' ? 'active' : ''}`} onClick={() => setFilter('property')}>{t('categories.filterProperty', 'Home & Property')}</button>
            <button className={`filter-btn ${filter === 'business' ? 'active' : ''}`} onClick={() => setFilter('business')}>{t('categories.filterBusiness', 'Business & Wealth')}</button>
          </div>

          <div className="product-grid">
            {filteredCards.map(c => (
              <article key={c.slug} className="product-card">
                <div className="product-card-img">
                  <img src={c.img} alt={c.name} loading="lazy" />
                  <span className="product-card-badge">{c.badge}</span>
                </div>
                <div className="product-card-body">
                  <h3>{c.name}</h3>
                  <p>{c.desc}</p>
                  <div className="product-card-footer">
                    <Link className="text-link" to={getLocalePath(`/${c.slug}`)}>
                      {isHi ? `${c.name} के बारे में जानें →` : isPa ? `${c.name} ਬਾਰੇ ਜਾਣੋ →` : `Explore ${c.name.toLowerCase()} →`}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EMI Calculators Section */}
      <section className="section soft-section" id="calculators">
        <div className="container split">
          <div>
            <div className="section-head">
              <span className="eyebrow">{isHi ? 'किस्त चुकाने की योजना बनाएं' : isPa ? 'ਕਿਸ਼ਤ ਚੁਕਾਉਣ ਦੀ ਯੋਜਨਾ ਬਣਾਓ' : 'Plan your repayments'}</span>
              <h2>{isHi ? <>कुछ ही सेकंड में <span className="text-gradient-blue">अपनी मासिक किस्त जानें</span></> : isPa ? <>ਕੁਝ ਹੀ ਸਕਿੰਟਾਂ ਵਿੱਚ <span className="text-gradient-blue">ਆਪਣੀ ਮਹੀਨਾਵਾਰ ਕਿਸ਼ਤ ਜਾਣੋ</span></> : <>Calculate your EMI in <span className="text-gradient-blue">seconds</span></>}</h2>
              <p>{isHi ? 'लोन की राशि, ब्याज दर और समय चुनकर अपनी मासिक किस्त का अनुमान लगाएं। इससे आपको सही लोन चुनने में मदद मिलेगी।' : isPa ? 'ਲੋਨ ਦੀ ਰਕਮ, ਵਿਆਜ ਦਰ ਅਤੇ ਸਮਾਂ ਚੁਣ ਕੇ ਆਪਣੀ ਮਹੀਨਾਵਾਰ ਕਿਸ਼ਤ ਦਾ ਅੰਦਾਜ਼ਾ ਲਗਾਓ। ਇਸ ਨਾਲ ਤੁਹਾਨੂੰ ਸਹੀ ਲੋਨ ਚੁਣਨ ਵਿੱਚ ਮਦਦ ਮਿਲੇਗੀ।' : 'Adjust the amount, interest rate and repayment period to estimate a monthly payment. Use this as a starting point for comparing loan offers.'}</p>
            </div>

            <div className="calc-features">
              <div className="feature">
                <span className="check">✓</span>
                <div>
                  <strong>{isHi ? 'हर महीने की अनुमानित किस्त देखें' : isPa ? 'ਹਰ ਮਹੀਨੇ ਦੀ ਅੰਦਾਜ਼ਨ ਕਿਸ਼ਤ ਦੇਖੋ' : 'See the monthly estimate'}</strong>
                  <p>{isHi ? 'समझें कि लोन राशि और समय बदलने से किस्त पर क्या असर पड़ता है।' : isPa ? 'ਸਮਝੋ ਕਿ ਲੋਨ ਰਕਮ ਅਤੇ ਸਮਾਂ ਬਦਲਣ ਨਾਲ ਕਿਸ਼ਤ \'ਤੇ ਕੀ ਅਸਰ ਪੈਂਦਾ ਹੈ।' : 'Understand how loan size and tenure affect your monthly budget.'}</p>
                </div>
              </div>
              <div className="feature">
                <span className="check">✓</span>
                <div>
                  <strong>{isHi ? 'अलग-अलग विकल्पों की तुलना करें' : isPa ? 'ਵੱਖ-ਵੱਖ ਵਿਕਲਪਾਂ ਦੀ ਤੁਲਨਾ ਕਰੋ' : 'Compare different scenarios'}</strong>
                  <p>{isHi ? 'राशि या अवधि बदलकर देखें कि कौन सी किस्त आपके बजट के अनुकूल है।' : isPa ? 'ਰਕਮ ਜਾਂ ਸਮਾਂ ਬਦਲ ਕੇ ਦੇਖੋ ਕਿ ਕਿਹੜੀ ਕਿਸ਼ਤ ਤੁਹਾਡੇ ਬਜਟ ਵਿੱਚ ਸਹੀ ਬੈਠਦੀ ਹੈ।' : 'Change one value at a time to see how your estimated EMI changes.'}</p>
                </div>
              </div>
              <div className="feature">
                <span className="check">✓</span>
                <div>
                  <strong>{isHi ? 'कुल भुगतान की जांच करें' : isPa ? 'ਕੁੱਲ ਵਾਪਸੀ ਰਕਮ ਦੇਖੋ' : 'Review total repayment'}</strong>
                  <p>{isHi ? 'मासिक किस्त के साथ-साथ यह भी देखें कि कुल कितना ब्याज देना होगा।' : isPa ? 'ਮਹੀਨਾਵਾਰ ਕਿਸ਼ਤ ਦੇ ਨਾਲ-ਨਾਲ ਇਹ ਵੀ ਦੇਖੋ ਕਿ ਕੁੱਲ ਕਿੰਨਾ ਵਿਆਜ ਦੇਣਾ ਪਵੇਗਾ।' : 'Consider interest cost alongside the monthly amount.'}</p>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: '1.6' }}>
              {isHi 
                ? 'इसके अलावा उपलब्ध: पर्सनल लोन कैलकुलेटर, होम लोन कैलकुलेटर, बिज़नेस लोन कैलकुलेटर और लोन पात्रता कैलकुलेटर।'
                : isPa
                ? 'ਇਸ ਤੋਂ ਇਲਾਵਾ ਉਪਲਬਧ: ਪਰਸਨਲ ਲੋਨ ਕੈਲਕੁਲੇਟਰ, ਹੋਮ ਲੋਨ ਕੈਲਕੁਲੇਟਰ, ਬਿਜ਼ਨਸ ਲੋਨ ਕੈਲਕੁਲੇਟਰ ਅਤੇ ਲੋਨ ਯੋਗਤਾ ਕੈਲਕੁਲੇਟਰ।'
                : 'Also available: Personal Loan EMI Calculator, Home Loan EMI Calculator, Business Loan EMI Calculator, Loan Eligibility Calculator, Interest Rate Calculator and Loan Repayment Calculator.'}
            </p>
          </div>

          <div className="calculator-card">
            <h3>{isHi ? 'ईएमआई कैलकुलेटर' : isPa ? 'ਕਿਸ਼ਤ (EMI) ਕੈਲਕੁਲੇਟਰ' : 'EMI calculator'}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '24px' }}>
              {isHi ? 'स्लाइडर को आगे-पीछे करके अपनी मासिक किस्त का अनुमान लगाएं।' : isPa ? 'ਸਲਾਈਡਰ ਨੂੰ ਅੱਗੇ-ਪਿੱਛੇ ਕਰਕੇ ਆਪਣੀ ਮਹੀਨਾਵਾਰ ਕਿਸ਼ਤ ਦਾ ਅੰਦਾਜ਼ਾ ਲਗਾਓ।' : 'Move the sliders to estimate your repayment.'}
            </p>

            {/* Field 1: Amount */}
            <div className="field">
              <div className="field-head">
                <label htmlFor="loanAmount">{isHi ? 'लोन की राशि' : isPa ? 'ਲੋਨ ਦੀ ਰਕਮ' : 'Loan amount'}</label>
                <output id="amountOut">{formatINR(calcAmount)}</output>
              </div>
              <input 
                id="loanAmount" 
                type="range" 
                min="50000" 
                max="5000000" 
                step="25000" 
                value={calcAmount} 
                onChange={e => setCalcAmount(Number(e.target.value))}
                aria-label="Loan Amount Slider"
              />
              <div className="range-labels">
                <span>₹50,000</span>
                <span>{isHi ? '₹50 लाख' : isPa ? '₹50 ਲੱਖ' : '₹50 lakh'}</span>
              </div>
              <div className="presets">
                {[100000, 500000, 1000000, 2500000, 5000000].map(val => (
                  <span 
                    key={val} 
                    className="preset-chip" 
                    onClick={() => setCalcAmount(val)}
                    style={{ cursor: 'pointer' }}
                  >
                    ₹{val >= 100000 ? (isHi ? `${val / 100000} लाख` : isPa ? `${val / 100000} ਲੱਖ` : `${val / 100000} Lakh`) : val}
                  </span>
                ))}
              </div>
            </div>

            {/* Field 2: Interest */}
            <div className="field">
              <div className="field-head">
                <label htmlFor="interest">{isHi ? 'वार्षिक ब्याज दर' : isPa ? 'ਸਾਲਾਨਾ ਵਿਆਜ ਦਰ' : 'Annual interest rate'}</label>
                <output id="interestOut">{calcRate}%</output>
              </div>
              <input 
                id="interest" 
                type="range" 
                min="5" 
                max="24" 
                step="0.25" 
                value={calcRate} 
                onChange={e => setCalcRate(Number(e.target.value))}
                aria-label="Interest Rate Slider"
              />
              <div className="range-labels">
                <span>5%</span>
                <span>24%</span>
              </div>
            </div>

            {/* Field 3: Tenure */}
            <div className="field">
              <div className="field-head">
                <label htmlFor="tenure">{isHi ? 'लोन की अवधि' : isPa ? 'ਲੋਨ ਦਾ ਸਮਾਂ' : 'Loan tenure'}</label>
                <output id="tenureOut">{calcTenure} {calcTenure === 1 ? (isHi ? 'साल' : isPa ? 'ਸਾਲ' : 'year') : (isHi ? 'साल' : isPa ? 'ਸਾਲ' : 'years')}</output>
              </div>
              <input 
                id="tenure" 
                type="range" 
                min="1" 
                max="30" 
                step="1" 
                value={calcTenure} 
                onChange={e => setCalcTenure(Number(e.target.value))}
                aria-label="Loan Tenure Slider"
              />
              <div className="range-labels">
                <span>{isHi ? '1 साल' : isPa ? '1 ਸਾਲ' : '1 year'}</span>
                <span>{isHi ? '30 साल' : isPa ? '30 ਸਾਲ' : '30 years'}</span>
              </div>
            </div>

            {/* Results */}
            <div className="results" aria-live="polite">
              <p>{isHi ? 'अनुमानित मासिक किस्त (EMI)' : isPa ? 'ਅੰਦਾਜ਼ਨ ਮਹੀਨਾਵਾਰ ਕਿਸ਼ਤ (EMI)' : 'Estimated monthly EMI'}</p>
              <div className="emi-value" id="emiOut">{formatINR(cEmi)}</div>

              {/* Visual Breakdown Bar */}
              <div className="breakdown-bar">
                <div className="breakdown-labels">
                  <span id="principalRatio">{isHi ? `मूलधन: ${principalPercent}%` : isPa ? `ਮੂਲ ਰਕਮ: ${principalPercent}%` : `Principal: ${principalPercent}%`}</span>
                  <span id="interestRatio">{isHi ? `ब्याज: ${interestPercent}%` : isPa ? `ਵਿਆਜ: ${interestPercent}%` : `Interest: ${interestPercent}%`}</span>
                </div>
                <div className="breakdown-track">
                  <div className="principal-fill" id="principalFill" style={{ width: `${principalPercent}%` }}></div>
                  <div className="interest-fill" id="interestFill" style={{ width: `${interestPercent}%` }}></div>
                </div>
              </div>

              <div className="result-grid">
                <div>
                  <small>{isHi ? 'कुल ब्याज' : isPa ? 'ਕੁੱਲ ਵਿਆਜ' : 'Total interest'}</small>
                  <strong id="totalInterest">{formatINR(cTotalInterest)}</strong>
                </div>
                <div>
                  <small>{isHi ? 'कुल भुगतान' : isPa ? 'ਕੁੱਲ ਵਾਪਸੀ' : 'Total repayment'}</small>
                  <strong id="totalPayment">{formatINR(cTotalPayment)}</strong>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '14px 0 0', lineHeight: '1.4' }}>
              {isHi 
                ? 'यह केवल अनुमानित गणना है। बैंक के नियमों, प्रोसेसिंग फीस और वास्तविक ब्याज दर के अनुसार अंतिम राशि में थोड़ा अंतर हो सकता है।'
                : isPa
                ? 'ਇਹ ਸਿਰਫ਼ ਅੰਦਾਜ਼ਨ ਗਿਣਤੀ ਹੈ। ਬੈਂਕ ਦੇ ਨਿਯਮਾਂ, ਪ੍ਰੋਸੈਸਿੰਗ ਫੀਸ ਅਤੇ ਅਸਲ ਵਿਆਜ ਦਰ ਮੁਤਾਬਕ ਆਖ਼ਰੀ ਰਕਮ ਵਿੱਚ ਥੋੜ੍ਹਾ ਫ਼ਰਕ ਹੋ ਸਕਦਾ ਹੈ।'
                : 'Estimate only. Fees, taxes, lender terms and actual rates may change the final repayment amount.'}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Eligibility Section */}
      <section className="section" id="eligibility">
        <div className="container">
          <div className="eligibility-band">
            <div>
              <span className="eyebrow" style={{ background: 'rgba(255,255,255,0.15)', color: '#ffd18a', borderColor: 'rgba(255,255,255,0.2)' }}>
                {isHi ? 'अगला कदम' : isPa ? 'ਅਗਲਾ ਕਦਮ' : 'Your next step'}
              </span>
              <h2>{isHi ? <>जानें कि आप <span className="text-gradient-gold">लोन के लिए योग्य हैं या नहीं</span></> : isPa ? <>ਜਾਣੋ ਕਿ ਤੁਸੀਂ <span className="text-gradient-gold">ਲੋਨ ਦੇ ਯੋਗ ਹੋ ਜਾਂ ਨਹੀਂ</span></> : <>Understand your <span className="text-gradient-gold">loan eligibility</span></>}</h2>
              <p>{isHi ? 'आपकी पात्रता आपकी मासिक आय, मौजूदा किस्तों, सिबिल स्कोर और बैंक के नियमों पर निर्भर करती है।' : isPa ? 'ਤੁਹਾਡੀ ਯੋਗਤਾ ਤੁਹਾਡੀ ਮਹੀਨਾਵਾਰ ਕਮਾਈ, ਪੁਰਾਣੀਆਂ ਕਿਸ਼ਤਾਂ, ਸਿਬਿਲ ਸਕੋਰ ਅਤੇ ਬੈਂਕ ਦੇ ਨਿਯਮਾਂ \'ਤੇ ਨਿਰਭਰ ਕਰਦੀ ਹੈ।' : 'Eligibility may depend on income, existing obligations, credit history, employment or business profile, loan amount and lender policy.'}</p>
            </div>
            <a className="btn btn-primary" href="#contact">{isHi ? 'पात्रता की जानकारी लें ↗' : isPa ? 'ਯੋਗਤਾ ਦੀ ਜਾਣਕਾਰੀ ਲਵੋ ↗' : 'Start an eligibility enquiry ↗'}</a>
          </div>

          <div style={{ marginTop: '50px' }} className="section-head">
            <h2 style={{ fontSize: '1.85rem' }}>{isHi ? 'लोन के अनुसार अपनी योग्यता समझें' : isPa ? 'ਲੋਨ ਮੁਤਾਬਕ ਆਪਣੀ ਯੋਗਤਾ ਸਮਝੋ' : 'Explore eligibility by loan type'}</h2>
            <p>{isHi ? 'इन बुनियादी बातों से समझें कि बैंक आपके आवेदन में क्या-क्या जांचते हैं।' : isPa ? 'ਇਨ੍ਹਾਂ ਬੁਨਿਆਦੀ ਗੱਲਾਂ ਤੋਂ ਸਮਝੋ ਕਿ ਬੈਂਕ ਤੁਹਾਡੀ ਅਰਜ਼ੀ ਵਿੱਚ ਕੀ-ਕੀ ਦੇਖਦੇ ਹਨ।' : 'Use these starting points to understand the factors lenders may assess. They are not approval decisions.'}</p>
          </div>

          <div className="eligibility-grid">
            <article className="product-card">
              <div className="product-card-body" style={{ paddingTop: '26px' }}>
                <h3>{isHi ? 'पर्सनल लोन के लिए योग्यता' : isPa ? 'ਪਰਸਨਲ ਲੋਨ ਲਈ ਯੋਗਤਾ' : 'Personal Loan Eligibility'}</h3>
                <p>{isHi ? 'अपनी मासिक आय, नौकरी की स्थिरता, सिबिल स्कोर और मौजूदा किस्तों की स्थिति समझें।' : isPa ? 'ਆਪਣੀ ਮਹੀਨਾਵਾਰ ਕਮਾਈ, ਨੌਕਰੀ ਦੀ ਸਥਿਰਤਾ, ਸਿਬਿਲ ਸਕੋਰ ਅਤੇ ਪੁਰਾਣੀਆਂ ਕਿਸ਼ਤਾਂ ਦੀ ਸਥਿਤੀ ਸਮਝੋ।' : 'Review income, employment, credit profile and current monthly commitments.'}</p>
                <div className="product-card-footer">
                  <a className="text-link" href="#contact">{isHi ? 'जरूरी शर्तें देखें →' : isPa ? 'ਜ਼ਰੂਰੀ ਸ਼ਰਤਾਂ ਦੇਖੋ →' : 'Check requirements →'}</a>
                </div>
              </div>
            </article>

            <article className="product-card">
              <div className="product-card-body" style={{ paddingTop: '26px' }}>
                <h3>{isHi ? 'बिज़नेस लोन के लिए योग्यता' : isPa ? 'ਬਿਜ਼ਨਸ ਲੋਨ ਲਈ ਯੋਗਤਾ' : 'Business Loan Eligibility'}</h3>
                <p>{isHi ? 'कारोबार के वर्ष, सालाना टर्नओवर, बैंक स्टेटमेंट और सिबिल रिकॉर्ड समझें।' : isPa ? 'ਕਾਰੋਬਾਰ ਦੇ ਸਾਲ, ਸਾਲਾਨਾ ਟਰਨਓਵਰ, ਬੈਂਕ ਸਟੇਟਮੈਂਟ ਅਤੇ ਸਿਬਿਲ ਰਿਕਾਰਡ ਸਮਝੋ।' : 'Review business vintage, turnover, cash flow, documents and credit profile.'}</p>
                <div className="product-card-footer">
                  <a className="text-link" href="#contact">{isHi ? 'जरूरी शर्तें देखें →' : isPa ? 'ਜ਼ਰੂਰੀ ਸ਼ਰਤਾਂ ਦੇਖੋ →' : 'Check requirements →'}</a>
                </div>
              </div>
            </article>

            <article className="product-card">
              <div className="product-card-body" style={{ paddingTop: '26px' }}>
                <h3>{isHi ? 'होम लोन के लिए योग्यता' : isPa ? 'ਹੋਮ ਲੋਨ ਲਈ ਯੋਗਤਾ' : 'Home Loan Eligibility'}</h3>
                <p>{isHi ? 'मासिक आय, डाउन पेमेंट, मौजूदा ईएमआई और प्रॉपर्टी के कागजात समझें।' : isPa ? 'ਮਹੀਨਾਵਾਰ ਕਮਾਈ, ਡਾਊਨ ਪੇਮੈਂਟ, ਮੌਜੂਦਾ ਕਿਸ਼ਤਾਂ ਅਤੇ ਜਾਇਦਾਦ ਦੇ ਕਾਗ਼ਜ਼ਾਤ ਸਮਝੋ।' : 'Consider income, down payment, existing EMIs, tenure and property details.'}</p>
                <div className="product-card-footer">
                  <a className="text-link" href="#contact">{isHi ? 'जरूरी शर्तें देखें →' : isPa ? 'ਜ਼ਰੂਰੀ ਸ਼ਰਤਾਂ ਦੇਖੋ →' : 'Check requirements →'}</a>
                </div>
              </div>
            </article>

            <article className="product-card">
              <div className="product-card-body" style={{ paddingTop: '26px' }}>
                <h3>{isHi ? 'सिबिल स्कोर के अनुसार योग्यता' : isPa ? 'ਸਿਬਿਲ ਸਕੋਰ ਮੁਤਾਬਕ ਯੋਗਤਾ' : 'Eligibility by Credit Score'}</h3>
                <p>{isHi ? 'जानें कि अच्छा सिबिल स्कोर आपको कम ब्याज दर पर लोन दिलाने में कैसे मदद करता है।' : isPa ? 'ਜਾਣੋ ਕਿ ਚੰਗਾ ਸਿਬਿਲ ਸਕੋਰ ਤੁਹਾਨੂੰ ਘੱਟ ਵਿਆਜ ਦਰ \'ਤੇ ਲੋਨ ਦਿਵਾਉਣ ਵਿੱਚ ਕਿਵੇਂ ਮਦਦ ਕਰਦਾ ਹੈ।' : 'Learn how credit history may influence lender assessment and offered terms.'}</p>
                <div className="product-card-footer">
                  <a className="text-link" href="#guides">{isHi ? 'सिबिल स्कोर गाइड पढ़ें →' : isPa ? 'ਸਿਬਿਲ ਸਕੋਰ ਗਾਈਡ ਪੜ੍ਹੋ →' : 'Read credit score guides →'}</a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 6. Interest Rates Section */}
      <section className="section soft-section" id="rates">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{isHi ? 'सत्यापित ब्याज दरें' : isPa ? 'ਪ੍ਰਮਾਣਿਤ ਵਿਆਜ ਦਰਾਂ' : 'Verified Interest Rates'}</span>
            <h2>{isHi ? <>सभी प्रकार के लोन की <span className="text-gradient-blue">ब्याज दरें और शर्तें</span></> : isPa ? <>ਸਾਰੇ ਲੋਨਾਂ ਦੀਆਂ <span className="text-gradient-blue">ਵਿਆਜ ਦਰਾਂ ਅਤੇ ਸ਼ਰਤਾਂ</span></> : <>Compare loan interest <span className="text-gradient-blue">rates and terms</span></>}</h2>
            <p>{isHi ? 'Loan Aasra पर सभी लोन श्रेणियों की ताजा वार्षिक ब्याज दरों की तुलना करें ताकि आप किफायती फैसला ले सकें।' : isPa ? 'Loan Aasra \'ਤੇ ਸਾਰੇ ਲੋਨਾਂ ਦੀਆਂ ਤਾਜ਼ਾ ਸਾਲਾਨਾ ਵਿਆਜ ਦਰਾਂ ਦੀ ਤੁਲਨਾ ਕਰੋ ਤਾਂ ਜੋ ਤੁਸੀਂ ਸਸਤਾ ਅਤੇ ਸਹੀ ਫ਼ੈਸਲਾ ਲੈ ਸਕੋ।' : 'Review current annual interest rate ranges (Per Annum) across all Loan Aasra loan categories to make transparent, cost-effective borrowing decisions.'}</p>
          </div>

          <div className="rate-table-wrap">
            <table>
              <thead>
                <tr>
                  <th style={{ width: '70px', textAlign: 'center' }}>{isHi ? 'क्र.सं.' : isPa ? 'ਲੜੀ ਨੰ.' : 'S. No.'}</th>
                  <th>{isHi ? 'लोन का प्रकार' : isPa ? 'ਲੋਨ ਦੀ ਕਿਸਮ' : 'Loan Type'}</th>
                  <th>{isHi ? 'ब्याज दर (सालाना)' : isPa ? 'ਵਿਆਜ ਦਰ (ਸਾਲਾਨਾ)' : 'Interest Rate (Per Annum)'}</th>
                  <th>{isHi ? 'मुख्य विशेषताएं' : isPa ? 'ਮੁੱਖ ਖ਼ਾਸੀਅਤਾਂ' : 'Key Highlights & Review'}</th>
                  <th style={{ textAlign: 'right' }}>{isHi ? 'विकल्प' : isPa ? 'ਵਿਕਲਪ' : 'Action'}</th>
                </tr>
              </thead>
              <tbody>
                {(showAllRates ? rateRows : rateRows.slice(0, 5)).map((row) => (
                  <tr key={row.sno}>
                    <td style={{ textAlign: 'center', fontWeight: '750', color: '#64748B' }}>{row.sno}</td>
                    <td>
                      <Link to={getLocalePath(`/${row.slug}`)} style={{ color: '#0A1C3E', fontWeight: '750', textDecoration: 'none' }}>
                        {row.name}
                      </Link>
                    </td>
                    <td>
                      <span className="rate-badge" style={{ fontWeight: '750', whiteSpace: 'nowrap' }}>{row.rate}</span>
                    </td>
                    <td style={{ color: '#475569', fontSize: '0.92rem' }}>{row.note}</td>
                    <td style={{ textAlign: 'right' }}>
                      <Link className="text-link" to={getLocalePath(`/${row.slug}`)} style={{ whiteSpace: 'nowrap', fontWeight: '650' }}>
                        {isHi ? 'जानकारी देखें →' : isPa ? 'ਜਾਣਕਾਰੀ ਦੇਖੋ →' : 'View details →'}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
            <button 
              type="button" 
              onClick={() => setShowAllRates(!showAllRates)}
              className="btn btn-outline"
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '11px 26px', 
                fontWeight: '700',
                background: showAllRates ? 'var(--porcelain-surface)' : 'var(--gold-wash-strong)',
                borderColor: showAllRates ? 'var(--porcelain-border)' : 'var(--gold-primary)',
                color: showAllRates ? 'var(--slate-800)' : 'var(--gold-deep)',
                cursor: 'pointer',
                borderRadius: '9999px',
                boxShadow: showAllRates ? 'none' : '0 2px 8px rgba(245, 158, 11, 0.15)'
              }}
              aria-expanded={showAllRates}
            >
              <span>{showAllRates ? (isHi ? 'केवल मुख्य 5 लोन दरें देखें' : isPa ? 'ਸਿਰਫ਼ ਮੁੱਖ 5 ਲੋਨ ਦਰਾਂ ਦੇਖੋ' : 'Show top 5 loan rates only') : (isHi ? 'सभी 12 ब्याज दरें देखें' : isPa ? 'ਸਾਰੀਆਂ 12 ਵਿਆਜ ਦਰਾਂ ਦੇਖੋ' : 'View all interest rates (12)')}</span>
              <span>{showAllRates ? '↑' : '↓'}</span>
            </button>
          </div>

          <p className="rate-note">
            <strong>{isHi ? 'ज़रूरी सूचना:' : isPa ? 'ਜ਼ਰੂਰੀ ਸੂਚਨਾ:' : 'Important:'}</strong> {isHi ? 'दिखाई गई ब्याज दरें वार्षिक (सालाना) हैं और बैंक के नियमों, आपके सिबिल स्कोर, आय और लोन अवधि पर निर्भर करती हैं। लोन लेने से पहले स्वीकृति पत्र (सेंक्शन लेटर) और शुल्क विवरण ध्यान से पढ़ें।' : isPa ? 'ਦੱਸੀਆਂ ਗਈਆਂ ਵਿਆਜ ਦਰਾਂ ਸਾਲਾਨਾ ਹਨ ਅਤੇ ਬੈਂਕ ਦੇ ਨਿਯਮਾਂ, ਤੁਹਾਡੇ ਸਿਬਿਲ ਸਕੋਰ, ਕਮਾਈ ਅਤੇ ਲੋਨ ਦੇ ਸਮੇਂ ਤੇ ਨਿਰਭਰ ਕਰਦੀਆਂ ਹਨ। ਲੋਨ ਲੈਣ ਤੋਂ ਪਹਿਲਾਂ ਪ੍ਰਵਾਨਗੀ ਪੱਤਰ (ਮਨਜ਼ੂਰੀ ਪੱਤਰ) ਅਤੇ ਫੀਸਾਂ ਦਾ ਵੇਰਵਾ ਧਿਆਨ ਨਾਲ ਪੜ੍ਹੋ।' : 'Quoted interest rates are annualized (Per Annum) and determined by individual lender credit evaluation, CIBIL score, income stability, and loan tenure. Review detailed sanction letters and fee schedules prior to acceptance.'}
          </p>

          <div style={{ marginTop: '26px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a className="btn btn-primary" href="#contact">{isHi ? 'लोन विशेषज्ञ से बात करें →' : isPa ? 'ਲੋਨ ਸਲਾਹਕਾਰ ਨਾਲ ਗੱਲ ਕਰੋ →' : 'Consult a Loan Specialist →'}</a>
            <a className="btn btn-outline" href="#calculators">{isHi ? 'ईएमआई कैलकुलेटर चलाएं' : isPa ? 'ਕਿਸ਼ਤ ਕੈਲਕੁਲੇਟਰ ਵਰਤੋ' : 'Use EMI Calculators'}</a>
          </div>
        </div>
      </section>

      {/* 7. Investment Section */}
      <section className="section" id="investment">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{isHi ? 'लोन के साथ बचत की योजना' : isPa ? 'ਲੋਨ ਦੇ ਨਾਲ ਬੱਚਤ ਦੀ ਯੋਜਨਾ' : 'Plan beyond borrowing'}</span>
            <h2>{isHi ? <>बचत और सुरक्षित <span className="text-gradient-blue">निवेश के विकल्प</span></> : isPa ? <>ਬੱਚਤ ਅਤੇ ਸੁਰੱਖਿਅਤ <span className="text-gradient-blue">ਨਿਵੇਸ਼ ਦੇ ਵਿਕਲਪ</span></> : <>Explore investment and <span className="text-gradient-blue">savings options</span></>}</h2>
            <p>{isHi ? 'अपनी जरूरत के अनुसार सही बचत विकल्प चुनें और सुरक्षित भविष्य की योजना बनाएं।' : isPa ? 'ਆਪਣੀ ਲੋੜ ਮੁਤਾਬਕ ਸਹੀ ਬੱਚਤ ਵਿਕਲਪ ਚੁਣੋ ਅਤੇ ਸੁਰੱਖਿਅਤ ਭਵਿੱਖ ਦੀ ਯੋਜਨਾ ਬਣਾਓ।' : 'Compare product features, risk, liquidity, time horizon and applicable terms before choosing an investment.'}</p>
          </div>

          <div className="investment-grid">
            <article className="investment-card">
              <div className="investment-card-img">
                <img src="/images/invest-fd.jpg" alt="Fixed Deposit savings investment" loading="lazy" />
              </div>
              <div className="investment-card-body">
                <h3>{isHi ? 'फिक्स्ड डिपॉजिट (FD)' : isPa ? 'ਫਿਕਸਡ ਡਿਪਾਜ਼ਿਟ (FD)' : 'Fixed Deposit'}</h3>
                <p>{isHi ? 'अवधि, ब्याज भुगतान के विकल्प और टैक्स लाभ की जानकारी लें।' : isPa ? 'ਸਮਾਂ, ਵਿਆਜ ਭੁਗਤਾਨ ਦੇ ਵਿਕਲਪ ਅਤੇ ਟੈਕਸ ਛੋਟ ਦੀ ਜਾਣਕਾਰੀ ਲਵੋ।' : 'Review tenure, payout choices, premature withdrawal terms and applicable tax.'}</p>
                <div className="product-card-footer">
                  <a className="text-link" href="#contact">{isHi ? 'फिक्स्ड डिपॉजिट देखें →' : isPa ? 'ਫਿਕਸਡ ਡਿਪਾਜ਼ਿਟ ਦੇਖੋ →' : 'View fixed deposits →'}</a>
                </div>
              </div>
            </article>

            <article className="investment-card">
              <div className="investment-card-img">
                <img src="/images/invest-rd.jpg" alt="Recurring deposit steady savings" loading="lazy" />
              </div>
              <div className="investment-card-body">
                <h3>{isHi ? 'रेकरिंग डिपॉजिट (RD)' : isPa ? 'ਰੈਕਰਿੰਗ ਡਿਪਾਜ਼ਿਟ (RD)' : 'Recurring Deposit'}</h3>
                <p>{isHi ? 'हर महीने छोटी बचत जमा करें और निश्चित ब्याज का लाभ पाएं।' : isPa ? 'ਹਰ ਮਹੀਨੇ ਛੋਟੀ ਬੱਚਤ ਜਮ੍ਹਾਂ ਕਰੋ ਅਤੇ ਪੱਕੇ ਵਿਆਜ ਦਾ ਲਾਭ ਲਵੋ।' : 'Explore regular saving contributions and maturity value based on product terms.'}</p>
                <div className="product-card-footer">
                  <a className="text-link" href="#contact">{isHi ? 'रेकरिंग डिपॉजिट देखें →' : isPa ? 'ਰੈਕਰਿੰਗ ਡਿਪਾਜ਼ਿਟ ਦੇਖੋ →' : 'View recurring deposits →'}</a>
                </div>
              </div>
            </article>

            <article className="investment-card">
              <div className="investment-card-img">
                <img src="/images/invest-scheme.jpg" alt="Government saving scheme growth" loading="lazy" />
              </div>
              <div className="investment-card-body">
                <h3>{isHi ? 'सरकारी बचत योजनाएं' : isPa ? 'ਸਰਕਾਰੀ ਬੱਚਤ ਸਕੀਮਾਂ' : 'Saving Scheme'}</h3>
                <p>{isHi ? 'सुरक्षित रिटर्न और सरकारी गारंटी वाली लोकप्रिय बचत योजनाएं।' : isPa ? 'ਸੁਰੱਖਿਅਤ ਮੁਨਾਫ਼ੇ ਅਤੇ ਸਰਕਾਰੀ ਗਾਰੰਟੀ ਵਾਲੀਆਂ ਮਸ਼ਹੂਰ ਬੱਚਤ ਸਕੀਮਾਂ।' : 'Compare eligibility, returns, access rules and any government-backed scheme terms.'}</p>
                <div className="product-card-footer">
                  <a className="text-link" href="#contact">{isHi ? 'बचत योजनाएं देखें →' : isPa ? 'ਬੱਚਤ ਸਕੀਮਾਂ ਦੇਖੋ →' : 'Compare saving schemes →'}</a>
                </div>
              </div>
            </article>

            <article className="investment-card">
              <div className="investment-card-img">
                <img src="/images/invest-mutual.jpg" alt="Mutual funds market analytics" loading="lazy" />
              </div>
              <div className="investment-card-body">
                <h3>{isHi ? 'म्यूचुअल फंड' : isPa ? 'ਮਿਉਚੁਅਲ ਫੰਡ' : 'Mutual Funds'}</h3>
                <p>{isHi ? 'बाजार के जोखिम, निवेश के लक्ष्य और समय सीमा को समझकर निवेश करें।' : isPa ? 'ਬਾਜ਼ਾਰ ਦੇ ਜੋਖ਼ਮ, ਨਿਵੇਸ਼ ਦੇ ਟੀਚੇ ਅਤੇ ਸਮੇਂ ਨੂੰ ਸਮਝ ਕੇ ਨਿਵੇਸ਼ ਕਰੋ।' : 'Understand market risk, expense ratios, investment goals and time horizon.'}</p>
                <div className="product-card-footer">
                  <a className="text-link" href="#contact">{isHi ? 'म्यूचुअल फंड के बारे में जानें →' : isPa ? 'ਮਿਉਚੁਅਲ ਫੰਡ ਬਾਰੇ ਜਾਣੋ →' : 'Learn about mutual funds →'}</a>
                </div>
              </div>
            </article>
          </div>

          <p style={{ fontSize: '0.82rem', marginTop: '22px', color: 'var(--muted)', lineHeight: '1.5' }}>
            {isHi 
              ? 'निवेश उत्पादों में बाजार का जोखिम शामिल होता है। नियम व शर्तों के अनुसार रिटर्न में बदलाव हो सकता है।'
              : isPa
              ? 'ਨਿਵੇਸ਼ ਉਤਪਾਦਾਂ ਵਿੱਚ ਬਾਜ਼ਾਰ ਦਾ ਜੋਖ਼ਮ ਹੁੰਦਾ ਹੈ। ਨਿਯਮਾਂ ਅਤੇ ਸ਼ਰਤਾਂ ਮੁਤਾਬਕ ਮੁਨਾਫ਼ਾ ਬਦਲ ਸਕਦਾ ਹੈ।'
              : 'Investment products carry different risks. Returns may be variable and are not guaranteed unless product terms explicitly state otherwise.'}
          </p>
        </div>
      </section>

      {/* 8. Loans by Purpose Section */}
      <section className="section soft-section" id="purpose">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{isHi ? 'ज़रूरत के अनुसार लोन' : isPa ? 'ਲੋੜ ਮੁਤਾਬਕ ਲੋਨ' : 'Loans by purpose'}</span>
            <h2>{isHi ? <>आप किस काम के लिए <span className="text-gradient-blue">लोन लेना चाहते हैं?</span></> : isPa ? <>ਤੁਸੀਂ ਕਿਸ ਕੰਮ ਲਈ <span className="text-gradient-blue">ਲੋਨ ਲੈਣਾ ਚਾਹੁੰਦੇ ਹੋ?</span></> : <>What are you <span className="text-gradient-blue">planning for?</span></>}</h2>
            <p>{isHi ? 'अपनी जरूरत चुनें ताकि हम आपको सबसे सही और किफायती विकल्प दिखा सकें।' : isPa ? 'ਆਪਣੀ ਲੋੜ ਚੁਣੋ ਤਾਂ ਜੋ ਅਸੀਂ ਤੁਹਾਨੂੰ ਸਭ ਤੋਂ ਸਹੀ ਅਤੇ ਸਸਤਾ ਵਿਕਲਪ ਦਿਖਾ ਸਕੀਏ।' : 'Pick your reason for borrowing to see personalized options and compare real cost breakdowns before you commit.'}</p>
          </div>

          <div className="purpose-grid">
            <article className="purpose-card">
              <div className="purpose-card-img">
                <img src="/images/purpose-wedding.jpg?v=2" alt="Indian wedding celebration" loading="lazy" />
              </div>
              <div className="purpose-card-body">
                <h3>{isHi ? 'शादी के खर्च' : isPa ? 'ਵਿਆਹ ਦੇ ਖ਼ਰਚੇ' : 'Wedding expenses'}</h3>
                <p>{isHi ? 'विवाह स्थल, खरीदारी, जेवर और समारोह के लिए आसान लोन।' : isPa ? 'ਪੈਲੇਸ ਬੁਕਿੰਗ, ਗਹਿਣੇ, ਕੱਪੜੇ ਅਤੇ ਖ਼ੁਸ਼ੀਆਂ ਦੇ ਸਮਾਗਮਾਂ ਲਈ ਸੌਖਾ ਲੋਨ।' : 'Plan a budget for venue, attire, jewellery and festive celebrations.'}</p>
                <div className="product-card-footer">
                  <Link className="text-link" to={getLocalePath('/personal-loan')}>{isHi ? 'विकल्प देखें →' : isPa ? 'ਵਿਕਲਪ ਦੇਖੋ →' : 'Explore options →'}</Link>
                </div>
              </div>
            </article>

            <article className="purpose-card">
              <div className="purpose-card-img">
                <img src="/images/purpose-medical.jpg?v=2" alt="Healthcare medical emergency care" loading="lazy" />
              </div>
              <div className="purpose-card-body">
                <h3>{isHi ? 'इलाज और मेडिकल खर्च' : isPa ? 'ਇਲਾਜ ਅਤੇ ਹਸਪਤਾਲ ਦੇ ਖ਼ਰਚੇ' : 'Medical emergencies'}</h3>
                <p>{isHi ? 'अचानक आए अस्पताल और दवाइयों के खर्च के लिए तुरंत मदद।' : isPa ? 'ਅਚਾਨਕ ਆਏ ਹਸਪਤਾਲ ਅਤੇ ਦਵਾਈਆਂ ਦੇ ਖ਼ਰਚਿਆਂ ਲਈ ਤੁਰੰਤ ਮਦਦ।' : 'Review financing choices for unexpected healthcare expenses.'}</p>
                <div className="product-card-footer">
                  <Link className="text-link" to={getLocalePath('/medical-loan')}>{isHi ? 'विकल्प देखें →' : isPa ? 'ਵਿਕਲਪ ਦੇਖੋ →' : 'Explore options →'}</Link>
                </div>
              </div>
            </article>

            <article className="purpose-card">
              <div className="purpose-card-img">
                <img src="/images/purpose-renovation.jpg?v=2" alt="Modern Indian home interior makeover" loading="lazy" />
              </div>
              <div className="purpose-card-body">
                <h3>{isHi ? 'घर का नवीनीकरण (रिनोवेशन)' : isPa ? 'ਘਰ ਦੀ ਮੁਰੰਮਤ ਅਤੇ ਸਜਾਵਟ' : 'Home renovation'}</h3>
                <p>{isHi ? 'घर की मरम्मत, रंग-रोगन या नए इंटीरियर के लिए लोन।' : isPa ? 'ਘਰ ਦੀ ਮੁਰੰਮਤ, ਰੰਗ-ਰੋਗਨ ਜਾਂ ਨਵੇਂ ਇੰਟੀਰੀਅਰ ਲਈ ਲੋਨ।' : 'Estimate the cost of repairs, upgrades or essential improvements.'}</p>
                <div className="product-card-footer">
                  <Link className="text-link" to={getLocalePath('/home-loan')}>{isHi ? 'विकल्प देखें →' : isPa ? 'ਵਿਕਲਪ ਦੇਖੋ →' : 'Explore options →'}</Link>
                </div>
              </div>
            </article>

            <article className="purpose-card">
              <div className="purpose-card-img">
                <img src="/images/purpose-business.jpg?v=2" alt="Business team in modern conference expansion" loading="lazy" />
              </div>
              <div className="purpose-card-body">
                <h3>{isHi ? 'कारोबार का विस्तार' : isPa ? 'ਕਾਰੋਬਾਰ ਵਧਾਉਣ ਲਈ' : 'Business expansion'}</h3>
                <p>{isHi ? 'नई मशीनरी, दुकान का सामान या व्यापार बढ़ाने के लिए पूंजी।' : isPa ? 'ਨਵੀਂ ਮਸ਼ੀਨਰੀ, ਦੁਕਾਨ ਦਾ ਸਾਮਾਨ ਜਾਂ ਵਪਾਰ ਵਧਾਉਣ ਲਈ ਪੈਸੇ।' : 'Consider equipment, stock, premises or other business investment needs.'}</p>
                <div className="product-card-footer">
                  <Link className="text-link" to={getLocalePath('/business-loan')}>{isHi ? 'विकल्प देखें →' : isPa ? 'ਵਿਕਲਪ ਦੇਖੋ →' : 'Explore options →'}</Link>
                </div>
              </div>
            </article>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link className="btn btn-outline" to={getLocalePath('/education-loan')}>{isHi ? 'पढ़ाई के खर्च के लिए लोन' : isPa ? 'ਪੜ੍ਹਾਈ ਦੇ ਖ਼ਰਚਿਆਂ ਲਈ ਲੋਨ' : 'Education expense loans'}</Link>
            <a className="btn btn-outline" href="#eligibility">{isHi ? 'अन्य ज़रूरतों के लिए लोन' : isPa ? 'ਹੋਰ ਲੋੜਾਂ ਲਈ ਲੋਨ' : 'Loans for other needs'}</a>
          </div>
        </div>
      </section>

      {/* 9. Why Choose Loan Aasra for a Personal Loan Section (Replaced Options for Different Working Lives) */}
      <WhyChoosePersonalLoan onOpenApplyModal={onOpenApplyModal} />

      {/* 10. Locations Section */}
      <section className="section soft-section" id="locations">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{isHi ? 'स्थानीय लोन सेवाएं' : isPa ? 'ਸ਼ਹਿਰ ਮੁਤਾਬਕ ਲੋਨ ਸੇਵਾਵਾਂ' : 'Local loan information'}</span>
            <h2>{isHi ? 'शहर के अनुसार लोन की जानकारी' : isPa ? 'ਸ਼ਹਿਰ ਮੁਤਾਬਕ ਲੋਨ ਦੀ ਜਾਣਕਾਰੀ' : 'Explore loans by city'}</h2>
            <p>{isHi ? 'अपने शहर में उपलब्ध लोन सेवाएं और आसान शर्तें देखें।' : isPa ? 'ਆਪਣੇ ਸ਼ਹਿਰ ਵਿੱਚ ਉਪਲਬਧ ਲੋਨ ਸੇਵਾਵਾਂ ਅਤੇ ਸੌਖੀਆਂ ਸ਼ਰਤਾਂ ਦੇਖੋ।' : 'Check product availability, service areas and applicable terms for your location. City pages should be updated with verified local information before launch.'}</p>
          </div>

          <div className="location-grid">
            {(showAllLocations ? allCities : primaryCities).map((city) => (
              <a 
                key={city}
                className="location-link" 
                href="#contact"
                onClick={(e) => {
                  if (onOpenApplyModal) {
                    e.preventDefault();
                    onOpenApplyModal(isHi ? 'पर्सनल लोन' : isPa ? 'ਪਰਸਨਲ ਲੋਨ' : 'Personal Loan');
                  }
                }}
              >
                <span>{city}</span>
                <span>↗</span>
              </a>
            ))}

            {!showAllLocations && (
              <button 
                type="button"
                className="location-link" 
                onClick={() => setShowAllLocations(true)}
                style={{ 
                  background: 'var(--gold-wash-strong)', 
                  borderColor: 'var(--gold-primary)', 
                  color: 'var(--gold-deep)', 
                  fontWeight: '700' 
                }}
                aria-label={isHi ? 'सभी 20 शहर देखें' : isPa ? 'ਸਾਰੇ 20 ਸ਼ਹਿਰ ਦੇਖੋ' : 'View all 20 loan locations'}
              >
                <span>{isHi ? 'सभी 20 शहर देखें' : isPa ? 'ਸਾਰੇ 20 ਸ਼ਹਿਰ ਦੇਖੋ' : 'View all locations (20)'}</span>
                <span>→</span>
              </button>
            )}
          </div>

          {showAllLocations && (
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => setShowAllLocations(false)}
                className="btn btn-outline"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  padding: '10px 24px', 
                  fontWeight: '650',
                  cursor: 'pointer'
                }}
                aria-label={isHi ? 'केवल मुख्य 7 शहर देखें' : isPa ? 'ਸਿਰਫ਼ ਮੁੱਖ 7 ਸ਼ਹਿਰ ਦੇਖੋ' : 'Show top 7 cities only'}
              >
                <span>{isHi ? 'केवल मुख्य 7 शहर देखें' : isPa ? 'ਸਿਰਫ਼ ਮੁੱਖ 7 ਸ਼ਹਿਰ ਦੇਖੋ' : 'Show top 7 cities only'}</span>
                <span>↑</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 11. Guides Section */}
      <section className="section" id="guides">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{isHi ? 'आसान वित्तीय जानकारी' : isPa ? 'ਸੌਖੀ ਵਿੱਤੀ ਜਾਣਕਾਰੀ' : 'The finance library'}</span>
            <h2>{isHi ? <>फैसला लेने से पहले <span className="text-gradient-blue">ज़रूरी बातें जानें</span></> : isPa ? <>ਫ਼ੈਸਲਾ ਲੈਣ ਤੋਂ ਪਹਿਲਾਂ <span className="text-gradient-blue">ਜ਼ਰੂਰੀ ਗੱਲਾਂ ਜਾਣੋ</span></> : <>Helpful <span className="text-gradient-blue">guides</span> before you decide</>}</h2>
            <p>{isHi ? 'लोन लेने से पहले आसान भाषा में समझें कि नियम क्या हैं और ब्याज कैसे लगता है।' : isPa ? 'ਲੋਨ ਲੈਣ ਤੋਂ ਪਹਿਲਾਂ ਸੌਖੀ ਬੋਲੀ ਵਿੱਚ ਸਮਝੋ ਕਿ ਨਿਯਮ ਕੀ ਹਨ ਅਤੇ ਵਿਆਜ ਕਿਵੇਂ ਲੱਗਦਾ ਹੈ।' : 'Understand key terms, compare the numbers and prepare the right questions for a lender.'}</p>
          </div>

          <div className="guide-grid">
            {/* Guide 1 */}
            <article className="guide-card">
              <div className="guide-art">
                <img src="/images/guide-emi.jpg" alt="EMI calculation analysis with calculator" loading="lazy" />
              </div>
              <div className="guide-content">
                <span className="tag">{isHi ? 'ईएमआई और ब्याज दरें' : isPa ? 'ਕਿਸ਼ਤ ਅਤੇ ਵਿਆਜ ਦਰਾਂ' : 'EMI & interest rates'}</span>
                <h3>{isHi ? 'ईएमआई (EMI) कैसे काम करती है?' : isPa ? 'ਮਹੀਨਾਵਾਰ ਕਿਸ਼ਤ (EMI) ਕਿਵੇਂ ਕੰਮ ਕਰਦੀ ਹੈ?' : 'How does an EMI work?'}</h3>
                <p>{isHi ? 'जानें कि लोन की राशि, ब्याज दर और समय मिलकर आपकी मासिक किस्त कैसे तय करते हैं।' : isPa ? 'ਜਾਣੋ ਕਿ ਲੋਨ ਦੀ ਰਕਮ, ਵਿਆਜ ਦਰ ਅਤੇ ਸਮਾਂ ਮਿਲ ਕੇ ਤੁਹਾਡੀ ਮਹੀਨਾਵਾਰ ਕਿਸ਼ਤ ਕਿਵੇਂ ਤੈਅ ਕਰਦੇ ਹਨ।' : 'Learn how principal, interest and tenure shape a monthly repayment.'}</p>
                <div className="product-card-footer">
                  <a className="text-link" href="#calculators">{isHi ? 'ईएमआई कैलकुलेटर चलाएं →' : isPa ? 'ਕਿਸ਼ਤ ਕੈਲਕੁਲੇਟਰ ਵਰਤੋ →' : 'Use the EMI calculator →'}</a>
                </div>
              </div>
            </article>

            {/* Guide 2 */}
            <article className="guide-card">
              <div className="guide-art">
                <img src="/images/guide-score.jpg" alt="Credit score chart report on tablet" loading="lazy" />
              </div>
              <div className="guide-content">
                <span className="tag">{isHi ? 'सिबिल स्कोर' : isPa ? 'ਸਿਬਿਲ ਸਕੋਰ' : 'Credit score'}</span>
                <h3>{isHi ? 'बैंक आपके आवेदन में क्या जांचते हैं?' : isPa ? 'ਬੈਂਕ ਤੁਹਾਡੀ ਅਰਜ਼ੀ ਵਿੱਚ ਕੀ ਦੇਖਦੇ ਹਨ?' : 'What lenders may check'}</h3>
                <p>{isHi ? 'समझें कि सिबिल स्कोर, पुराना रिकॉर्ड और समय पर किस्त चुकाने का क्या महत्व है।' : isPa ? 'ਸਮਝੋ ਕਿ ਸਿਬਿਲ ਸਕੋਰ, ਪੁਰਾਣਾ ਰਿਕਾਰਡ ਅਤੇ ਸਮੇਂ ਸਿਰ ਕਿਸ਼ਤ ਭਰਨ ਦੀ ਕੀ ਅਹਿਮੀਅਤ ਹੈ।' : 'Understand how credit history, existing debt and repayment patterns may matter.'}</p>
                <div className="product-card-footer">
                  <a className="text-link" href="#eligibility">{isHi ? 'योग्यता समझें →' : isPa ? 'ਯੋਗਤਾ ਸਮਝੋ →' : 'Review eligibility →'}</a>
                </div>
              </div>
            </article>

            {/* Guide 3 */}
            <article className="guide-card">
              <div className="guide-art">
                <img src="/images/guide-docs.jpg" alt="Checklist of verified loan documentation" loading="lazy" />
              </div>
              <div className="guide-content">
                <span className="tag">{isHi ? 'लोन के लिए दस्तावेज' : isPa ? 'ਲੋਨ ਲਈ ਜ਼ਰੂਰੀ ਕਾਗਜ਼' : 'Loan eligibility'}</span>
                <h3>{isHi ? 'कौन से कागजात तैयार रखें?' : isPa ? 'ਕਿਹੜੇ ਕਾਗਜ਼ ਤਿਆਰ ਰੱਖੀਏ?' : 'Documents to prepare'}</h3>
                <p>{isHi ? 'पहचान पत्र, पते का प्रमाण, बैंक स्टेटमेंट और सैलरी स्लिप की बुनियादी जानकारी।' : isPa ? 'ਪਛਾਣ ਪੱਤਰ, ਪਤੇ ਦਾ ਸਬੂਤ, ਬੈਂਕ ਸਟੇਟਮੈਂਟ ਅਤੇ ਸੈਲਰੀ ਸਲਿੱਪ ਦੀ ਬੁਨਿਆਦੀ ਜਾਣਕਾਰੀ।' : 'Get familiar with common identity, income and financial documents.'}</p>
                <div className="product-card-footer">
                  <a className="text-link" href="#contact">{isHi ? 'सवाल पूछें →' : isPa ? 'ਸਵਾਲ ਪੁੱਛੋ →' : 'Ask a question →'}</a>
                </div>
              </div>
            </article>
          </div>

          <div style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
              <Link className="btn btn-outline" to={getLocalePath('/blog')}>{isHi ? 'पर्सनल लोन गाइड' : isPa ? 'ਪਰਸਨਲ ਲੋਨ ਗਾਈਡ' : 'Personal loan guides'}</Link>
              <Link className="btn btn-outline" to={getLocalePath('/blog')}>{isHi ? 'बिज़नेस लोन गाइड' : isPa ? 'ਬਿਜ਼ਨਸ ਲੋਨ ਗਾਈਡ' : 'Business loan guides'}</Link>
              <Link className="btn btn-outline" to={getLocalePath('/blog')}>{isHi ? 'होम लोन गाइड' : isPa ? 'ਹੋਮ ਲੋਨ ਗਾਈਡ' : 'Home loan guides'}</Link>
              <Link className="btn btn-outline" to={getLocalePath('/blog')}>{isHi ? 'सिबिल स्कोर गाइड' : isPa ? 'ਸਿਬਿਲ ਸਕੋਰ ਗਾਈਡ' : 'Credit score guides'}</Link>
              <Link className="btn btn-outline" to={getLocalePath('/blog')}>{isHi ? 'लोन पात्रता गाइड' : isPa ? 'ਲੋਨ ਯੋਗਤਾ ਗਾਈਡ' : 'Loan eligibility guides'}</Link>
            </div>
            <Link className="btn btn-primary" to={getLocalePath('/blog')} style={{ textDecoration: 'none' }}>
              {isHi ? 'Loan Aasra ब्लॉग और गाइड देखें →' : isPa ? 'Loan Aasra ਬਲੌਗ ਅਤੇ ਗਾਈਡ ਦੇਖੋ →' : 'Visit Loan Aasra Journal & Blog →'}
            </Link>
          </div>
        </div>
      </section>

      {/* 12. Common Questions Section (As per design reference) */}
      <section className="home-common-questions-section" id="faqs">
        <div className="container">
          <div className="home-cq-grid">
            {/* Left Column */}
            <div className="home-cq-left">
              <div className="home-cq-badge">
                <span className="home-cq-dash" aria-hidden="true" />
                <span className="home-cq-badge-text">
                  {isHi ? 'अक्सर पूछे जाने वाले सवाल' : isPa ? 'ਆਮ ਸਵਾਲ' : 'COMMON QUESTIONS'}
                </span>
              </div>
              <h2 className="home-cq-heading">
                {isHi ? (
                  <>
                    सीधे और स्पष्ट जवाब,<br />
                    <span className="home-cq-highlight">आवेदन करने से पहले</span>
                  </>
                ) : isPa ? (
                  <>
                    ਸਿੱਧੇ ਤੇ ਸਪਸ਼ਟ ਜਵਾਬ,<br />
                    <span className="home-cq-highlight">ਅਰਜ਼ੀ ਦੇਣ ਤੋਂ ਪਹਿਲਾਂ</span>
                  </>
                ) : (
                  <>
                    Clear answers,<br />
                    <span className="home-cq-highlight">before you apply</span>
                  </>
                )}
              </h2>
              <p className="home-cq-desc">
                {isHi 
                  ? 'हर बैंक और लेंडर के अपने नियम होते हैं। हमेशा नवीनतम ऑफर दस्तावेज देखें और जो समझ न आए उसकी स्पष्ट जानकारी लें।'
                  : isPa
                  ? 'ਹਰ ਬੈਂਕ ਤੇ ਲੈਂਡਰ ਦੇ ਆਪਣੇ ਨਿਯਮ ਹੁੰਦੇ ਹਨ। ਹਮੇਸ਼ਾ ਤਾਜ਼ਾ ਆਫਰ ਦਸਤਾਵੇਜ਼ ਪੜ੍ਹੋ ਅਤੇ ਜੋ ਸਮਝ ਨਾ ਆਵੇ ਉਸਦੀ ਸਪਸ਼ਟ ਜਾਣਕਾਰੀ ਲਵੋ।'
                  : 'Every lender has its own policies. Always review the latest offer documents and ask for clarification on anything you do not understand.'}
              </p>
              <a 
                href="#contact" 
                className="home-cq-cta-btn"
              >
                {isHi ? 'कोई और सवाल? संपर्क करें' : isPa ? 'ਹੋਰ ਸਵਾਲ ਹਨ? ਰਾਬਤਾ ਕਰੋ' : 'More questions? Contact us'}
              </a>
            </div>

            {/* Right Column */}
            <div className="home-cq-right">
              {commonQuestions.map((faq, idx) => {
                const isOpen = activeHomeFaq === idx;
                return (
                  <div 
                    key={idx} 
                    className={`home-cq-card ${isOpen ? 'active' : ''}`}
                  >
                    <button 
                      type="button" 
                      className="home-cq-trigger"
                      onClick={() => setActiveHomeFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                    >
                      <span className="home-cq-question">{faq.q}</span>
                      <span className="home-cq-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </span>
                    </button>
                    {isOpen && (
                      <div className="home-cq-body">
                        <p className="home-cq-answer">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 13. Contact & Enquiry Section */}
      <section className="section" id="contact">
        <div className="container">
          <div className="split" style={{ alignItems: 'center' }}>
            <div>
              <span className="eyebrow">{isHi ? 'हम आपकी मदद के लिए तैयार हैं' : isPa ? 'ਅਸੀਂ ਤੁਹਾਡੀ ਮਦਦ ਲਈ ਹਾਜ਼ਰ ਹਾਂ' : 'We\'re here to help'}</span>
              <h2>{isHi ? <>लोन से जुड़ा कोई सवाल <span className="text-gradient-gold">पूछना चाहते हैं?</span></> : isPa ? <>ਲੋਨ ਨਾਲ ਜੁੜਿਆ ਕੋਈ ਸਵਾਲ <span className="text-gradient-gold">ਪੁੱਛਣਾ ਚਾਹੁੰਦੇ ਹੋ?</span></> : <>Have a question about your <span className="text-gradient-gold">next step?</span></>}</h2>
              <p>{isHi ? 'अपनी जानकारी भरें, हमारे विशेषज्ञ आपसे जल्द संपर्क करेंगे।' : isPa ? 'ਆਪਣਾ ਵੇਰਵਾ ਭਰੋ, ਸਾਡੇ ਮਾਹਰ ਜਲਦੀ ਤੁਹਾਡੇ ਨਾਲ ਰਾਬਤਾ ਕਰਨਗੇ।' : 'Send a sample enquiry and a member of the team can follow up. This demo form does not transmit or store your details.'}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
                {isHi 
                  ? 'यह प्रोटोटाइप डेमो फॉर्म है। आपकी व्यक्तिगत जानकारी पूरी तरह सुरक्षित है।'
                  : isPa
                  ? 'ਇਹ ਪ੍ਰੋਟੋਟਾਈਪ ਡੈਮੋ ਫਾਰਮ ਹੈ। ਤੁਹਾਡੀ ਨਿੱਜੀ ਜਾਣਕਾਰੀ ਪੂਰੀ ਤਰ੍ਹਾਂ ਸੁਰੱਖਿਅਤ ਹੈ।'
                  : 'For this prototype, replace the sample brand and contact details with your approved business information.'}
              </p>

              {/* Advisor Card */}
              <div className="advisor-card">
                <div className="advisor-thumb">
                  <img src="/images/advisor-priya.jpg" alt="Priya Sharma Senior Financial Advisor" loading="lazy" />
                </div>
                <div className="advisor-info">
                  <strong>Priya Sharma</strong>
                  <small>{isHi ? 'वरिष्ठ वित्तीय सलाहकार • Loan Aasra एडवाइजरी डेस्क' : isPa ? 'ਸੀਨੀਅਰ ਵਿੱਤੀ ਸਲਾਹਕਾਰ • Loan Aasra ਸਲਾਹਕਾਰ ਡੈਸਕ' : 'Senior Financial Advisor • Loan Aasra Advisory Desk'}</small>
                  <span className="advisor-status">{isHi ? 'उपलब्ध हैं • औसत जवाब समय 15 मिनट' : isPa ? 'ਮੌਜੂਦ ਹਨ • ਔਸਤ ਜਵਾਬ ਸਮਾਂ 15 ਮਿੰਟ' : 'Available now • Avg reply 15 mins'}</span>
                </div>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div className="contact-form-wrap">
              <h3 style={{ marginBottom: '6px' }}>{isHi ? 'पूछताछ भेजें' : isPa ? 'ਪੁੱਛਗਿੱਛ ਭੇਜੋ' : 'Send an enquiry'}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', marginBottom: '20px' }}>
                {isHi ? 'अपनी जरूरत के अनुसार सही और स्पष्ट सलाह पाएं।' : isPa ? 'ਆਪਣੀ ਲੋੜ ਮੁਤਾਬਕ ਸਹੀ ਅਤੇ ਸਾਫ਼ ਸਲਾਹ ਲਵੋ।' : 'Get transparent advice tailored to your goals.'}
              </p>

              <form id="contactForm" onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label htmlFor="fullName">{isHi ? 'पूरा नाम' : isPa ? 'ਪੂਰਾ ਨਾਂ' : 'Full name'}</label>
                  <input 
                    className="form-control" 
                    id="fullName" 
                    name="fullName" 
                    required 
                    placeholder={isHi ? 'अपना नाम लिखें' : isPa ? 'ਆਪਣਾ ਨਾਂ ਲਿਖੋ' : 'Enter your name'}
                    value={contactForm.fullName}
                    onChange={e => setContactForm({ ...contactForm, fullName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">{isHi ? 'ईमेल पता' : isPa ? 'ਈਮੇਲ ਪਤਾ' : 'Email address'}</label>
                  <input 
                    className="form-control" 
                    id="email" 
                    name="email" 
                    type="email" 
                    required 
                    placeholder="you@example.com"
                    value={contactForm.email}
                    onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="loanType">{isHi ? 'आप किस लोन में रुचि रखते हैं?' : isPa ? 'ਤੁਸੀਂ ਕਿਸ ਲੋਨ ਵਿੱਚ ਦਿਲਚਸਪੀ ਰੱਖਦੇ ਹੋ?' : 'What are you interested in?'}</label>
                  <select 
                    className="form-control" 
                    id="loanType" 
                    name="loanType"
                    value={contactForm.loanType}
                    onChange={e => setContactForm({ ...contactForm, loanType: e.target.value })}
                  >
                    <option>{isHi ? 'पर्सनल लोन' : isPa ? 'ਪਰਸਨਲ ਲੋਨ' : 'Personal loan'}</option>
                    <option>{isHi ? 'बिज़नेस लोन' : isPa ? 'ਬਿਜ਼ਨਸ ਲੋਨ' : 'Business loan'}</option>
                    <option>{isHi ? 'होम लोन' : isPa ? 'ਹੋਮ ਲੋਨ' : 'Home loan'}</option>
                    <option>{isHi ? 'बचत और निवेश विकल्प' : isPa ? 'ਬੱਚਤ ਅਤੇ ਨਿਵੇਸ਼ ਵਿਕਲਪ' : 'Investment options'}</option>
                    <option>{isHi ? 'अन्य पूछताछ' : isPa ? 'ਹੋਰ ਪੁੱਛਗਿੱਛ' : 'Other enquiry'}</option>
                  </select>
                </div>

                <button className="btn btn-primary" type="submit" style={{ width: '100%', marginTop: '10px' }}>
                  {isHi ? 'पूछताछ भेजें ↗' : isPa ? 'ਪੁੱਛਗਿੱਛ ਭੇਜੋ ↗' : 'Submit demo enquiry ↗'}
                </button>

                {contactSuccess && (
                  <div className="toast-msg success" role="status" style={{ display: 'block', marginTop: '14px' }}>
                    {contactSuccess}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
