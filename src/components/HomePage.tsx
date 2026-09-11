import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import {
  ITINERARY_DAYS,
  PLACES_TO_VISIT,
  NIGHTCLUBS,
  BEACH_CLUBS,
  CONTACT_PERSONS,
  EVENT_DETAILS,
} from '../data/content';
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Plane,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Phone,
  ShieldCheck,
  HeartHandshake,
  CheckCircle2,
  Hotel,
  Volume2,
  VolumeX,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const HERO_SLIDES = [
  {
    id: 1,
    url: 'https://images.pexels.com/photos/33953068/pexels-photo-33953068.jpeg?auto=compress&cs=tinysrgb&w=2000',
    title: 'Sunset Beach Scene in Vodice',
  },
  {
    id: 2,
    url: 'https://images.pexels.com/photos/38787572/pexels-photo-38787572.jpeg?auto=compress&cs=tinysrgb&w=2000',
    title: 'Mediterranean Coastal Sunset',
  },
];

interface HomePageProps {
  onNavigate: (page: PageView, sectionId?: string) => void;
  onOpenVisaModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenVisaModal }) => {
  // Itinerary accordion open states (default first day open as in screenshot)
  const [openItineraryId, setOpenItineraryId] = useState<string>('day-1');

  // Carousel indexes for Nightclubs & Beach Clubs
  const [nightclubIdx, setNightclubIdx] = useState(0);
  const [beachClubIdx, setBeachClubIdx] = useState(0);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);

  // Hero background slideshow state (cycling between the 2 sunset beach scenes)
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleItinerary = (id: string) => {
    setOpenItineraryId(openItineraryId === id ? '' : id);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.firstName || !contactForm.email || !contactForm.message) {
      alert('Please fill in all required fields (First Name, Email, and Message).');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setContactSubmitted(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    }, 600);
  };

  return (
    <div className="w-full bg-white">
      {/* 1. HERO SECTION WITH BACKGROUND SLIDESHOW */}
      <section className="relative min-h-[580px] lg:min-h-[720px] w-full flex items-center justify-center overflow-hidden bg-slate-950 text-white">
        {/* Background Slideshow Images */}
        {HERO_SLIDES.map((slide, index) => {
          const isActive = heroSlide === index;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out ${
                isActive
                  ? 'opacity-100 scale-105 z-0 pointer-events-auto'
                  : 'opacity-0 scale-100 pointer-events-none -z-10'
              }`}
              style={{
                backgroundImage: `url('${slide.url}')`,
              }}
            />
          );
        })}

        {/* Dark Vignette & Gradient Overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/80 backdrop-blur-[0.5px] z-[1]" />

        {/* Slideshow manual controls / indicators */}
        <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
          <button
            onClick={() => setHeroSlide((prev) => (prev === 0 ? 1 : 0))}
            className="text-white/80 hover:text-white p-1 transition-colors"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setHeroSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                heroSlide === idx ? 'w-6 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
          <button
            onClick={() => setHeroSlide((prev) => (prev === 0 ? 1 : 0))}
            className="text-white/80 hover:text-white p-1 transition-colors"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm tracking-widest uppercase mb-6 text-amber-300 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Molly</span>
          </div>

          <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white mb-6 drop-shadow-lg">
            QM@40
          </h1>

          <div className="inline-block bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-5 sm:px-10 sm:py-6 text-left max-w-lg mx-auto shadow-2xl">
            <ul className="space-y-2.5 text-sm sm:text-base md:text-lg text-gray-100 font-medium">
              <li className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                <span>
                  <strong className="text-white font-semibold">Destination:</strong> {EVENT_DETAILS.destination}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                <span>
                  <strong className="text-white font-semibold">Dates:</strong> {EVENT_DETAILS.dates}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                <span>
                  <strong className="text-white font-semibold">Official hashtag:</strong>{' '}
                  <span className="text-amber-400 font-bold">{EVENT_DETAILS.officialHashtag}</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Quick CTA Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              id="hero-rsvp-cta-btn"
              onClick={() => onNavigate('rsvp')}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-full shadow-lg shadow-amber-500/30 transition-all hover:scale-105 flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Confirm Your RSVP</span>
            </button>

            <button
              id="hero-hotel-cta-btn"
              onClick={() => onNavigate('hotel-tickets')}
              className="px-8 py-3.5 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/40 text-white font-semibold rounded-full transition-all hover:scale-105 flex items-center gap-2"
            >
              <Hotel className="w-5 h-5 text-amber-300" />
              <span>Book Hotel Tickets</span>
            </button>
          </div>
        </div>

        {/* Bottom subtle wave separator */}
        <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* 2. SECTION: "LET'S CELEBRATE" (With requested YouTube video autoplay & seamless loop) */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left text column */}
            <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
              <span className="text-xs uppercase tracking-[0.2em] text-amber-600 font-bold">
                Milestone 40th Gathering
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Let's Celebrate
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
                Mark your calendars for a milestone celebration! Join me in Ayia Napa which is a stunning party destination on the southeastern coast of Cyprus.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="px-4 py-2 bg-amber-50 rounded-lg border border-amber-200/70 text-amber-900 text-xs sm:text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>5 Days of Pure Celebration</span>
                </div>
                <div className="px-4 py-2 bg-sky-50 rounded-lg border border-sky-200/70 text-sky-900 text-xs sm:text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-600" />
                  <span>Alion Beach Hotel 5-Star Resort</span>
                </div>
              </div>
            </div>

            {/* Right Video column: https://www.youtube.com/watch?v=Csdjvwx9Ku0 with autoplay & seamless loop */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-100/80 bg-black aspect-video group">
                {/* Seamless Autoplay & Loop YouTube Embed */}
                <iframe
                  id="celebration-youtube-video"
                  title="Ayia Napa Cyprus Celebration Destination Video"
                  src="https://www.youtube-nocookie.com/embed/Csdjvwx9Ku0?autoplay=1&mute=1&loop=1&playlist=Csdjvwx9Ku0&playsinline=1&controls=1&modestbranding=1&rel=0&iv_load_policy=3"
                  className="w-full h-full object-cover"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />

                {/* Floating quick helper tag */}
                <div className="absolute top-3 left-3 pointer-events-none bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-medium flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Ayia Napa Preview • Autoplay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION: "Ayia Napa Cyprus" (Light Blue background #E1F1F8) */}
      <section id="destination-section" className="py-16 sm:py-20 bg-[#E1F1F8] border-y border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              Ayia Napa Cyprus
            </h2>
            <div className="mt-3 w-16 h-1 bg-sky-400 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left details */}
            <div className="md:col-span-3 space-y-8 text-center md:text-left">
              <div>
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                  Language
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Greek is the official language of Cyprus. English is widely spoken in Ayia Napa
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                  Weather
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Short autumn & spring season. Temperatures are between 12°C and 22°C
                </p>
              </div>
            </div>

            {/* Middle photo */}
            <div className="md:col-span-6">
              <div className="rounded-xl overflow-hidden shadow-lg border-2 border-white aspect-[4/3] bg-sky-200">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
                  alt="Ayia Napa Mediterranean coastline and beaches"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Right details */}
            <div className="md:col-span-3 space-y-8 text-center md:text-left">
              <div>
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                  Pathos Airport
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  It is 170km from Ayia Napa on the southwest coast.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                  Larnaca Airport
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  It is 45km from Ayia Napa, the closest and most convenient.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom description text */}
          <div className="mt-12 max-w-4xl mx-auto text-center">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Ayia Napa, located on the southeastern coast of Cyprus, is a Mediterranean paradise renowned for its golden sandy beaches and crystal-clear waters. This vibrant resort town is not only a haven for sun-seekers but also a hotspot for nightlife, with an array of bars, clubs, and events that cater to every taste.
            </p>
          </div>
        </div>
      </section>

      {/* 4. SECTION: "PLACES TO CHECK OUT IN AYIA NAPA, CYPRUS" (Sand / Cream tint #FBF8F2) */}
      <section className="py-16 sm:py-20 bg-[#FBF8F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-amber-700 font-semibold">
              Explore The Coastline
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 uppercase tracking-wide">
              Places To Check Out In Ayia Napa, Cyprus
            </h2>
            <div className="mt-3 w-16 h-1 bg-amber-400 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PLACES_TO_VISIT.map((place, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-amber-100 flex flex-col group"
              >
                <div className="h-56 sm:h-60 overflow-hidden relative">
                  <img
                    src={place.image}
                    alt={place.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                      {place.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {place.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SECTION: "Itinerary" (Ocean Teal #1DA5B7 with diver/water ripple background) */}
      <section
        id="itinerary-section"
        className="py-16 sm:py-20 lg:py-24 relative bg-[#1fa2b6] text-white overflow-hidden"
      >
        {/* Background underwater watermark texture */}
        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80')`,
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-heading text-5xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
              Itinerary
            </h2>
            <p className="mt-3 text-cyan-100 text-sm sm:text-base font-medium">
              Daily schedule for Queen Molly's 40th Birthday Celebration
            </p>
          </div>

          {/* Collapsible Itinerary Accordions */}
          <div className="space-y-3">
            {ITINERARY_DAYS.map((item) => {
              const isOpen = openItineraryId === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-lg overflow-hidden transition-all duration-200 border border-white/20 shadow-md"
                >
                  {/* Header Button */}
                  <button
                    id={`itinerary-accordion-toggle-${item.id}`}
                    onClick={() => toggleItinerary(item.id)}
                    className="w-full text-left px-5 py-4 bg-[#23313d] hover:bg-[#1b2630] text-white flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="font-semibold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors">
                        {item.date}
                      </span>
                      {item.title && !isOpen && (
                        <span className="hidden sm:inline-block text-xs text-gray-300 font-normal truncate max-w-xs">
                          {item.title}
                        </span>
                      )}
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-gray-200 group-hover:bg-amber-500 group-hover:text-white transition-colors shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Accordion Body */}
                  {isOpen && (
                    <div className="bg-[#179db1]/90 backdrop-blur-md px-6 py-5 border-t border-cyan-300/30 text-white space-y-4">
                      <div className="space-y-1.5">
                        <h4 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                          {item.title}
                        </h4>
                        <p className="text-sm font-semibold text-amber-200 tracking-wide">
                          {item.style}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-cyan-50 leading-relaxed font-light">
                        {item.description}
                      </p>

                      <div className="pt-2 border-t border-cyan-400/20">
                        <h5 className="text-xs uppercase tracking-wider font-semibold text-white/90 mb-2">
                          Day Highlights & Schedule
                        </h5>
                        <ul className="space-y-1.5 text-xs text-cyan-50">
                          {item.highlights.map((point, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2">
                              <span className="text-amber-300 font-bold shrink-0 mt-0.5">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. SECTION: "NIGHTLIFE" (Warm Golden Yellow #F4D06F / #F3CF68) */}
      <section id="nightlife-section" className="py-16 sm:py-20 lg:py-24 bg-[#F3CF68] text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Nightclubs */}
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-wider uppercase mb-2">
              NIGHTLIFE
            </h2>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Top Nightclubs In Ayia Napa
            </h3>
            <p className="text-sm sm:text-base text-gray-800 font-medium max-w-xl mx-auto">
              The Castle Nightclub, Encore Nightclub, Ambassaden Club
            </p>
          </div>

          {/* Nightclub Image Carousel */}
          <div className="relative max-w-4xl mx-auto mb-16">
            <div className="rounded-xl overflow-hidden shadow-2xl bg-gray-950 aspect-[16/9] sm:aspect-[2/1] relative group">
              <img
                src={NIGHTCLUBS[nightclubIdx].image}
                alt={NIGHTCLUBS[nightclubIdx].name}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block px-2.5 py-0.5 bg-amber-500 text-black font-bold text-xs uppercase tracking-wider rounded-full mb-2">
                  {NIGHTCLUBS[nightclubIdx].tag}
                </span>
                <h4 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-1">
                  {NIGHTCLUBS[nightclubIdx].name}
                </h4>
                <p className="text-xs sm:text-sm text-gray-200 line-clamp-2">
                  {NIGHTCLUBS[nightclubIdx].description}
                </p>
              </div>

              {/* Prev / Next controls */}
              <button
                id="nightclub-prev-btn"
                onClick={() => setNightclubIdx((prev) => (prev === 0 ? NIGHTCLUBS.length - 1 : prev - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
                aria-label="Previous Nightclub"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                id="nightclub-next-btn"
                onClick={() => setNightclubIdx((prev) => (prev === NIGHTCLUBS.length - 1 ? 0 : prev + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
                aria-label="Next Nightclub"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center items-center gap-2 mt-4">
              {NIGHTCLUBS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setNightclubIdx(dotIdx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    dotIdx === nightclubIdx ? 'w-6 bg-gray-900' : 'bg-gray-700/40 hover:bg-gray-700'
                  }`}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Top Beach Clubs */}
          <div id="beach-clubs-section" className="text-center pt-8 mb-10 sm:mb-12 border-t border-amber-400/50">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Top Beach Clubs In Ayia Napa
            </h3>
            <p className="text-sm sm:text-base text-gray-800 font-medium max-w-2xl mx-auto">
              Nissi Beach Club, Isola Beach Club, Serena Beach, Marcello Beach Bar, Lasmari Beach Bar, Kalivia on the beach
            </p>
          </div>

          {/* Beach Clubs Image Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-2xl bg-gray-950 aspect-[16/9] sm:aspect-[2/1] relative group">
              <img
                src={BEACH_CLUBS[beachClubIdx].image}
                alt={BEACH_CLUBS[beachClubIdx].name}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block px-2.5 py-0.5 bg-sky-400 text-black font-bold text-xs uppercase tracking-wider rounded-full mb-2">
                  {BEACH_CLUBS[beachClubIdx].tag}
                </span>
                <h4 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-1">
                  {BEACH_CLUBS[beachClubIdx].name}
                </h4>
                <p className="text-xs sm:text-sm text-gray-200 line-clamp-2">
                  {BEACH_CLUBS[beachClubIdx].description}
                </p>
              </div>

              {/* Prev / Next controls */}
              <button
                id="beachclub-prev-btn"
                onClick={() => setBeachClubIdx((prev) => (prev === 0 ? BEACH_CLUBS.length - 1 : prev - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
                aria-label="Previous Beach Club"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                id="beachclub-next-btn"
                onClick={() => setBeachClubIdx((prev) => (prev === BEACH_CLUBS.length - 1 ? 0 : prev + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
                aria-label="Next Beach Club"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center items-center gap-2 mt-4">
              {BEACH_CLUBS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setBeachClubIdx(dotIdx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    dotIdx === beachClubIdx ? 'w-6 bg-gray-900' : 'bg-gray-700/40 hover:bg-gray-700'
                  }`}
                  aria-label={`Go to beach club slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. SECTION: "Health and Safety" (White background) */}
      <section id="health-safety-section" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900">
              Health and Safety
            </h2>
            <div className="mt-3 w-16 h-1 bg-amber-400 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Health */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col">
              <div className="h-52 bg-slate-100 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
                  alt="Cyprus Healthcare and clinics"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex-1">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                  Health
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Cyprus has a well-developed healthcare system. Ayia Napa boasts several private clinics and a general hospital.
                </p>
              </div>
            </div>

            {/* SPA */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col">
              <div className="h-52 bg-slate-100 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80"
                  alt="Alion Beach Hotel Armonia Spa"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex-1">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                  SPA
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Alion Beach Hotel has a world-class spa called Armonia offering 15% to all our party guests
                </p>
              </div>
            </div>

            {/* Safety */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col">
              <div className="h-52 bg-slate-100 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                  alt="Stay Safe Ayia Napa Cyprus"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="px-4 py-2 bg-white/85 rounded-full text-xs font-bold uppercase tracking-widest text-gray-900 shadow">
                    STAY SAFE
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                  Safety
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Ayia Napa is known for being a safe destination for travelers. Just take standard precautions and use common sense.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SECTION: "Accommodations & Logistics" (Deep Oceanic Blue #1A6880) */}
      <section
        id="accommodations-section"
        className="py-16 sm:py-20 lg:py-24 bg-[#1b6b82] text-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow">
              Accommodations & Logistics
            </h2>
            <div className="mt-3 w-20 h-1 bg-amber-400 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Hotel */}
            <div className="bg-white text-gray-800 rounded-xl p-6 sm:p-7 shadow-xl flex flex-col justify-between border-2 border-amber-100">
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="font-heading text-2xl font-bold text-gray-900 text-center">
                    Hotel
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-900">Alion Beach Hotel Ayia Napa:</strong> This five-star philoxenia luxurious accommodation offers first-class services combined with premium ultimate relaxation and recreation playground.
                </p>
                <div className="pt-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
                    Group discounted Rates Below:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                    <li className="flex justify-between py-1 border-b border-gray-100">
                      <span>Double park view room</span>
                      <strong className="text-gray-900">€182</strong>
                    </li>
                    <li className="flex justify-between py-1 border-b border-gray-100">
                      <span>Double side sea view room</span>
                      <strong className="text-gray-900">€195</strong>
                    </li>
                    <li className="flex justify-between py-1 border-b border-gray-100">
                      <span>Double sea view room</span>
                      <strong className="text-gray-900">€210</strong>
                    </li>
                    <li className="flex justify-between py-1 border-b border-gray-100">
                      <span>Panoramic Room</span>
                      <strong className="text-gray-900">€340</strong>
                    </li>
                    <li className="flex justify-between py-1 border-b border-gray-100">
                      <span>Executive Suite</span>
                      <strong className="text-gray-900">€650</strong>
                    </li>
                  </ul>
                  <p className="text-xs text-amber-800 bg-amber-50 rounded p-2 mt-3 font-medium">
                    Optional half board supplement €70 per person.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Transfers */}
            <div className="bg-white text-gray-800 rounded-xl p-6 sm:p-7 shadow-xl flex flex-col justify-between border-2 border-amber-100">
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="font-heading text-2xl font-bold text-gray-900 text-center">
                    Transfers
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Private transfers and luxury car rentals available on request.
                </p>
                <div className="p-3 bg-sky-50 rounded-lg text-xs text-sky-900 space-y-1">
                  <p className="font-semibold">Limassol (Day Trip) Approx 1hrs away:</p>
                  <p className="text-gray-700">Municipal Zoo + Garden</p>
                  <p className="text-gray-700">Nommos Limassol (100.5km)</p>
                  <p className="text-gray-700">Columbia Beach, Limassol</p>
                </div>
                <div className="space-y-2 text-xs text-gray-600 pt-1">
                  <p className="p-2.5 bg-gray-50 rounded border border-gray-200">
                    <strong className="text-gray-900">Please Note:</strong> Uber doesn't operate in Cyprus, but there are plenty of great alternatives to help you get around the island.
                  </p>
                  <p className="p-2.5 bg-emerald-50 rounded border border-emerald-200 text-emerald-900">
                    <strong className="text-emerald-950">Please Note:</strong> For Movement Outside the hotel (i.e Boat day pick up / Drop off Bus will be available to all guest of the party)
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Currency & Entry Requirements */}
            <div className="bg-white text-gray-800 rounded-xl p-6 sm:p-7 shadow-xl flex flex-col justify-between border-2 border-amber-100">
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="font-heading text-2xl font-bold text-gray-900 text-center">
                    Currency & Entry Requirements
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  The currency of Cyprus is the Euro. Most businesses accept credit & debit cards but it's a good idea to carry some cash.
                </p>
                <div className="pt-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-2">
                    Entry Requirements:
                  </p>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>EU citizens: Valid passport</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>USA citizens: Valid passport</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>UK citizens: Valid passport</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>Canada Citizens: Valid Passport</span>
                    </li>
                    <li className="flex items-center gap-2 text-amber-900 font-semibold bg-amber-50 p-1.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                      <span>Nigeria citizens: Valid Visa Required</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Hotel Booking CTA Button (As shown in screenshot) */}
          <div className="mt-12 text-center">
            <button
              id="to-book-hotel-btn"
              onClick={() => onNavigate('hotel-tickets')}
              className="px-8 sm:px-12 py-4 bg-[#D6B780] hover:bg-[#c9a66a] text-gray-950 font-bold text-sm sm:text-base tracking-wider uppercase rounded-md shadow-xl transition-all hover:scale-105 border border-amber-200"
            >
              TO BOOK A HOTEL PLEASE CLICK HERE!
            </button>
          </div>
        </div>
      </section>

      {/* 9. SECTION: "PLEASE CONFIRM YOUR PARTICIPATION" (Gray band with plane photo) */}
      <section className="bg-[#E4E6E8] py-10 sm:py-12 border-y border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left airplane image */}
            <div className="md:col-span-6 rounded-lg overflow-hidden shadow-md h-44 sm:h-52 bg-slate-300">
              <img
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1000&q=80"
                alt="Airplane flying to Cyprus"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right RSVP CTA */}
            <div className="md:col-span-6 text-center md:text-left space-y-4">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight uppercase">
                PLEASE CONFIRM YOUR PARTICIPATION
              </h2>
              <div>
                <button
                  id="confirm-participation-rsvp-btn"
                  onClick={() => onNavigate('rsvp')}
                  className="px-8 py-3 bg-[#D6B780] hover:bg-[#c9a66a] text-gray-900 font-bold text-sm tracking-wider uppercase rounded-md shadow transition-all hover:scale-105"
                >
                  RSVP
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. SECTION: "Contacts" & "Simple Contact Form" (Light blue-gray #EDF3F7) */}
      <section id="contacts-section" className="py-16 sm:py-20 bg-[#edf3f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Contacts */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900">
                Contacts
              </h2>

              <div className="space-y-5">
                {CONTACT_PERSONS.map((person) => (
                  <div key={person.number} className="space-y-1">
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                      {person.number}. {person.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Contact: <span className="font-medium text-gray-800">{person.phone}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {person.role}
                    </p>
                  </div>
                ))}
              </div>

              {/* Click Here for Visa Information Button */}
              <div className="pt-4">
                <button
                  id="click-here-visa-info-btn"
                  onClick={onOpenVisaModal}
                  className="px-6 py-3.5 bg-[#D6B780] hover:bg-[#c9a66a] text-gray-900 font-bold text-xs sm:text-sm tracking-wide rounded-md shadow transition-all hover:scale-105"
                >
                  Click Here for Visa Information
                </button>
              </div>
            </div>

            {/* Right Column: Simple Contact Form */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Simple Contact Form
              </h3>

              {contactSubmitted ? (
                <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-emerald-900 text-lg">Thank You! Message Received</h4>
                  <p className="text-xs text-emerald-800">
                    Your message has been sent directly to Queen Molly's event coordination team. We will get back to you shortly at <span className="font-semibold">{contactForm.email}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactForm({ firstName: '', lastName: '', email: '', message: '' });
                    }}
                    className="mt-2 text-xs text-emerald-800 font-semibold underline hover:text-emerald-950"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-sm text-gray-700">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          id="contact-first-name-input"
                          type="text"
                          required
                          value={contactForm.firstName}
                          onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none transition-all text-sm"
                        />
                        <span className="text-[11px] text-gray-500 mt-0.5 block">First</span>
                      </div>
                      <div>
                        <input
                          id="contact-last-name-input"
                          type="text"
                          value={contactForm.lastName}
                          onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none transition-all text-sm"
                        />
                        <span className="text-[11px] text-gray-500 mt-0.5 block">Last</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email-input"
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Comment or Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message-input"
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none transition-all text-sm"
                    />
                  </div>

                  <div>
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-[#1e73be] hover:bg-[#165a94] text-white font-bold text-xs uppercase tracking-wider rounded-md shadow transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'SENDING...' : 'SUBMIT'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
