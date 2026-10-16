import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ApplyModal({ isOpen, onClose, defaultProduct }) {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    income: '',
    city: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({ fullName: '', phone: '', email: '', income: '', city: '' });
    onClose();
  };

  const productTitle = defaultProduct || 'Personal Loan';

  return (
    <div className="modal-drawer active" id="applyModal" role="dialog" aria-modal="true">
      <div className="modal-backdrop" onClick={handleClose}></div>
      <div className="modal-sheet">
        <button className="modal-close" onClick={handleClose} aria-label={t('common.close', 'Close')}>✕</button>

        <div className="modal-header">
          <span className="eyebrow">{t('applyModal.eyebrow', 'DIGITAL JOURNEY')}</span>
          <h3 id="modalProductTitle" style={{ fontSize: '1.45rem', marginTop: '6px' }}>
            {t('applyModal.title', { product: `Loan Aasra ${productTitle}` })}
          </h3>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
            {t('applyModal.subtitle', 'Discover verified offers from 30+ RBI-regulated lenders. Zero impact on CIBIL score.')}
          </p>
        </div>

        {!submitted ? (
          <form id="quickApplyForm" className="modal-form" onSubmit={handleSubmit}>
            <div className="modal-input-group">
              <label htmlFor="applicantName">{t('applyModal.fullName', 'Full Name')}</label>
              <input 
                id="applicantName" 
                type="text" 
                required 
                placeholder={t('applyModal.fullNamePlaceholder', 'e.g. Rahul Sharma')}
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            <div className="modal-input-group">
              <label htmlFor="applicantPhone">{t('applyModal.mobile', 'Mobile Number')}</label>
              <input 
                id="applicantPhone" 
                type="tel" 
                required 
                pattern="[0-9]{10}" 
                placeholder={t('applyModal.mobilePlaceholder', '10-digit mobile number')}
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="modal-input-group">
              <label htmlFor="applicantEmail">{t('applyModal.email', 'Work / Personal Email')}</label>
              <input 
                id="applicantEmail" 
                type="email" 
                required 
                placeholder={t('applyModal.emailPlaceholder', 'name@company.com')}
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="modal-input-group">
              <label htmlFor="applicantIncome">{t('applyModal.income', 'Monthly Net Take-Home Income (₹)')}</label>
              <input 
                id="applicantIncome" 
                type="number" 
                required 
                placeholder="55000"
                value={formData.income}
                onChange={e => setFormData({ ...formData, income: e.target.value })}
              />
            </div>

            <div className="modal-input-group">
              <label htmlFor="applicantCity">{t('applyModal.city', 'City / Location')}</label>
              <input 
                id="applicantCity" 
                type="text" 
                required 
                placeholder={t('applyModal.cityPlaceholder', 'e.g. Mumbai, Chandigarh, Delhi NCR')}
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px', justifyContent: 'center' }}>
              {t('applyModal.submit', 'Get Verified Loan Offers ↗')}
            </button>
            <p style={{ fontSize: '0.74rem', color: 'var(--slate-500)', marginTop: '10px', textAlign: 'center' }}>
              {t('applyModal.privacyNotice', '🔒 Your details are encrypted with 256-bit SSL. We never sell your personal information or spam your phone.')}
            </p>
          </form>
        ) : (
          <div className="modal-success-screen active" id="modalSuccessScreen">
            <div className="success-icon-ring">✓</div>
            <h3 style={{ color: '#0A1C3E', fontSize: '1.35rem', marginBottom: '8px' }}>
              {t('applyModal.successTitle', 'Application Received Successfully!')}
            </h3>
            <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.5' }}>
              {t('applyModal.successMessage', 'Thank you for trusting Loan Aasra. A certified relationship advisor will review your eligibility and reach out shortly with customized loan quotes.')}
            </p>
            <button type="button" className="btn btn-outline btn-small" onClick={handleClose} style={{ marginTop: '14px' }}>
              {t('applyModal.closeBtn', 'Done')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
