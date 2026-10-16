import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, CheckCircle2, CalendarCheck2, ShieldCheck, Zap } from 'lucide-react';

const TRUST_ITEMS_EN = [
  { icon: Sparkles, text: 'User-Friendly Experience' },
  { icon: CheckCircle2, text: 'Transparent Process' },
  { icon: CalendarCheck2, text: 'Flexible Repayment Options' },
  { icon: ShieldCheck, text: 'Secure & Reliable Service' },
  { icon: Zap, text: 'Quick Approval & Disbursal' }
];

const TRUST_ITEMS_HI = [
  { icon: Sparkles, text: 'आसान और सरल प्रक्रिया' },
  { icon: CheckCircle2, text: 'पूरी पारदर्शिता, कोई छिपा शुल्क नहीं' },
  { icon: CalendarCheck2, text: 'किस्त चुकाने के आसान विकल्प' },
  { icon: ShieldCheck, text: '100% सुरक्षित और भरोसेमंद सेवा' },
  { icon: Zap, text: 'तुरंत मंजूरी और खाते में ट्रांसफर' }
];

const TRUST_ITEMS_PA = [
  { icon: Sparkles, text: 'ਆਸਾਨ ਅਤੇ ਸਰਲ ਅਨੁਭਵ' },
  { icon: CheckCircle2, text: 'ਪੂਰੀ ਪਾਰਦਰਸ਼ਤਾ, ਕੋਈ ਲੁਕਿਆ ਖ਼ਰਚ ਨਹੀਂ' },
  { icon: CalendarCheck2, text: 'ਕਿਸ਼ਤਾਂ ਚੁਕਾਉਣ ਦੇ ਸੌਖੇ ਵਿਕਲਪ' },
  { icon: ShieldCheck, text: '100% ਸੁਰੱਖਿਅਤ ਅਤੇ ਭਰੋਸੇਯੋਗ ਸੇਵਾ' },
  { icon: Zap, text: 'ਤੁਰੰਤ ਮਨਜ਼ੂਰੀ ਅਤੇ ਪੈਸੇ ਖਾਤੇ ਵਿੱਚ' }
];

export default function TrustMarquee() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language ? i18n.language.substring(0, 2) : 'en';
  const isHi = currentLang === 'hi';
  const isPa = currentLang === 'pa';
  const items = isPa ? TRUST_ITEMS_PA : (isHi ? TRUST_ITEMS_HI : TRUST_ITEMS_EN);

  const repeatedItems = [...items, ...items];

  return (
    <div 
      className="trust-marquee-container" 
      role="region" 
      aria-label="Loan Aasra Key Benefits and Trust Highlights"
    >
      <div className="trust-marquee-fade trust-marquee-fade-left" aria-hidden="true" />
      
      <div className="trust-marquee-track">
        {/* Primary Track */}
        <div className="trust-marquee-group" aria-hidden="false">
          {repeatedItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={`set1-${index}`} className="trust-marquee-item">
                <span className="trust-marquee-icon-wrap" aria-hidden="true">
                  <Icon size={19} strokeWidth={2.2} />
                </span>
                <span className="trust-marquee-text">{item.text}</span>
                <span className="trust-marquee-dot" aria-hidden="true" />
              </div>
            );
          })}
        </div>

        {/* Duplicate Track for Seamless -50% Infinite Loop */}
        <div className="trust-marquee-group" aria-hidden="true">
          {repeatedItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={`set2-${index}`} className="trust-marquee-item">
                <span className="trust-marquee-icon-wrap" aria-hidden="true">
                  <Icon size={19} strokeWidth={2.2} />
                </span>
                <span className="trust-marquee-text">{item.text}</span>
                <span className="trust-marquee-dot" aria-hidden="true" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="trust-marquee-fade trust-marquee-fade-right" aria-hidden="true" />
    </div>
  );
}
