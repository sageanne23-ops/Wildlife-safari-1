import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Destinations from './components/Destinations';
import Gallery from './components/Gallery';
import Stories from './components/Stories';
import Contact from './components/Contact';
import About from './components/About';
import Sustainability from './components/Sustainability';
import FAQ from './components/FAQ';
import BookingPolicy from './components/BookingPolicy';
import AIPlanner from './components/AIPlanner';
import TourDetails from './components/TourDetails';
import Footer from './components/Footer';
import { TourPackage, PageView } from './types';

// Expanded Mock Data - 9 Packages with detailed itinerary
const TOURS: TourPackage[] = [
  {
    id: '1',
    title: 'Volcanoes Gorilla Trek',
    duration: '3 Days',
    price: '$1,500',
    image: 'https://images.unsplash.com/photo-1576487248873-1f3020907c8d?q=80&w=2070&auto=format&fit=crop',
    description: 'A once-in-a-lifetime encounter with the majestic mountain gorillas in their natural habitat.',
    fullDescription: 'Experience the thrill of a lifetime as you trek into the dense rainforests of Volcanoes National Park to observe the endangered mountain gorillas in their natural habitat. This immersive 3-day journey also includes a visit to the Iby’iwacu Cultural Village to learn about Rwandan traditions and a chance to spot the rare Golden Monkeys.',
    highlights: ['Gorilla Trekking', 'Golden Monkeys', 'Cultural Visit'],
    dailyItinerary: [
      { day: 1, title: 'Arrival & Transfer to Musanze', description: 'Arrive at Kigali International Airport. Meet your guide for a brief city tour and lunch before a scenic 2.5-hour drive to Musanze, the gateway to Volcanoes National Park.' },
      { day: 2, title: 'Gorilla Trekking Adventure', description: 'Early breakfast followed by a briefing at the park headquarters. Trek into the forest to find your assigned gorilla family. Spend one magical hour observing them. Afternoon visit to the Cultural Village.' },
      { day: 3, title: 'Golden Monkey Trek & Departure', description: 'Morning trek to see the playful Golden Monkeys. Return to the lodge for lunch, then transfer back to Kigali for your departure flight.' }
    ],
    inclusions: ['Gorilla Permit ($1500)', 'Golden Monkey Permit', 'Accommodation', 'All Meals', '4x4 Safari Vehicle', 'English speaking guide'],
    exclusions: ['International Flights', 'Visa Fees', 'Alcoholic Drinks', 'Tips for porters/guides']
  },
  {
    id: '2',
    title: 'Akagera Wildlife Safari',
    duration: '2 Days',
    price: '$800',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop',
    description: 'Explore the savannah plains of Akagera National Park and spot the Big 5.',
    fullDescription: 'Discover Rwanda’s only savannah park, Akagera National Park, home to the Big 5 (Lion, Leopard, Elephant, Rhino, Buffalo). This 2-day safari offers game drives across rolling hills and open plains, as well as a boat cruise on Lake Ihema to see hippos and crocodiles.',
    highlights: ['Game Drives', 'Boat Cruise', 'Big 5 Spotting'],
    dailyItinerary: [
      { day: 1, title: 'Transfer to Akagera & Boat Cruise', description: 'Depart Kigali early morning for Akagera (2.5 hours). Check into your lodge and enjoy lunch. Afternoon boat safari on Lake Ihema to spot aquatic wildlife and water birds.' },
      { day: 2, title: 'Full Day Game Drive', description: 'Wake up for a sunrise game drive. traverse the park from south to north, looking for lions, elephants, giraffes, and rhinos. Exit the park via the north gate and return to Kigali by evening.' }
    ]
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
  },
  {
    id: '7',
    title: 'Ultimate Rwanda Primate Safari',
    duration: '8 Days',
    price: '$3,800',
    image: 'https://images.unsplash.com/photo-1628198758826-6136d837699d?q=80&w=2070&auto=format&fit=crop',
    description: 'The complete primate experience: Gorillas in Volcanoes and Chimps in Nyungwe.',
    highlights: ['Gorillas', 'Chimps', 'Lake Kivu', 'Tea Plantations']
  },
  {
    id: '8',
    title: 'Congo Nile Trail Bike',
    duration: '5 Days',
    price: '$950',
    image: 'https://images.unsplash.com/photo-1596483758478-43d94266133f?q=80&w=2070&auto=format&fit=crop',
    description: 'Mountain bike along the shores of Lake Kivu on the famous Congo Nile Trail.',
    highlights: ['Cycling', 'Village Stays', 'Scenic Landscapes']
  },
  {
    id: '9',
    title: 'Luxury Eco-Retreat',
    duration: '6 Days',
    price: '$5,500',
    image: 'https://images.unsplash.com/photo-1565538965555-d49d97746408?q=80&w=2070&auto=format&fit=crop',
    description: 'Stay in Rwandas most exclusive eco-lodges while experiencing the best wildlife.',
    highlights: ['Private Guides', 'Luxury Lodges', 'Helicopter Transfer']
  }
];

function App() {
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageView>('HOME');
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);

  const handleViewDetails = (tour: TourPackage) => {
    setSelectedTour(tour);
    setCurrentPage('TOUR_DETAILS');
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'HOME':
        return (
          <Home 
            tours={TOURS} 
            onNavigate={setCurrentPage} 
            onOpenPlanner={() => setIsPlannerOpen(true)}
            onViewDetails={handleViewDetails}
          />
        );
      case 'DESTINATIONS':
        return <Destinations tours={TOURS} onViewDetails={handleViewDetails} />;
      case 'TOUR_DETAILS':
        return selectedTour ? (
          <TourDetails 
            tour={selectedTour} 
            onOpenPlanner={() => setIsPlannerOpen(true)}
          />
        ) : <Home tours={TOURS} onNavigate={setCurrentPage} onOpenPlanner={() => setIsPlannerOpen(true)} onViewDetails={handleViewDetails} />;
      case 'GALLERY':
        return <Gallery />;
      case 'STORIES':
        return <Stories />;
      case 'CONTACT':
        return <Contact />;
      case 'ABOUT':
        return <About />;
      case 'SUSTAINABILITY':
        return <Sustainability />;
      case 'FAQ':
        return <FAQ />;
      case 'POLICY':
        return <BookingPolicy />;
      default:
        return (
          <Home 
            tours={TOURS} 
            onNavigate={setCurrentPage} 
            onOpenPlanner={() => setIsPlannerOpen(true)}
            onViewDetails={handleViewDetails}
          />
        );
    }
  };

  return (
    <div className="font-sans text-stone-800 bg-stone-50 selection:bg-safari-200 selection:text-safari-900">
      <Navbar 
        currentPage={currentPage}
        onNavigate={setCurrentPage} 
        onOpenPlanner={() => setIsPlannerOpen(true)} 
      />
      
      <main>
        {renderPage()}
      </main>

      <Footer onNavigate={setCurrentPage} />
      
      {/* AI Planner Modal - Always available */}
      <AIPlanner isOpen={isPlannerOpen} onClose={() => setIsPlannerOpen(false)} />
    </div>
  );
}

export default App;
