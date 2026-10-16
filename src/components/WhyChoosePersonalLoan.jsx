import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  BadgePercent, 
  CalendarCheck2, 
  ShieldCheck, 
  FileCheck2, 
  Zap, 
  Eye 
} from 'lucide-react';

const BENEFITS_EN = [
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

const BENEFITS_HI = [
  {
    icon: BadgePercent,
    title: 'किफायती ब्याज दरें',
    desc: 'लोन लेने से पहले सभी बैंकों की ब्याज दरों की आसानी से तुलना करें।'
  },
  {
    icon: CalendarCheck2,
    title: 'किस्त चुकाने के आसान विकल्प',
    desc: 'अपनी मासिक कमाई के अनुसार ऐसी किस्त चुनें जो आपके बजट में बिल्कुल सही बैठे।'
  },
  {
    icon: ShieldCheck,
    title: 'बिना कुछ गिरवी रखे लोन',
    desc: 'पर्सनल लोन के लिए आपको कोई भी संपत्ति या गहने गिरवी रखने की जरूरत नहीं है।'
  },
  {
    icon: FileCheck2,
    title: 'कागजी कार्रवाई का कोई झंझट नहीं',
    desc: 'आसान ऑनलाइन प्रक्रिया और कम से कम दस्तावेजों के साथ तुरंत काम।'
  },
  {
    icon: Zap,
    title: 'तुरंत लोन की प्रक्रिया',
    desc: 'ऑनलाइन पात्रता जांचें और बिना किसी देरी के जल्द से जल्द लोन पाएं।'
  },
  {
    icon: Eye,
    title: 'पूरी पारदर्शिता, कोई छिपा शुल्क नहीं',
    desc: 'ब्याज दर, लोन प्रक्रिया का शुल्क (प्रोसेसिंग फीस) और सभी नियम पहले से साफ रहते हैं।'
  }
];

const BENEFITS_PA = [
  {
    icon: BadgePercent,
    title: 'ਘੱਟ ਵਿਆਜ ਦਰਾਂ',
    desc: 'ਲੋਨ ਲੈਣ ਤੋਂ ਪਹਿਲਾਂ ਵੱਖ-ਵੱਖ ਬੈਂਕਾਂ ਦੀਆਂ ਵਿਆਜ ਦਰਾਂ ਆਸਾਨੀ ਨਾਲ ਦੇਖੋ ਅਤੇ ਤੁਲਨਾ ਕਰੋ।'
  },
  {
    icon: CalendarCheck2,
    title: 'ਆਸਾਨ ਮਹੀਨਾਵਾਰ ਕਿਸ਼ਤਾਂ (EMI)',
    desc: 'ਆਪਣੀ ਕਮਾਈ ਅਤੇ ਬਜਟ ਮੁਤਾਬਕ ਆਸਾਨ ਮਹੀਨਾਵਾਰ ਕਿਸ਼ਤ ਦੀ ਚੋਣ ਕਰੋ।'
  },
  {
    icon: ShieldCheck,
    title: 'ਬਿਨਾਂ ਕੁਝ ਗਿਰਵੀ ਰੱਖੇ ਲੋਨ',
    desc: 'ਪਰਸਨਲ ਲੋਨ ਲਈ ਤੁਹਾਨੂੰ ਕੋਈ ਜ਼ਮੀਨ, ਗਹਿਣੇ ਜਾਂ ਜਾਇਦਾਦ ਗਿਰਵੀ ਰੱਖਣ ਦੀ ਲੋੜ ਨਹੀਂ।'
  },
  {
    icon: FileCheck2,
    title: 'ਕਾਗਜ਼ੀ ਕਾਰਵਾਈ ਦਾ ਕੋਈ ਝੰਜਟ ਨਹੀਂ',
    desc: 'ਸੌਖੀ ਆਨਲਾਈਨ ਪ੍ਰਕਿਰਿਆ ਅਤੇ ਘੱਟੋ-ਘੱਟ ਦਸਤਾਵੇਜ਼ਾਂ ਨਾਲ ਝੱਟਪੱਟ ਲੋਨ।'
  },
  {
    icon: Zap,
    title: 'ਤੁਰੰਤ ਪੈਸੇ ਖਾਤੇ ਵਿੱਚ',
    desc: 'ਆਪਣੀ ਯੋਗਤਾ ਆਨਲਾਈਨ ਜਾਣੋ ਅਤੇ ਬਿਨਾਂ ਕਿਸੇ ਦੇਰੀ ਦੇ ਛੇਤੀ ਲੋਨ ਪ੍ਰਾਪਤ ਕਰੋ।'
  },
  {
    icon: Eye,
    title: 'ਪੂਰੀ ਪਾਰਦਰਸ਼ਤਾ, ਕੋਈ ਲੁਕਿਆ ਖ਼ਰਚ ਨਹੀਂ',
    desc: 'ਵਿਆਜ ਦਰ, ਪ੍ਰੋਸੈਸਿੰਗ ਫੀਸ ਅਤੇ ਸਾਰੇ ਨਿਯਮ ਪਹਿਲਾਂ ਤੋਂ ਬਿਲਕੁਲ ਸਾਫ਼ ਤੇ ਪਾਰਦਰਸ਼ੀ ਰਹਿੰਦੇ ਹਨ।'
  }
];

export default function WhyChoosePersonalLoan({ onOpenApplyModal }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language ? i18n.language.substring(0, 2) : 'en';
  const isHi = currentLang === 'hi';
  const isPa = currentLang === 'pa';

  const benefitsList = isPa ? BENEFITS_PA : (isHi ? BENEFITS_HI : BENEFITS_EN);
  const repeated = [...benefitsList, ...benefitsList];

  return (
    <section className="section why-choose-section" id="why-choose" aria-label="Why Choose Loan Aasra for a Personal Loan">
      <div className="container">
        <div className="section-head" style={{ maxWidth: '820px', margin: '0 auto 40px', textAlign: 'center' }}>
          <span className="eyebrow">{isHi ? 'Loan Aasra के फायदे' : isPa ? 'Loan Aasra ਦੇ ਫ਼ਾਇਦੇ' : 'Loan Aasra Advantages'}</span>
          <h2>
            {isHi ? (
              <>पर्सनल लोन के लिए <span className="text-gradient-blue">Loan Aasra ही क्यों चुनें?</span></>
            ) : isPa ? (
              <>ਪਰਸਨਲ ਲੋਨ ਲਈ <span className="text-gradient-blue">Loan Aasra ਹੀ ਕਿਉਂ ਚੁਣੋ?</span></>
            ) : (
              <>Why Choose Loan Aasra for a <span className="text-gradient-blue">Personal Loan?</span></>
            )}
          </h2>
          <p style={{ fontSize: '1.02rem', lineHeight: '1.7', color: 'var(--slate-600)', margin: '14px auto 0' }}>
            {isHi ? (
              'Loan Aasra पर हमारा मकसद आपके लोन लेने के सफर को बेहद आसान और पारदर्शी बनाना है। चाहे शादी हो, इलाज का खर्च, बच्चों की पढ़ाई या घर का काम—हम आपको सही लोन चुनने में पूरी मदद करते हैं।'
            ) : isPa ? (
              'Loan Aasra \'ਤੇ ਸਾਡਾ ਮਕਸਦ ਤੁਹਾਡੇ ਲੋਨ ਦੇ ਸਫ਼ਰ ਨੂੰ ਬੇਹੱਦ ਆਸਾਨ ਅਤੇ ਪਾਰਦਰਸ਼ੀ ਬਣਾਉਣਾ ਹੈ। ਚਾਹੇ ਵਿਆਹ ਹੋਵੇ, ਇਲਾਜ ਦਾ ਖ਼ਰਚਾ, ਬੱਚਿਆਂ ਦੀ ਪੜ੍ਹਾਈ ਜਾਂ ਘਰ ਦਾ ਕੰਮ—ਅਸੀਂ ਤੁਹਾਨੂੰ ਸਹੀ ਲੋਨ ਚੁਣਨ ਵਿੱਚ ਪੂਰੀ ਮਦਦ ਕਰਦੇ ਹਾਂ।'
            ) : (
              'At Loan Aasra, we aim to make your personal loan journey simple, clear, and convenient. Whether you need funds for a medical emergency, home expenses, education, or a planned purchase, we help you understand your loan options and make informed financial decisions.'
            )}
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
            <h3>{isHi ? 'क्या आप अपने लिए सही पर्सनल लोन तलाश रहे हैं?' : isPa ? 'ਕੀ ਤੁਸੀਂ ਆਪਣੇ ਲਈ ਸਹੀ ਪਰਸਨਲ ਲੋਨ ਲੱਭ ਰਹੇ ਹੋ?' : 'Ready to Explore Your Personal Loan Options?'}</h3>
            <p>{isHi ? 'सिबिल स्कोर पर बिना किसी असर के पहले से मंजूर लोन ऑफर्स देखें।' : isPa ? 'ਸਿਬਿਲ ਸਕੋਰ \'ਤੇ ਬਿਨਾਂ ਕਿਸੇ ਅਸਰ ਦੇ ਪਹਿਲਾਂ ਤੋਂ ਮਨਜ਼ੂਰ ਲੋਨ ਆਫ਼ਰ ਦੇਖੋ।' : 'Compare pre-approved loan offers with zero impact on your credit score.'}</p>
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
              {isHi ? 'लोन के विकल्प देखें' : isPa ? 'ਲੋਨ ਦੇ ਵਿਕਲਪ ਦੇਖੋ' : 'Explore Loan Options'} <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
