import React from 'react';
import Hero from './Hero';
import TourCard from './TourCard';
import { TourPackage, PageView } from '../types';
import { Check, Leaf, Heart, ArrowRight } from 'lucide-react';

interface HomeProps {
  tours: TourPackage[];
  onNavigate: (page: PageView) => void;
  onOpenPlanner: () => void;
  onViewDetails: (tour: TourPackage) => void;
}

const Home: React.FC<HomeProps> = ({ tours, onNavigate, onOpenPlanner, onViewDetails }) => {
  return (
    <>
      <Hero onCtaClick={onOpenPlanner} />

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-safari-600 uppercase mb-2">Why Choose Us</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-safari-900">Experience Rwanda Like Never Before</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-6 rounded-2xl bg-stone-50 hover:bg-safari-50 transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-safari-100 text-safari-600 mb-6">
                <Check size={32} />
              </div>
              <h4 className="text-xl font-bold mb-4 text-safari-900">Reliable & Trusted</h4>
              <p className="text-stone-600">Over 10 years of crafting unforgettable experiences with a 100% safety record.</p>
            </div>
            <div className="p-6 rounded-2xl bg-stone-50 hover:bg-safari-50 transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-safari-100 text-safari-600 mb-6">
                <Leaf size={32} />
              </div>
              <h4 className="text-xl font-bold mb-4 text-safari-900">Eco-Friendly</h4>
              <p className="text-stone-600">We prioritize sustainable tourism practices that protect Rwanda's natural beauty.</p>
            </div>
            <div className="p-6 rounded-2xl bg-stone-50 hover:bg-safari-50 transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-safari-100 text-safari-600 mb-6">
                <Heart size={32} />
              </div>
              <h4 className="text-xl font-bold mb-4 text-safari-900">Tailored For You</h4>
              <p className="text-stone-600">Use our AI planner or speak to an agent to create a custom itinerary that suits your needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations (Preview) */}
      <section id="destinations" className="py-24 bg-stone-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-safari-200/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="mb-6 md:mb-0">
              <h2 className="text-sm font-bold tracking-widest text-safari-600 uppercase mb-2">Our Packages</h2>
              <h3 className="text-4xl font-serif font-bold text-safari-900">Curated Adventures</h3>
            </div>
            <button 
              onClick={() => onNavigate('DESTINATIONS')}
              className="text-safari-600 font-semibold hover:text-safari-700 hover:underline underline-offset-4 flex items-center"
            >
              View All Packages <span className="ml-2">&rarr;</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.slice(0, 3).map(tour => (
              <TourCard key={tour.id} tour={tour} onViewDetails={onViewDetails} />
            ))}
          </div>
        </div>
      </section>

      {/* About Rwanda Brief */}
      <section className="py-24 bg-safari-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <img src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2072&auto=format&fit=crop" className="w-full h-full object-cover grayscale" alt="Pattern" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1517013892700-1c6e11894d80?q=80&w=2070&auto=format&fit=crop" 
                alt="Rwanda Culture" 
                className="rounded-lg shadow-2xl border-4 border-safari-700/50 transform rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-4xl font-serif font-bold">More Than Just Gorillas</h2>
              <p className="text-safari-100 text-lg leading-relaxed">
                Rwanda is a country of resilience, warmth, and unparalleled beauty. From the bustling streets of Kigali, one of the cleanest cities in Africa, to the tranquil waters of Lake Kivu, every corner tells a story.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div>
                  <span className="block text-3xl font-bold text-safari-400">4</span>
                  <span className="text-sm text-gray-400">National Parks</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold text-safari-400">1000+</span>
                  <span className="text-sm text-gray-400">Hills to Climb</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold text-safari-400">30°C</span>
                  <span className="text-sm text-gray-400">Avg Temperature</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold text-safari-400">Safe</span>
                  <span className="text-sm text-gray-400">Travel Destination</span>
                </div>
              </div>
              <button onClick={onOpenPlanner} className="mt-8 bg-safari-500 hover:bg-safari-400 text-white px-8 py-3 rounded-full font-bold transition-colors">
                Plan Your Visit
              </button>
            </div>
          </div>
      </section>

      {/* Featured Stories Teaser */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="mb-6 md:mb-0">
              <h2 className="text-sm font-bold tracking-widest text-safari-600 uppercase mb-2">Travel Diaries</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-safari-900">Latest from the Blog</h3>
            </div>
            <button 
              onClick={() => onNavigate('STORIES')}
              className="text-safari-600 font-semibold hover:text-safari-700 hover:underline underline-offset-4 flex items-center"
            >
              Read All Stories <ArrowRight size={20} className="ml-2" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group cursor-pointer" onClick={() => onNavigate('STORIES')}>
              <div className="rounded-2xl overflow-hidden h-64 mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1576487248873-1f3020907c8d?q=80&w=2070&auto=format&fit=crop" 
                  alt="Gorilla" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-sm text-safari-600 font-bold mb-2 uppercase tracking-wider">October 15, 2023</p>
              <h3 className="text-2xl font-serif font-bold text-safari-900 mb-3 group-hover:text-safari-600 transition-colors">
                Face to Face with the Silverbacks: My Gorilla Trekking Experience
              </h3>
              <p className="text-stone-600 leading-relaxed line-clamp-2">
                The hike was challenging, the mud was deep, but the moment I looked into the eyes of a massive Silverback, time stood still.
              </p>
            </div>
            <div className="group cursor-pointer" onClick={() => onNavigate('STORIES')}>
              <div className="rounded-2xl overflow-hidden h-64 mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1544258788-b7f73c4f74d0?q=80&w=2070&auto=format&fit=crop" 
                  alt="Kigali" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-sm text-safari-600 font-bold mb-2 uppercase tracking-wider">November 02, 2023</p>
              <h3 className="text-2xl font-serif font-bold text-safari-900 mb-3 group-hover:text-safari-600 transition-colors">
                Beyond the Safari: Discovering Kigali's Vibrant Culture
              </h3>
              <p className="text-stone-600 leading-relaxed line-clamp-2">
                 Kigali is often just a stopover, but I found a city pulsing with art, history, and some of the best coffee I've ever tasted.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
