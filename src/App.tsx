/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageView } from './types';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { RsvpPage } from './components/RsvpPage';
import { HotelTicketsPage } from './components/HotelTicketsPage';
import { Footer } from './components/Footer';
import { VisaModal } from './components/VisaModal';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [isVisaModalOpen, setIsVisaModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: PageView, sectionId?: string) => {
    setCurrentPage(page);
    if (page === 'home' && sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Top Fixed / Sticky Navigation Bar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Content */}
      <div className="flex-1 w-full">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenVisaModal={() => setIsVisaModalOpen(true)}
          />
        )}
        {currentPage === 'rsvp' && (
          <RsvpPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'hotel-tickets' && (
          <HotelTicketsPage onNavigate={handleNavigate} />
        )}
      </div>

      {/* Shared Footer with Quick Links and Ayia Napa Map */}
      <Footer onNavigate={handleNavigate} />

      {/* Cyprus Visa Information Dialog */}
      <VisaModal
        isOpen={isVisaModalOpen}
        onClose={() => setIsVisaModalOpen(false)}
      />

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          id="back-to-top-btn"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-gray-900/90 text-amber-400 hover:bg-black hover:text-amber-300 shadow-xl border border-amber-400/40 transition-all duration-300 hover:scale-110"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

