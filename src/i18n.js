import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';
import pa from './locales/pa.json';

// Detect initial language based on URL prefix or localStorage
const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    if (path.startsWith('/hi')) return 'hi';
    if (path.startsWith('/pa')) return 'pa';
    const stored = localStorage.getItem('loan_aasra_lang');
    if (stored && ['en', 'hi', 'pa'].includes(stored)) {
      return stored;
    }
  }
  return 'en';
};

const initialLang = getInitialLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      pa: { translation: pa }
    },
    lng: initialLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

// Synchronize <html lang="..."> tag whenever language changes
i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng;
    try {
      localStorage.setItem('loan_aasra_lang', lng);
    } catch {
      // storage unavailable
    }
  }
});

if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLang;
}

export default i18n;
