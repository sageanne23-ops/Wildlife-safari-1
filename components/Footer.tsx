import React from 'react';
import { Compass, Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-safari-950 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Compass className="h-8 w-8 text-safari-400" />
              <span className="text-2xl font-serif font-bold tracking-wide text-white">
                Wildlife<span className="text-safari-400">Safari</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your reliable partner for exploring the wonders of Rwanda. We specialize in eco-friendly, luxury, and adventure tourism.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-safari-400 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-safari-400 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-safari-400 transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-safari-100">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Packages</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Destinations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sustainability</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-safari-100">Support</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Booking Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Travel Guide</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-safari-100">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to get special offers and travel inspiration.</p>
            <div className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-safari-900 border border-safari-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-safari-500 transition-colors"
              />
              <button className="bg-safari-600 hover:bg-safari-500 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-safari-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Wildlife Safari Rwanda. All rights reserved.</p>
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <Mail size={16} />
            <span>info@wildlifesafari.rw</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
