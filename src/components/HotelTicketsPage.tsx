import React, { useState } from 'react';
import { PageView, CommentItem, BookingSubmission } from '../types';
import { TICKET_ITEMS, EVENT_DETAILS } from '../data/content';
import {
  Calendar,
  User,
  Folder,
  MessageSquare,
  Search,
  CheckCircle,
  Clock,
  ArrowRight,
  Copy,
  Check,
  CreditCard,
  Building2,
  FileText,
  Printer,
  Sparkles,
  Info,
  ShieldAlert,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HotelTicketsPageProps {
  onNavigate: (page: PageView, sectionId?: string) => void;
}

export const HotelTicketsPage: React.FC<HotelTicketsPageProps> = ({ onNavigate }) => {
  // Ticket quantities state
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({
    'double-park-view': 0,
    'double-side-sea-view': 0,
    'double-sea-view': 0,
    'half-board-supplement': 0,
    'breakfast-tiffany-asoebi': 0,
    'panoramic-room': 0,
    'executive-suite': 0,
  });

  // Modal checkout state
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'confirmed'>('details');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Guest booking form state
  const [bookingForm, setBookingForm] = useState({
    guestName: '',
    email: '',
    phone: '',
    roommateName: '',
    paymentMethod: 'paypal' as 'paypal' | 'bank_transfer',
    specialRequests: '',
  });

  const [confirmedBooking, setConfirmedBooking] = useState<BookingSubmission | null>(null);

  // Comment section state
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 'c-htl-1',
      name: 'Folashade B.',
      email: 'folashade@example.com',
      content: 'Just sent my 50% deposit for the Double Sea View Room via PayPal Friends & Family! So excited for Ayia Napa! 🌊☀️',
      date: 'June 21, 2024 at 11:42 am',
      page: 'hotel-tickets',
    },
  ]);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    website: '',
    content: '',
    saveInfo: false,
  });
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMessage, setSearchMessage] = useState('');

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  // Calculate order totals
  const totalItemsCount = Object.values(quantities).reduce((acc: number, qty: number): number => acc + qty, 0);
  const totalPrice = TICKET_ITEMS.reduce((acc, item) => {
    const qty = quantities[item.id] || 0;
    return acc + item.price * qty;
  }, 0);
  const depositPrice = totalPrice * 0.5;

  const handleGetTickets = () => {
    if (totalItemsCount === 0) {
      alert('Please select at least one room or ticket option before clicking GET TICKETS.');
      return;
    }
    setCheckoutStep('details');
    setShowCheckoutModal(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.guestName || !bookingForm.email || !bookingForm.phone) {
      alert('Please complete all required fields.');
      return;
    }

    const ref = `QM40-HTL-${Math.floor(1000 + Math.random() * 9000)}`;
    const submission: BookingSubmission = {
      id: `bk-${Date.now()}`,
      bookingRef: ref,
      guestName: bookingForm.guestName,
      email: bookingForm.email,
      phone: bookingForm.phone,
      roommateName: bookingForm.roommateName,
      items: { ...quantities },
      totalAmount: totalPrice,
      depositAmount: depositPrice,
      paymentMethod: bookingForm.paymentMethod,
      submittedAt: new Date().toLocaleDateString(),
    };

    setConfirmedBooking(submission);
    setCheckoutStep('confirmed');
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.55 },
    });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.content || !newComment.name || !newComment.email) {
      alert('Please fill in your name, email, and comment message.');
      return;
    }

    const added: CommentItem = {
      id: `c-${Date.now()}`,
      name: newComment.name,
      email: newComment.email,
      website: newComment.website,
      content: newComment.content,
      date: new Date().toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
      page: 'hotel-tickets',
    };

    setComments([added, ...comments]);
    setNewComment({ name: '', email: '', website: '', content: '', saveInfo: false });
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 4000);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes('rsvp') || q.includes('going') || q.includes('attend')) {
      onNavigate('rsvp');
    } else if (q.includes('hotel') || q.includes('ticket') || q.includes('room') || q.includes('suite')) {
      setSearchMessage(`Filtered ticket views for "${searchQuery}"`);
    } else {
      setSearchMessage(`Showing results for "${searchQuery}"`);
      onNavigate('home');
    }
  };

  return (
    <div className="w-full bg-[#f9fafb] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* MAIN CONTENT (8 Cols) */}
          <main className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-xl shadow-sm border border-gray-200">
            {/* Page Heading */}
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Hotel Tickets
            </h1>

            {/* Post Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500 border-b border-gray-100 pb-6 mb-8">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-gray-400" />
                <span>Molly Ore</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>June 19, 2024</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Folder className="w-4 h-4 text-gray-400" />
                <span>Uncategorized</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-gray-400" />
                <span>{comments.length} Comments</span>
              </span>
            </div>

            {/* Resort Hero Photo: Alion Beach Hotel */}
            <div className="rounded-xl overflow-hidden shadow-md mb-10 border border-gray-100 aspect-[16/9] bg-slate-200">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80"
                alt="Alion Beach Hotel pool and Mediterranean sea"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* BOOKING DETAILS Text Section */}
            <section className="space-y-6 text-sm text-gray-700 leading-relaxed mb-12">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-tight">
                BOOKING DETAILS
              </h2>

              <p className="font-semibold text-gray-900">
                Please note that the cost per room is based on 2 persons sharing a room or suite
              </p>

              <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200 space-y-2">
                <p className="font-medium text-amber-950">
                  To confirm your reservation we would require <strong>50% deposit by August 5th</strong> & the remaining balance of <strong>50% by October 15th</strong> (the official Deadline for all payments).
                </p>
              </div>

              {/* Payment Instructions: Option 1 (PayPal) */}
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-sky-600" />
                  Option 1: PayPal Payment
                </h3>
                <p>
                  To book please either use the PayPal payment information below:{' '}
                  <span className="font-bold text-gray-900 bg-white px-2 py-1 rounded border border-gray-300 select-all">
                    {EVENT_DETAILS.paypalEmail}
                  </span>
                </p>

                <div className="space-y-2 text-xs sm:text-sm text-gray-700 pt-2 border-t border-gray-200">
                  <p className="font-bold text-gray-900">
                    Please read these payment instructions carefully as you must do as requested:
                  </p>
                  <ul className="space-y-1.5 list-disc list-inside text-gray-600 pl-1">
                    <li>PayPal has 2 types of payments – Goods & Services and Friends and Family</li>
                    <li className="font-semibold text-red-600">
                      YOU MUST CHOOSE FRIENDS AND FAMILY... You will always be able to do this... if you can't see it don't just send it as if you don't send it wrong!!
                    </li>
                    <li className="font-semibold text-gray-900">
                      You MUST NOT write any notes or references.
                    </li>
                    <li>Retain transfer receipts.</li>
                    <li>THANK YOU</li>
                  </ul>
                </div>
              </div>

              {/* Payment Instructions: Option 2 (Bank Transfer) */}
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-amber-600" />
                  Option 2: Direct Deposit / Bank Transfer
                </h3>
                <p>Direct deposit into account below:</p>
                <div className="bg-white p-4 rounded-lg border border-gray-300 font-mono text-xs sm:text-sm space-y-1.5">
                  <p><strong>Bank:</strong> {EVENT_DETAILS.bankDetails.bank}</p>
                  <p><strong>Beneficiary:</strong> {EVENT_DETAILS.bankDetails.accountName}</p>
                  <p><strong>Sort Code:</strong> {EVENT_DETAILS.bankDetails.sortCode}</p>
                  <p><strong>Account #:</strong> {EVENT_DETAILS.bankDetails.accountNumber}</p>
                  <p><strong>Reference:</strong> {EVENT_DETAILS.bankDetails.reference}</p>
                </div>
              </div>
            </section>

            {/* TICKETS SELECTION WIDGET */}
            <section className="border-t border-gray-200 pt-8 mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">
                  Tickets
                </h2>
                <span className="text-xs text-gray-500 font-medium">All rates in EUR (€)</span>
              </div>

              {/* Ticket list table matching screenshot */}
              <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-200 bg-white shadow-sm mb-6">
                {TICKET_ITEMS.map((ticket) => {
                  const qty = quantities[ticket.id] || 0;
                  return (
                    <div
                      key={ticket.id}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/70 transition-colors"
                    >
                      <div className="space-y-1 max-w-md">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                          {ticket.name}
                        </h4>
                        {ticket.description && (
                          <p className="text-xs text-gray-500 leading-normal">
                            {ticket.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between w-full sm:w-auto sm:gap-8">
                        <div className="text-right">
                          <span className="font-bold text-base sm:text-lg text-gray-900">
                            €{ticket.price.toFixed(2)}
                          </span>
                          <span className="block text-[11px] text-gray-400">Unlimited</span>
                        </div>

                        {/* Quantity controls: - 0 + */}
                        <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden shadow-inner">
                          <button
                            id={`ticket-minus-${ticket.id}`}
                            onClick={() => updateQuantity(ticket.id, -1)}
                            disabled={qty === 0}
                            className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-white transition-colors"
                            aria-label={`Decrease ${ticket.name}`}
                          >
                            –
                          </button>
                          <span className="w-10 text-center font-bold text-sm text-gray-800 select-none">
                            {qty}
                          </span>
                          <button
                            id={`ticket-plus-${ticket.id}`}
                            onClick={() => updateQuantity(ticket.id, 1)}
                            className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors font-semibold"
                            aria-label={`Increase ${ticket.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order summary bar */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 sm:p-6 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                      Order Total ({totalItemsCount} item{totalItemsCount === 1 ? '' : 's'})
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading text-3xl font-bold text-gray-900">
                        €{totalPrice.toFixed(2)}
                      </span>
                      {totalPrice > 0 && (
                        <span className="text-xs text-amber-700 font-semibold bg-amber-100 px-2 py-0.5 rounded">
                          Deposit due now: €{depositPrice.toFixed(2)} (50%)
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    id="get-tickets-btn"
                    onClick={handleGetTickets}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#1e73be] hover:bg-[#165a94] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-md shadow-md transition-all hover:scale-102 flex items-center justify-center gap-2"
                  >
                    <span>GET TICKETS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* YOU MIGHT ALSO LIKE (Links to RSVP) */}
            <div className="border-t border-gray-200 pt-8 mb-12">
              <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-6 flex items-center gap-2">
                <span>›</span> YOU MIGHT ALSO LIKE
              </h3>

              <div
                onClick={() => onNavigate('rsvp')}
                className="group cursor-pointer bg-gray-50 hover:bg-amber-50/50 border border-gray-200 hover:border-amber-200 rounded-xl p-4 transition-all duration-200 flex items-center gap-4 sm:gap-6"
              >
                <div className="w-24 sm:w-32 h-20 sm:h-24 rounded-lg overflow-hidden bg-slate-200 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80"
                    alt="Ayia Napa harbor"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-gray-400 block mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>June 19, 2024</span>
                  </span>
                  <h4 className="font-heading text-lg sm:text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                    RSVP
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-1 sm:line-clamp-2">
                    Confirm your attendance for Queen Molly's 40th Birthday celebration and let us know your travel schedule.
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-white border border-gray-200 group-hover:bg-amber-500 group-hover:text-white flex items-center justify-center text-gray-400 transition-all shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* LEAVE A REPLY (Comments Form) */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                Leave a Reply
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                Your email address will not be published. Required fields are marked *
              </p>

              {commentSuccess && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-md flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Thank you! Your message has been submitted.</span>
                </div>
              )}

              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Comment *
                  </label>
                  <textarea
                    id="comment-textarea-hotel"
                    rows={5}
                    required
                    placeholder="Your comment here..."
                    value={newComment.content}
                    onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none transition-all text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Name (required) *
                    </label>
                    <input
                      id="comment-name-hotel"
                      type="text"
                      required
                      value={newComment.name}
                      onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email (required) *
                    </label>
                    <input
                      id="comment-email-hotel"
                      type="email"
                      required
                      value={newComment.email}
                      onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      id="comment-website-hotel"
                      type="text"
                      value={newComment.website}
                      onChange={(e) => setNewComment({ ...newComment, website: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    id="comment-save-info-hotel"
                    type="checkbox"
                    checked={newComment.saveInfo}
                    onChange={(e) => setNewComment({ ...newComment, saveInfo: e.target.checked })}
                    className="w-4 h-4 text-sky-600 rounded border-gray-300 focus:ring-sky-500"
                  />
                  <label htmlFor="comment-save-info-hotel" className="text-xs text-gray-600 select-none">
                    Save my name, email, and website in this browser for the next time I comment.
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    id="post-comment-hotel-btn"
                    type="submit"
                    className="px-6 py-3 bg-[#1e73be] hover:bg-[#165a94] text-white font-bold text-xs uppercase tracking-wider rounded shadow transition-colors"
                  >
                    POST COMMENT
                  </button>
                </div>
              </form>

              {/* Existing comments */}
              {comments.length > 0 && (
                <div className="mt-10 border-t border-gray-100 pt-8 space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-800">
                    Guest Remarks ({comments.length})
                  </h4>
                  <div className="space-y-4">
                    {comments.map((c) => (
                      <div key={c.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-sm text-gray-900">{c.name}</span>
                          <span className="text-xs text-gray-400">{c.date}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                          {c.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>

          {/* SIDEBAR (4 Cols) */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Search Widget */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h4 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">
                Search
              </h4>
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  id="sidebar-search-tickets-input"
                  type="text"
                  placeholder="Search rooms, pricing, dates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
                <button
                  id="sidebar-search-tickets-btn"
                  type="submit"
                  className="px-4 py-2 bg-[#1e73be] hover:bg-[#165a94] text-white text-xs font-bold uppercase rounded tracking-wider shadow transition-colors"
                >
                  SEARCH
                </button>
              </form>
              {searchMessage && (
                <p className="mt-2 text-xs text-amber-700 bg-amber-50 p-2 rounded">
                  {searchMessage}
                </p>
              )}
            </div>

            {/* Quick Links Widget */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h4 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">
                Quick Navigation
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button
                    id="sidebar-nav-hotel-tickets"
                    onClick={() => onNavigate('hotel-tickets')}
                    className="w-full text-left py-2 px-3 rounded-md bg-amber-50 text-amber-900 font-semibold transition-colors flex items-center justify-between"
                  >
                    <span>Hotel Tickets</span>
                    <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded">Active</span>
                  </button>
                </li>
                <li>
                  <button
                    id="sidebar-nav-rsvp"
                    onClick={() => onNavigate('rsvp')}
                    className="w-full text-left py-2 px-3 rounded-md hover:bg-amber-50 hover:text-amber-800 text-gray-700 font-medium transition-colors flex items-center justify-between"
                  >
                    <span>RSVP</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">55 Going</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Payment Deadlines Reminder Card */}
            <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Payment Deadlines</span>
              </div>
              <div className="space-y-2 text-xs text-gray-700">
                <div className="p-2.5 bg-white rounded border border-amber-200">
                  <p className="font-bold text-gray-900">1st Installment (50%):</p>
                  <p className="text-amber-800 font-semibold">Due by August 5th</p>
                </div>
                <div className="p-2.5 bg-white rounded border border-amber-200">
                  <p className="font-bold text-gray-900">Final Balance (50%):</p>
                  <p className="text-amber-800 font-semibold">Due by October 15th</p>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 leading-normal pt-1">
                Official deadline for all guest room allocations at Alion Beach Hotel Ayia Napa.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* CHECKOUT / CONFIRMATION MODAL */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-amber-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              ✕
            </button>

            {checkoutStep === 'details' ? (
              <div>
                <div className="mb-6">
                  <span className="text-xs uppercase font-bold text-amber-600 tracking-wider">
                    Step 2 of 2: Reservation Confirmation
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-gray-900">
                    Confirm Hotel Tickets
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Alion Beach Hotel Ayia Napa • Nov 27 – Dec 1
                  </p>
                </div>

                {/* Selected items summary */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-5 text-xs space-y-2">
                  <span className="font-bold uppercase tracking-wider text-gray-600 block mb-1">
                    Selected Rooms & Supplements
                  </span>
                  {TICKET_ITEMS.filter((t) => (quantities[t.id] || 0) > 0).map((t) => {
                    const qty = quantities[t.id];
                    return (
                      <div key={t.id} className="flex justify-between items-center py-1 border-b border-gray-200/60">
                        <span>
                          {t.name} <strong className="text-gray-900">× {qty}</strong>
                        </span>
                        <span className="font-bold text-gray-900">€{(t.price * qty).toFixed(2)}</span>
                      </div>
                    );
                  })}
                  <div className="pt-2 flex justify-between items-center text-sm font-bold text-gray-900">
                    <span>Total Cost:</span>
                    <span className="text-lg">€{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold text-amber-800 bg-amber-100/70 p-2 rounded">
                    <span>50% Deposit Due Immediately:</span>
                    <span>€{depositPrice.toFixed(2)}</span>
                  </div>
                </div>

                <form onSubmit={handleConfirmBooking} className="space-y-4 text-sm text-gray-700">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Primary Guest Full Name *
                    </label>
                    <input
                      id="checkout-guest-name"
                      type="text"
                      required
                      placeholder="e.g. Jessica Taylor"
                      value={bookingForm.guestName}
                      onChange={(e) => setBookingForm({ ...bookingForm, guestName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        id="checkout-email"
                        type="email"
                        required
                        placeholder="cynthia@example.com"
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        id="checkout-phone"
                        type="tel"
                        required
                        placeholder="+44 7900 123456"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Sharing Room With (Second Guest Name)
                    </label>
                    <input
                      id="checkout-roommate"
                      type="text"
                      placeholder="e.g. David Johnson (leave blank if solo or undecided)"
                      value={bookingForm.roommateName}
                      onChange={(e) => setBookingForm({ ...bookingForm, roommateName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none text-sm"
                    />
                    <span className="text-[11px] text-gray-400 mt-0.5 block">
                      Note: Rooms are based on 2 persons sharing.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Intended Payment Method *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label
                        className={`p-3 rounded-lg border text-xs cursor-pointer flex items-center gap-2 ${
                          bookingForm.paymentMethod === 'paypal'
                            ? 'border-sky-500 bg-sky-50 text-sky-900 font-semibold'
                            : 'border-gray-300 bg-gray-50 text-gray-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={bookingForm.paymentMethod === 'paypal'}
                          onChange={() => setBookingForm({ ...bookingForm, paymentMethod: 'paypal' })}
                          className="text-sky-600"
                        />
                        <span>PayPal (Friends & Family)</span>
                      </label>

                      <label
                        className={`p-3 rounded-lg border text-xs cursor-pointer flex items-center gap-2 ${
                          bookingForm.paymentMethod === 'bank_transfer'
                            ? 'border-amber-500 bg-amber-50 text-amber-900 font-semibold'
                            : 'border-gray-300 bg-gray-50 text-gray-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bank_transfer"
                          checked={bookingForm.paymentMethod === 'bank_transfer'}
                          onChange={() => setBookingForm({ ...bookingForm, paymentMethod: 'bank_transfer' })}
                          className="text-amber-600"
                        />
                        <span>Bank Deposit (TSB Bank)</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-3 flex gap-3">
                    <button
                      id="confirm-reservation-submit-btn"
                      type="submit"
                      className="flex-1 py-3 bg-[#1e73be] hover:bg-[#165a94] text-white font-bold text-xs uppercase tracking-wider rounded shadow transition-all hover:scale-101"
                    >
                      GENERATE RESERVATION & PAYMENT PASS
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCheckoutModal(false)}
                      className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded"
                    >
                      Back
                    </button>
                  </div>
                </form>
              </div>
            ) : confirmedBooking ? (
              /* CONFIRMED TICKET PASS VIEW */
              <div className="space-y-5 animate-fadeIn">
                <div className="text-center">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                    <Check className="w-7 h-7" />
                  </div>
                  <span className="text-xs uppercase font-bold text-emerald-700 tracking-wider">
                    Reservation Voucher Generated
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">
                    Booking Confirmed!
                  </h3>
                  <div className="inline-block mt-2 px-3 py-1 bg-amber-100 text-amber-900 font-mono font-bold text-xs rounded-full border border-amber-300">
                    Ref: {confirmedBooking.bookingRef}
                  </div>
                </div>

                {/* Printable / Copyable Pass card */}
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-5 text-xs text-gray-700 space-y-3">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-bold">Guest</span>
                      <strong className="text-gray-900 text-sm">{confirmedBooking.guestName}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-400 block text-[10px] uppercase font-bold">Event</span>
                      <strong className="text-amber-800 font-bold">QM@40 Ayia Napa</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-400 block text-[10px]">Total Booking:</span>
                      <strong className="text-gray-900">€{confirmedBooking.totalAmount.toFixed(2)}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">50% Deposit Due:</span>
                      <strong className="text-amber-800 font-bold text-sm">€{confirmedBooking.depositAmount.toFixed(2)}</strong>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-2">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold mb-1">
                      Payment Transfer Instructions:
                    </span>
                    {confirmedBooking.paymentMethod === 'paypal' ? (
                      <div className="p-3 bg-white rounded border border-gray-300 space-y-2">
                        <div className="flex justify-between items-center">
                          <span>PayPal Email: <strong>{EVENT_DETAILS.paypalEmail}</strong></span>
                          <button
                            onClick={() => copyToClipboard(EVENT_DETAILS.paypalEmail, 'paypal')}
                            className="px-2 py-1 bg-sky-100 text-sky-800 text-[11px] rounded font-semibold flex items-center gap-1 hover:bg-sky-200"
                          >
                            {copiedField === 'paypal' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedField === 'paypal' ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                        <p className="text-[11px] text-red-600 font-semibold">
                          ⚠️ MANDATORY: Select "Friends and Family". Do not write any notes or reference.
                        </p>
                      </div>
                    ) : (
                      <div className="p-3 bg-white rounded border border-gray-300 space-y-1.5 font-mono text-[11px]">
                        <div className="flex justify-between items-center">
                          <span>TSB BANK: <strong>{EVENT_DETAILS.bankDetails.accountNumber}</strong></span>
                          <button
                            onClick={() => copyToClipboard(EVENT_DETAILS.bankDetails.accountNumber, 'acc')}
                            className="px-2 py-1 bg-amber-100 text-amber-800 text-[11px] rounded font-semibold flex items-center gap-1 hover:bg-amber-200"
                          >
                            {copiedField === 'acc' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedField === 'acc' ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                        <p>Sort Code: <strong>{EVENT_DETAILS.bankDetails.sortCode}</strong></p>
                        <p>Name: <strong>{EVENT_DETAILS.bankDetails.accountName}</strong></p>
                        <p>Ref: <strong>QM40 {confirmedBooking.guestName}</strong></p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print / Save Voucher</span>
                  </button>
                  <button
                    onClick={() => setShowCheckoutModal(false)}
                    className="flex-1 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs uppercase tracking-wider rounded"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
