import { ItineraryDay, TicketItem } from '../types';

export const EVENT_DETAILS = {
  celebrant: 'Molly Ore',
  title: 'QM@40',
  fullTitle: 'COUNTDOWN TO BIG 40',
  destination: 'Ayia Napa, Cyprus',
  dates: 'Nov 27th – Dec 1st',
  officialHashtag: '#QM40',
  paypalEmail: 'kemore@yahoo.com',
  bankDetails: {
    bank: 'TSB BANK',
    accountName: 'Mrs C M Billeck',
    sortCode: '776673',
    accountNumber: '00126348',
    reference: 'QM40 & Your Name',
  },
  depositDeadline: 'August 5th (50% Deposit)',
  balanceDeadline: 'October 15th (Final 50% Balance)',
};

export const ITINERARY_DAYS: ItineraryDay[] = [
  {
    id: 'day-1',
    day: 'Wednesday',
    date: '27th November:',
    title: 'Check-in / Arrival of All Guests',
    style: "Style: 'Free-Style'",
    description: 'Welcome to Cyprus! Guests arrive at Larnaca or Paphos airports and transfer to Alion Beach Hotel, Ayia Napa. Relax by the Mediterranean shores or hotel pool before evening casual greetings.',
    highlights: [
      'Airport Meet & Greet / Hotel Check-in at Alion Beach Hotel',
      'Unpack, unwind, and poolside relaxation',
      'Welcome Cocktail Hour at the Lounge Terrace (7:00 PM)',
      'Free-style dinner & casual stroll along the marina',
    ],
  },
  {
    id: 'day-2',
    day: 'Thursday',
    date: '28th November',
    title: 'Private Catamaran Cruise & Sunset Soirée',
    style: "Style: 'All White Resort Glam'",
    description: 'We embark on a luxury private charter along Cape Greco, visiting the legendary Blue Lagoon and Sea Caves. Swim, snorkel, sip chilled champagne, and capture unforgettable memories.',
    highlights: [
      '11:00 AM: Transfer to Ayia Napa Marina',
      '12:00 PM – 4:30 PM: Private Catamaran Cruise & Mediterranean BBQ on-board',
      'Swim stop at the crystal-clear Blue Lagoon & Lovers Bridge photos',
      '7:30 PM: Seaside dinner under the stars at Columbia Beach Lounge',
    ],
  },
  {
    id: 'day-3',
    day: 'Friday',
    date: '29th November',
    title: "Queen Molly's Big 40 Birthday Gala Night",
    style: "Style: 'Black Tie & High Glamour (Gold & Black Elegance)'",
    description: "The main celebratory evening celebrating Queen Molly's 40th milestone! A night of fine dining, heartfelt toasts, live entertainment, and dancing into the early morning.",
    highlights: [
      '6:30 PM: Red Carpet Champagne Reception & Step-and-Repeat photos',
      '7:30 PM: Five-Course Gourmet Birthday Banquet',
      '9:00 PM: Milestone Toasts, Cake Cutting & Special Guest Performances',
      '10:30 PM – Late: Gala Afterparty with International DJ',
    ],
  },
  {
    id: 'day-4',
    day: 'Saturday',
    date: '30th November',
    title: 'VIP Beach Club Day & Ayia Napa Nightlife Extravaganza',
    style: "Style: 'Day: Tropical Luxe Chic / Night: Club Glamour'",
    description: 'Bask in the warm Cyprus sunshine at VIP cabanas at Nissi Beach Club, followed by an exhilarating night exploring the famous Ayia Napa nightlife strip.',
    highlights: [
      '1:00 PM: VIP Daybeds & Sunsets at Nissi Beach Club / Kalivia Beach Bar',
      'Cocktails, chilled house beats, and seaside dancing',
      '8:30 PM: Tapas & Mezze Pre-drinks',
      '11:00 PM: Superclub Experience at The Castle Nightclub, Encore & Ambassaden Club',
    ],
  },
  {
    id: 'day-5',
    day: 'Sunday',
    date: '1st December',
    title: 'Breakfast in Tiffany Aso-Ebi & Farewell Recovery Brunch',
    style: "Style: 'Breakfast in Tiffany / Elegant Pastel Resort'",
    description: 'A relaxed final morning gathering for our signature Breakfast in Tiffany Aso-Ebi brunch, sharing photos, parting gifts, and fond farewells before airport departures.',
    highlights: [
      '10:30 AM: Lavish Farewell Champagne Brunch at Alion Palm Garden',
      'Presentation of Event Photo Keepsakes & Gift Bags',
      '1:00 PM onwards: Checkout and scheduled departure shuttles to Larnaca & Paphos',
    ],
  },
];

export const TICKET_ITEMS: TicketItem[] = [
  {
    id: 'double-park-view',
    name: 'Double park view room',
    price: 182.00,
    description: 'Based on 2 persons sharing. Comfortable 5-star room overlooking lush tranquil parkland with private balcony.',
  },
  {
    id: 'double-side-sea-view',
    name: 'Double side sea view room',
    price: 195.00,
    description: 'Based on 2 persons sharing. Beautiful room angled with picturesque views of the azure Mediterranean coastline.',
  },
  {
    id: 'double-sea-view',
    name: 'Double sea view room',
    price: 210.00,
    description: 'Based on 2 persons sharing. Direct breathtaking panoramic Mediterranean sea views with private terrace.',
  },
  {
    id: 'half-board-supplement',
    name: 'Optional half board supplement per person',
    price: 70.00,
    description: 'Includes sumptuous daily gourmet buffet dinners at Alion Beach Hotel restaurants for the duration.',
  },
  {
    id: 'breakfast-tiffany-asoebi',
    name: 'Breakfast in Tiffany Aso-Ebi',
    price: 50.00,
    description: 'Official commemorative celebration attire package for the Sunday morning Tiffany-themed farewell brunch.',
  },
  {
    id: 'panoramic-room',
    name: 'Panoramic Room',
    price: 340.00,
    description: 'Elevated luxury corner accommodation with wrap-around floor-to-ceiling glass windows and expansive balcony.',
  },
  {
    id: 'executive-suite',
    name: 'Executive Suite',
    price: 650.00,
    description: 'The pinnacle of luxury at Alion Beach Hotel: expansive master bedroom, separate lounge salon, and deluxe sea terrace.',
  },
];

export const NIGHTCLUBS = [
  {
    name: 'The Castle Nightclub',
    description: 'The largest club in Cyprus with 3 distinct musical arenas and a monumental fortress castle facade.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
    tag: 'Iconic Venue',
  },
  {
    name: 'Encore Nightclub',
    description: 'Vibrant indoor & open-air party hotspot featuring high-energy lighting, state-of-the-art sound, and VIP booths.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1000&q=80',
    tag: 'Premium Sound',
  },
  {
    name: 'Ambassaden Club',
    description: 'Beloved party venue famed for international guest DJs, top-shelf bottle service, and electric festival atmosphere.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
    tag: 'VIP Bottle Service',
  },
];

export const BEACH_CLUBS = [
  {
    name: 'Nissi Beach Club & Bay',
    description: 'World-famous turquoise lagoon beach club with white sands, resident sunset DJs, and sun-soaked daybeds.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    tag: 'Golden Sands',
  },
  {
    name: 'Isola Beach Club',
    description: 'Chic boho-luxe seaside haven offering chilled artisan cocktails, fresh sushi, and plush cabanas.',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1000&q=80',
    tag: 'Boho Chic',
  },
  {
    name: 'Kalivia on the Beach & Serena',
    description: 'Atmospheric Mediterranean oasis with romantic ocean breezes, sunset parties, and waterfront dining.',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=80',
    tag: 'Sunset Sessions',
  },
];

export const PLACES_TO_VISIT = [
  {
    title: 'Sea Caves',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    description: 'Carved by the forces of nature, the Ayia Napa Sea Caves offer a stunning display of geological beauty. Visitors can explore the rocky coastline, discover hidden caves, and even dive into the crystal-clear waters.',
  },
  {
    title: 'The Blue Lagoon',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    description: 'Known for its mesmerizing shades of blue, the Blue Lagoon is a tranquil spot perfect for swimming and snorkeling. Its shallow, warm waters make it an ideal destination for families and water enthusiasts alike.',
  },
  {
    title: 'The Bridge of Lovers',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    description: "The Bridge of Lovers, also known as Love Bridge, is a natural arch over the sea that offers a romantic setting and breathtaking views. It's a popular spot for couples to enjoy the serene environment and capture memorable photos against the backdrop of the Mediterranean Sea.",
  },
];

export const CONTACT_PERSONS = [
  {
    number: '1',
    name: 'Mrs. Sarah Jenkins',
    phone: '+44 7700 900128',
    role: 'Company: Event Planner & Coordinator, Du Coeur Eventz (for all payments)',
  },
  {
    number: '2',
    name: 'Mrs. Elena Vance',
    phone: '+44 7700 900342',
    role: 'Company: Logistics & Hotel Support: LUX CONCIERGE',
  },
  {
    number: '3',
    name: 'Mrs. Victoria Adams',
    phone: '+44 7700 900567',
    role: 'Company: ASO-EBI LOGISTICS: QM GROUP',
  },
  {
    number: '4',
    name: 'Mrs. Grace Sterling',
    phone: '+44 7700 900891',
    role: 'Company: Horizon Concierge (Cyprus & Schengen Visa Assistance)',
  },
];
