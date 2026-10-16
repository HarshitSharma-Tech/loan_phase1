import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const BASE_DOMAIN = 'https://loanaasra.com';

export default function SeoHead({ 
  title, 
  description, 
  productName, 
  breadcrumbs = [] 
}) {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const currentLang = i18n.language ? i18n.language.substring(0, 2) : 'en';

  useEffect(() => {
    // 1. Calculate clean route path (without language prefix)
    let cleanPath = location.pathname;
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

    const defaultTitle = t('seo.homeTitle', 'Loan Aasra | Your Dreams, Our Support - Compare, Calculate & Apply for Loans');
    const defaultDesc = t('seo.homeDesc', 'Compare personal, home, business & gold loans with Loan Aasra. Calculate instant reducing-balance EMIs, check eligibility without CIBIL impact, and apply online.');

    const finalTitle = title || defaultTitle;
    const finalDesc = description || defaultDesc;

    // 2. Set document title and html lang
    document.title = finalTitle;
    document.documentElement.lang = currentLang;

    // Helper to set or update head meta tag
    const setMetaTag = (nameAttr, nameVal, content) => {
      let meta = document.querySelector(`meta[${nameAttr}="${nameVal}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(nameAttr, nameVal);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    setMetaTag('name', 'description', finalDesc);
    setMetaTag('property', 'og:title', finalTitle);
    setMetaTag('property', 'og:description', finalDesc);
    setMetaTag('property', 'og:site_name', 'Loan Aasra');
    setMetaTag('property', 'og:locale', currentLang === 'hi' ? 'hi_IN' : currentLang === 'pa' ? 'pa_IN' : 'en_IN');
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', finalTitle);
    setMetaTag('name', 'twitter:description', finalDesc);

    // 3. Dynamic Canonical URL
    const canonicalPath = currentLang === 'en' 
      ? (cleanPath === '/' ? '' : cleanPath)
      : `/${currentLang}${cleanPath === '/' ? '' : cleanPath}`;
    const canonicalHref = `${BASE_DOMAIN}${canonicalPath}`;

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalHref);

    // 4. Reciprocal Hreflang Tags (en, hi, pa, x-default)
    const enHref = `${BASE_DOMAIN}${cleanPath === '/' ? '/' : cleanPath}`;
    const hiHref = `${BASE_DOMAIN}/hi${cleanPath === '/' ? '' : cleanPath}`;
    const paHref = `${BASE_DOMAIN}/pa${cleanPath === '/' ? '' : cleanPath}`;

    const setHreflang = (langCode, href) => {
      let link = document.querySelector(`link[rel="alternate"][hreflang="${langCode}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', langCode);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    setHreflang('en', enHref);
    setHreflang('hi', hiHref);
    setHreflang('pa', paHref);
    setHreflang('x-default', enHref);

    // 5. Injected JSON-LD Structured Data
    let schemaScript = document.getElementById('loan-aasra-schema-jsonld');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'loan-aasra-schema-jsonld';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "FinancialService",
          "@id": `${BASE_DOMAIN}/#organization`,
          "name": "Loan Aasra",
          "alternateName": currentLang === 'hi' ? "लोन आसरा" : currentLang === 'pa' ? "ਲੋਨ ਆਸਰਾ" : "Loan Aasra India",
          "url": BASE_DOMAIN,
          "logo": `${BASE_DOMAIN}/images/loan-aasra-logo.png`,
          "image": `${BASE_DOMAIN}/images/loan-aasra-logo.png`,
          "description": finalDesc,
          "telephone": "+91-1800-LOAN-AASRA",
          "priceRange": "₹₹",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN"
          },
          "areaServed": "IN",
          "knowsLanguage": ["en", "hi", "pa"]
        },
        {
          "@type": "WebSite",
          "@id": `${BASE_DOMAIN}/#website`,
          "url": BASE_DOMAIN,
          "name": "Loan Aasra",
          "publisher": { "@id": `${BASE_DOMAIN}/#organization` },
          "inLanguage": currentLang
        }
      ]
    };

    if (breadcrumbs && breadcrumbs.length > 0) {
      schemaData["@graph"].push({
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": crumb.name,
          "item": `${BASE_DOMAIN}${crumb.path}`
        }))
      });
    }

    schemaScript.text = JSON.stringify(schemaData);

  }, [title, description, productName, location.pathname, currentLang, t, breadcrumbs]);

  return null;
}
