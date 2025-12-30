
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export interface TourPackage {
  id: string;
  title: string;
  duration: string;
  price: string;
  image: string; // Cover image
  gallery?: string[]; // Multiple images
  description: string;
  highlights: string[];
  destinationId?: string;
  // Extended Details
  fullDescription?: string;
  dailyItinerary: { 
    day: number; 
    title: string; 
    description: string;
    accommodation?: string;
    meals?: string;
  }[];
  inclusions: string[];
  exclusions: string[];
}

export interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  packageCount: number;
  // New fields added for specific destination offers
  price?: string;
  highlights?: string[];
}

export interface Booking {
  id: string;
  tourId: string;
  tourTitle: string;
  userId: string; // email or id
  userName: string;
  date: string;
  travelers: number;
  status: 'pending' | 'confirmed' | 'rejected';
  totalPrice?: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface NewsletterSignup {
  id: string;
  email: string;
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    twitter: string;
    whatsapp: string;
  };
  maintenanceMode: boolean;
}

export interface PlannerState {
  budget: string;
  days: string;
  interests: string[];
  travelers: string;
}

export enum PlannerStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface GeneratedItinerary {
  content: string;
}

export interface Story {
  id: string;
  title: string;
  author: string;
  role: string;
  authorImage: string;
  coverImage: string;
  gallery?: string[];
  excerpt: string;
  content: string[]; 
  date: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
}

export type PageView = 'HOME' | 'DESTINATIONS' | 'TOUR_DETAILS' | 'GALLERY' | 'STORIES' | 'CONTACT' | 'ABOUT' | 'SUSTAINABILITY' | 'FAQ' | 'POLICY' | 'ADMIN';
