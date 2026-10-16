import React from 'react';
import { Sparkles, CheckCircle2, CalendarCheck2, ShieldCheck, Zap } from 'lucide-react';

const TRUST_ITEMS = [
  {
    icon: Sparkles,
    text: 'User-Friendly Experience'
  },
  {
    icon: CheckCircle2,
    text: 'Transparent Process'
  },
  {
    icon: CalendarCheck2,
    text: 'Flexible Repayment Options'
  },
  {
    icon: ShieldCheck,
    text: 'Secure & Reliable Service'
  },
  {
    icon: Zap,
    text: 'Quick Approval & Disbursal'
  }
];

export default function TrustMarquee() {
  // Repeating the 5 items twice per group ensures full coverage even on ultra-wide screens
  const repeatedItems = [...TRUST_ITEMS, ...TRUST_ITEMS];

  return (
    <div 
      className="trust-marquee-container" 
      role="region" 
      aria-label="Finora Key Benefits and Trust Highlights"
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
