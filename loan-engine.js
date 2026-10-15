/**
 * FINORA — Loan Product Engine & Interactive System
 * Validated Indian banking formulas, product-specific calculators, and UI interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Indian Rupee formatting (e.g. ₹5,00,000)
  const rupees = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(Math.round(num || 0));
  };

  const formatPercent = (num) => {
    return Number(num || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + '%';
  };

  // Dynamic Slider Track Gradient Fill
  const updateSliderFill = (slider) => {
    if (!slider) return;
    const min = parseFloat(slider.min) || 0;
    const max = parseFloat(slider.max) || 100;
    const val = parseFloat(slider.value) || 0;
    const pct = ((val - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #D97706 0%, #F59E0B ${pct}%, #E2E8F0 ${pct}%, #E2E8F0 100%)`;
  };

  // Standard Reducing Balance EMI Formula
  const calculateEmi = (principal, annualRate, tenureMonths) => {
    if (!principal || !tenureMonths || tenureMonths <= 0) return 0;
    const monthlyRate = annualRate / 1200;
    if (monthlyRate === 0) return principal / tenureMonths;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  };

  // =========================================================================
  // Product-Specific Calculator Setup
  // =========================================================================
  const calcContainer = document.querySelector('[data-loan-calculator]');
  if (calcContainer) {
    const loanType = calcContainer.getAttribute('data-loan-calculator');

    // Generic outputs
    const emiOut = document.getElementById('calcEmiOut');
    const totalInterestOut = document.getElementById('calcTotalInterest');
    const totalPaymentOut = document.getElementById('calcTotalPayment');
    const metric3Label = document.getElementById('calcMetric3Label');
    const metric3Val = document.getElementById('calcMetric3Val');

    // 1. Personal Loan, Insta Personal Loan, Business Loan, Medical Loan
    if (['personal', 'insta', 'business', 'medical'].includes(loanType)) {
      const amountSlider = document.getElementById('calcAmount');
      const tenureSlider = document.getElementById('calcTenure');
      const rateSlider = document.getElementById('calcRate');

      const amountOut = document.getElementById('calcAmountOut');
      const tenureOut = document.getElementById('calcTenureOut');
      const rateOut = document.getElementById('calcRateOut');

      function refreshStandardCalc() {
        if (!amountSlider || !tenureSlider || !rateSlider) return;
        const p = Number(amountSlider.value);
        const y = Number(tenureSlider.value);
        const r = Number(rateSlider.value);
        const m = y * 12;

        const emi = calculateEmi(p, r, m);
        const total = emi * m;
        const interest = Math.max(0, total - p);

        if (amountOut) amountOut.textContent = rupees(p);
        if (tenureOut) tenureOut.textContent = y + (y === 1 ? ' year' : ' years') + ` (${m} mos)`;
        if (rateOut) rateOut.textContent = formatPercent(r);

        if (emiOut) emiOut.textContent = rupees(emi);
        if (totalInterestOut) totalInterestOut.textContent = rupees(interest);
        if (totalPaymentOut) totalPaymentOut.textContent = rupees(total);

        updateSliderFill(amountSlider);
        updateSliderFill(tenureSlider);
        updateSliderFill(rateSlider);
      }

      [amountSlider, tenureSlider, rateSlider].forEach(s => {
        if (s) s.addEventListener('input', refreshStandardCalc);
      });
      refreshStandardCalc();

    // 2. Home Loan with Tax Saving Preview
    } else if (loanType === 'home') {
      const amountSlider = document.getElementById('calcAmount');
      const tenureSlider = document.getElementById('calcTenure');
      const rateSlider = document.getElementById('calcRate');

      const amountOut = document.getElementById('calcAmountOut');
      const tenureOut = document.getElementById('calcTenureOut');
      const rateOut = document.getElementById('calcRateOut');

      function refreshHomeCalc() {
        if (!amountSlider || !tenureSlider || !rateSlider) return;
        const p = Number(amountSlider.value);
        const y = Number(tenureSlider.value);
        const r = Number(rateSlider.value);
        const m = y * 12;

        const emi = calculateEmi(p, r, m);
        const total = emi * m;
        const interest = Math.max(0, total - p);
        const annualInterestFirstYr = Math.min(200000, (p * (r / 100)));
        const estTaxBenefit = rupees(annualInterestFirstYr * 0.30); // 30% tax bracket saving

        if (amountOut) amountOut.textContent = rupees(p);
        if (tenureOut) tenureOut.textContent = y + ' years' + ` (${m} mos)`;
        if (rateOut) rateOut.textContent = formatPercent(r);

        if (emiOut) emiOut.textContent = rupees(emi);
        if (totalInterestOut) totalInterestOut.textContent = rupees(interest);
        if (totalPaymentOut) totalPaymentOut.textContent = rupees(total);
        if (metric3Label) metric3Label.textContent = 'Est. Annual Tax Saving (Sec 24b)';
        if (metric3Val) metric3Val.textContent = estTaxBenefit;

        updateSliderFill(amountSlider);
        updateSliderFill(tenureSlider);
        updateSliderFill(rateSlider);
      }

      [amountSlider, tenureSlider, rateSlider].forEach(s => {
        if (s) s.addEventListener('input', refreshHomeCalc);
      });
      refreshHomeCalc();

    // 3. Loan Against Property (LAP)
    } else if (loanType === 'property') {
      const propertyValSlider = document.getElementById('calcPropVal');
      const ltvSlider = document.getElementById('calcLtv');
      const tenureSlider = document.getElementById('calcTenure');

      const propValOut = document.getElementById('calcPropValOut');
      const ltvOut = document.getElementById('calcLtvOut');
      const tenureOut = document.getElementById('calcTenureOut');

      function refreshLapCalc() {
        if (!propertyValSlider || !ltvSlider || !tenureSlider) return;
        const propVal = Number(propertyValSlider.value);
        const ltv = Number(ltvSlider.value);
        const y = Number(tenureSlider.value);
        const m = y * 12;
        const r = 9.25; // standard LAP interest

        const sanctioned = (propVal * ltv) / 100;
        const emi = calculateEmi(sanctioned, r, m);
        const total = emi * m;
        const interest = Math.max(0, total - sanctioned);

        if (propValOut) propValOut.textContent = rupees(propVal);
        if (ltvOut) ltvOut.textContent = ltv + '% LTV';
        if (tenureOut) tenureOut.textContent = y + ' years';

        if (emiOut) emiOut.textContent = rupees(emi);
        if (totalInterestOut) totalInterestOut.textContent = rupees(sanctioned);
        if (totalPaymentOut) totalPaymentOut.textContent = rupees(total);
        if (metric3Label) metric3Label.textContent = 'Eligible Loan (Max LTV)';
        if (metric3Val) metric3Val.textContent = rupees(sanctioned);

        updateSliderFill(propertyValSlider);
        updateSliderFill(ltvSlider);
        updateSliderFill(tenureSlider);
      }

      [propertyValSlider, ltvSlider, tenureSlider].forEach(s => {
        if (s) s.addEventListener('input', refreshLapCalc);
      });
      refreshLapCalc();

    // 4. Gold Loan
    } else if (loanType === 'gold') {
      const weightSlider = document.getElementById('calcGoldGrams');
      const puritySelect = document.getElementById('calcGoldPurity');
      const weightOut = document.getElementById('calcGoldGramsOut');

      function refreshGoldCalc() {
        if (!weightSlider || !puritySelect) return;
        const grams = Number(weightSlider.value);
        const purityFactor = Number(puritySelect.value) || 6600; // 22K approx rate per g
        const totalGoldValue = grams * purityFactor;
        const sanctionedAmount = totalGoldValue * 0.75; // RBI max 75% LTV
        const monthlyRatePct = 0.85; // 0.85% per month
        const monthlyInterest = (sanctionedAmount * monthlyRatePct) / 100;

        if (weightOut) weightOut.textContent = `${grams} grams`;
        if (emiOut) emiOut.textContent = rupees(sanctionedAmount);
        if (totalInterestOut) totalInterestOut.textContent = rupees(monthlyInterest) + ' / mo';
        if (totalPaymentOut) totalPaymentOut.textContent = rupees(totalGoldValue);

        updateSliderFill(weightSlider);
      }

      weightSlider.addEventListener('input', refreshGoldCalc);
      puritySelect.addEventListener('change', refreshGoldCalc);
      refreshGoldCalc();

    // 5. Vehicle Financing (Car & Two-Wheeler)
    } else if (['car', 'twowheeler'].includes(loanType)) {
      const priceSlider = document.getElementById('calcVehiclePrice');
      const downPaymentSlider = document.getElementById('calcDownPayment');
      const tenureSlider = document.getElementById('calcTenure');

      const priceOut = document.getElementById('calcVehiclePriceOut');
      const downPaymentOut = document.getElementById('calcDownPaymentOut');
      const tenureOut = document.getElementById('calcTenureOut');

      function refreshVehicleCalc() {
        if (!priceSlider || !downPaymentSlider || !tenureSlider) return;
        const price = Number(priceSlider.value);
        const dpPct = Number(downPaymentSlider.value);
        const y = Number(tenureSlider.value);
        const m = y * 12;
        const r = loanType === 'car' ? 8.85 : 10.99;

        const downPaymentAmount = (price * dpPct) / 100;
        const financedAmount = Math.max(0, price - downPaymentAmount);
        const emi = calculateEmi(financedAmount, r, m);
        const total = emi * m;
        const interest = Math.max(0, total - financedAmount);

        if (priceOut) priceOut.textContent = rupees(price);
        if (downPaymentOut) downPaymentOut.textContent = `${dpPct}% (${rupees(downPaymentAmount)})`;
        if (tenureOut) tenureOut.textContent = y + (y === 1 ? ' year' : ' years');

        if (emiOut) emiOut.textContent = rupees(emi);
        if (totalInterestOut) totalInterestOut.textContent = rupees(financedAmount);
        if (totalPaymentOut) totalPaymentOut.textContent = rupees(total + downPaymentAmount);

        updateSliderFill(priceSlider);
        updateSliderFill(downPaymentSlider);
        updateSliderFill(tenureSlider);
      }

      [priceSlider, downPaymentSlider, tenureSlider].forEach(s => {
        if (s) s.addEventListener('input', refreshVehicleCalc);
      });
      refreshVehicleCalc();

    // 6. Education Loan
    } else if (loanType === 'education') {
      const amountSlider = document.getElementById('calcAmount');
      const tenureSlider = document.getElementById('calcTenure');
      const amountOut = document.getElementById('calcAmountOut');
      const tenureOut = document.getElementById('calcTenureOut');

      function refreshEduCalc() {
        if (!amountSlider || !tenureSlider) return;
        const p = Number(amountSlider.value);
        const y = Number(tenureSlider.value);
        const m = y * 12;
        const r = 9.85;

        const emi = calculateEmi(p, r, m);
        const total = emi * m;
        const interest = Math.max(0, total - p);

        if (amountOut) amountOut.textContent = rupees(p);
        if (tenureOut) tenureOut.textContent = y + ' years post-study';

        if (emiOut) emiOut.textContent = rupees(emi);
        if (totalInterestOut) totalInterestOut.textContent = rupees(interest);
        if (totalPaymentOut) totalPaymentOut.textContent = rupees(total);

        updateSliderFill(amountSlider);
        updateSliderFill(tenureSlider);
      }

      [amountSlider, tenureSlider].forEach(s => s && s.addEventListener('input', refreshEduCalc));
      refreshEduCalc();

    // 7. Loan Against Securities (LAS)
    } else if (loanType === 'securities') {
      const portfolioSlider = document.getElementById('calcPortfolio');
      const portfolioOut = document.getElementById('calcPortfolioOut');

      function refreshSecuritiesCalc() {
        if (!portfolioSlider) return;
        const val = Number(portfolioSlider.value);
        const approvedLimit = val * 0.70; // 70% average LTV
        const monthlyInterestPerLakh = (100000 * 0.09) / 12;

        if (portfolioOut) portfolioOut.textContent = rupees(val);
        if (emiOut) emiOut.textContent = rupees(approvedLimit);
        if (totalInterestOut) totalInterestOut.textContent = '₹750 / mo per ₹1L drawn';
        if (totalPaymentOut) totalPaymentOut.textContent = 'Interest only on drawn amount';

        updateSliderFill(portfolioSlider);
      }

      portfolioSlider.addEventListener('input', refreshSecuritiesCalc);
      refreshSecuritiesCalc();

    // 8. Debt Consolidation Loan
    } else if (loanType === 'consolidation') {
      const cardDebtSlider = document.getElementById('calcCardDebt');
      const plDebtSlider = document.getElementById('calcPlDebt');
      const tenureSlider = document.getElementById('calcTenure');

      const cardDebtOut = document.getElementById('calcCardDebtOut');
      const plDebtOut = document.getElementById('calcPlDebtOut');
      const tenureOut = document.getElementById('calcTenureOut');

      function refreshConsolidationCalc() {
        if (!cardDebtSlider || !plDebtSlider || !tenureSlider) return;
        const cardDebt = Number(cardDebtSlider.value);
        const plDebt = Number(plDebtSlider.value);
        const y = Number(tenureSlider.value);
        const m = y * 12;

        const totalExistingDebt = cardDebt + plDebt;
        // Old monthly payments approx: credit cards at 3.5%/month (42% APR) + PL at 18% APR
        const oldCardPayment = (cardDebt * 0.05); // 5% min due
        const oldPlEmi = calculateEmi(plDebt, 18, 36);
        const oldTotalEmi = oldCardPayment + oldPlEmi;

        // Finora consolidated at 10.99%
        const newEmi = calculateEmi(totalExistingDebt, 10.99, m);
        const monthlySaving = Math.max(0, oldTotalEmi - newEmi);

        if (cardDebtOut) cardDebtOut.textContent = rupees(cardDebt);
        if (plDebtOut) plDebtOut.textContent = rupees(plDebt);
        if (tenureOut) tenureOut.textContent = y + ' years';

        if (emiOut) emiOut.textContent = rupees(newEmi);
        if (totalInterestOut) totalInterestOut.textContent = rupees(monthlySaving) + ' / mo';
        if (totalPaymentOut) totalPaymentOut.textContent = rupees(totalExistingDebt);

        updateSliderFill(cardDebtSlider);
        updateSliderFill(plDebtSlider);
        updateSliderFill(tenureSlider);
      }

      [cardDebtSlider, plDebtSlider, tenureSlider].forEach(s => s && s.addEventListener('input', refreshConsolidationCalc));
      refreshConsolidationCalc();

    // 9. Easy EMI Loan
    } else if (loanType === 'easyemi') {
      const ticketSlider = document.getElementById('calcTicket');
      const tenureSlider = document.getElementById('calcTenure');

      const ticketOut = document.getElementById('calcTicketOut');
      const tenureOut = document.getElementById('calcTenureOut');

      function refreshEasyEmi() {
        if (!ticketSlider || !tenureSlider) return;
        const amount = Number(ticketSlider.value);
        const months = Number(tenureSlider.value);
        const zeroCostInterestRate = months <= 6 ? 0 : 12; // 0% up to 6 months
        const emi = calculateEmi(amount, zeroCostInterestRate, months);
        const total = emi * months;

        if (ticketOut) ticketOut.textContent = rupees(amount);
        if (tenureOut) tenureOut.textContent = months + ' months';

        if (emiOut) emiOut.textContent = rupees(emi);
        if (totalInterestOut) totalInterestOut.textContent = zeroCostInterestRate === 0 ? '₹0 (No-Cost EMI)' : rupees(total - amount);
        if (totalPaymentOut) totalPaymentOut.textContent = rupees(total);

        updateSliderFill(ticketSlider);
        updateSliderFill(tenureSlider);
      }

      [ticketSlider, tenureSlider].forEach(s => s && s.addEventListener('input', refreshEasyEmi));
      refreshEasyEmi();
    }

    // Preset chips trigger
    const chips = calcContainer.querySelectorAll('.calc-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const targetId = chip.getAttribute('data-target');
        const val = chip.getAttribute('data-val');
        const targetInput = document.getElementById(targetId);
        if (targetInput && val) {
          targetInput.value = val;
          targetInput.dispatchEvent(new Event('input'));
        }
      });
    });
  }

  // =========================================================================
  // Sticky In-Page Secondary Sub-Navigation with Scroll-Spy
  // =========================================================================
  const subnavLinks = document.querySelectorAll('.subnav-link');
  if (subnavLinks.length > 0) {
    const sections = Array.from(subnavLinks).map(link => {
      const id = link.getAttribute('href').replace('#', '');
      return document.getElementById(id);
    }).filter(Boolean);

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 140;
      sections.forEach((sec, idx) => {
        if (!sec) return;
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          subnavLinks.forEach(l => l.classList.remove('active'));
          if (subnavLinks[idx]) {
            subnavLinks[idx].classList.add('active');
          }
        }
      });
    }, { passive: true });
  }

  // =========================================================================
  // Mega Menu Dropdown Interaction for Desktop & Touch
  // =========================================================================
  const megaItem = document.querySelector('.nav-item.has-mega');
  if (megaItem) {
    const dropdownLink = megaItem.querySelector('.nav-link-dropdown');
    if (dropdownLink) {
      dropdownLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = megaItem.classList.toggle('open');
        dropdownLink.setAttribute('aria-expanded', String(isOpen));
      });
    }

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!megaItem.contains(e.target)) {
        if (megaItem.classList.contains('open')) {
          megaItem.classList.remove('open');
          if (dropdownLink) dropdownLink.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // Close when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && megaItem.classList.contains('open')) {
        megaItem.classList.remove('open');
        if (dropdownLink) {
          dropdownLink.setAttribute('aria-expanded', 'false');
          dropdownLink.focus();
        }
      }
    });
  }

  // =========================================================================
  // Quick Apply Modal Drawer
  // =========================================================================
  const applyModal = document.getElementById('applyModal');
  const openModalBtns = document.querySelectorAll('[data-open-modal]');
  const closeModalBtns = document.querySelectorAll('[data-close-modal]');
  const applyForm = document.getElementById('quickApplyForm');
  const successScreen = document.getElementById('modalSuccessScreen');

  const openModal = (productName) => {
    if (!applyModal) return;
    const modalProductTitle = document.getElementById('modalProductTitle');
    if (modalProductTitle && productName) {
      modalProductTitle.textContent = `Apply for Finora ${productName}`;
    }
    applyModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!applyModal) return;
    applyModal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (applyForm) {
        applyForm.reset();
        applyForm.style.display = 'block';
      }
      if (successScreen) {
        successScreen.classList.remove('active');
      }
    }, 300);
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = btn.getAttribute('data-product') || 'Personal Loan';
      openModal(product);
    });
  });

  closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));

  if (applyModal) {
    applyModal.addEventListener('click', (e) => {
      if (e.target === applyModal) closeModal();
    });
  }

  if (applyForm) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = applyForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Validating criteria...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Check Approval & Connect ↗';
        }
        applyForm.style.display = 'none';
        if (successScreen) {
          successScreen.classList.add('active');
        }
      }, 750);
    });
  }

  // =========================================================================
  // Mobile Navigation Hamburger Toggle
  // =========================================================================
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.textContent = isOpen ? '✕' : '☰';
    });
  }
});
