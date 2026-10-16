import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TrustMarquee from '../components/TrustMarquee';
import WhyChoosePersonalLoan from '../components/WhyChoosePersonalLoan';

const LOAN_CARDS = [
  { slug: 'personal-loan', name: 'Personal Loan', category: 'personal', badge: 'Instant Disbursal', img: '/images/loan-personal.jpg', desc: 'For planned expenses, unexpected costs or a financial need that calls for flexibility.' },
  { slug: 'insta-personal-loan', name: 'Insta Personal Loan', category: 'personal', badge: '100% Paperless', img: '/images/loan-insta.jpg', desc: 'Express 30-minute disbursal pre-approved funds directly to your verified bank account.' },
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
    q: "How do I estimate my monthly EMI?",
    a: "Enter your desired loan amount, annual interest rate, and tenure into our interactive EMI calculator. It calculates your scheduled repayment using standard reducing-balance math, detailing exact monthly payouts and total interest."
  },
  {
    q: "What affects loan eligibility?",
    a: "Lenders evaluate monthly net take-home salary, employer stability (minimum 6–12 months vintage), credit/CIBIL score (ideally 700+), existing monthly fixed obligations (FOIR), and individual lender underwriting criteria."
  },
  {
    q: "Does checking eligibility guarantee approval?",
    a: "No. Checking eligibility provides an indicative pre-sanction estimate without harming your credit score. Formal approval, final loan amount, and APR are confirmed after digital document submission and underwriting checks."
  },
  {
    q: "What charges should I check besides interest?",
    a: "Always review processing fees (typically 0.5% to 2.5% + GST), documentation charges, late payment charges, bounce fees, and prepayment/foreclosure conditions before signing the agreement."
  },
  {
    q: "Can I repay a loan early?",
    a: "Yes! Individual floating-rate personal and home loans have 0% foreclosure or part-prepayment penalties per RBI directives. Fixed-rate or business loans may feature nominal prepayment fees after a standard 6-month lock-in."
  },
  {
    q: "How fast can I receive funds after approval?",
    a: "Instant and pre-approved personal loans are typically credited to your bank account within 30 minutes to 24 hours. Secured loans (such as Home Loans or LAP) generally take 3 to 7 working days for legal verification."
  },
  {
    q: "What documents do I need to prepare?",
    a: "Standard requirements include PAN card, Aadhaar / Passport for identity and address proof, latest 3 to 6 months bank statement showing income credits, and recent 3 salary slips or last 2 years ITR."
  },
  {
    q: "Are investment returns guaranteed?",
    a: "Not always. Mutual funds, equities, and market-linked products carry market risks. Fixed deposits and sovereign bonds provide assured returns. Always inspect product documents, expense ratios, and risk factors before investing."
  }
];

export default function Home({ onOpenApplyModal }) {
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
  const [contactForm, setContactForm] = useState({ fullName: '', email: '', loanType: 'Personal loan' });
  const [contactSuccess, setContactSuccess] = useState('');

  // 5. Locations Showcase State (Top 7 vs All 20)
  const [showAllLocations, setShowAllLocations] = useState(false);

  // 6. Interest Rates Showcase State (Top 5 vs All 12)
  const [showAllRates, setShowAllRates] = useState(false);

  // 7. FAQ Active Item State
  const [activeHomeFaq, setActiveHomeFaq] = useState(0);

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
    ? LOAN_CARDS 
    : LOAN_CARDS.filter(c => c.category === filter);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSuccess(`✓ Thank you, ${contactForm.fullName}! Your sample enquiry for ${contactForm.loanType} has been recorded. Our financial advisor will connect shortly.`);
    setContactForm({ fullName: '', email: '', loanType: 'Personal loan' });
  };

  return (
    <main>
      {/* 1. Hero Section */}
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="eyebrow-dash"></span>
              <span className="eyebrow-text">LOAN OPTIONS | EMI CALCULATORS | FINANCIAL GUIDANCE</span>
            </div>
            <h1>
              Looking for a Loan?<br />
              Start With a<br />
              <span className="hero-blue">Clear Plan.</span>
            </h1>
            <p>Compare loan options, estimate your monthly EMI and understand your next steps with clear, straightforward information.</p>
            
            <div className="hero-actions">
              <a className="btn btn-primary" href="#loans">
                Explore loan options <span>→</span>
              </a>
              <a className="btn btn-outline" href="#calculators">
                Calculate my EMI
              </a>
            </div>

            <div className="trust-row">
              <span><i className="check">✓</i> Clear information</span>
              <span><i className="check">✓</i> Easy-to-use tools</span>
              <span><i className="check">✓</i> Informed decisions</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Interactive Loan Calculator">
            <div className="visual-blob"></div>
            <div className="hero-calculator-card">
              <div className="card-top">
                <div>
                  <small className="hero-calc-badge">YOUR LOAN SNAPSHOT</small>
                  <h3 style={{ margin: '5px 0 0', fontSize: '1.25rem' }}>Plan with clarity</h3>
                </div>
                <div className="card-icon">₹</div>
              </div>

              {/* Amount Field */}
              <div className="hero-calc-field">
                <div className="hero-calc-head">
                  <label htmlFor="heroAmount">Loan amount</label>
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
                    <label htmlFor="heroTenure">Tenure</label>
                    <output id="heroTenureOut">{heroTenure} {heroTenure === 1 ? 'year' : 'years'}</output>
                  </div>
                  <input 
                    id="heroTenure" 
                    type="range" 
                    min="1" 
                    max="30" 
                    step="1" 
                    value={heroTenure} 
                    onChange={e => setHeroTenure(Number(e.target.value))}
                  />
                </div>
                <div className="hero-calc-field-half">
                  <div className="hero-calc-head-sm">
                    <label htmlFor="heroRate">Interest</label>
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
                  />
                </div>
              </div>

              {/* Dynamic Result Card */}
              <div className="hero-calc-result">
                <div className="hero-result-main">
                  <small>Estimated monthly EMI</small>
                  <div className="hero-emi-val" id="heroEmiOut">{formatINR(heroEmi)}</div>
                </div>
                <div className="hero-result-sub">
                  <div>
                    <small>Total interest</small>
                    <strong id="heroTotalInterest">{formatINR(heroTotalInterest)}</strong>
                  </div>
                  <div>
                    <small>Total repayment</small>
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
                  Apply based on this estimate ↗
                </button>
              </div>
            </div>

            <div className="floating-note">
              <strong>Plan before you apply</strong>
              <span>Compare. Calculate. Decide.</span>
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
              <strong>Calculate your EMI</strong>
              <small>Estimate monthly payments</small>
            </span>
          </a>
          <a className="quick-item" href="#eligibility">
            <span className="quick-icon">✓</span>
            <span>
              <strong>Check eligibility</strong>
              <small>Understand what matters</small>
            </span>
          </a>
          <a className="quick-item" href="#rates">
            <span className="quick-icon">％</span>
            <span>
              <strong>View interest rates</strong>
              <small>Review key charges</small>
            </span>
          </a>
          <a className="quick-item" href="#investment">
            <span className="quick-icon">↗</span>
            <span>
              <strong>Explore investments</strong>
              <small>Review savings options</small>
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
            <span className="eyebrow">Borrow with purpose</span>
            <h2><span className="text-gradient-blue">Quick loan</span> for immediate financial need</h2>
            <p>Start with the goal you have in mind. Review the loan type, check the details and compare options before making a decision.</p>
          </div>

          {/* Interactive Category Filter */}
          <div className="filter-bar" role="tablist" aria-label="Filter loans by category">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Loans (13)</button>
            <button className={`filter-btn ${filter === 'personal' ? 'active' : ''}`} onClick={() => setFilter('personal')}>Personal & Instant</button>
            <button className={`filter-btn ${filter === 'property' ? 'active' : ''}`} onClick={() => setFilter('property')}>Home & Property</button>
            <button className={`filter-btn ${filter === 'business' ? 'active' : ''}`} onClick={() => setFilter('business')}>Business & Wealth</button>
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
                    <Link className="text-link" to={`/${c.slug}`}>
                      Explore {c.name.toLowerCase()} →
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
              <span className="eyebrow">Plan your repayments</span>
              <h2>Calculate your EMI in <span className="text-gradient-blue">seconds</span></h2>
              <p>Adjust the amount, interest rate and repayment period to estimate a monthly payment. Use this as a starting point for comparing loan offers.</p>
            </div>

            <div className="calc-features">
              <div className="feature">
                <span className="check">✓</span>
                <div>
                  <strong>See the monthly estimate</strong>
                  <p>Understand how loan size and tenure affect your monthly budget.</p>
                </div>
              </div>
              <div className="feature">
                <span className="check">✓</span>
                <div>
                  <strong>Compare different scenarios</strong>
                  <p>Change one value at a time to see how your estimated EMI changes.</p>
                </div>
              </div>
              <div className="feature">
                <span className="check">✓</span>
                <div>
                  <strong>Review total repayment</strong>
                  <p>Consider interest cost alongside the monthly amount.</p>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: '1.6' }}>
              Also available: Personal Loan EMI Calculator, Home Loan EMI Calculator, Business Loan EMI Calculator, Loan Eligibility Calculator, Interest Rate Calculator and Loan Repayment Calculator.
            </p>
          </div>

          <div className="calculator-card">
            <h3>EMI calculator</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '24px' }}>Move the sliders to estimate your repayment.</p>

            {/* Field 1: Amount */}
            <div className="field">
              <div className="field-head">
                <label htmlFor="loanAmount">Loan amount</label>
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
                <span>₹50 lakh</span>
              </div>
              <div className="presets">
                {[100000, 500000, 1000000, 2500000, 5000000].map(val => (
                  <span 
                    key={val} 
                    className="preset-chip" 
                    onClick={() => setCalcAmount(val)}
                    style={{ cursor: 'pointer' }}
                  >
                    ₹{val >= 100000 ? `${val / 100000} Lakh` : val}
                  </span>
                ))}
              </div>
            </div>

            {/* Field 2: Interest */}
            <div className="field">
              <div className="field-head">
                <label htmlFor="interest">Annual interest rate</label>
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
                <label htmlFor="tenure">Loan tenure</label>
                <output id="tenureOut">{calcTenure} {calcTenure === 1 ? 'year' : 'years'}</output>
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
                <span>1 year</span>
                <span>30 years</span>
              </div>
            </div>

            {/* Results */}
            <div className="results" aria-live="polite">
              <p>Estimated monthly EMI</p>
              <div className="emi-value" id="emiOut">{formatINR(cEmi)}</div>

              {/* Visual Breakdown Bar */}
              <div className="breakdown-bar">
                <div className="breakdown-labels">
                  <span id="principalRatio">Principal: {principalPercent}%</span>
                  <span id="interestRatio">Interest: {interestPercent}%</span>
                </div>
                <div className="breakdown-track">
                  <div className="principal-fill" id="principalFill" style={{ width: `${principalPercent}%` }}></div>
                  <div className="interest-fill" id="interestFill" style={{ width: `${interestPercent}%` }}></div>
                </div>
              </div>

              <div className="result-grid">
                <div>
                  <small>Total interest</small>
                  <strong id="totalInterest">{formatINR(cTotalInterest)}</strong>
                </div>
                <div>
                  <small>Total repayment</small>
                  <strong id="totalPayment">{formatINR(cTotalPayment)}</strong>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '14px 0 0', lineHeight: '1.4' }}>
              Estimate only. Fees, taxes, lender terms and actual rates may change the final repayment amount.
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
                Your next step
              </span>
              <h2>Understand your <span className="text-gradient-gold">loan eligibility</span></h2>
              <p>Eligibility may depend on income, existing obligations, credit history, employment or business profile, loan amount and lender policy.</p>
            </div>
            <a className="btn btn-primary" href="#contact">Start an eligibility enquiry ↗</a>
          </div>

          <div style={{ marginTop: '50px' }} className="section-head">
            <h2 style={{ fontSize: '1.85rem' }}>Explore eligibility by loan type</h2>
            <p>Use these starting points to understand the factors lenders may assess. They are not approval decisions.</p>
          </div>

          <div className="eligibility-grid">
            <article className="product-card">
              <div className="product-card-body" style={{ paddingTop: '26px' }}>
                <h3>Personal Loan Eligibility</h3>
                <p>Review income, employment, credit profile and current monthly commitments.</p>
                <div className="product-card-footer">
                  <a className="text-link" href="#contact">Check requirements →</a>
                </div>
              </div>
            </article>

            <article className="product-card">
              <div className="product-card-body" style={{ paddingTop: '26px' }}>
                <h3>Business Loan Eligibility</h3>
                <p>Review business vintage, turnover, cash flow, documents and credit profile.</p>
                <div className="product-card-footer">
                  <a className="text-link" href="#contact">Check requirements →</a>
                </div>
              </div>
            </article>

            <article className="product-card">
              <div className="product-card-body" style={{ paddingTop: '26px' }}>
                <h3>Home Loan Eligibility</h3>
                <p>Consider income, down payment, existing EMIs, tenure and property details.</p>
                <div className="product-card-footer">
                  <a className="text-link" href="#contact">Check requirements →</a>
                </div>
              </div>
            </article>

            <article className="product-card">
              <div className="product-card-body" style={{ paddingTop: '26px' }}>
                <h3>Eligibility by Credit Score</h3>
                <p>Learn how credit history may influence lender assessment and offered terms.</p>
                <div className="product-card-footer">
                  <a className="text-link" href="#guides">Read credit score guides →</a>
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
            <span className="eyebrow">Verified Interest Rates</span>
            <h2>Compare loan interest <span className="text-gradient-blue">rates and terms</span></h2>
            <p>Review current annual interest rate ranges (Per Annum) across all Finora loan categories to make transparent, cost-effective borrowing decisions.</p>
          </div>

          <div className="rate-table-wrap">
            <table>
              <thead>
                <tr>
                  <th style={{ width: '70px', textAlign: 'center' }}>S. No.</th>
                  <th>Loan Type</th>
                  <th>Interest Rate (Per Annum)</th>
                  <th>Key Highlights & Review</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {(showAllRates ? RATE_ROWS : RATE_ROWS.slice(0, 5)).map((row) => (
                  <tr key={row.sno}>
                    <td style={{ textAlign: 'center', fontWeight: '750', color: '#64748B' }}>{row.sno}</td>
                    <td>
                      <Link to={`/${row.slug}`} style={{ color: '#0A1C3E', fontWeight: '750', textDecoration: 'none' }}>
                        {row.name}
                      </Link>
                    </td>
                    <td>
                      <span className="rate-badge" style={{ fontWeight: '750', whiteSpace: 'nowrap' }}>{row.rate}</span>
                    </td>
                    <td style={{ color: '#475569', fontSize: '0.92rem' }}>{row.note}</td>
                    <td style={{ textAlign: 'right' }}>
                      <Link className="text-link" to={`/${row.slug}`} style={{ whiteSpace: 'nowrap', fontWeight: '650' }}>
                        View details →
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
              <span>{showAllRates ? 'Show top 5 loan rates only' : 'View all interest rates (12)'}</span>
              <span>{showAllRates ? '↑' : '↓'}</span>
            </button>
          </div>

          <p className="rate-note">
            <strong>Important:</strong> Quoted interest rates are annualized (Per Annum) and determined by individual lender credit evaluation, CIBIL score, income stability, and loan tenure. Review detailed sanction letters and fee schedules prior to acceptance.
          </p>

          <div style={{ marginTop: '26px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a className="btn btn-primary" href="#contact">Consult a Loan Specialist →</a>
            <a className="btn btn-outline" href="#calculators">Use EMI Calculators</a>
          </div>
        </div>
      </section>

      {/* 7. Investment Section */}
      <section className="section" id="investment">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Plan beyond borrowing</span>
            <h2>Explore investment and <span className="text-gradient-blue">savings options</span></h2>
            <p>Compare product features, risk, liquidity, time horizon and applicable terms before choosing an investment.</p>
          </div>

          <div className="investment-grid">
            <article className="investment-card">
              <div className="investment-card-img">
                <img src="/images/invest-fd.jpg" alt="Fixed Deposit savings investment" loading="lazy" />
              </div>
              <div className="investment-card-body">
                <h3>Fixed Deposit</h3>
                <p>Review tenure, payout choices, premature withdrawal terms and applicable tax.</p>
                <div className="product-card-footer">
                  <a className="text-link" href="#contact">View fixed deposits →</a>
                </div>
              </div>
            </article>

            <article className="investment-card">
              <div className="investment-card-img">
                <img src="/images/invest-rd.jpg" alt="Recurring deposit steady savings" loading="lazy" />
              </div>
              <div className="investment-card-body">
                <h3>Recurring Deposit</h3>
                <p>Explore regular saving contributions and maturity value based on product terms.</p>
                <div className="product-card-footer">
                  <a className="text-link" href="#contact">View recurring deposits →</a>
                </div>
              </div>
            </article>

            <article className="investment-card">
              <div className="investment-card-img">
                <img src="/images/invest-scheme.jpg" alt="Government saving scheme growth" loading="lazy" />
              </div>
              <div className="investment-card-body">
                <h3>Saving Scheme</h3>
                <p>Compare eligibility, returns, access rules and any government-backed scheme terms.</p>
                <div className="product-card-footer">
                  <a className="text-link" href="#contact">Compare saving schemes →</a>
                </div>
              </div>
            </article>

            <article className="investment-card">
              <div className="investment-card-img">
                <img src="/images/invest-mutual.jpg" alt="Mutual funds market analytics" loading="lazy" />
              </div>
              <div className="investment-card-body">
                <h3>Mutual Funds</h3>
                <p>Understand market risk, expense ratios, investment goals and time horizon.</p>
                <div className="product-card-footer">
                  <a className="text-link" href="#contact">Learn about mutual funds →</a>
                </div>
              </div>
            </article>
          </div>

          <p style={{ fontSize: '0.82rem', marginTop: '22px', color: 'var(--muted)', lineHeight: '1.5' }}>
            Investment products carry different risks. Returns may be variable and are not guaranteed unless product terms explicitly state otherwise.
          </p>
        </div>
      </section>

      {/* 8. Loans by Purpose Section */}
      <section className="section soft-section" id="purpose">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Loans by purpose</span>
            <h2>What are you <span className="text-gradient-blue">planning for?</span></h2>
            <p>Browse common reasons people consider borrowing and review the total cost before choosing a loan.</p>
          </div>

          <div className="purpose-grid">
            <article className="purpose-card">
              <div className="purpose-card-img">
                <img src="/images/purpose-wedding.jpg?v=2" alt="Indian wedding celebration" loading="lazy" />
              </div>
              <div className="purpose-card-body">
                <h3>Wedding expenses</h3>
                <p>Plan a budget for venue, attire, jewellery and festive celebrations.</p>
                <div className="product-card-footer">
                  <Link className="text-link" to="/personal-loan">Explore options →</Link>
                </div>
              </div>
            </article>

            <article className="purpose-card">
              <div className="purpose-card-img">
                <img src="/images/purpose-medical.jpg?v=2" alt="Healthcare medical emergency care" loading="lazy" />
              </div>
              <div className="purpose-card-body">
                <h3>Medical emergencies</h3>
                <p>Review financing choices for unexpected healthcare expenses.</p>
                <div className="product-card-footer">
                  <Link className="text-link" to="/medical-loan">Explore options →</Link>
                </div>
              </div>
            </article>

            <article className="purpose-card">
              <div className="purpose-card-img">
                <img src="/images/purpose-renovation.jpg?v=2" alt="Modern Indian home interior makeover" loading="lazy" />
              </div>
              <div className="purpose-card-body">
                <h3>Home renovation</h3>
                <p>Estimate the cost of repairs, upgrades or essential improvements.</p>
                <div className="product-card-footer">
                  <Link className="text-link" to="/home-loan">Explore options →</Link>
                </div>
              </div>
            </article>

            <article className="purpose-card">
              <div className="purpose-card-img">
                <img src="/images/purpose-business.jpg?v=2" alt="Business team in modern conference expansion" loading="lazy" />
              </div>
              <div className="purpose-card-body">
                <h3>Business expansion</h3>
                <p>Consider equipment, stock, premises or other business investment needs.</p>
                <div className="product-card-footer">
                  <Link className="text-link" to="/business-loan">Explore options →</Link>
                </div>
              </div>
            </article>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link className="btn btn-outline" to="/education-loan">Education expense loans</Link>
            <a className="btn btn-outline" href="#eligibility">Loans for other needs</a>
          </div>
        </div>
      </section>

      {/* 9. Why Choose Finora for a Personal Loan Section (Replaced Options for Different Working Lives) */}
      <WhyChoosePersonalLoan onOpenApplyModal={onOpenApplyModal} />

      {/* 10. Locations Section */}
      <section className="section soft-section" id="locations">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Local loan information</span>
            <h2>Explore loans by city</h2>
            <p>Check product availability, service areas and applicable terms for your location. City pages should be updated with verified local information before launch.</p>
          </div>

          <div className="location-grid">
            {(showAllLocations ? ALL_CITIES : PRIMARY_CITIES).map((city) => (
              <a 
                key={city}
                className="location-link" 
                href="#contact"
                onClick={(e) => {
                  if (onOpenApplyModal) {
                    e.preventDefault();
                    onOpenApplyModal('Personal Loan');
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
                aria-label="View all 20 loan locations"
              >
                <span>View all locations (20)</span>
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
                aria-label="Show top 7 cities only"
              >
                <span>Show top 7 cities only</span>
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
            <span className="eyebrow">The finance library</span>
            <h2>Helpful <span className="text-gradient-blue">guides</span> before you decide</h2>
            <p>Understand key terms, compare the numbers and prepare the right questions for a lender.</p>
          </div>

          <div className="guide-grid">
            {/* Guide 1 */}
            <article className="guide-card">
              <div className="guide-art">
                <img src="/images/guide-emi.jpg" alt="EMI calculation analysis with calculator" loading="lazy" />
              </div>
              <div className="guide-content">
                <span className="tag">EMI & interest rates</span>
                <h3>How does an EMI work?</h3>
                <p>Learn how principal, interest and tenure shape a monthly repayment.</p>
                <div className="product-card-footer">
                  <a className="text-link" href="#calculators">Use the EMI calculator →</a>
                </div>
              </div>
            </article>

            {/* Guide 2 */}
            <article className="guide-card">
              <div className="guide-art">
                <img src="/images/guide-score.jpg" alt="Credit score chart report on tablet" loading="lazy" />
              </div>
              <div className="guide-content">
                <span className="tag">Credit score</span>
                <h3>What lenders may check</h3>
                <p>Understand how credit history, existing debt and repayment patterns may matter.</p>
                <div className="product-card-footer">
                  <a className="text-link" href="#eligibility">Review eligibility →</a>
                </div>
              </div>
            </article>

            {/* Guide 3 */}
            <article className="guide-card">
              <div className="guide-art">
                <img src="/images/guide-docs.jpg" alt="Checklist of verified loan documentation" loading="lazy" />
              </div>
              <div className="guide-content">
                <span className="tag">Loan eligibility</span>
                <h3>Documents to prepare</h3>
                <p>Get familiar with common identity, income and financial documents.</p>
                <div className="product-card-footer">
                  <a className="text-link" href="#contact">Ask a question →</a>
                </div>
              </div>
            </article>
          </div>

          <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a className="btn btn-outline" href="#guides">Personal loan guides</a>
            <a className="btn btn-outline" href="#guides">Business loan guides</a>
            <a className="btn btn-outline" href="#guides">Home loan guides</a>
            <a className="btn btn-outline" href="#guides">Credit score guides</a>
            <a className="btn btn-outline" href="#guides">Loan eligibility guides</a>
            <Link className="btn btn-primary btn-small" to="/blog" style={{ textDecoration: 'none', marginLeft: 'auto' }}>
              Visit Finora Journal & Blog →
            </Link>
          </div>
        </div>
      </section>

      {/* 12. FAQs Section */}
      <section className="section soft-section" id="faqs">
        <div className="container faq-grid">
          <div className="faq-sidebar">
            <span className="eyebrow">Common questions</span>
            <h2>Clear answers, <span className="text-gradient-blue">before you apply</span></h2>
            <p>Every lender has its own policies. Always review the latest offer documents and ask for clarification on anything you do not understand.</p>

            {/* Advisor Guidance Support Card */}
            <div className="faq-support-card">
              <span className="faq-support-badge">Personalized Support</span>
              <h3 className="faq-support-title">Still have questions?</h3>
              <p className="faq-support-desc">Can't find the answers you're looking for? Speak directly with our verified financial advisors for tailored rate advice.</p>
              
              <div className="faq-support-features">
                <div className="faq-support-feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Fast callback within 5 minutes</span>
                </div>
                <div className="faq-support-feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>100% Free, zero obligation guidance</span>
                </div>
                <div className="faq-support-feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Zero negative impact on CIBIL score</span>
                </div>
              </div>

              <div className="faq-support-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onOpenApplyModal && onOpenApplyModal('General Inquiry / Advisor')}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Ask an Advisor →
                </button>
                <a
                  className="btn btn-outline"
                  href="#contact"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Send us a Message
                </a>
              </div>
            </div>
          </div>

          <div className="faq-accordion-list">
            {HOME_FAQS.map((faq, idx) => (
              <div key={idx} className={`faq-card ${activeHomeFaq === idx ? 'active' : ''}`}>
                <button
                  type="button"
                  className="faq-card-header"
                  onClick={() => setActiveHomeFaq(activeHomeFaq === idx ? null : idx)}
                  aria-expanded={activeHomeFaq === idx}
                >
                  <span className="faq-card-title">{faq.q}</span>
                  <span className="faq-card-toggle">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      {activeHomeFaq === idx ? (
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
                {activeHomeFaq === idx && (
                  <div className="faq-card-body">
                    <div className="faq-card-text">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Contact & Enquiry Section */}
      <section className="section" id="contact">
        <div className="container">
          <div className="split" style={{ alignItems: 'center' }}>
            <div>
              <span className="eyebrow">We're here to help</span>
              <h2>Have a question about your <span className="text-gradient-gold">next step?</span></h2>
              <p>Send a sample enquiry and a member of the team can follow up. This demo form does not transmit or store your details.</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>For this prototype, replace the sample brand and contact details with your approved business information.</p>

              {/* Advisor Card */}
              <div className="advisor-card">
                <div className="advisor-thumb">
                  <img src="/images/advisor-priya.jpg" alt="Priya Sharma Senior Financial Advisor" loading="lazy" />
                </div>
                <div className="advisor-info">
                  <strong>Priya Sharma</strong>
                  <small>Senior Financial Advisor • Finora Advisory Desk</small>
                  <span className="advisor-status">Available now • Avg reply 15 mins</span>
                </div>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div className="contact-form-wrap">
              <h3 style={{ marginBottom: '6px' }}>Send an enquiry</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', marginBottom: '20px' }}>Get transparent advice tailored to your goals.</p>

              <form id="contactForm" onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label htmlFor="fullName">Full name</label>
                  <input 
                    className="form-control" 
                    id="fullName" 
                    name="fullName" 
                    required 
                    placeholder="Enter your name"
                    value={contactForm.fullName}
                    onChange={e => setContactForm({ ...contactForm, fullName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email address</label>
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
                  <label htmlFor="loanType">What are you interested in?</label>
                  <select 
                    className="form-control" 
                    id="loanType" 
                    name="loanType"
                    value={contactForm.loanType}
                    onChange={e => setContactForm({ ...contactForm, loanType: e.target.value })}
                  >
                    <option>Personal loan</option>
                    <option>Business loan</option>
                    <option>Home loan</option>
                    <option>Investment options</option>
                    <option>Other enquiry</option>
                  </select>
                </div>

                <button className="btn btn-primary" type="submit" style={{ width: '100%', marginTop: '10px' }}>
                  Submit demo enquiry ↗
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
