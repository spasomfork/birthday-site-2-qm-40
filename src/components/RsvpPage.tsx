import React, { useState } from 'react';
import { PageView, CommentItem, RsvpSubmission } from '../types';
import {
  Calendar,
  User,
  Folder,
  MessageSquare,
  CheckCircle,
  XCircle,
  Search,
  Hotel,
  Sparkles,
  Heart,
  Send,
  ArrowRight,
  Clock,
  MapPin,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RsvpPageProps {
  onNavigate: (page: PageView, sectionId?: string) => void;
}

export const RsvpPage: React.FC<RsvpPageProps> = ({ onNavigate }) => {
  // RSVP Attendance state
  const [goingCount, setGoingCount] = useState<number>(55);
  const [userRsvpStatus, setUserRsvpStatus] = useState<'going' | 'declined' | null>(null);
  const [showRsvpModal, setShowRsvpModal] = useState<boolean>(false);
  const [isDeclining, setIsDeclining] = useState<boolean>(false);

  // Modal form fields
  const [rsvpForm, setRsvpForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    guestCount: 1,
    arrivalDate: '2024-11-27',
    dietary: '',
    wishes: '',
  });
  const [rsvpSuccessData, setRsvpSuccessData] = useState<RsvpSubmission | null>(null);

  // Comment section state
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 'c1',
      name: 'Adanna Kalu',
      email: 'adanna@example.com',
      content: "Can't wait to celebrate the Queen at 40 in Cyprus! See you all in November! 🎉🍾",
      date: 'June 20, 2024 at 3:15 pm',
      page: 'rsvp',
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

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMessage, setSearchMessage] = useState('');

  const handleOpenGoingModal = () => {
    setIsDeclining(false);
    setShowRsvpModal(true);
  };

  const handleOpenDeclineModal = () => {
    setIsDeclining(true);
    setShowRsvpModal(true);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpForm.fullName || !rsvpForm.email) {
      alert('Please enter your full name and email.');
      return;
    }

    const submission: RsvpSubmission = {
      id: `rsvp-${Date.now()}`,
      fullName: rsvpForm.fullName,
      email: rsvpForm.email,
      phone: rsvpForm.phone,
      attending: !isDeclining,
      guestCount: isDeclining ? 0 : Number(rsvpForm.guestCount),
      arrivalDate: rsvpForm.arrivalDate,
      dietaryRestrictions: rsvpForm.dietary,
      specialNotes: rsvpForm.wishes,
      submittedAt: new Date().toLocaleDateString(),
    };

    setRsvpSuccessData(submission);
    setUserRsvpStatus(isDeclining ? 'declined' : 'going');
    if (!isDeclining) {
      setGoingCount((prev) => prev + Number(rsvpForm.guestCount));
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
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
      page: 'rsvp',
    };

    setComments([added, ...comments]);
    setNewComment({ name: '', email: '', website: '', content: '', saveInfo: false });
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 4000);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const query = searchQuery.toLowerCase();
    if (query.includes('hotel') || query.includes('ticket') || query.includes('room') || query.includes('pay')) {
      onNavigate('hotel-tickets');
    } else if (query.includes('rsvp') || query.includes('go') || query.includes('attend')) {
      setSearchMessage(`Showing RSVP page details for "${searchQuery}"`);
    } else {
      setSearchMessage(`Navigating to celebration features matching "${searchQuery}"`);
      onNavigate('home');
    }
  };

  return (
    <div className="w-full bg-[#f9fafb] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* MAIN CONTENT (Left 8 Cols) */}
          <main className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-xl shadow-sm border border-gray-200">
            {/* Page Title */}
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              RSVP
            </h1>

            {/* Post Meta Line */}
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

            {/* Hero Image: Ayia Napa Harbor */}
            <div className="rounded-xl overflow-hidden shadow-md mb-8 border border-gray-100 bg-sky-100 aspect-[16/9]">
              <img
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=80"
                alt="Ayia Napa harbor and turquoise waters"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* QM @ FOURTY Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sm:p-8 mb-12 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-7 space-y-3">
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">
                    QM @ FOURTY
                  </h2>
                  <p className="text-sm text-gray-600">
                    Please confirm your attendance
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100/70 border border-amber-200 rounded-lg text-amber-900 font-semibold text-sm">
                    <span className="text-xl font-bold">{goingCount}</span>
                    <span className="text-xs uppercase tracking-wider">Going</span>
                  </div>
                </div>

                <div className="sm:col-span-5 flex flex-col sm:items-end justify-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    RSVP Here
                  </span>

                  {userRsvpStatus === 'going' ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-900 text-xs font-medium space-y-1 w-full text-center">
                      <div className="flex items-center justify-center gap-1.5 text-emerald-700 font-bold">
                        <CheckCircle className="w-4 h-4" />
                        <span>Confirmed Attending!</span>
                      </div>
                      <p>See you in Ayia Napa!</p>
                      <button
                        onClick={handleOpenGoingModal}
                        className="text-[11px] underline text-emerald-800 hover:text-emerald-950 font-semibold"
                      >
                        View or update attendance
                      </button>
                    </div>
                  ) : userRsvpStatus === 'declined' ? (
                    <div className="p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 text-xs font-medium space-y-1 w-full text-center">
                      <div className="flex items-center justify-center gap-1.5 text-gray-600 font-bold">
                        <XCircle className="w-4 h-4" />
                        <span>RSVP: Not Attending</span>
                      </div>
                      <button
                        onClick={handleOpenGoingModal}
                        className="text-[11px] underline text-sky-700 font-semibold"
                      >
                        Change to Attending
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:items-end gap-2 w-full">
                      <button
                        id="rsvp-going-btn"
                        onClick={handleOpenGoingModal}
                        className="w-full sm:w-36 py-3 px-6 bg-[#1e73be] hover:bg-[#165a94] text-white font-bold text-xs uppercase tracking-wider rounded shadow transition-all hover:scale-102"
                      >
                        GOING
                      </button>
                      <button
                        id="rsvp-cant-go-btn"
                        onClick={handleOpenDeclineModal}
                        className="text-xs text-gray-500 hover:text-gray-800 transition-colors font-medium self-center sm:self-end pt-1"
                      >
                        Can't go
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* YOU MIGHT ALSO LIKE (Links to Hotel Tickets) */}
            <div className="border-t border-gray-200 pt-8 mb-12">
              <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-6 flex items-center gap-2">
                <span>›</span> YOU MIGHT ALSO LIKE
              </h3>

              <div
                onClick={() => onNavigate('hotel-tickets')}
                className="group cursor-pointer bg-gray-50 hover:bg-amber-50/50 border border-gray-200 hover:border-amber-200 rounded-xl p-4 transition-all duration-200 flex items-center gap-4 sm:gap-6"
              >
                <div className="w-24 sm:w-32 h-20 sm:h-24 rounded-lg overflow-hidden bg-slate-200 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
                    alt="Alion Beach Hotel Luxury Resort"
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
                    Hotel Tickets
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-1 sm:line-clamp-2">
                    Book your group discounted rooms at Alion Beach Hotel Ayia Napa and secure 50% deposit reservation.
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-white border border-gray-200 group-hover:bg-amber-500 group-hover:text-white flex items-center justify-center text-gray-400 transition-all shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* LEAVE A REPLY (Comments Section) */}
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
                  <span>Thank you! Your reply has been posted successfully.</span>
                </div>
              )}

              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Comment *
                  </label>
                  <textarea
                    id="comment-textarea-rsvp"
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
                      id="comment-name-rsvp"
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
                      id="comment-email-rsvp"
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
                      id="comment-website-rsvp"
                      type="text"
                      value={newComment.website}
                      onChange={(e) => setNewComment({ ...newComment, website: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    id="comment-save-info-rsvp"
                    type="checkbox"
                    checked={newComment.saveInfo}
                    onChange={(e) => setNewComment({ ...newComment, saveInfo: e.target.checked })}
                    className="w-4 h-4 text-sky-600 rounded border-gray-300 focus:ring-sky-500"
                  />
                  <label htmlFor="comment-save-info-rsvp" className="text-xs text-gray-600 select-none">
                    Save my name, email, and website in this browser for the next time I comment.
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    id="post-comment-rsvp-btn"
                    type="submit"
                    className="px-6 py-3 bg-[#1e73be] hover:bg-[#165a94] text-white font-bold text-xs uppercase tracking-wider rounded shadow transition-colors"
                  >
                    POST COMMENT
                  </button>
                </div>
              </form>

              {/* Display existing comments */}
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

          {/* SIDEBAR (Right 4 Cols) */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Search Widget */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h4 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">
                Search
              </h4>
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  id="sidebar-search-input"
                  type="text"
                  placeholder="Search events, hotel, info..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
                <button
                  id="sidebar-search-btn"
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

            {/* Pages Navigation List Widget */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h4 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">
                Quick Navigation
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button
                    id="sidebar-link-hotel-tickets"
                    onClick={() => onNavigate('hotel-tickets')}
                    className="w-full text-left py-2 px-3 rounded-md hover:bg-amber-50 hover:text-amber-800 text-gray-700 font-medium transition-colors flex items-center justify-between"
                  >
                    <span>Hotel Tickets</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Tickets</span>
                  </button>
                </li>
                <li>
                  <button
                    id="sidebar-link-rsvp"
                    onClick={() => onNavigate('rsvp')}
                    className="w-full text-left py-2 px-3 rounded-md bg-amber-50 text-amber-900 font-semibold transition-colors flex items-center justify-between"
                  >
                    <span>RSVP</span>
                    <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded">Active</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Event Summary Card */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-6 rounded-xl border border-amber-200">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-800">
                Official Celebration
              </span>
              <h4 className="font-heading text-xl font-bold text-gray-900 mt-1 mb-2">
                Queen Molly @ 40
              </h4>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                November 27th to December 1st in breathtaking Ayia Napa, Cyprus. Join us for a weekend of sheer celebration, friendship, and luxury.
              </p>
              <div className="text-xs space-y-1 text-gray-700 font-medium">
                <p>📍 Alion Beach Hotel Ayia Napa</p>
                <p>👗 Style: Gala, White Chic & Tiffany</p>
                <p>🏷️ #QM40</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* RSVP INTERACTIVE MODAL */}
      {showRsvpModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-amber-200 relative">
            <button
              onClick={() => setShowRsvpModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100"
            >
              ✕
            </button>

            {rsvpSuccessData ? (
              <div className="text-center py-4 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-gray-900">
                  {rsvpSuccessData.attending ? 'Attendance Confirmed!' : 'Response Recorded'}
                </h3>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-left text-xs space-y-2">
                  <p>
                    <strong>Guest:</strong> {rsvpSuccessData.fullName}
                  </p>
                  <p>
                    <strong>Email:</strong> {rsvpSuccessData.email}
                  </p>
                  {rsvpSuccessData.attending && (
                    <>
                      <p>
                        <strong>Party Size:</strong> {rsvpSuccessData.guestCount} Guest(s)
                      </p>
                      <p>
                        <strong>Arrival Date:</strong> {rsvpSuccessData.arrivalDate}
                      </p>
                    </>
                  )}
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className={rsvpSuccessData.attending ? 'text-emerald-700 font-bold' : 'text-gray-700'}>
                      {rsvpSuccessData.attending ? 'Going to QM@40' : 'Unable to attend'}
                    </span>
                  </p>
                </div>
                <p className="text-xs text-gray-600">
                  A confirmation email has been dispatched to {rsvpSuccessData.email}. We look forward to welcoming you to Cyprus!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      setShowRsvpModal(false);
                      onNavigate('hotel-tickets');
                    }}
                    className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider rounded"
                  >
                    Proceed to Book Hotel
                  </button>
                  <button
                    onClick={() => setShowRsvpModal(false)}
                    className="flex-1 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs uppercase tracking-wider rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs uppercase font-bold text-amber-600 tracking-wider">
                    {isDeclining ? 'Decline Invitation' : 'Confirm Attendance'}
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-gray-900">
                    {isDeclining ? "Sorry You Can't Make It" : 'RSVP for QM @ FOURTY'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Ayia Napa, Cyprus • Nov 27 – Dec 1
                  </p>
                </div>

                <form onSubmit={handleRsvpSubmit} className="space-y-4 text-sm text-gray-700">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="rsvp-modal-fullname"
                      type="text"
                      required
                      placeholder="e.g. Sandra Johnson"
                      value={rsvpForm.fullName}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        id="rsvp-modal-email"
                        type="email"
                        required
                        placeholder="sandra@example.com"
                        value={rsvpForm.email}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        id="rsvp-modal-phone"
                        type="tel"
                        placeholder="+44 7900 123456"
                        value={rsvpForm.phone}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none text-sm"
                      />
                    </div>
                  </div>

                  {!isDeclining && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Total Guests Attending
                          </label>
                          <select
                            id="rsvp-modal-guests"
                            value={rsvpForm.guestCount}
                            onChange={(e) => setRsvpForm({ ...rsvpForm, guestCount: Number(e.target.value) })}
                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none text-sm"
                          >
                            <option value={1}>1 (Just Me)</option>
                            <option value={2}>2 (Me + 1 Guest)</option>
                            <option value={3}>3 Guests</option>
                            <option value={4}>4 Guests</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Estimated Cyprus Arrival
                          </label>
                          <input
                            id="rsvp-modal-arrival"
                            type="date"
                            value={rsvpForm.arrivalDate}
                            onChange={(e) => setRsvpForm({ ...rsvpForm, arrivalDate: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Dietary Preferences / Allergies
                        </label>
                        <input
                          id="rsvp-modal-dietary"
                          type="text"
                          placeholder="e.g. Vegetarian, Halal, Seafood allergy, None"
                          value={rsvpForm.dietary}
                          onChange={(e) => setRsvpForm({ ...rsvpForm, dietary: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none text-sm"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {isDeclining ? 'Warm wishes for Queen Molly' : 'Birthday Message / Note for Queen Molly'}
                    </label>
                    <textarea
                      id="rsvp-modal-message"
                      rows={2}
                      placeholder="Leave a sweet milestone note..."
                      value={rsvpForm.wishes}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, wishes: e.target.value })}
                      className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none text-sm"
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      id="rsvp-modal-submit-btn"
                      type="submit"
                      className={`flex-1 py-3 text-white font-bold text-xs uppercase tracking-wider rounded shadow transition-all ${
                        isDeclining ? 'bg-gray-700 hover:bg-gray-800' : 'bg-[#1e73be] hover:bg-[#165a94]'
                      }`}
                    >
                      {isDeclining ? 'Submit Regret' : 'CONFIRM MY ATTENDANCE'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowRsvpModal(false)}
                      className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
