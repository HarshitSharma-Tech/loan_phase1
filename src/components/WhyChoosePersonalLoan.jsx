import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BadgePercent, 
  CalendarCheck2, 
  ShieldCheck, 
  FileCheck2, 
  Zap, 
  Eye 
} from 'lucide-react';

const BENEFITS = [
  {
    icon: BadgePercent,
    title: 'Competitive Interest Rates',
    desc: 'Compare available loan options and understand the interest rates before applying.'
  },
  {
    icon: CalendarCheck2,
    title: 'Flexible EMI Options',
    desc: 'Choose a repayment plan that suits your monthly budget, subject to lender terms and eligibility.'
  },
  {
    icon: ShieldCheck,
    title: 'No Collateral Required',
    desc: 'Personal loans generally do not require you to pledge assets as security.'
  },
  {
    icon: FileCheck2,
    title: 'Simple Application Process',
    desc: 'Understand the application steps and required documents for a smoother experience.'
  },
  {
    icon: Zap,
    title: 'Quick Loan Processing',
    desc: 'Check your eligibility and explore loan options with participating lenders, subject to their approval and processing timelines.'
  },
  {
    icon: Eye,
    title: 'Transparent Loan Information',
    desc: 'Review applicable interest rates, processing fees, repayment terms, and other charges before making a decision.'
  }
];

export default function WhyChoosePersonalLoan({ onOpenApplyModal }) {
  // Duplicate for seamless 50% infinite marquee loop
  const repeated = [...BENEFITS, ...BENEFITS];

  return (
    <section className="section why-choose-section" id="why-choose" aria-label="Why Choose Finora for a Personal Loan">
      <div className="container">
        <div className="section-head" style={{ maxWidth: '820px', margin: '0 auto 40px', textAlign: 'center' }}>
          <span className="eyebrow">Finora Advantages</span>
          <h2>Why Choose Finora for a <span className="text-gradient-blue">Personal Loan?</span></h2>
          <p style={{ fontSize: '1.02rem', lineHeight: '1.7', color: 'var(--slate-600)', margin: '14px auto 0' }}>
            At Finora, we aim to make your personal loan journey simple, clear, and convenient. Whether you need funds for a medical emergency, home expenses, education, or a planned purchase, we help you understand your loan options and make informed financial decisions.
          </p>
        </div>
      </div>

      {/* Continuously Scrolling Benefits Marquee */}
      <div className="benefits-carousel-container" aria-label="Personal Loan Benefits Carousel">
        <div className="carousel-fade carousel-fade-left" aria-hidden="true" />
        
        <div className="benefits-carousel-track">
          {/* Track 1 */}
          <div className="benefits-carousel-group" aria-hidden="false">
            {repeated.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={`track1-${i}`} className="benefit-carousel-card">
                  <div className="benefit-card-icon-badge" aria-hidden="true">
                    <Icon size={24} strokeWidth={2.2} />
                  </div>
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Track 2 (Duplicate for continuous loop) */}
          <div className="benefits-carousel-group" aria-hidden="true">
            {repeated.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={`track2-${i}`} className="benefit-carousel-card">
                  <div className="benefit-card-icon-badge" aria-hidden="true">
                    <Icon size={24} strokeWidth={2.2} />
                  </div>
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="carousel-fade carousel-fade-right" aria-hidden="true" />
      </div>

      {/* CTA at the end */}
      <div className="container">
        <div className="why-choose-cta-box">
          <div className="cta-copy">
            <h3>Ready to Explore Your Personal Loan Options?</h3>
            <p>Compare pre-approved loan offers with zero impact on your credit score.</p>
          </div>
          <div className="cta-actions">
            <Link 
              className="btn btn-primary" 
              to="/#loans"
              onClick={(e) => {
                if (onOpenApplyModal) {
                  e.preventDefault();
                  onOpenApplyModal('Personal Loan');
                }
              }}
            >
              Explore Loan Options <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
