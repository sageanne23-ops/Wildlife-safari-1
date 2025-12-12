import React from 'react';
import PageHeader from './PageHeader';
import TourCard from './TourCard';
import { TourPackage } from '../types';

interface DestinationsProps {
  tours: TourPackage[];
  onViewDetails: (tour: TourPackage) => void;
}

const Destinations: React.FC<DestinationsProps> = ({ tours, onViewDetails }) => {
  return (
    <div className="bg-stone-50 min-h-screen">
      <PageHeader 
        title="Our Packages" 
        subtitle="Explore our hand-picked selection of Rwanda's finest experiences."
        image="https://images.unsplash.com/photo-1544258788-b7f73c4f74d0?q=80&w=2070&auto=format&fit=crop"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map(tour => (
            <TourCard key={tour.id} tour={tour} onViewDetails={onViewDetails} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
