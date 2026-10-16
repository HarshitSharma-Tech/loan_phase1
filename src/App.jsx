import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ApplyModal from './components/ApplyModal.jsx';
import Home from './pages/Home.jsx';
import LoanDetail from './pages/LoanDetail.jsx';
import ArticleDetail from './pages/ArticleDetail.jsx';
import Blog from './pages/Blog.jsx';

// Route wrapper that syncs active i18n language based on URL prefix (/hi, /pa, /en)
function LanguageSyncWrapper({ lang }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return <Outlet />;
}

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
    <div className="finora-app loan-aasra-app">
      <ScrollToTop />
      <Navbar onOpenApplyModal={handleOpenApplyModal} />
      
      <Routes>
        {/* Localized routes: Hindi (/hi) */}
        <Route path="/hi" element={<LanguageSyncWrapper lang="hi" />}>
          <Route index element={<Home onOpenApplyModal={handleOpenApplyModal} />} />
          <Route path="blog" element={<Blog onOpenApplyModal={handleOpenApplyModal} />} />
          <Route path="blog/:slug" element={<ArticleDetail onOpenApplyModal={handleOpenApplyModal} />} />
          <Route path=":slug" element={<LoanDetail onOpenApplyModal={handleOpenApplyModal} />} />
        </Route>

        {/* Localized routes: Punjabi (/pa) */}
        <Route path="/pa" element={<LanguageSyncWrapper lang="pa" />}>
          <Route index element={<Home onOpenApplyModal={handleOpenApplyModal} />} />
          <Route path="blog" element={<Blog onOpenApplyModal={handleOpenApplyModal} />} />
          <Route path="blog/:slug" element={<ArticleDetail onOpenApplyModal={handleOpenApplyModal} />} />
          <Route path=":slug" element={<LoanDetail onOpenApplyModal={handleOpenApplyModal} />} />
        </Route>

        {/* Localized routes: Explicit English (/en) */}
        <Route path="/en" element={<LanguageSyncWrapper lang="en" />}>
          <Route index element={<Home onOpenApplyModal={handleOpenApplyModal} />} />
          <Route path="blog" element={<Blog onOpenApplyModal={handleOpenApplyModal} />} />
          <Route path="blog/:slug" element={<ArticleDetail onOpenApplyModal={handleOpenApplyModal} />} />
          <Route path=":slug" element={<LoanDetail onOpenApplyModal={handleOpenApplyModal} />} />
        </Route>

        {/* Default standard root routes */}
        <Route path="/" element={<Home onOpenApplyModal={handleOpenApplyModal} />} />
        <Route path="/blog" element={<Blog onOpenApplyModal={handleOpenApplyModal} />} />
        <Route path="/blog/:slug" element={<ArticleDetail onOpenApplyModal={handleOpenApplyModal} />} />
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
