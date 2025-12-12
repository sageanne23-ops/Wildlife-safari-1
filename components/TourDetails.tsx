import React, { useState, useMemo } from 'react';
import { Clock, DollarSign, MapPin, Check, X, Calendar, User, Mail, MessageSquare, Info, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { TourPackage } from '../types';
import PageHeader from './PageHeader';
import TourCard from './TourCard';

interface TourDetailsProps {
  tour: TourPackage;
  tours: TourPackage[];
  onViewDetails: (tour: TourPackage) => void;
  onOpenPlanner: () => void;
}

const TourDetails: React.FC<TourDetailsProps> = ({ tour, tours, onViewDetails, onOpenPlanner }) => {
  const [bookingStep, setBookingStep] = useState(1);
  
  // Default data if specific details aren't provided in the mock
  const fullDesc = tour.fullDescription || tour.description;
  const itinerary = tour.dailyItinerary || [
    { day: 1, title: 'Arrival & Welcome', description: 'Arrive in Kigali, transfer to your hotel, and enjoy a welcome dinner.' },
    { day: 2, title: 'Transfer to Park', description: 'Scenic drive through the countryside to the national park.' },
    { day: 3, title: 'The Main Event', description: 'Full day of activities including the main highlight of the tour.' },
  ];
  const inclusions = tour.inclusions || ['Professional English-speaking guide', 'All park fees and permits', 'Accommodation as per itinerary', '4x4 Safari Vehicle', 'Drinking water'];
  const exclusions = tour.exclusions || ['International Flights', 'Visa fees', 'Travel Insurance', 'Personal expenses', 'Tips/Gratuities'];

  // Logic to find related tours based on overlapping highlights
  const relatedTours = useMemo(() => {
    return tours
      .filter(t => t.id !== tour.id)
      .map(t => {
        // Calculate intersection of highlights
        const overlap = t.highlights.filter(h => tour.highlights.includes(h)).length;
        return { tour: t, score: overlap };
      })
      .sort((a, b) => b.score - a.score) // Sort by highest overlap
      .slice(0, 3) // Take top 3
      .map(item => item.tour);
  }, [tour, tours]);

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      <PageHeader 
        title={tour.title} 
        subtitle={`${tour.duration} Adventure in the Heart of Africa`}
        image={tour.image}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Overview Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100">
              <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-stone-100">
                <div className="flex items-center gap-2 text-stone-600">
                  <Clock className="text-safari-500" />
                  <span className="font-semibold">{tour.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <MapPin className="text-safari-500" />
                  <span className="font-semibold">Rwanda</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <DollarSign className="text-safari-500" />
                  <span className="font-semibold">{tour.price} per person</span>
                </div>
              </div>
              
              <h2 className="text-2xl font-serif font-bold text-safari-900 mb-4">Tour Overview</h2>
              <p className="text-stone-600 leading-relaxed text-lg">{fullDesc}</p>
              
              <div className="mt-6 flex gap-2 flex-wrap">
                {tour.highlights.map((h, i) => (
                  <span key={i} className="bg-safari-50 text-safari-700 px-3 py-1 rounded-full text-sm font-medium">
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100">
              <h2 className="text-2xl font-serif font-bold text-safari-900 mb-6 flex items-center gap-2">
                <Calendar className="text-safari-500" /> Daily Itinerary
              </h2>
              <div className="space-y-8">
                {itinerary.map((day) => (
                  <div key={day.day} className="relative pl-8 border-l-2 border-safari-100 last:border-0">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-safari-500 ring-4 ring-safari-50"></div>
                    <span className="text-sm font-bold text-safari-500 uppercase tracking-wider mb-1 block">Day {day.day}</span>
                    <h3 className="text-xl font-bold text-stone-800 mb-2">{day.title}</h3>
                    <p className="text-stone-600 leading-relaxed">{day.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions / Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
                <h3 className="text-lg font-bold text-safari-900 mb-4 flex items-center gap-2">
                  <Check className="text-green-500" size={20} /> What's Included
                </h3>
                <ul className="space-y-3">
                  {inclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-stone-600 text-sm">
                      <Check size={16} className="text-green-500 mt-1 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
                <h3 className="text-lg font-bold text-safari-900 mb-4 flex items-center gap-2">
                  <X className="text-red-500" size={20} /> What's Not Included
                </h3>
                <ul className="space-y-3">
                  {exclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-stone-600 text-sm">
                      <X size={16} className="text-red-500 mt-1 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Important Info Box */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex gap-4">
              <Info className="text-blue-600 shrink-0" />
              <div>
                <h4 className="font-bold text-blue-900 mb-2">Good to Know</h4>
                <p className="text-blue-800 text-sm">
                  Gorilla permits require booking at least 3-6 months in advance due to high demand. 
                  Travel insurance is mandatory for all activities.
                </p>
              </div>
            </div>

          </div>

          {/* Booking Sidebar - Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-safari-100 p-6 sticky top-24">
              <h3 className="text-2xl font-serif font-bold text-safari-900 mb-2">Book This Trip</h3>
              <p className="text-stone-500 text-sm mb-6">Fill out the form below to request a booking or customize this itinerary.</p>

              {bookingStep === 1 ? (
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setBookingStep(2); }}>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-500 uppercase">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-stone-400" size={18} />
                      <input required type="text" className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-safari-500 outline-none" placeholder="Your Name" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-500 uppercase">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-stone-400" size={18} />
                      <input required type="email" className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-safari-500 outline-none" placeholder="name@example.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-500 uppercase">Travel Date</label>
                      <input required type="date" className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-safari-500 outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-500 uppercase">Travelers</label>
                      <input required type="number" min="1" defaultValue="2" className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-safari-500 outline-none" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-500 uppercase">Message / Customization</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 text-stone-400" size={18} />
                      <textarea className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-safari-500 outline-none" rows={3} placeholder="Any dietary needs? Want to extend the trip?"></textarea>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="w-full bg-safari-600 hover:bg-safari-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-safari-500/30">
                      Submit Booking Request
                    </button>
                    <p className="text-xs text-center text-stone-400 mt-3 flex items-center justify-center gap-1">
                      <ShieldCheck size={12} /> No payment required yet.
                    </p>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-stone-800 mb-2">Request Received!</h4>
                  <p className="text-stone-600 mb-6">
                    Thank you for your interest in the <strong>{tour.title}</strong>. Our team will check availability and email you within 24 hours with a formal quote.
                  </p>
                  <button onClick={() => setBookingStep(1)} className="text-safari-600 font-bold hover:underline">
                    Send another request
                  </button>
                </div>
              )}

              {/* Customization Promo */}
              <div className="mt-8 pt-6 border-t border-stone-100">
                <div className="bg-gradient-to-br from-safari-50 to-white rounded-xl p-4 border border-safari-100">
                  <h4 className="font-bold text-safari-900 flex items-center gap-2 mb-2">
                    <Sparkles size={16} className="text-safari-500" /> Want to build from scratch?
                  </h4>
                  <p className="text-stone-600 text-sm mb-3">
                    Use our AI Planner to design a completely custom itinerary suited to your exact needs.
                  </p>
                  <button 
                    onClick={onOpenPlanner}
                    className="w-full bg-white border border-safari-200 text-safari-700 font-bold py-2 rounded-lg hover:bg-safari-50 transition-colors text-sm"
                  >
                    Open AI Planner
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Related Tours Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 border-t border-stone-200">
        <h2 className="text-3xl font-serif font-bold text-safari-900 mb-8 flex items-center gap-3">
          You Might Also Like <ArrowRight className="text-safari-500" size={24} />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedTours.map(relatedTour => (
            <TourCard 
              key={relatedTour.id} 
              tour={relatedTour} 
              onViewDetails={onViewDetails} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourDetails;