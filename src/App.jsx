import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ApplyModal from './components/ApplyModal.jsx';
import Home from './pages/Home.jsx';
import LoanDetail from './pages/LoanDetail.jsx';

export default function App() {
  const [modalState, setModalState] = useState({ isOpen: false, product: 'Personal Loan' });

  const handleOpenApplyModal = (productName) => {
    setModalState({ isOpen: true, product: productName || 'Personal Loan' });
  };

  const handleCloseApplyModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="finora-app">
      <Navbar onOpenApplyModal={handleOpenApplyModal} />
      
      <Routes>
        <Route path="/" element={<Home onOpenApplyModal={handleOpenApplyModal} />} />
        {/* Support both slug and slug.html for direct link integrity */}
        <Route path="/:slug" element={<LoanDetail onOpenApplyModal={handleOpenApplyModal} />} />
      </Routes>

      <Footer onOpenApplyModal={handleOpenApplyModal} />

      <ApplyModal 
        isOpen={modalState.isOpen} 
        onClose={handleCloseApplyModal} 
        defaultProduct={modalState.product} 
      />
    </div>
  );
}
