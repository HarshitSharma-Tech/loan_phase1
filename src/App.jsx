import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ApplyModal from './components/ApplyModal.jsx';
import Home from './pages/Home.jsx';
import LoanDetail from './pages/LoanDetail.jsx';
import ArticleDetail from './pages/ArticleDetail.jsx';
import Blog from './pages/Blog.jsx';

// Automatically scroll to top or target hash when navigating between pages/routes
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // If there's a hash, give a tick for DOM rendering then smooth scroll to it
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      // Otherwise immediately scroll to top of page
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

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
      <ScrollToTop />
      <Navbar onOpenApplyModal={handleOpenApplyModal} />
      
      <Routes>
        <Route path="/" element={<Home onOpenApplyModal={handleOpenApplyModal} />} />
        <Route path="/blog" element={<Blog onOpenApplyModal={handleOpenApplyModal} />} />
        <Route path="/blog/:slug" element={<ArticleDetail onOpenApplyModal={handleOpenApplyModal} />} />
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
