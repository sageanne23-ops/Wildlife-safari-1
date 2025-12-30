import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle } from 'lucide-react';
import PageHeader from './PageHeader';
import { db } from '../services/dataService';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/250788123456?text=${encodeURIComponent("Hello! I'm interested in booking a trip with Wildlife Safaris.")}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    db.addMessage({
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      subject: 'Website Inquiry',
      message: formData.message
    });
    setIsSubmitted(true);
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
  };

  return (
    <div className="bg-white min-h-screen">
      <PageHeader 
        title="Contact Us" 
        subtitle="We're here to help you plan your dream safari."
        image="https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2072&auto=format&fit=crop"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
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
                <div className="bg-safari-50 p-4 rounded-full text-safari-600">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-safari-900 text-lg">Phone</h4>
                  <p className="text-stone-600">+250 788 123 456</p>
                  <p className="text-stone-500 text-sm">Mon-Fri, 8am - 6pm CAT</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-safari-50 p-4 rounded-full text-safari-600">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-safari-900 text-lg">Email</h4>
                  <p className="text-stone-600">hello@wildlifesafari.rw</p>
                  <p className="text-stone-500 text-sm">24/7 Online Support</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-safari-50 p-4 rounded-full text-safari-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-safari-900 text-lg">Office</h4>
                  <p className="text-stone-600">KG 54 Avenue, Kigali Heights</p>
                  <p className="text-stone-500 text-sm">Kigali, Rwanda</p>
                </div>
              </div>
              
              <div className="pt-6">
                 <button 
                  onClick={handleWhatsAppClick}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-green-500/30 flex items-center gap-2"
                >
                  <MessageCircle size={20} /> Chat with us on WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-stone-50 p-8 rounded-3xl shadow-lg border border-safari-100 min-h-[500px] flex flex-col justify-center">
            {!isSubmitted ? (
              <>
                <h4 className="text-2xl font-serif font-bold text-safari-900 mb-6">Send us a message</h4>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-stone-700">First Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-stone-200 focus:ring-2 focus:ring-safari-500 focus:border-transparent outline-none transition-all" 
                        placeholder="John" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-stone-700">Last Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-stone-200 focus:ring-2 focus:ring-safari-500 focus:border-transparent outline-none transition-all" 
                        placeholder="Doe" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-stone-700">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-stone-200 focus:ring-2 focus:ring-safari-500 focus:border-transparent outline-none transition-all" 
                      placeholder="john@example.com" 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-stone-700">Message</label>
                    <textarea 
                      rows={4} 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-stone-200 focus:ring-2 focus:ring-safari-500 focus:border-transparent outline-none transition-all" 
                      placeholder="I'm interested in the Gorilla Trek..."
                    ></textarea>
                  </div>

                  <button type="submit" className="w-full bg-safari-600 hover:bg-safari-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-safari-500/30 flex items-center justify-center gap-2">
                    Send Message <Send size={18} />
                  </button>
                  
                  <p className="text-xs text-center text-stone-400 mt-2">
                    We'll respond to your email and update your dashboard if you have an account.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center space-y-4 animate-fade-in">
                <div className="w-20 h-20 bg-safari-100 text-safari-600 rounded-full flex items-center justify-center mx-auto">
                   <CheckCircle size={40} />
                </div>
                <h4 className="text-2xl font-serif font-bold text-safari-900">Message Sent!</h4>
                <p className="text-stone-600">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-safari-600 font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;