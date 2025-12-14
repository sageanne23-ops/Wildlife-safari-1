import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

const LOGO_URL = "https://ui-avatars.com/api/?name=WS&background=34ae6f&color=fff&size=128&rounded=true&bold=true";

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent, page: PageView) => {
    e.preventDefault();
    onNavigate(page);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-safari-950 text-white pt-20 pb-10 border-t border-safari-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div 
              className="flex items-center gap-3 cursor-pointer" 
              onClick={(e) => handleLinkClick(e, 'HOME')}
            >
              <img 
                src={LOGO_URL} 
                alt="Wildlife Safaris Logo" 
                className="h-12 w-12 rounded-full border border-white/10"
              />
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold tracking-wide text-white">
                  Wildlife<span className="text-safari-400">Safaris</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-safari-400">
                  Beyond Expectation
                </span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Your reliable partner for exploring the wonders of Rwanda. We specialize in eco-friendly, luxury, and adventure tourism that goes beyond expectation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-safari-600 transition-all"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-safari-600 transition-all"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-safari-600 transition-all"><Twitter size={18} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white font-serif">Discover</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={(e) => handleLinkClick(e, 'ABOUT')} className="text-gray-400 hover:text-safari-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-safari-500 rounded-full"></span> About Us</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'DESTINATIONS')} className="text-gray-400 hover:text-safari-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-safari-500 rounded-full"></span> Our Packages</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'GALLERY')} className="text-gray-400 hover:text-safari-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-safari-500 rounded-full"></span> Gallery</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'SUSTAINABILITY')} className="text-gray-400 hover:text-safari-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-safari-500 rounded-full"></span> Sustainability</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white font-serif">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={18} className="text-safari-500 shrink-0 mt-0.5" />
                <span>KG 54 Avenue, Kigali Heights<br/>Kigali, Rwanda</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={18} className="text-safari-500 shrink-0" />
                <span>+250 788 123 456</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={18} className="text-safari-500 shrink-0" />
                <span>info@wildlifesafaris.rw</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white font-serif">Newsletter</h4>
            <p className="text-gray-400 mb-4 text-sm">Subscribe to get special offers and travel inspiration.</p>
            <div className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/5 border border-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-safari-500 focus:bg-white/10 transition-colors text-sm"
              />
              <button className="bg-safari-600 hover:bg-safari-500 text-white px-4 py-3 rounded-lg font-semibold transition-colors text-sm uppercase tracking-wide">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Wildlife Safaris Rwanda. All rights reserved.</p>
          <div className="flex space-x-6 text-sm">
             <button onClick={(e) => handleLinkClick(e, 'POLICY')} className="text-gray-500 hover:text-white transition-colors">Privacy Policy</button>
             <button onClick={(e) => handleLinkClick(e, 'POLICY')} className="text-gray-500 hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;