/**
 * Loan Aasra Product Gallery Configuration
 * High-definition, context-specific editorial galleries for each of the 13 loan products.
 * Structure per loan:
 * - eyebrow: Section tag
 * - heading: Editorial headline
 * - description: Context paragraph
 * - featured: { img, tag, title, desc }
 * - supporting: Array of 3 items: [ { img, badge, title, desc }, ... ]
 * Total = 4 unique, relevant images per loan product.
 */

export const loanGalleries = {
  'personal-loan': {
    eyebrow: 'Life Aspirations & Milestones',
    heading: 'Every aspiration, backed by instant personal finance',
    description: 'From dream destination travel and family celebrations to luxury home interiors and personal milestones, achieve what matters most with zero collateral.',
    featured: {
      img: '/images/personal-loan-hero.jpg',
      tag: 'FEATURED PURPOSE',
      title: 'Milestone Celebrations & International Travel',
      desc: 'Fund unforgettable weddings, anniversary escapes, or global vacations without depleting long-term family savings.'
    },
    supporting: [
      {
        img: '/images/purpose-wedding.jpg',
        badge: 'WEDDINGS & FESTIVITIES',
        title: 'Grand Family Celebrations',
        desc: 'Banquet bookings, luxury jewellery, and event logistics funded seamlessly.'
      },
      {
        img: '/images/purpose-renovation.jpg',
        badge: 'HOME MAKEOVER',
        title: 'Modern Living Space Upgrades',
        desc: 'Modular kitchen revamps, designer furnishings, and smart ambient setups.'
      },
      {
        img: '/images/hero-couple.jpg',
        badge: 'LIFESTYLE GOALS',
        title: 'Unplanned Life Opportunities',
        desc: 'Immediate liquidity for tech gadgets, passion projects, and family needs.'
      }
    ]
  },

  'insta-personal-loan': {
    eyebrow: 'Ultra-Fast Digital Liquidity',
    heading: 'Instant emergency credit in your bank in under 2 hours',
    description: 'Pre-approved paperless liquidity designed for urgent priorities, flash purchases, sudden bills, or immediate family transfers.',
    featured: {
      img: '/images/loan-insta.jpg',
      tag: 'INSTANT CREDIT',
      title: 'Real-Time Account Disbursal via DigiLocker',
      desc: 'Seamless zero-touch digital onboarding that validates KYC and credits funds into your account within minutes.'
    },
    supporting: [
      {
        img: '/images/profile-salaried.jpg',
        badge: 'SALARIED ONBOARDING',
        title: 'Instant KYC & Auto-Debit Setup',
        desc: 'Zero paperwork with Aadhaar-linked verification and automated UPI mandate.'
      },
      {
        img: '/images/guide-docs.jpg',
        badge: 'PAPERLESS JOURNEY',
        title: 'Zero Physical Branches Needed',
        desc: 'Apply directly from your smartphone at any hour of the day or night.'
      },
      {
        img: '/images/personal-loan-hero.jpg',
        badge: 'FLEXIBLE ACCESS',
        title: 'Cash When Minutes Matter',
        desc: 'Overcome immediate cash crunches without asking friends or relatives.'
      }
    ]
  },

  'business-loan': {
    eyebrow: 'Enterprise & Commercial Scale',
    heading: 'Empowering ambitious businesses to build, scale, and lead',
    description: 'Fuel enterprise growth with custom capital solutions for manufacturing upgrades, inventory stocking, retail expansion, and operational cash flow.',
    featured: {
      img: '/images/story-business-loan.jpg',
      tag: 'SCALE & CAPITAL',
      title: 'Expanding Operations & New Modern Facilities',
      desc: 'Scale infrastructure, acquire high-efficiency machinery, and hire top industry talent to accelerate company valuation.'
    },
    supporting: [
      {
        img: '/images/purpose-business.jpg',
        badge: 'WORKING CAPITAL',
        title: 'Inventory & Seasonal Peak Supply',
        desc: 'Keep bulk supplies filled before festive rushes and large corporate delivery orders.'
      },
      {
        img: '/images/profile-business.jpg',
        badge: 'FOUNDER CONFIDENCE',
        title: 'SME Commercial Independence',
        desc: 'Collateral-free credit tailored to your GST returns and banking cash-flows.'
      },
      {
        img: '/images/loan-business.jpg',
        badge: 'TECH MODERNIZATION',
        title: 'Digital Upgrades & Plant Machinery',
        desc: 'Modernize automated workflows to enhance operational throughput and margins.'
      }
    ]
  },

  'home-loan': {
    eyebrow: 'Homeownership & Sanctuaries',
    heading: 'Step into the home you’ve always envisioned for your family',
    description: 'Low interest rates starting from 7.55% to 8.40%+ p.a., extended 30-year tenures, and end-to-end legal title verification for residential properties across India.',
    featured: {
      img: '/images/story-home-loan.jpg',
      tag: 'FAMILY MILESTONE',
      title: 'Building Lifelong Memories in Your Dream Home',
      desc: 'From spacious premium high-rise apartments to tranquil independent villas, secure your family foundation with peace of mind.'
    },
    supporting: [
      {
        img: '/images/loan-home.jpg',
        badge: 'NEW CONSTRUCTIONS',
        title: 'Under-Construction & Ready Flats',
        desc: 'Approved projects across top Tier 1 and Tier 2 developers with pre-verified titles.'
      },
      {
        img: '/images/purpose-renovation.jpg',
        badge: 'HOME IMPROVEMENT',
        title: 'Interior Design & Extensions',
        desc: 'Transform raw flats into architectural marvels with dedicated home improvement top-ups.'
      },
      {
        img: '/images/profile-selfemployed.jpg',
        badge: 'LONG-TERM SECURITY',
        title: 'Generational Wealth Creation',
        desc: 'Low EMIs with balance transfer benefits and transparent tax deductions up to ₹3.5L.'
      }
    ]
  },

  'loan-against-property': {
    eyebrow: 'High-Value Property Equity',
    heading: 'Unlock the latent equity trapped inside your prime real estate',
    description: 'Leverage commercial showrooms, residential properties, or industrial plots to access high-ticket liquidity up to ₹15 Crores at affordable mortgage rates.',
    featured: {
      img: '/images/story-lap-loan.jpg',
      tag: 'EQUITY VALUE',
      title: 'Maximizing Real Estate Potential for Mega Ambitions',
      desc: 'Retain 100% property ownership while raising large-scale capital for major business diversifications, debt retirement, or commercial ventures.'
    },
    supporting: [
      {
        img: '/images/loan-property.jpg',
        badge: 'COMMERCIAL ASSETS',
        title: 'Commercial Complex & Office Floors',
        desc: 'Pledge corporate offices, retail spaces, or industrial sheds at prime loan-to-value ratios.'
      },
      {
        img: '/images/story-home-loan.jpg',
        badge: 'RESIDENTIAL VALUE',
        title: 'Self-Occupied Luxury Homes',
        desc: 'Leverage ancestral or self-acquired bungalows and apartments without liquidation.'
      },
      {
        img: '/images/profile-business.jpg',
        badge: 'EXTENDED TENURE',
        title: 'Long 15-Year Repayment Horizon',
        desc: 'Maintain cash reserves with low, manageable monthly installments and tax benefits.'
      }
    ]
  },

  'gold-loan': {
    eyebrow: 'Instant Liquidity on Gold',
    heading: 'Instant doorstep and branch cash against your gold ornaments',
    description: 'Get up to 75% market value of your hallmarked jewellery safely secured in high-grade bank vaults with insurance, zero paperwork, and flexible interest-only repayment.',
    featured: {
      img: '/images/story-gold-loan.jpg',
      tag: 'SECURE ASSET LIQUIDITY',
      title: 'Certified Bank-Grade Vault Storage with Insurance',
      desc: 'Your family ornaments are weighed in front of you, sealed in tamper-evident pouches, and insured against all perils.'
    },
    supporting: [
      {
        img: '/images/loan-gold.jpg',
        badge: '30-MINUTE DISBURSAL',
        title: 'Instant Gold Valuation & Transfer',
        desc: 'High LTV based on real-time bullion market rates with zero credit score barriers.'
      },
      {
        img: '/images/purpose-wedding.jpg',
        badge: 'HERITAGE PRESERVED',
        title: 'Zero Obligation to Sell Family Heirlooms',
        desc: 'Retrieve your jewellery promptly once your short-term liquidity requirement passes.'
      },
      {
        img: '/images/profile-shop.jpg',
        badge: 'FLEXIBLE REPAYMENT',
        title: 'Bullet Repayment & Interest-Only Options',
        desc: 'Pay interest monthly and clear principal at maturity, ideal for traders and farmers.'
      }
    ]
  },

  'education-loan': {
    eyebrow: 'Global Academic Horizons',
    heading: 'Empowering future leaders to attend the world’s top universities',
    description: 'Comprehensive educational financing covering 100% tuition fees, campus accommodation, living allowances, visa deposits, and travel expenses for Indian and overseas colleges.',
    featured: {
      img: '/images/story-education-loan.jpg',
      tag: 'GLOBAL HORIZONS',
      title: 'Ivy League, STEM & Premier International Degrees',
      desc: 'Study in the USA, UK, Canada, Australia, or Germany with pre-admission loan sanction letters to strengthen your visa application.'
    },
    supporting: [
      {
        img: '/images/loan-education.jpg',
        badge: 'PREMIER INSTITUTIONS',
        title: 'Top Tier Global Campuses',
        desc: 'Full coverage for tuition, laptops, research books, laboratory fees, and health insurance.'
      },
      {
        img: '/images/profile-salaried.jpg',
        badge: 'MORATORIUM BENEFIT',
        title: 'Repay After Course Completion',
        desc: 'Enjoy a repayment holiday throughout your study period plus an additional 6-12 months buffer.'
      },
      {
        img: '/images/hero-couple.jpg',
        badge: 'TAX EXEMPTION',
        title: 'Section 80E Unlimited Tax Benefits',
        desc: 'Claim 100% tax deduction on all interest paid for up to 8 continuous assessment years.'
      }
    ]
  },

  'car-loan': {
    eyebrow: 'Automotive Freedom & Luxury',
    heading: 'Drive home your dream car with zero down-payment schemes',
    description: 'Get on-road financing up to 100% for electric vehicles, luxury sedans, and family SUVs with bespoke interest rates and rapid dealer disbursement.',
    featured: {
      img: '/images/story-car-loan.jpg',
      tag: 'ON-ROAD EXCELLENCE',
      title: 'Luxury Sedans, Electric SUVs & Family Road Trips',
      desc: 'Experience the exhilarating freedom of the open road with complete financing that includes registration and comprehensive insurance.'
    },
    supporting: [
      {
        img: '/images/loan-vehicle.jpg',
        badge: '100% ON-ROAD COVER',
        title: 'Zero Down-Payment Schemes',
        desc: 'Drive your preferred car out of the showroom without straining your monthly liquidity.'
      },
      {
        img: '/images/hero-couple.jpg',
        badge: 'EV SPECIAL RATES',
        title: 'Green Mobility Concessions',
        desc: 'Special 0.50% interest concession on all certified electric vehicle purchases.'
      },
      {
        img: '/images/profile-salaried.jpg',
        badge: 'RAPID DEALER PAYOUT',
        title: 'Priority Showroom Delivery',
        desc: 'Immediate sanction letters accepted across all authorized national automotive dealerships.'
      }
    ]
  },

  'two-wheeler-loan': {
    eyebrow: 'Smart Commute & Daily Freedom',
    heading: 'Own the latest electric scooter or commuter bike effortlessly',
    description: 'Navigate city streets with high-mileage EV two-wheelers, sporty commuter bikes, and reliable rides backed by affordable pocket-friendly EMIs.',
    featured: {
      img: '/images/story-twowheeler-loan.jpg',
      tag: 'CITY COMMUTE',
      title: 'Next-Gen Electric Two-Wheelers & Smart Commuting',
      desc: 'Slash daily fuel expenses with modern green EV scooters financed through minimal documentation and instant sanction.'
    },
    supporting: [
      {
        img: '/images/loan-vehicle.jpg',
        badge: 'MINIMAL DOWNPAYMENT',
        title: 'Low Entry Costs for Daily Commuters',
        desc: 'Affordable monthly plans starting at just ₹1,299/month for top commuter models.'
      },
      {
        img: '/images/loan-insta.jpg',
        badge: 'PAPERLESS KYC',
        title: '15-Minute Showroom Sanction',
        desc: 'Scan your QR or verify via Aadhaar OTP at your nearest partner bike showroom.'
      },
      {
        img: '/images/profile-shop.jpg',
        badge: 'GIG & COMMUTE READY',
        title: 'Ideal for Urban Professionals & Deliveries',
        desc: 'Designed for delivery partners, university students, and daily office commuters alike.'
      }
    ]
  },

  'medical-loan': {
    eyebrow: 'Health & Critical Care',
    heading: 'Prioritize family health without the worry of unexpected hospital bills',
    description: 'Rapid emergency medical financing covering elective surgeries, emergency hospitalizations, specialized treatments, and non-insured healthcare costs.',
    featured: {
      img: '/images/purpose-medical.jpg',
      tag: 'CARE FIRST',
      title: 'Prompt Healthcare Care for Your Loved Ones',
      desc: 'Immediate credit line access ensures doctors and hospitals proceed with critical treatments without administrative delays.'
    },
    supporting: [
      {
        img: '/images/loan-medical.jpg',
        badge: 'DIRECT HOSPITAL PAYOUT',
        title: 'Immediate Cashless Support',
        desc: 'Disbursement directly to hospital billing desks to avoid delayed admission.'
      },
      {
        img: '/images/advisor-priya.jpg',
        badge: 'DEDICATED DESK',
        title: '24/7 Healthcare Care Manager',
        desc: 'Compassionate assistance to help you navigate claim documentation and instant approvals.'
      },
      {
        img: '/images/profile-doctor.jpg',
        badge: 'ELECTIVE PROCEDURES',
        title: 'Surgeries, Dental, IVF & Rehab Care',
        desc: 'Fund specialized wellness and elective therapies not fully covered by traditional mediclaim.'
      }
    ]
  },

  'loan-against-securities': {
    eyebrow: 'Portfolio-Backed Liquidity',
    heading: 'Borrow against mutual funds, stocks & bonds without selling',
    description: 'Keep your long-term wealth compounding. Get an instant overdraft limit against shares, mutual fund units, sovereign gold bonds, and insurance policies.',
    featured: {
      img: '/images/loan-securities.jpg',
      tag: 'WEALTH UNBROKEN',
      title: 'Never Sell In A Market Dip — Leverage Instead',
      desc: 'Retain all stock dividends, bonuses, and capital appreciation benefits while drawing cash only when needed.'
    },
    supporting: [
      {
        img: '/images/invest-mutual.jpg',
        badge: 'MUTUAL FUNDS & ETFS',
        title: 'Digital Pledge via CAMS & KFintech',
        desc: '100% online lien marking with zero physical stamp papers or branch visits.'
      },
      {
        img: '/images/guide-score.jpg',
        badge: 'INTEREST ONLY ON DRAWN AMOUNT',
        title: 'Revolving Overdraft Facility',
        desc: 'Only pay interest on the exact rupees you withdraw, calculated on a daily balance basis.'
      },
      {
        img: '/images/profile-selfemployed.jpg',
        badge: 'PRESERVE COMPOUNDING',
        title: 'Avoid Capital Gains Tax',
        desc: 'Zero trigger of short-term or long-term capital gains tax since no shares or funds are sold.'
      }
    ]
  },

  'debt-consolidation-loan': {
    eyebrow: 'Financial Restructuring',
    heading: 'Unify multiple stressful loans into a single, low-interest EMI',
    description: 'Eliminate 36%+ credit card dues and scattered peer loans. Consolidate your monthly obligations into one peaceful payment with interest rates from 9.99% to 30.00% p.a.',
    featured: {
      img: '/images/loan-consolidation.jpg',
      tag: 'FINANCIAL RELIEF',
      title: 'Cut Total Monthly Outflow by up to 40%',
      desc: 'Replace chaotic due dates and compounding penalty fees with one unified, structured, low-rate installment.'
    },
    supporting: [
      {
        img: '/images/guide-emi.jpg',
        badge: 'LOWER MONTHLY EMI',
        title: 'Structured Single Payment Schedule',
        desc: 'One fixed calendar date per month makes budget tracking crystal clear and predictable.'
      },
      {
        img: '/images/invest-scheme.jpg',
        badge: 'CREDIT SCORE BOOST',
        title: 'Rapid CIBIL Rating Recovery',
        desc: 'Clearing high credit card utilization instantly rejuvenates your credit score.'
      },
      {
        img: '/images/personal-loan-hero.jpg',
        badge: 'ZERO STRESS',
        title: 'Direct Lender Settlement',
        desc: 'We can transfer funds directly to close your existing high-cost cards and loans.'
      }
    ]
  },

  'easy-emi-loan': {
    eyebrow: 'Smart Everyday Financing',
    heading: 'Split appliances, gadgets & lifestyle expenses into easy monthly EMIs',
    description: 'Upgrade your home with latest smart TVs, laptops, modular interiors, and appliances without denting your monthly household savings.',
    featured: {
      img: '/images/loan-easyemi.jpg',
      tag: 'EASY LIVING',
      title: 'Upgrade Your Home Appliances & Smart Tech',
      desc: 'Enjoy modern living standards today with zero-cost EMI schemes and minimal processing fees across top retail brands.'
    },
    supporting: [
      {
        img: '/images/purpose-renovation.jpg',
        badge: 'HOME APPLIANCES',
        title: 'Kitchen, Electronics & Climate Control',
        desc: 'Air conditioners, refrigerators, sound systems, and laptops with flexible tenures.'
      },
      {
        img: '/images/story-twowheeler-loan.jpg',
        badge: 'ZERO HIDDEN CHARGES',
        title: 'Transparent Monthly Slabs',
        desc: 'Clear upfront terms with no surprise annual fees or prepayment penalties.'
      },
      {
        img: '/images/profile-salaried.jpg',
        badge: 'INSTANT CHECKOUT',
        title: 'Virtual Card & Pre-Approved Credit',
        desc: 'Tap and pay or checkout online seamlessly on partnered e-commerce platforms.'
      }
    ]
  }
};

export default loanGalleries;
