import React, { useState, useEffect } from 'react';
import { Menu, X, User as UserIcon, LogOut, ChevronDown } from 'lucide-react';
import { PageView } from '../types';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenPlanner: () => void;
  onOpenAuth: () => void;
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

// TODO: Replace this URL with your actual logo image path (e.g., '/logo.png')
const LOGO_URL = "https://ui-avatars.com/api/?name=WS&background=34ae6f&color=fff&size=128&rounded=true&bold=true";

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenPlanner, onOpenAuth, user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

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
        isScrolled || isMobileMenuOpen ? 'bg-safari-950/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo Section */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavClick('HOME')}
        >
          <div className={`relative overflow-hidden rounded-full border-2 border-white/20 transition-all duration-300 ${isScrolled ? 'h-10 w-10' : 'h-14 w-14 group-hover:scale-105'}`}>
            <img 
              src={LOGO_URL} 
              alt="Wildlife Safaris Logo" 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className={`font-serif font-bold leading-none tracking-wide transition-colors ${isScrolled ? 'text-lg text-white' : 'text-xl text-white'}`}>
              Wildlife<span className="text-safari-400">Safaris</span>
            </span>
            <span className={`text-[9px] uppercase tracking-[0.2em] font-medium transition-colors ${isScrolled ? 'text-safari-400' : 'text-safari-200'}`}>
              Beyond Expectation
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <button 
              key={link.name}
              onClick={() => handleNavClick(link.value)}
              className={`transition-colors font-medium text-sm tracking-wide uppercase relative group ${
                currentPage === link.value 
                  ? 'text-safari-400' 
                  : 'text-white hover:text-safari-400'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-safari-400 transition-all duration-300 ${currentPage === link.value ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
          ))}
          
          <div className="h-6 w-px bg-white/20 mx-2"></div>

          {/* AI Planner Button */}
          <button 
            onClick={onOpenPlanner}
            className="bg-safari-500 hover:bg-safari-600 text-white px-5 py-2 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 text-sm"
          >
            <span>AI Planner</span>
          </button>

          {/* User Auth Section */}
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 text-white hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-safari-800 border border-safari-400 flex items-center justify-center text-safari-200 font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className="text-sm font-medium max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                <ChevronDown size={14} className="text-white/60" />
              </button>

              {/* Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-stone-100 py-1 overflow-hidden animate-fade-in-up">
                   <div className="px-4 py-3 border-b border-stone-100">
                     <p className="text-xs text-stone-500">Signed in as</p>
                     <p className="text-sm font-bold text-safari-900 truncate">{user.email}</p>
                   </div>
                   <button className="w-full text-left px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-safari-600 transition-colors">
                     My Bookings
                   </button>
                   <button className="w-full text-left px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-safari-600 transition-colors">
                     Saved Trips
                   </button>
                   <div className="border-t border-stone-100 my-1"></div>
                   <button 
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
                   >
                     <LogOut size={14} /> Sign Out
                   </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="text-white hover:text-safari-400 font-medium text-sm flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <UserIcon size={18} />
              <span>Sign In</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-safari-900 border-t border-safari-800 p-4 flex flex-col space-y-4 shadow-xl h-screen animate-fade-in overflow-y-auto pb-20">
          
          {/* User Section Mobile */}
          {user ? (
             <div className="bg-safari-800/50 rounded-xl p-4 flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-safari-700 border-2 border-safari-500 flex items-center justify-center text-xl text-white font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold">{user.name}</p>
                  <p className="text-safari-300 text-xs">{user.email}</p>
                </div>
             </div>
          ) : (
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAuth();
              }}
              className="w-full bg-white/10 text-white p-3 rounded-lg font-bold flex items-center justify-center gap-2 mb-2"
            >
              <UserIcon size={18} /> Sign In / Join
            </button>
          )}

          {navLinks.map((link) => (
            <button 
              key={link.name}
              onClick={() => handleNavClick(link.value)}
              className={`text-lg py-3 border-b border-safari-800/50 text-left px-2 rounded-lg hover:bg-white/5 ${
                currentPage === link.value ? 'text-safari-400 font-bold' : 'text-white'
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
            className="bg-safari-500 text-white px-4 py-3 rounded-lg font-semibold w-full text-left mt-4 shadow-md"
          >
            Plan My Trip (AI)
          </button>

          {user && (
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onLogout();
              }}
              className="text-red-400 text-left px-4 py-3 mt-4 flex items-center gap-2"
            >
              <LogOut size={18} /> Sign Out
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;