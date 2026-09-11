import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { Menu, X, ChevronDown, Calendar, Hotel, CheckCircle, Mail, MapPin, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView, sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [functionsDropdownOpen, setFunctionsDropdownOpen] = useState(false);
  const [accommodationsDropdownOpen, setAccommodationsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageView, sectionId?: string) => {
    setMobileMenuOpen(false);
    setFunctionsDropdownOpen(false);
    setAccommodationsDropdownOpen(false);
    onNavigate(page, sectionId);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-white border-b border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <div className="flex-shrink-0">
            <button
              id="nav-logo-btn"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 group text-left transition-transform duration-200 hover:scale-[1.01]"
            >
              <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 font-bold text-sm tracking-wider">
                40
              </div>
              <div>
                <span className="block text-xs uppercase tracking-[0.25em] text-gray-400 font-semibold">
                  Molly Ore Celebration
                </span>
                <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-gray-900 group-hover:text-amber-600 transition-colors">
                  COUNTDOWN TO BIG 40
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <button
              id="nav-home-btn"
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                currentPage === 'home'
                  ? 'text-amber-600 font-semibold'
                  : 'text-gray-700 hover:text-amber-600 hover:bg-gray-50'
              }`}
            >
              Home
            </button>

            <button
              id="nav-destination-btn"
              onClick={() => handleNavClick('home', 'destination-section')}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors rounded-md"
            >
              Destination
            </button>

            {/* Functions Dropdown */}
            <div className="relative group">
              <button
                id="nav-functions-dropdown"
                onMouseEnter={() => setFunctionsDropdownOpen(true)}
                onClick={() => setFunctionsDropdownOpen(!functionsDropdownOpen)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors rounded-md"
              >
                <span>Functions</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>

              <div
                onMouseLeave={() => setFunctionsDropdownOpen(false)}
                className={`absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 transition-all duration-200 z-50 ${
                  functionsDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'
                }`}
              >
                <button
                  id="nav-nightlife-link"
                  onClick={() => handleNavClick('home', 'nightlife-section')}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Nightclubs & Clubs</span>
                </button>
                <button
                  id="nav-beachclubs-link"
                  onClick={() => handleNavClick('home', 'beach-clubs-section')}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-sky-500" />
                  <span>Beach Clubs</span>
                </button>
                <button
                  id="nav-itinerary-link"
                  onClick={() => handleNavClick('home', 'itinerary-section')}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  <span>Event Itinerary</span>
                </button>
              </div>
            </div>

            {/* Accommodations & Logistics Dropdown */}
            <div className="relative group">
              <button
                id="nav-accommodations-dropdown"
                onMouseEnter={() => setAccommodationsDropdownOpen(true)}
                onClick={() => setAccommodationsDropdownOpen(!accommodationsDropdownOpen)}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  currentPage === 'hotel-tickets'
                    ? 'text-amber-600 font-semibold'
                    : 'text-gray-700 hover:text-amber-600 hover:bg-gray-50'
                }`}
              >
                <span>Accommodations & Logistics</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>

              <div
                onMouseLeave={() => setAccommodationsDropdownOpen(false)}
                className={`absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 transition-all duration-200 z-50 ${
                  accommodationsDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'
                }`}
              >
                <button
                  id="nav-hotel-overview-link"
                  onClick={() => handleNavClick('home', 'accommodations-section')}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                >
                  Hotel & Logistics Overview
                </button>
                <button
                  id="nav-hotel-tickets-link"
                  onClick={() => handleNavClick('hotel-tickets')}
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-amber-600 bg-amber-50/50 hover:bg-amber-50 hover:text-amber-700 transition-colors flex items-center justify-between"
                >
                  <span>Book Hotel Tickets</span>
                  <Hotel className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              id="nav-rsvp-page-btn"
              onClick={() => handleNavClick('rsvp')}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md relative ${
                currentPage === 'rsvp'
                  ? 'text-amber-600 font-semibold'
                  : 'text-gray-700 hover:text-amber-600 hover:bg-gray-50'
              }`}
            >
              RSVP
              <span className="ml-1.5 inline-flex items-center px-1.5 py-0.2 text-[10px] font-semibold bg-amber-100 text-amber-800 rounded-full">
                55 Going
              </span>
            </button>

            <button
              id="nav-contacts-btn"
              onClick={() => handleNavClick('home', 'contacts-section')}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors rounded-md"
            >
              Contacts
            </button>

            {/* Quick Action Button */}
            <button
              id="nav-quick-rsvp-btn"
              onClick={() => handleNavClick('rsvp')}
              className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-semibold tracking-wider uppercase rounded-full shadow-sm shadow-amber-500/20 transition-all hover:scale-105"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Confirm RSVP</span>
            </button>
          </nav>

          {/* Mobile hamburger toggle */}
          <div className="flex lg:hidden items-center">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-xl px-4 pt-3 pb-6 space-y-1 divide-y divide-gray-100">
          <div className="space-y-1 pb-3">
            <button
              id="mobile-nav-home"
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3 py-2.5 rounded-md text-base font-medium ${
                currentPage === 'home' ? 'bg-amber-50 text-amber-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Home
            </button>
            <button
              id="mobile-nav-destination"
              onClick={() => handleNavClick('home', 'destination-section')}
              className="w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Destination
            </button>
            <button
              id="mobile-nav-itinerary"
              onClick={() => handleNavClick('home', 'itinerary-section')}
              className="w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Itinerary
            </button>
            <button
              id="mobile-nav-nightlife"
              onClick={() => handleNavClick('home', 'nightlife-section')}
              className="w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Nightlife & Beach Clubs
            </button>
            <button
              id="mobile-nav-logistics"
              onClick={() => handleNavClick('home', 'accommodations-section')}
              className="w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Accommodations & Logistics
            </button>
            <button
              id="mobile-nav-contacts"
              onClick={() => handleNavClick('home', 'contacts-section')}
              className="w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Contacts & Visa Info
            </button>
          </div>

          <div className="pt-3 space-y-2">
            <p className="px-3 text-xs uppercase tracking-wider font-semibold text-gray-400">
              Dedicated Pages
            </p>
            <button
              id="mobile-nav-rsvp-page"
              onClick={() => handleNavClick('rsvp')}
              className={`w-full text-left px-3 py-2.5 rounded-md text-base font-medium flex items-center justify-between ${
                currentPage === 'rsvp' ? 'bg-amber-100 text-amber-900 font-semibold' : 'bg-gray-50 text-gray-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-amber-600" />
                RSVP Attendance
              </span>
              <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-semibold">55 Going</span>
            </button>

            <button
              id="mobile-nav-tickets-page"
              onClick={() => handleNavClick('hotel-tickets')}
              className={`w-full text-left px-3 py-2.5 rounded-md text-base font-medium flex items-center justify-between ${
                currentPage === 'hotel-tickets' ? 'bg-amber-100 text-amber-900 font-semibold' : 'bg-gray-50 text-gray-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <Hotel className="w-5 h-5 text-amber-600" />
                Hotel Tickets & Booking
              </span>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">From €182</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
