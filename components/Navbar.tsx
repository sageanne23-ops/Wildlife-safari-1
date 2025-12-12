import React, { useState, useEffect } from 'react';
import { Menu, X, Compass } from 'lucide-react';
import { PageView } from '../types';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenPlanner: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenPlanner }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; value: PageView }[] = [
    { name: 'Home', value: 'HOME' },
    { name: 'Destinations', value: 'DESTINATIONS' },
    { name: 'Gallery', value: 'GALLERY' },
    { name: 'Stories', value: 'STORIES' },
    { name: 'Contact', value: 'CONTACT' },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'bg-safari-950/95 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => handleNavClick('HOME')}
        >
          <Compass className={`h-8 w-8 ${isScrolled || isMobileMenuOpen ? 'text-safari-400' : 'text-white'}`} />
          <span className={`text-2xl font-serif font-bold tracking-wide ${isScrolled || isMobileMenuOpen ? 'text-white' : 'text-white'}`}>
            Wildlife<span className="text-safari-400">Safari</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button 
              key={link.name}
              onClick={() => handleNavClick(link.value)}
              className={`transition-colors font-medium text-sm tracking-wide uppercase ${
                currentPage === link.value 
                  ? 'text-safari-400' 
                  : 'text-white hover:text-safari-400'
              }`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={onOpenPlanner}
            className="bg-safari-500 hover:bg-safari-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <span>AI Trip Planner</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-safari-900 border-t border-safari-800 p-4 flex flex-col space-y-4 shadow-xl h-screen">
          {navLinks.map((link) => (
            <button 
              key={link.name}
              onClick={() => handleNavClick(link.value)}
              className={`text-lg py-3 border-b border-safari-800/50 text-left ${
                currentPage === link.value ? 'text-safari-400' : 'text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenPlanner();
            }}
            className="bg-safari-500 text-white px-4 py-3 rounded-lg font-semibold w-full text-left mt-4"
          >
            Plan My Trip (AI)
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
