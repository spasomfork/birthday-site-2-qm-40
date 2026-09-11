import React from 'react';
import { PageView } from '../types';
import { MapPin, ExternalLink, Calendar, Heart, Download } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView, sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#11161d] text-gray-300 pt-12 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-gray-800/80">
          {/* Quick Links Column */}
          <div className="md:col-span-5 lg:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-4 bg-amber-500 rounded-sm"></span>
              <h3 className="text-white text-base font-semibold uppercase tracking-wider">
                Quick Links
              </h3>
            </div>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <button
                  id="footer-link-home"
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-2"
                >
                  <span className="text-gray-600">›</span> Home
                </button>
              </li>
              <li>
                <button
                  id="footer-link-destination"
                  onClick={() => onNavigate('home', 'destination-section')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-2"
                >
                  <span className="text-gray-600">›</span> Destination
                </button>
              </li>
              <li>
                <button
                  id="footer-link-functions"
                  onClick={() => onNavigate('home', 'nightlife-section')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-2"
                >
                  <span className="text-gray-600">›</span> Functions
                </button>
              </li>
              <li>
                <button
                  id="footer-link-nightlife"
                  onClick={() => onNavigate('home', 'nightlife-section')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-2"
                >
                  <span className="text-gray-600">›</span> Nightlife
                </button>
              </li>
              <li>
                <button
                  id="footer-link-itinerary"
                  onClick={() => onNavigate('home', 'itinerary-section')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-2"
                >
                  <span className="text-gray-600">›</span> Itinerary
                </button>
              </li>
              <li>
                <button
                  id="footer-link-accommodations"
                  onClick={() => onNavigate('home', 'accommodations-section')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-2"
                >
                  <span className="text-gray-600">›</span> Accommodations and Logistics
                </button>
              </li>
              <li>
                <button
                  id="footer-link-health"
                  onClick={() => onNavigate('home', 'health-safety-section')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-2"
                >
                  <span className="text-gray-600">›</span> Health and Safety
                </button>
              </li>
              <li>
                <button
                  id="footer-link-rsvp"
                  onClick={() => onNavigate('rsvp')}
                  className="text-amber-400 font-medium hover:text-amber-300 transition-colors text-left flex items-center gap-2"
                >
                  <span className="text-amber-500">›</span> RSVP Form & Status
                </button>
              </li>
              <li>
                <button
                  id="footer-link-hotel-tickets"
                  onClick={() => onNavigate('hotel-tickets')}
                  className="text-amber-400 font-medium hover:text-amber-300 transition-colors text-left flex items-center gap-2"
                >
                  <span className="text-amber-500">›</span> Hotel Tickets Booking
                </button>
              </li>
              <li>
                <button
                  id="footer-link-contacts"
                  onClick={() => onNavigate('home', 'contacts-section')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-2"
                >
                  <span className="text-gray-600">›</span> Contacts
                </button>
              </li>
            </ul>
          </div>

          {/* Map Column */}
          <div className="md:col-span-7 lg:col-span-7">
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-md">
              <div className="bg-[#1e2633] px-4 py-2.5 flex items-center justify-between border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-semibold text-white">Ayia Napa, Cyprus</span>
                </div>
                <a
                  href="https://www.google.com/maps/place/Ayia+Napa,+Cyprus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <span>View larger map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="relative h-64 sm:h-72 w-full bg-slate-800">
                <iframe
                  title="Ayia Napa Cyprus Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52251.27230491024!2d33.95383568894176!3d34.98901235680194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14dfc31bbfb7764d%3A0x6b1ea29bfa816912!2sAyia%20Napa%2C%20Cyprus!5e0!3m2!1sen!2s!4v1718800000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter brightness-95 contrast-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>
            Copyright - OceanWP Theme by OceanWP • <span className="text-gray-400">QM@40 Ayia Napa Celebration</span>
          </p>
          <div className="flex flex-wrap items-center gap-4 text-gray-400">
            <a
              id="footer-download-zip-btn"
              href="./qm40-website-source.zip"
              download="qm40-website-source.zip"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-850 hover:bg-gray-800 text-gray-300 hover:text-white transition-colors text-xs font-medium border border-gray-700/70"
              title="Download full project source code as .ZIP"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Download Code (.zip)</span>
            </a>
            <span>Nov 27 – Dec 1, 2024</span>
            <span>•</span>
            <span className="text-amber-500 font-semibold">#QM40</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
