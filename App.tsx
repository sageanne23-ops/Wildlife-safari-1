import React, { useState, useEffect } from 'react';
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
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import { TourPackage, PageView, User } from './types';
import { db } from './services/dataService';

function App() {
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageView>('HOME');
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);
  
  // State pulled from DataService (Mock Backend)
  const [tours, setTours] = useState<TourPackage[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // Initial Data Load
  useEffect(() => {
    // In a real app, these would be API calls
    setTours(db.getTours());
  }, []);

  // Poll for updates if in Admin mode (simplified sync)
  useEffect(() => {
     const interval = setInterval(() => {
       setTours(db.getTours());
     }, 1000); // Check for updates every second for demo fluidity
     return () => clearInterval(interval);
  }, []);

  const handleViewDetails = (tour: TourPackage) => {
    setSelectedTour(tour);
    setCurrentPage('TOUR_DETAILS');
    window.scrollTo(0, 0);
  };

  const handleLogin = (userData: {name: string, email: string}) => {
    // Authenticate via service
    const loggedInUser = db.authenticate(userData.email);
    if (loggedInUser) {
      setUser(loggedInUser);
      // Auto-redirect to admin if admin
      if (loggedInUser.role === 'admin') {
         // Optional: alert('Welcome Admin');
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('HOME');
  };

  // --- RENDER LOGIC ---

  if (currentPage === 'ADMIN') {
    if (user?.role !== 'admin') {
      setCurrentPage('HOME'); // Protection
      return null; 
    }
    return <AdminDashboard onNavigateHome={() => setCurrentPage('HOME')} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'HOME':
        return (
          <Home 
            tours={tours} 
            onNavigate={setCurrentPage} 
            onOpenPlanner={() => setIsPlannerOpen(true)}
            onViewDetails={handleViewDetails}
          />
        );
      case 'DESTINATIONS':
        return <Destinations tours={tours} onViewDetails={handleViewDetails} />;
      case 'TOUR_DETAILS':
        return selectedTour ? (
          <TourDetails 
            tour={selectedTour}
            tours={tours}
            onViewDetails={handleViewDetails} 
            onOpenPlanner={() => setIsPlannerOpen(true)}
          />
        ) : <Home tours={tours} onNavigate={setCurrentPage} onOpenPlanner={() => setIsPlannerOpen(true)} onViewDetails={handleViewDetails} />;
      case 'GALLERY':
        return <Gallery />;
      case 'STORIES':
        // Pass stories from DB logic if we were fully converting Stories.tsx, 
        // for now Stories.tsx has internal state but Admin manages a global list in DataService.
        // In a full refactor, Stories.tsx would accept `stories` prop.
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
            tours={tours} 
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
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
        onLogout={handleLogout}
      />
      
      <main>
        {renderPage()}
      </main>

      <Footer onNavigate={setCurrentPage} />
      
      {/* AI Planner Modal - Always available */}
      <AIPlanner isOpen={isPlannerOpen} onClose={() => setIsPlannerOpen(false)} />
      
      {/* Authentication Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLogin={handleLogin} />
    </div>
  );
}

export default App;