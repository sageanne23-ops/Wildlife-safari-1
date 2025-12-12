export interface TourPackage {
  id: string;
  title: string;
  duration: string;
  price: string;
  image: string;
  description: string;
  highlights: string[];
  // Extended Details
  fullDescription?: string;
  dailyItinerary?: { day: number; title: string; description: string }[];
  inclusions?: string[];
  exclusions?: string[];
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
  excerpt: string;
  content: string[]; // Array of paragraphs
  date: string;
  rating: number;
}

export type PageView = 'HOME' | 'DESTINATIONS' | 'TOUR_DETAILS' | 'GALLERY' | 'STORIES' | 'CONTACT' | 'ABOUT' | 'SUSTAINABILITY' | 'FAQ' | 'POLICY';
