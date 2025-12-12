export interface TourPackage {
  id: string;
  title: string;
  duration: string;
  price: string;
  image: string;
  description: string;
  highlights: string[];
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
  author: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}
