import React from 'react';
import { Clock, DollarSign, MapPin } from 'lucide-react';
import { TourPackage } from '../types';

interface TourCardProps {
  tour: TourPackage;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-stone-100">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={tour.image} 
          alt={tour.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-safari-700 font-bold text-sm shadow-sm">
          Best Seller
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-serif font-bold text-safari-900 mb-2">{tour.title}</h3>
        <p className="text-stone-600 mb-4 line-clamp-2 text-sm leading-relaxed">{tour.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tour.highlights.slice(0, 3).map((highlight, index) => (
            <span key={index} className="bg-safari-50 text-safari-700 text-xs px-2.5 py-1 rounded-md font-medium">
              {highlight}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <div className="flex flex-col">
            <div className="flex items-center text-stone-500 text-sm mb-1">
              <Clock size={14} className="mr-1" /> {tour.duration}
            </div>
            <div className="flex items-center text-stone-500 text-sm">
              <MapPin size={14} className="mr-1" /> Rwanda
            </div>
          </div>
          <div className="text-right">
            <span className="block text-xs text-stone-400">From</span>
            <span className="flex items-center text-xl font-bold text-safari-700">
              <DollarSign size={18} />{tour.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
