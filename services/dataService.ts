import { TourPackage, Story, Booking, User, Destination } from '../types';

const INITIAL_DESTINATIONS: Destination[] = [
  { id: 'd1', name: 'Volcanoes National Park', image: 'https://images.unsplash.com/photo-1576487248873-1f3020907c8d', description: 'Home of the Mountain Gorillas.', packageCount: 1 },
  { id: 'd2', name: 'Akagera National Park', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801', description: 'Savannah and the Big Five.', packageCount: 1 },
  { id: 'd3', name: 'Nyungwe Forest', image: 'https://images.unsplash.com/photo-1440557653066-54157b856dc6', description: 'Ancient rainforest and primates.', packageCount: 1 }
];

const INITIAL_TOURS: TourPackage[] = [
  {
    id: '1',
    title: 'Volcanoes Gorilla Trek',
    duration: '3 Days',
    price: '$1,500',
    image: 'https://images.unsplash.com/photo-1576487248873-1f3020907c8d?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1628198758826-6136d837699d',
      'https://images.unsplash.com/photo-1626270726888-2d8540a83856'
    ],
    description: 'A once-in-a-lifetime encounter with the majestic mountain gorillas.',
    fullDescription: 'Experience the thrill of a lifetime as you trek into the dense rainforests.',
    highlights: ['Gorilla Trekking', 'Golden Monkeys', 'Cultural Visit'],
    destinationId: 'd1',
    dailyItinerary: [
      { day: 1, title: 'Arrival in Kigali', description: 'Transfer to Musanze and check-in at your lodge.' },
      { day: 2, title: 'Gorilla Trekking Day', description: 'Early morning briefing followed by a guided trek to find the gorillas.' },
      { day: 3, title: 'Cultural Experience', description: 'Visit a local village before transferring back to Kigali.' }
    ],
    inclusions: ['Gorilla Permit', 'Private Vehicle', 'Expert Guide'],
    exclusions: ['International Flights', 'Tips']
  },
  // ... more tours
];

const INITIAL_STORIES: Story[] = [
  {
    id: '1',
    title: "Face to Face with the Silverbacks",
    author: 'Sarah Jenkins',
    role: 'Adventure Traveler',
    authorImage: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random',
    coverImage: 'https://images.unsplash.com/photo-1576487248873-1f3020907c8d',
    excerpt: "The moment I looked into the eyes of a Silverback, time stood still.",
    date: 'Oct 15, 2023',
    rating: 5,
    status: 'approved',
    content: ["I had dreamed of this moment for years..."]
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

class DataService {
  private tours: TourPackage[] = INITIAL_TOURS;
  private destinations: Destination[] = INITIAL_DESTINATIONS;
  private stories: Story[] = INITIAL_STORIES;
  private bookings: Booking[] = INITIAL_BOOKINGS;
  private users: User[] = INITIAL_USERS;

  // TOURS
  getTours() { return this.tours; }
  addTour(tour: TourPackage) { this.tours = [tour, ...this.tours]; return this.tours; }
  updateTour(updated: TourPackage) { this.tours = this.tours.map(t => t.id === updated.id ? updated : t); return this.tours; }
  deleteTour(id: string) { this.tours = this.tours.filter(t => t.id !== id); return this.tours; }

  // DESTINATIONS
  getDestinations() { return this.destinations; }
  addDestination(dest: Destination) { this.destinations = [dest, ...this.destinations]; return this.destinations; }
  updateDestination(updated: Destination) { this.destinations = this.destinations.map(d => d.id === updated.id ? updated : d); return this.destinations; }
  deleteDestination(id: string) { this.destinations = this.destinations.filter(d => d.id !== id); return this.destinations; }

  // BOOKINGS
  getBookings() { return this.bookings; }
  updateBookingStatus(id: string, status: 'confirmed' | 'rejected') {
    this.bookings = this.bookings.map(b => b.id === id ? { ...b, status } : b);
    return this.bookings;
  }

  // STORIES
  getStories() { return this.stories; }
  updateStoryStatus(id: string, status: 'approved' | 'rejected') {
    this.stories = this.stories.map(s => s.id === id ? { ...s, status } : s);
    return this.stories;
  }

  // USERS
  getUsers() { return this.users; }
  addUser(user: Partial<User>) {
    const newUser: User = {
      id: Date.now().toString(),
      name: user.name || 'New User',
      email: user.email || '',
      role: user.role || 'user',
      avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=random`
    };
    this.users = [newUser, ...this.users];
    return this.users;
  }
  deleteUser(id: string) { this.users = this.users.filter(u => u.id !== id); return this.users; }
  updateUserRole(id: string, role: 'admin' | 'user') { this.users = this.users.map(u => u.id === id ? { ...u, role } : u); return this.users; }
  
  authenticate(email: string): User | null {
    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) return user;
    const newUser: User = {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email: email,
      role: email.includes('admin') ? 'admin' : 'user'
    };
    this.users.push(newUser);
    return newUser;
  }
}

export const db = new DataService();