import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-safari-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-sm font-bold tracking-widest text-safari-600 uppercase mb-2">Get in Touch</h2>
            <h3 className="text-4xl font-serif font-bold text-safari-900 mb-6">Start Your Journey Today</h3>
            <p className="text-stone-600 text-lg mb-8">
              Ready to explore the Land of a Thousand Hills? Our team of local experts is here to help you plan the perfect itinerary.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-full shadow-sm text-safari-600">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-safari-900">Phone</h4>
                  <p className="text-stone-600">+250 788 123 456</p>
                  <p className="text-stone-500 text-sm">Mon-Fri, 8am - 6pm CAT</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-full shadow-sm text-safari-600">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-safari-900">Email</h4>
                  <p className="text-stone-600">hello@wildlifesafari.rw</p>
                  <p className="text-stone-500 text-sm">24/7 Online Support</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-full shadow-sm text-safari-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-safari-900">Office</h4>
                  <p className="text-stone-600">KG 54 Avenue, Kigali Heights</p>
                  <p className="text-stone-500 text-sm">Kigali, Rwanda</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-safari-100">
            <h4 className="text-2xl font-serif font-bold text-safari-900 mb-6">Send us a message</h4>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-stone-700">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:ring-2 focus:ring-safari-500 focus:border-transparent outline-none transition-all" placeholder="John" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-stone-700">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:ring-2 focus:ring-safari-500 focus:border-transparent outline-none transition-all" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-stone-700">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:ring-2 focus:ring-safari-500 focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-stone-700">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:ring-2 focus:ring-safari-500 focus:border-transparent outline-none transition-all" placeholder="I'm interested in the Gorilla Trek..."></textarea>
              </div>

              <button type="button" className="w-full bg-safari-600 hover:bg-safari-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-safari-500/30 flex items-center justify-center gap-2">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
