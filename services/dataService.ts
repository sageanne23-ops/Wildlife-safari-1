import { TourPackage, Story, Booking, User } from '../types';

// --- MOCK DATA INITIALIZATION ---

const INITIAL_TOURS: TourPackage[] = [
  {
    id: '1',
    title: 'Volcanoes Gorilla Trek',
    duration: '3 Days',
    price: '$1,500',
    image: 'https://images.unsplash.com/photo-1576487248873-1f3020907c8d?q=80&w=2070&auto=format&fit=crop',
    description: 'A once-in-a-lifetime encounter with the majestic mountain gorillas in their natural habitat.',
    fullDescription: 'Experience the thrill of a lifetime as you trek into the dense rainforests of Volcanoes National Park to observe the endangered mountain gorillas in their natural habitat.',
    highlights: ['Gorilla Trekking', 'Golden Monkeys', 'Cultural Visit'],
    dailyItinerary: [
      { day: 1, title: 'Arrival & Transfer', description: 'Arrive at Kigali International Airport. Transfer to Musanze.' },
      { day: 2, title: 'Gorilla Trekking', description: 'Early morning briefing and trek into the forest.' },
      { day: 3, title: 'Departure', description: 'Transfer back to Kigali.' }
    ],
    inclusions: ['Permits', 'Lodging'],
    exclusions: ['Flights']
  },
  {
    id: '2',
    title: 'Akagera Wildlife Safari',
    duration: '2 Days',
    price: '$800',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop',
    description: 'Explore the savannah plains of Akagera National Park and spot the Big 5.',
    highlights: ['Game Drives', 'Boat Cruise', 'Big 5 Spotting'],
  },
  {
    id: '3',
    title: 'Nyungwe Canopy Walk',
    duration: '4 Days',
    price: '$1,200',
    image: 'https://images.unsplash.com/photo-1440557653066-54157b856dc6?q=80&w=1974&auto=format&fit=crop',
    description: 'Walk above the ancient rainforest and track chimpanzees in Nyungwe.',
    highlights: ['Canopy Walk', 'Chimpanzee Trek', 'Waterfall Hike']
  }
];

const INITIAL_STORIES: Story[] = [
  {
    id: '1',
    title: "Face to Face with the Silverbacks",
    author: 'Sarah Jenkins',
    role: 'Adventure Traveler',
    authorImage: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random',
    coverImage: 'https://images.unsplash.com/photo-1576487248873-1f3020907c8d?q=80&w=2070&auto=format&fit=crop',
    excerpt: "The hike was challenging, but the moment I looked into the eyes of a Silverback, time stood still.",
    date: 'October 15, 2023',
    rating: 5,
    status: 'approved',
    content: ["I had dreamed of this moment for years..."]
  },
  {
    id: '2',
    title: "Hidden Gems of Kigali",
    author: 'Mark Doe',
    role: 'Food Blogger',
    authorImage: 'https://ui-avatars.com/api/?name=Mark+Doe&background=random',
    coverImage: 'https://images.unsplash.com/photo-1544258788-b7f73c4f74d0?q=80&w=2070&auto=format&fit=crop',
    excerpt: "Kigali is more than just a stopover.",
    date: 'January 20, 2024',
    rating: 4,
    status: 'pending',
    content: ["The coffee shops here are amazing..."]
  }
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: '101',
    tourId: '1',
    tourTitle: 'Volcanoes Gorilla Trek',
    userId: 'guest@example.com',
    userName: 'Guest User',
    date: '2024-06-15',
    travelers: 2,
    status: 'pending',
    totalPrice: '$3,000',
    createdAt: '2024-02-10'
  }
];

const INITIAL_USERS: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@wildlifesafari.rw', role: 'admin' },
  { id: '2', name: 'John Traveler', email: 'john@example.com', role: 'user' }
];

// --- SERVICE CLASS ---

class DataService {
  private tours: TourPackage[] = INITIAL_TOURS;
  private stories: Story[] = INITIAL_STORIES;
  private bookings: Booking[] = INITIAL_BOOKINGS;
  private users: User[] = INITIAL_USERS;

  // TOURS CRUD
  getTours() { return this.tours; }
  
  addTour(tour: TourPackage) {
    this.tours = [tour, ...this.tours];
    return this.tours;
  }
  
  updateTour(updatedTour: TourPackage) {
    this.tours = this.tours.map(t => t.id === updatedTour.id ? updatedTour : t);
    return this.tours;
  }

  deleteTour(id: string) {
    this.tours = this.tours.filter(t => t.id !== id);
    return this.tours;
  }

  // STORIES CRUD & MODERATION
  getStories(status?: 'approved' | 'pending' | 'rejected') {
    if (status) return this.stories.filter(s => s.status === status);
    return this.stories;
  }

  addStory(story: Story) {
    this.stories = [story, ...this.stories];
    return this.stories;
  }

  updateStoryStatus(id: string, status: 'approved' | 'rejected') {
    this.stories = this.stories.map(s => s.id === id ? { ...s, status } : s);
    return this.stories;
  }

  // BOOKINGS
  getBookings() { return this.bookings; }

  createBooking(booking: Booking) {
    this.bookings = [booking, ...this.bookings];
    return booking;
  }

  updateBookingStatus(id: string, status: 'confirmed' | 'rejected') {
    this.bookings = this.bookings.map(b => b.id === id ? { ...b, status } : b);
    return this.bookings;
  }

  // USERS
  getUsers() { return this.users; }
  
  authenticate(email: string): User | null {
    // Simple mock auth
    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) return user;
    
    // Auto-register if not found for demo purposes, default to USER role
    const newUser: User = {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email: email,
      role: email.includes('admin') ? 'admin' : 'user' // Backdoor for demo: use 'admin' in email to be admin
    };
    this.users.push(newUser);
    return newUser;
  }
}

export const db = new DataService();