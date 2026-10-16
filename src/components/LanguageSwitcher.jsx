import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English', native: 'English' },
  { code: 'hi', label: 'HI', name: 'Hindi', native: 'हिंदी' },
  { code: 'pa', label: 'PA', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' }
];

export default function LanguageSwitcher({ isMobile = false, onSelect }) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const currentLang = i18n.language ? i18n.language.substring(0, 2) : 'en';
  const activeLangObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLanguageChange = (targetCode) => {
    if (targetCode === currentLang) {
      setIsOpen(false);
      if (onSelect) onSelect();
      return;
    }

    // Change i18n language
    i18n.changeLanguage(targetCode);

    // Compute localized URL path
    const { pathname, search, hash } = location;
    let cleanPath = pathname;

    // Strip existing language prefix if present (/hi or /pa or /en)
    if (cleanPath.startsWith('/hi')) {
      cleanPath = cleanPath.replace(/^\/hi/, '') || '/';
    } else if (cleanPath.startsWith('/pa')) {
      cleanPath = cleanPath.replace(/^\/pa/, '') || '/';
    } else if (cleanPath.startsWith('/en')) {
      cleanPath = cleanPath.replace(/^\/en/, '') || '/';
    }

    if (!cleanPath.startsWith('/')) {
      cleanPath = '/' + cleanPath;
    }

    // Construct new path
    let newPath = '';
    if (targetCode === 'en') {
      newPath = cleanPath;
    } else {
      newPath = cleanPath === '/' ? `/${targetCode}` : `/${targetCode}${cleanPath}`;
    }

    setIsOpen(false);
    if (onSelect) onSelect();
    navigate(`${newPath}${search}${hash}`);
  };

  if (isMobile) {
    return (
      <div className="mobile-lang-selector" aria-label="Select Language">
        <span className="mobile-lang-label">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          Language / भाषा / ਭਾਸ਼ਾ:
        </span>
        <div className="mobile-lang-pills">
          {LANGUAGES.map((lang) => {
            const isActive = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                className={`mobile-lang-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleLanguageChange(lang.code)}
                aria-pressed={isActive}
              >
                <span className="lang-code-tag">{lang.label}</span>
                <span className="lang-native-tag">{lang.native}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`lang-switcher-container ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
      <button
        type="button"
        className="lang-switcher-toggle"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(prev => !prev);
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Select website language. Current language: ${activeLangObj.name}`}
      >
        <svg className="lang-globe-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
        <span className="lang-current-native">{activeLangObj.native}</span>
        <svg className={`lang-chevron ${isOpen ? 'rotated' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <ul className="lang-dropdown-menu" role="listbox" aria-label="Languages">
          {LANGUAGES.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <li key={lang.code} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className={`lang-option-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  <span className="lang-option-pill">{lang.label}</span>
                  <div className="lang-option-names">
                    <strong className="lang-option-native">{lang.native}</strong>
                    <span className="lang-option-name">{lang.name}</span>
                  </div>
                  {isSelected && (
                    <svg className="lang-check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
