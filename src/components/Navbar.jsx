import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ onOpenApplyModal }) {
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const megaRef = useRef(null);
  const navigate = useNavigate();

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
              <span className="topbar-badge">VERIFIED RATES</span>
              <span>Simple finance. Clear next steps.</span>
            </div>
            <div className="top-secondary">
              <span>Need help? <a href="/#contact" onClick={closeMenus}>Talk to our support team ↗</a></span>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="container nav-wrap">
          <Link className="brand" to="/" onClick={closeMenus} aria-label="Finora home">
            <img 
              src="/images/finora-logo-trimmed.png?v=2" 
              alt="Finora Loan - Financing a Brighter Tomorrow" 
              className="brand-logo" 
              width="175" 
              height="50" 
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
                Loans <span className="nav-arrow">▾</span>
              </button>

              {/* Mega Menu Dropdown */}
              <div className="mega-menu" role="region" aria-label="Loans categories">
                <div className="mega-container">
                  {/* Col 1: Personal & Consumer */}
                  <div className="mega-col">
                    <h4 className="mega-col-title">Personal & Consumer</h4>
                    <ul className="mega-list">
                      <li>
                        <Link to="/personal-loan" onClick={closeMenus}>
                          <strong>Personal Loan</strong>
                          <span>Instant funds up to ₹40 Lakhs</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/insta-personal-loan" onClick={closeMenus}>
                          <strong>Insta Personal Loan</strong>
                          <span>100% digital & paperless approval</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/medical-loan" onClick={closeMenus}>
                          <strong>Medical Loan</strong>
                          <span>Emergency healthcare financing</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/debt-consolidation-loan" onClick={closeMenus}>
                          <strong>Debt Consolidation</strong>
                          <span>Combine multi-debt into single EMI</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/easy-emi-loan" onClick={closeMenus}>
                          <strong>Easy EMI Loan</strong>
                          <span>Flexible split payment options</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Col 2: Home & Property + Vehicle */}
                  <div className="mega-col">
                    <h4 className="mega-col-title">Home & Property</h4>
                    <ul className="mega-list">
                      <li>
                        <Link to="/home-loan" onClick={closeMenus}>
                          <strong>Home Loan</strong>
                          <span>Lowest APR starting 8.40% p.a.</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/loan-against-property" onClick={closeMenus}>
                          <strong>Loan Against Property</strong>
                          <span>High loan amount up to 70% LTV</span>
                        </Link>
                      </li>
                    </ul>

                    <h4 className="mega-col-title" style={{ marginTop: '20px' }}>Vehicle Financing</h4>
                    <ul className="mega-list">
                      <li>
                        <Link to="/car-loan" onClick={closeMenus}>
                          <strong>Car Loan</strong>
                          <span>Up to 100% on-road financing</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/two-wheeler-loan" onClick={closeMenus}>
                          <strong>Two-Wheeler Loan</strong>
                          <span>Instant approval for bikes & EVs</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Col 3: Business & Wealth */}
                  <div className="mega-col">
                    <h4 className="mega-col-title">Business & Wealth</h4>
                    <ul className="mega-list">
                      <li>
                        <Link to="/business-loan" onClick={closeMenus}>
                          <strong>Business Loan</strong>
                          <span>Collateral-free working capital</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/gold-loan" onClick={closeMenus}>
                          <strong>Gold Loan</strong>
                          <span>Instant cash against gold from 0.75%/mo</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/education-loan" onClick={closeMenus}>
                          <strong>Education Loan</strong>
                          <span>Fund studies in India & Abroad</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/loan-against-securities" onClick={closeMenus}>
                          <strong>Loan Against Securities</strong>
                          <span>Overdraft against shares & mutual funds</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <a href="/#investment" onClick={closeMenus}>Investment</a>
            <a href="/#calculators" onClick={closeMenus}>Calculators</a>
            <a href="/#rates" onClick={closeMenus}>Interest rates</a>
            <a href="/#locations" onClick={closeMenus}>Locations</a>
            <a href="/#guides" onClick={closeMenus}>Guides</a>
            <Link to="/blog" onClick={closeMenus}>Blog</Link>
          </nav>

          <div className="nav-actions">
            <button 
              type="button"
              className="btn btn-primary btn-small" 
              onClick={() => onOpenApplyModal('General Eligibility')}
            >
              Check eligibility <span>↗</span>
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
