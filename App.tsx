import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TourCard from './components/TourCard';
import AIPlanner from './components/AIPlanner';
import Gallery from './components/Gallery';
import Stories from './components/Stories';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { TourPackage } from './types';
import { Check, Leaf, Heart } from 'lucide-react';

// Expanded Mock Data
const POPULAR_TOURS: TourPackage[] = [
  {
    id: '1',
    title: 'Volcanoes Gorilla Trek',
    duration: '3 Days',
    price: '$1,500',
    image: 'https://images.unsplash.com/photo-1576487248873-1f3020907c8d?q=80&w=2070&auto=format&fit=crop',
    description: 'A once-in-a-lifetime encounter with the majestic mountain gorillas in their natural habitat.',
    highlights: ['Gorilla Trekking', 'Golden Monkeys', 'Cultural Visit']
  },
  {
    id: '2',
    title: 'Akagera Wildlife Safari',
    duration: '2 Days',
    price: '$800',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop',
    description: 'Explore the savannah plains of Akagera National Park and spot the Big 5.',
    highlights: ['Game Drives', 'Boat Cruise', 'Big 5 Spotting']
  },
  {
    id: '3',
    title: 'Nyungwe Canopy Walk',
    duration: '4 Days',
    price: '$1,200',
    image: 'https://images.unsplash.com/photo-1440557653066-54157b856dc6?q=80&w=1974&auto=format&fit=crop',
    description: 'Walk above the ancient rainforest and track chimpanzees in Nyungwe.',
    highlights: ['Canopy Walk', 'Chimpanzee Trek', 'Waterfall Hike']
  },
  {
    id: '4',
    title: 'Lake Kivu Kayak Adventure',
    duration: '2 Days',
    price: '$450',
    image: 'https://images.unsplash.com/photo-1544258788-b7f73c4f74d0?q=80&w=2070&auto=format&fit=crop',
    description: 'Paddle through the serene waters of Lake Kivu and explore beautiful islands and fishing villages.',
    highlights: ['Kayaking', 'Island Hopping', 'Coffee Tour']
  },
  {
    id: '5',
    title: 'Mount Bisoke Crater Hike',
    duration: '1 Day',
    price: '$200',
    image: 'https://images.unsplash.com/photo-1650366657270-496696d0df0b?q=80&w=2070&auto=format&fit=crop',
    description: 'A challenging but rewarding hike to the summit of Mount Bisoke featuring a beautiful crater lake.',
    highlights: ['Volcano Hike', 'Crater Lake', 'Scenic Views']
  },
  {
    id: '6',
    title: 'Kigali Cultural & History',
    duration: '1 Day',
    price: '$120',
    image: 'https://images.unsplash.com/photo-1577703838048-73b8dbefd031?q=80&w=2067&auto=format&fit=crop',
    description: 'Immerse yourself in the history and vibrant culture of Rwandas capital city.',
    highlights: ['Genocide Memorial', 'Local Market', 'Art Galleries']
  }
];

function App() {
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);

  return (
    <div className="font-sans text-stone-800 bg-stone-50 selection:bg-safari-200 selection:text-safari-900">
      <Navbar onOpenPlanner={() => setIsPlannerOpen(true)} />
      
      <main>
        <Hero onCtaClick={() => setIsPlannerOpen(true)} />

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

        {/* Featured Destinations */}
        <section id="destinations" className="py-24 bg-stone-100 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-safari-200/30 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div className="mb-6 md:mb-0">
                <h2 className="text-sm font-bold tracking-widest text-safari-600 uppercase mb-2">Our Packages</h2>
                <h3 className="text-4xl font-serif font-bold text-safari-900">Curated Adventures</h3>
              </div>
              <button className="text-safari-600 font-semibold hover:text-safari-700 hover:underline underline-offset-4 flex items-center">
                View All Packages <span className="ml-2">&rarr;</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {POPULAR_TOURS.map(tour => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </section>

        {/* About Rwanda Brief */}
        <section id="about" className="py-24 bg-safari-900 text-white relative overflow-hidden">
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
               <button onClick={() => setIsPlannerOpen(true)} className="mt-8 bg-safari-500 hover:bg-safari-400 text-white px-8 py-3 rounded-full font-bold transition-colors">
                 Plan Your Visit
               </button>
             </div>
           </div>
        </section>

        {/* New Sections */}
        <Gallery />
        <Stories />
        <Contact />

      </main>

      <Footer />
      
      {/* AI Planner Modal */}
      <AIPlanner isOpen={isPlannerOpen} onClose={() => setIsPlannerOpen(false)} />
    </div>
  );
}

export default App;
