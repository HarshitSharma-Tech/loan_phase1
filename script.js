/**
 * Finora - Financial Platform Interactive Scripts
 * Simple, fast, accessible calculations & user interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Format Indian Rupees (e.g. ₹5,00,000)
  const rupees = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(Math.round(num));
  };

  const formatPercent = (num) => {
    return num.toLocaleString('en-IN', { maximumFractionDigits: 2 }) + '%';
  };

  // =========================================================================
  // Main EMI Calculator
  // =========================================================================
  const amountSlider = document.getElementById('loanAmount');
  const interestSlider = document.getElementById('interest');
  const tenureSlider = document.getElementById('tenure');

  const amountOut = document.getElementById('amountOut');
  const interestOut = document.getElementById('interestOut');
  const tenureOut = document.getElementById('tenureOut');
  const emiOut = document.getElementById('emiOut');
  const totalInterestOut = document.getElementById('totalInterest');
  const totalPaymentOut = document.getElementById('totalPayment');

  const principalFill = document.getElementById('principalFill');
  const interestFill = document.getElementById('interestFill');
  const principalRatio = document.getElementById('principalRatio');
  const interestRatio = document.getElementById('interestRatio');

  // Update Slider Track Gradient Fill
  function updateSliderFill(slider) {
    if (!slider) return;
    const min = parseFloat(slider.min) || 0;
    const max = parseFloat(slider.max) || 100;
    const val = parseFloat(slider.value) || 0;
    const percentage = ((val - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #D97706 0%, #F59E0B ${percentage}%, #E2E8F0 ${percentage}%, #E2E8F0 100%)`;
  }

  // Calculate & Update EMI
  function updateEmi() {
    if (!amountSlider || !interestSlider || !tenureSlider) return;

    const principal = Number(amountSlider.value);
    const annualRate = Number(interestSlider.value);
    const years = Number(tenureSlider.value);
    const months = years * 12;
    const monthlyRate = annualRate / 1200;

    let emi = 0;
    if (monthlyRate === 0) {
      emi = principal / months;
    } else {
      emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPayment = emi * months;
    const totalInterest = Math.max(0, totalPayment - principal);

    // Update Text Displays
    if (amountOut) amountOut.textContent = rupees(principal);
    if (interestOut) interestOut.textContent = formatPercent(annualRate);
    if (tenureOut) tenureOut.textContent = years + (years === 1 ? ' year' : ' years');

    if (emiOut) emiOut.textContent = rupees(emi);
    if (totalInterestOut) totalInterestOut.textContent = rupees(totalInterest);
    if (totalPaymentOut) totalPaymentOut.textContent = rupees(totalPayment);

    // Update Slider track visual fills
    updateSliderFill(amountSlider);
    updateSliderFill(interestSlider);
    updateSliderFill(tenureSlider);

    // Update Linear Breakdown Bar
    if (totalPayment > 0) {
      const principalPct = Math.round((principal / totalPayment) * 100);
      const interestPct = 100 - principalPct;
      if (principalFill) principalFill.style.width = `${principalPct}%`;
      if (interestFill) interestFill.style.width = `${interestPct}%`;
      if (principalRatio) principalRatio.textContent = `Principal: ${principalPct}%`;
      if (interestRatio) interestRatio.textContent = `Interest: ${interestPct}%`;
    }
  }

  [amountSlider, interestSlider, tenureSlider].forEach(slider => {
    if (slider) {
      slider.addEventListener('input', updateEmi);
    }
  });

  // Preset Chips for Main Calculator
  const presetChips = document.querySelectorAll('.preset-chip');
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      presetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const val = chip.getAttribute('data-value');
      if (val && amountSlider) {
        amountSlider.value = val;
        updateEmi();
      }
    });
  });

  // Initial calculation
  updateEmi();

  // =========================================================================
  // Hero Interactive Loan Calculator Snapshot
  // =========================================================================
  const heroAmount = document.getElementById('heroAmount');
  const heroTenure = document.getElementById('heroTenure');
  const heroRate = document.getElementById('heroRate');

  const heroAmountOut = document.getElementById('heroAmountOut');
  const heroTenureOut = document.getElementById('heroTenureOut');
  const heroRateOut = document.getElementById('heroRateOut');
  const heroEmiOut = document.getElementById('heroEmiOut');
  const heroTotalInterest = document.getElementById('heroTotalInterest');
  const heroTotalPayment = document.getElementById('heroTotalPayment');

  function updateHeroEmi() {
    if (!heroAmount || !heroTenure || !heroRate) return;

    const principal = Number(heroAmount.value);
    const annualRate = Number(heroRate.value);
    const years = Number(heroTenure.value);
    const months = years * 12;
    const monthlyRate = annualRate / 1200;

    let emi = 0;
    if (monthlyRate === 0) {
      emi = principal / months;
    } else {
      emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    }

    const total = emi * months;
    const totalInterest = Math.max(0, total - principal);

    if (heroAmountOut) heroAmountOut.textContent = rupees(principal);
    if (heroTenureOut) heroTenureOut.textContent = years + (years === 1 ? ' year' : ' years');
    if (heroRateOut) heroRateOut.textContent = formatPercent(annualRate);
    if (heroEmiOut) heroEmiOut.textContent = rupees(emi);
    if (heroTotalInterest) heroTotalInterest.textContent = rupees(totalInterest);
    if (heroTotalPayment) heroTotalPayment.textContent = rupees(total);

    updateSliderFill(heroAmount);
    updateSliderFill(heroTenure);
    updateSliderFill(heroRate);
  }

  if (heroAmount && heroTenure && heroRate) {
    [heroAmount, heroTenure, heroRate].forEach(el => el.addEventListener('input', updateHeroEmi));

    const heroPresets = document.querySelectorAll('.hero-preset-btn');
    heroPresets.forEach(btn => {
      btn.addEventListener('click', () => {
        heroPresets.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const val = btn.getAttribute('data-val');
        if (val) {
          heroAmount.value = val;
          updateHeroEmi();
        }
      });
    });

    updateHeroEmi();
  }

  // =========================================================================
  // Mobile Navigation Drawer Toggle & Accessibility
  // =========================================================================
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.textContent = isOpen ? '✕' : '☰';
      if (isOpen) {
        const firstLink = mainNav.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
      });
    });
  }

  // =========================================================================
  // Header Elevation on Scroll
  // =========================================================================
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }, { passive: true });

  // =========================================================================
  // Category Filter for Loan Products
  // =========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // =========================================================================
  // FAQ Accordion Interaction
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });

  // =========================================================================
  // Contact Form Submission (Accessible Inline Confirmation)
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('fullName');
      const loanTypeInput = document.getElementById('loanType');
      const name = nameInput ? nameInput.value.trim() : 'Valued Client';
      const loanType = loanTypeInput ? loanTypeInput.value : 'Finora Loan';

      formMessage.className = 'toast-msg success';
      formMessage.innerHTML = `✓ Thank you, <strong>${escapeHtml(name)}</strong>! Your sample enquiry for <em>${escapeHtml(loanType)}</em> has been recorded. Our financial advisor will connect shortly.`;
      formMessage.style.display = 'block';

      contactForm.reset();

      setTimeout(() => {
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
});
