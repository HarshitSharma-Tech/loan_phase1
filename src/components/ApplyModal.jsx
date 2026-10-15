import React, { useState } from 'react';

export default function ApplyModal({ isOpen, onClose, defaultProduct }) {
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

  return (
    <div className="modal-drawer active" id="applyModal" role="dialog" aria-modal="true">
      <div className="modal-backdrop" onClick={handleClose}></div>
      <div className="modal-sheet">
        <button className="modal-close" onClick={handleClose} aria-label="Close modal">✕</button>

        <div className="modal-header">
          <span className="eyebrow">DIGITAL JOURNEY</span>
          <h3 id="modalProductTitle" style={{ fontSize: '1.45rem', marginTop: '6px' }}>
            Apply for Finora {defaultProduct || 'Loan'}
          </h3>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
            Check your pre-approved lender offers with soft credit inquiry. Zero score impact.
          </p>
        </div>

        {!submitted ? (
          <form id="quickApplyForm" className="modal-form" onSubmit={handleSubmit}>
            <div className="modal-input-group">
              <label htmlFor="applicantName">Full Name (as per PAN)</label>
              <input 
                id="applicantName" 
                type="text" 
                required 
                placeholder="e.g. Rahul Sharma"
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            <div className="modal-input-group">
              <label htmlFor="applicantPhone">Mobile Number (Aadhaar Linked)</label>
              <input 
                id="applicantPhone" 
                type="tel" 
                required 
                pattern="[0-9]{10}" 
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="modal-input-group">
              <label htmlFor="applicantEmail">Work / Personal Email</label>
              <input 
                id="applicantEmail" 
                type="email" 
                required 
                placeholder="name@company.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="modal-input-group">
              <label htmlFor="applicantIncome">Net Monthly In-Hand Salary (₹)</label>
              <input 
                id="applicantIncome" 
                type="number" 
                required 
                placeholder="e.g. 55000"
                value={formData.income}
                onChange={e => setFormData({ ...formData, income: e.target.value })}
              />
            </div>

            <div className="modal-input-group">
              <label htmlFor="applicantCity">Current Residential City</label>
              <input 
                id="applicantCity" 
                type="text" 
                required 
                placeholder="e.g. Mumbai, Bengaluru, Delhi NCR"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px', justifyContent: 'center' }}>
              Check Pre-Approved Offers ↗
            </button>
            <p style={{ fontSize: '0.72rem', color: 'var(--slate-400)', marginTop: '10px', textAlign: 'center' }}>
              By proceeding, you consent to our privacy policy and credit assessment contact.
            </p>
          </form>
        ) : (
          <div className="modal-success-screen active" id="modalSuccessScreen">
            <div className="success-icon-ring">✓</div>
            <h3 style={{ color: '#0A1C3E', fontSize: '1.35rem', marginBottom: '8px' }}>Eligibility Enquiry Received!</h3>
            <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.5' }}>
              Thank you, {formData.fullName || 'Valued Client'}! Based on your income profile, you are tentatively eligible for preliminary offers. A Finora relationship advisor will reach out shortly.
            </p>
            <button type="button" className="btn btn-outline btn-small" onClick={handleClose} style={{ marginTop: '14px' }}>
              Close window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
