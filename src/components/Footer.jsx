import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ onOpenApplyModal }) {
  return (
    <>
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-about">
              <Link className="brand brand-footer" to="/" aria-label="Finora home">
                <img 
                  src="/images/finora-logo-light.png?v=2" 
                  alt="Finora Loan - Financing a Brighter Tomorrow" 
                  className="footer-logo" 
                  width="185" 
                  height="52" 
                />
              </Link>
              <p>Clear information for more considered financial decisions. Compare, calculate and understand your options with complete transparency.</p>
              <div style={{ marginTop: '14px' }}>
                <a className="text-link" style={{ color: '#ffd18a' }} href="/#contact">Talk to our team →</a>
              </div>
            </div>

            <div>
              <h4>Loans</h4>
              <div className="footer-links">
                <Link to="/personal-loan">Personal loan</Link>
                <Link to="/business-loan">Business loan</Link>
                <Link to="/home-loan">Home loan</Link>
                <Link to="/gold-loan">Gold loan</Link>
                <a href="/#purpose">Loans by purpose</a>
                <a href="/#applicants">Loans by profile</a>
              </div>
            </div>

            <div>
              <h4>Tools & rates</h4>
              <div className="footer-links">
                <a href="/#calculators">EMI calculators</a>
                <a href="/#eligibility">Loan eligibility</a>
                <a href="/#rates">Interest rates</a>
                <a href="/#rates">Processing fees</a>
                <a href="/#investment">Investment</a>
              </div>
            </div>

            <div>
              <h4>Resources</h4>
              <div className="footer-links">
                <a href="/#guides">Personal loan guides</a>
                <a href="/#guides">Business loan guides</a>
                <a href="/#guides">Home loan guides</a>
                <a href="/#guides">Credit score guides</a>
                <a href="/#faqs">FAQs</a>
              </div>
            </div>

            <div>
              <h4>Company</h4>
              <div className="footer-links">
                <Link to="/">About us</Link>
                <a href="/#locations">Locations</a>
                <a href="/#contact">Contact us</a>
                <a href="#disclaimer">Privacy policy</a>
                <a href="#disclaimer">Terms and conditions</a>
                <a href="#disclaimer">Disclaimer</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Finora. Sample website concept.</span>
            <span>
              <a id="privacy" href="#disclaimer">Privacy</a> · 
              <a id="terms" href="#disclaimer">Terms</a> · 
              <a href="#disclaimer">Disclaimer</a>
            </span>
          </div>

          <p className="disclaimer" id="disclaimer">
            Prototype disclaimer: Finora is a fictional sample brand. This page is for design demonstration only and is not a lender, investment recommendation, loan offer or financial advice. Product details, rates, fees, eligibility criteria, disclosures, regulatory information, privacy terms and contact details must be verified and replaced before a real website is published.
          </p>
        </div>
      </footer>

      {/* Mobile Fixed Quick CTA */}
      <div className="mobile-cta">
        <a className="btn btn-outline" href="/#calculators">Calculate EMI</a>
        <button 
          type="button" 
          className="btn btn-primary"
          onClick={() => onOpenApplyModal('General Eligibility')}
          style={{ border: 'none', cursor: 'pointer' }}
        >
          Check eligibility
        </button>
      </div>
    </>
  );
}
