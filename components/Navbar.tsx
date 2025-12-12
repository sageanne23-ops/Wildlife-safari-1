import React, { useState, useEffect } from 'react';
import { Menu, X, Compass } from 'lucide-react';

interface NavbarProps {
  onOpenPlanner: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenPlanner }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Stories', href: '#stories' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-safari-950/95 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Compass className={`h-8 w-8 ${isScrolled ? 'text-safari-400' : 'text-white'}`} />
          <span className={`text-2xl font-serif font-bold tracking-wide ${isScrolled ? 'text-white' : 'text-white'}`}>
            Wildlife<span className="text-safari-400">Safari</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className="text-white hover:text-safari-400 transition-colors font-medium text-sm tracking-wide uppercase"
            >
              {link.name}
            </a>
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
        <div className="md:hidden absolute top-full left-0 w-full bg-safari-900 border-t border-safari-800 p-4 flex flex-col space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-white hover:text-safari-400 text-lg py-2 border-b border-safari-800/50"
            >
              {link.name}
            </a>
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
