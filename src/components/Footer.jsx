import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer({ onOpenApplyModal }) {
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language ? i18n.language.substring(0, 2) : 'en';
  const getLocalePath = (path) => {
    if (currentLang === 'en') return path;
    if (path === '/') return `/${currentLang}`;
    return `/${currentLang}${path.startsWith('/') ? path : '/' + path}`;
  };

  return (
    <>
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-about">
              <Link className="brand brand-footer" to={getLocalePath('/')} aria-label="Loan Aasra home">
                <img 
                  src="/images/loan-aasra-logo-light.png" 
                  alt="Loan Aasra - Your Dreams, Our Support." 
                  className="footer-logo" 
                  width="175" 
                  height="55" 
                />
              </Link>
              <p>{t('footer.brandBio', 'Loan Aasra is India\'s dedicated financial advisory and loan comparison platform. We empower individuals, entrepreneurs, and families with transparent borrowing rates, zero hidden charges, and tailored support.')}</p>
              <div style={{ marginTop: '14px' }}>
                <a className="text-link" style={{ color: '#ffd18a' }} href="/#contact">{t('common.talkToSupport', 'Talk to our support team ↗')}</a>
              </div>
            </div>

            <div>
              <h4>{t('nav.loans', 'Loans')}</h4>
              <div className="footer-links">
                <Link to={getLocalePath('/personal-loan')}>{t('nav.items.personalLoan', 'Personal loan')}</Link>
                <Link to={getLocalePath('/business-loan')}>{t('nav.items.businessLoan', 'Business loan')}</Link>
                <Link to={getLocalePath('/home-loan')}>{t('nav.items.homeLoan', 'Home loan')}</Link>
                <Link to={getLocalePath('/gold-loan')}>{t('nav.items.goldLoan', 'Gold loan')}</Link>
                <a href="/#purpose">{t('footer.loansByPurpose', 'Loans by purpose')}</a>
                <a href="/#applicants">{t('footer.loansByProfile', 'Loans by profile')}</a>
              </div>
            </div>

            <div>
              <h4>{t('nav.rates', 'Tools & rates')}</h4>
              <div className="footer-links">
                <a href="/#calculators">{t('nav.calculators', 'EMI calculators')}</a>
                <a href="/#eligibility">{t('common.checkEligibility', 'Loan eligibility')}</a>
                <a href="/#rates">{t('nav.rates', 'Interest rates')}</a>
                <a href="/#rates">{t('footer.processingFees', 'Processing fees')}</a>
                <a href="/#investment">{t('nav.investment', 'Investment')}</a>
              </div>
            </div>

            <div>
              <h4>{t('footer.quickLinks', 'Resources')}</h4>
              <div className="footer-links">
                <Link to={getLocalePath('/blog')}>{t('nav.blog', 'Blog')}</Link>
                <a href="/#guides">{t('footer.personalLoanGuides', 'Personal loan guides')}</a>
                <a href="/#guides">{t('footer.businessLoanGuides', 'Business loan guides')}</a>
                <a href="/#guides">{t('footer.homeLoanGuides', 'Home loan guides')}</a>
                <a href="/#guides">{t('footer.creditScoreGuides', 'Credit score guides')}</a>
                <a href="/#faqs">{t('nav.faqs', 'FAQs')}</a>
              </div>
            </div>

            <div>
              <h4>{t('footer.company', 'Company')}</h4>
              <div className="footer-links">
                <Link to={getLocalePath('/')}>{t('footer.aboutUs', 'About us')}</Link>
                <a href="/#locations">{t('nav.locations', 'Locations')}</a>
                <a href="/#contact">{t('footer.contactUs', 'Contact us')}</a>
                <a href="#disclaimer">{t('footer.privacyPolicy', 'Privacy policy')}</a>
                <a href="#disclaimer">{t('footer.termsAndConditions', 'Terms and conditions')}</a>
                <a href="#disclaimer">{t('footer.disclaimerLink', 'Disclaimer')}</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>{t('common.copyright', '© 2026 Loan Aasra. All rights reserved. Registered Indian Digital Lending Advisory.')}</span>
            <span>
              <a id="privacy" href="#disclaimer">{t('footer.privacy', 'Privacy')}</a> · 
              <a id="terms" href="#disclaimer">{t('footer.terms', 'Terms')}</a> · 
              <a href="#disclaimer">{t('footer.disclaimerLink', 'Disclaimer')}</a>
            </span>
          </div>

          <p className="disclaimer" id="disclaimer">
            {t('common.disclaimer', 'Disclaimer: Loan Aasra is an independent digital loan comparison and borrower advisory platform. Loan approval, interest rates, processing fees, and disbursal timelines depend on lender credit underwriting and borrower eligibility. Calculators provide indicative figures only and do not constitute a credit sanction or formal loan guarantee.')}
          </p>
        </div>
      </footer>

      {/* Mobile Fixed Quick CTA */}
      <div className="mobile-cta">
        <a className="btn btn-outline" href="/#calculators">{t('common.calculateEmi', 'Calculate EMI')}</a>
        <button 
          type="button" 
          className="btn btn-primary"
          onClick={() => onOpenApplyModal('General Eligibility')}
          style={{ border: 'none', cursor: 'pointer' }}
        >
          {t('common.checkEligibility', 'Check eligibility')}
        </button>
      </div>
    </>
  );
}
