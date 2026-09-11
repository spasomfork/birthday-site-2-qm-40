export type PageView = 'home' | 'rsvp' | 'hotel-tickets';

export interface ItineraryDay {
  id: string;
  day: string;
  date: string;
  title: string;
  style: string;
  description: string;
  highlights: string[];
}

export interface TicketItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  maxPerOrder?: number;
}

export interface CommentItem {
  id: string;
  name: string;
  email: string;
  website?: string;
  content: string;
  date: string;
  page: 'rsvp' | 'hotel-tickets';
}

export interface RsvpSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  attending: boolean;
  guestCount: number;
  arrivalDate: string;
  dietaryRestrictions: string;
  specialNotes?: string;
  submittedAt: string;
}

export interface BookingSubmission {
  id: string;
  bookingRef: string;
  guestName: string;
  email: string;
  phone: string;
  roommateName?: string;
  items: { [ticketId: string]: number };
  totalAmount: number;
  depositAmount: number;
  paymentMethod: 'paypal' | 'bank_transfer';
  submittedAt: string;
}
