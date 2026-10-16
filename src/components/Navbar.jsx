import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher.jsx';

export default function Navbar({ onOpenApplyModal }) {
  const { t, i18n } = useTranslation();
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const megaRef = useRef(null);
  const navigate = useNavigate();

  const currentLang = i18n.language ? i18n.language.substring(0, 2) : 'en';
  const getLocalePath = (path) => {
    if (currentLang === 'en') return path;
    if (path === '/') return `/${currentLang}`;
    return `/${currentLang}${path.startsWith('/') ? path : '/' + path}`;
  };

  // Scroll header elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) {
        setIsMegaOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMegaOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleMegaMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMegaOpen(prev => !prev);
  };

  const closeMenus = () => {
    setIsMegaOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Sticky Header enclosing both Top Bar and Navigation */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        {/* Top Bar */}
        <div className="topbar">
          <div className="container">
            <div className="topbar-left">
              <span className="topbar-badge">{t('common.verifiedRates', 'VERIFIED RATES')}</span>
              <span>{t('common.topbarText', 'Simple finance. Clear next steps.')}</span>
            </div>
            <div className="top-secondary">
              <span>{t('common.talkToSupport', 'Talk to our support team ↗')} <a href="/#contact" onClick={closeMenus}>📞</a></span>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="container nav-wrap">
          <Link className="brand" to={getLocalePath('/')} onClick={closeMenus} aria-label="Loan Aasra home">
            <img 
              src="/images/loan-aasra-logo.png" 
              alt="Loan Aasra - Your Dreams, Our Support." 
              className="brand-logo" 
              width="170" 
              height="52" 
            />
          </Link>
          
          {/* Mobile navigation backdrop */}
          {isMobileMenuOpen && (
            <div className="nav-backdrop active" onClick={closeMenus} aria-hidden="true" />
          )}

          <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`} id="mainNav" aria-label="Main navigation">
            {/* Interactive Loans Mega Menu Item */}
            <div className={`nav-item has-mega ${isMegaOpen ? 'open' : ''}`} ref={megaRef}>
              <button 
                type="button"
                className="nav-link-dropdown" 
                onClick={toggleMegaMenu}
                aria-haspopup="true" 
                aria-expanded={isMegaOpen}
                style={{ background: 'none', border: 'none', font: 'inherit', cursor: 'pointer' }}
              >
                {t('nav.loans', 'Loans')} <span className="nav-arrow">▾</span>
              </button>

              {/* Mega Menu Dropdown */}
              <div className="mega-menu" role="region" aria-label="Loans categories">
                <div className="mega-container">
                  {/* Col 1: Personal & Consumer */}
                  <div className="mega-col">
                    <h4 className="mega-col-title">{t('nav.categories.personal', 'Personal & Consumer')}</h4>
                    <ul className="mega-list">
                      <li>
                        <Link to={getLocalePath('/personal-loan')} onClick={closeMenus}>
                          <strong>{t('nav.items.personalLoan', 'Personal Loan')}</strong>
                          <span>{t('nav.items.personalLoanDesc', 'Instant funds up to ₹40 Lakhs')}</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={getLocalePath('/insta-personal-loan')} onClick={closeMenus}>
                          <strong>{t('nav.items.instaLoan', 'Insta Personal Loan')}</strong>
                          <span>{t('nav.items.instaLoanDesc', '100% digital & paperless approval')}</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={getLocalePath('/medical-loan')} onClick={closeMenus}>
                          <strong>{t('nav.items.medicalLoan', 'Medical Loan')}</strong>
                          <span>{t('nav.items.medicalLoanDesc', 'Emergency healthcare financing')}</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={getLocalePath('/debt-consolidation-loan')} onClick={closeMenus}>
                          <strong>{t('nav.items.debtConsolidation', 'Debt Consolidation')}</strong>
                          <span>{t('nav.items.debtConsolidationDesc', 'Combine multi-debt into single EMI')}</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={getLocalePath('/easy-emi-loan')} onClick={closeMenus}>
                          <strong>{t('nav.items.easyEmi', 'Easy EMI Loan')}</strong>
                          <span>{t('nav.items.easyEmiDesc', 'Flexible split payment options')}</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Col 2: Home & Property + Vehicle */}
                  <div className="mega-col">
                    <h4 className="mega-col-title">{t('nav.categories.property', 'Home & Property')}</h4>
                    <ul className="mega-list">
                      <li>
                        <Link to={getLocalePath('/home-loan')} onClick={closeMenus}>
                          <strong>{t('nav.items.homeLoan', 'Home Loan')}</strong>
                          <span>{t('nav.items.homeLoanDesc', 'Lowest APR starting 8.40% p.a.')}</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={getLocalePath('/loan-against-property')} onClick={closeMenus}>
                          <strong>{t('nav.items.lap', 'Loan Against Property')}</strong>
                          <span>{t('nav.items.lapDesc', 'High loan amount up to 70% LTV')}</span>
                        </Link>
                      </li>
                    </ul>

                    <h4 className="mega-col-title" style={{ marginTop: '20px' }}>{t('nav.categories.vehicle', 'Vehicle Financing')}</h4>
                    <ul className="mega-list">
                      <li>
                        <Link to={getLocalePath('/car-loan')} onClick={closeMenus}>
                          <strong>{t('nav.items.carLoan', 'Car Loan')}</strong>
                          <span>{t('nav.items.carLoanDesc', 'Up to 100% on-road financing')}</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={getLocalePath('/two-wheeler-loan')} onClick={closeMenus}>
                          <strong>{t('nav.items.twoWheeler', 'Two-Wheeler Loan')}</strong>
                          <span>{t('nav.items.twoWheelerDesc', 'Instant approval for bikes & EVs')}</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Col 3: Business & Wealth */}
                  <div className="mega-col">
                    <h4 className="mega-col-title">{t('nav.categories.business', 'Business & Wealth')}</h4>
                    <ul className="mega-list">
                      <li>
                        <Link to={getLocalePath('/business-loan')} onClick={closeMenus}>
                          <strong>{t('nav.items.businessLoan', 'Business Loan')}</strong>
                          <span>{t('nav.items.businessLoanDesc', 'Collateral-free working capital')}</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={getLocalePath('/gold-loan')} onClick={closeMenus}>
                          <strong>{t('nav.items.goldLoan', 'Gold Loan')}</strong>
                          <span>{t('nav.items.goldLoanDesc', 'Instant cash against gold from 0.75%/mo')}</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={getLocalePath('/education-loan')} onClick={closeMenus}>
                          <strong>{t('nav.items.educationLoan', 'Education Loan')}</strong>
                          <span>{t('nav.items.educationLoanDesc', 'Fund studies in India & Abroad')}</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={getLocalePath('/loan-against-securities')} onClick={closeMenus}>
                          <strong>{t('nav.items.securitiesLoan', 'Loan Against Securities')}</strong>
                          <span>{t('nav.items.securitiesLoanDesc', 'Overdraft against shares & mutual funds')}</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <a href="/#investment" onClick={closeMenus}>{t('nav.investment', 'Investment')}</a>
            <a href="/#calculators" onClick={closeMenus}>{t('nav.calculators', 'Calculators')}</a>
            <a href="/#rates" onClick={closeMenus}>{t('nav.rates', 'Interest rates')}</a>
            <a href="/#locations" onClick={closeMenus}>{t('nav.locations', 'Locations')}</a>
            <a href="/#guides" onClick={closeMenus}>{t('nav.guides', 'Guides')}</a>
            <Link to={getLocalePath('/blog')} onClick={closeMenus}>{t('nav.blog', 'Blog')}</Link>

            {/* Mobile Language Switcher Selector */}
            <LanguageSwitcher isMobile={true} onSelect={closeMenus} />
          </nav>

          <div className="nav-actions">
            {/* Desktop Language Switcher */}
            <LanguageSwitcher />

            <button 
              type="button"
              className="btn btn-primary btn-small" 
              onClick={() => onOpenApplyModal('General Eligibility')}
            >
              {t('common.checkEligibility', 'Check eligibility')} <span>↗</span>
            </button>
            <button 
              className="menu-toggle" 
              id="menuToggle" 
              aria-label="Toggle navigation" 
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
