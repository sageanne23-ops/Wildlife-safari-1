import React, { useState, useMemo } from 'react';
import PageHeader from './PageHeader';
import TourCard from './TourCard';
import { TourPackage } from '../types';
import { Filter, SlidersHorizontal, X } from 'lucide-react';

interface DestinationsProps {
  tours: TourPackage[];
  onViewDetails: (tour: TourPackage) => void;
}

const Destinations: React.FC<DestinationsProps> = ({ tours, onViewDetails }) => {
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>([]);

  // Helper to parse price string "$1,500" -> 1500
  const parsePrice = (price: string) => parseInt(price.replace(/[^0-9]/g, ''));
  
  // Helper to parse duration "3 Days" -> 3
  const parseDuration = (duration: string) => parseInt(duration.split(' ')[0]);

  // Derive all unique highlights for filter options
  const allHighlights = useMemo(() => {
    const highlights = new Set<string>();
    tours.forEach(tour => tour.highlights.forEach(h => highlights.add(h)));
    return Array.from(highlights).sort();
  }, [tours]);

  // Filter logic
  const filteredTours = tours.filter(tour => {
    const price = parsePrice(tour.price);
    const duration = parseDuration(tour.duration);
    
    // Price Filter
    if (price > maxPrice) return false;

    // Duration Filter
    if (selectedDuration === 'short' && duration > 3) return false;
    if (selectedDuration === 'medium' && (duration < 4 || duration > 7)) return false;
    if (selectedDuration === 'long' && duration <= 7) return false;

    // Highlight Filter
    if (selectedHighlights.length > 0) {
      const hasHighlight = selectedHighlights.some(h => tour.highlights.includes(h));
      if (!hasHighlight) return false;
    }

    return true;
  });

  const toggleHighlight = (highlight: string) => {
    setSelectedHighlights(prev => 
      prev.includes(highlight) 
        ? prev.filter(h => h !== highlight)
        : [...prev, highlight]
    );
  };

  const clearFilters = () => {
    setSelectedDuration('all');
    setMaxPrice(6000); 
    setSelectedHighlights([]);
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      <PageHeader 
        title="Our Packages" 
        subtitle="Explore our hand-picked selection of Rwanda's finest experiences."
        image="https://images.unsplash.com/photo-1544258788-b7f73c4f74d0?q=80&w=2070&auto=format&fit=crop"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 mb-10 animate-fade-in-up">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-safari-900 flex items-center gap-2">
              <SlidersHorizontal size={20} className="text-safari-600" /> Filter Packages
            </h3>
            <button 
              onClick={clearFilters}
              className="text-sm text-stone-500 hover:text-red-500 font-medium transition-colors flex items-center gap-1"
            >
              <X size={14} /> Reset Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Duration Filter */}
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-3">Duration</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'All', value: 'all' },
                  { label: '1-3 Days', value: 'short' },
                  { label: '4-7 Days', value: 'medium' },
                  { label: '8+ Days', value: 'long' }
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setSelectedDuration(opt.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedDuration === opt.value
                        ? 'bg-safari-600 text-white shadow-md'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-3">
                Max Price: <span className="text-safari-600">${maxPrice}</span>
              </label>
              <input
                type="range"
                min="0"
                max="6000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-safari-600"
              />
              <div className="flex justify-between text-xs text-stone-400 mt-2">
                <span>$0</span>
                <span>$6,000+</span>
              </div>
            </div>

            {/* Highlights Filter */}
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-3">Highlights</label>
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-2">
                {allHighlights.map(highlight => (
                  <button
                    key={highlight}
                    onClick={() => toggleHighlight(highlight)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                      selectedHighlights.includes(highlight)
                        ? 'bg-safari-50 border-safari-500 text-safari-700'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-safari-300'
                    }`}
                  >
                    {highlight}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-stone-500">
          Showing <span className="font-bold text-safari-900">{filteredTours.length}</span> packages
        </div>

        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
            {filteredTours.map(tour => (
              <TourCard 
                key={tour.id} 
                tour={tour} 
                onViewDetails={onViewDetails} 
                onQuickBook={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-stone-300 animate-fade-in-up">
            <div className="bg-stone-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
              <Filter size={32} />
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">No packages found</h3>
            <p className="text-stone-500 mb-6">Try adjusting your filters to see more results.</p>
            <button 
              onClick={clearFilters}
              className="text-safari-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;