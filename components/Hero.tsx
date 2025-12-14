import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, Sparkles, Star, Play, Clock, MapPin } from 'lucide-react';
import { TourPackage } from '../types';

interface HeroProps {
  onCtaClick: () => void;
  featuredTours: TourPackage[];
  onViewDetails: (tour: TourPackage) => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick, featuredTours = [], onViewDetails }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (featuredTours.length <= 1) return;

    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredTours.length);
        setIsAnimating(false);
      }, 300); // Wait for fade out
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredTours.length]);

  const currentTour = featuredTours[currentIndex];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2071&auto=format&fit=crop" 
          alt="Rwanda Landscape" 
          className="w-full h-full object-cover"
        />
        {/* Left-heavy gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-safari-950/90 via-safari-950/60 to-safari-950/30"></div> 
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-safari-950/90"></div>
      </div>

      {/* Decorative Elements - Hidden on mobile for performance */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-safari-500/20 rounded-full blur-[100px] animate-float hidden lg:block"></div>

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT SIDE: Text Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 hover:bg-white/15 transition-colors cursor-default">
              <Sparkles size={14} className="text-yellow-400" />
              <span className="text-safari-50 uppercase tracking-[0.2em] text-xs font-bold">The Heart of Africa</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight drop-shadow-2xl">
              Discover the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-safari-200 to-safari-400">
                Thousand Hills
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg text-stone-200 max-w-xl font-light leading-relaxed">
              Embark on a journey where majestic gorillas roam, volcanoes touch the sky, and culture warms the soul. Experience Rwanda with our eco-friendly luxury tours.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={onCtaClick}
                className="group relative overflow-hidden bg-safari-600 hover:bg-safari-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_40px_-10px_rgba(52,174,111,0.6)] flex items-center justify-center gap-3"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>
                <span className="relative z-20 flex items-center gap-2">Start Planning <Sparkles size={18} /></span>
              </button>
              
              <a 
                href="#destinations"
                className="group bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center hover:border-white/60"
              >
                Our Packages <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 flex items-center gap-8 text-white/60 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-stone-400 border-2 border-safari-900" style={{backgroundImage: `url(https://randomuser.me/api/portraits/thumb/men/${i+20}.jpg)`, backgroundSize: 'cover'}}></div>
                  ))}
                </div>
                <span>500+ Happy Travelers</span>
              </div>
              <div className="h-4 w-px bg-white/20"></div>
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span className="text-white">4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Rotating Featured Tour */}
          {currentTour && (
            <div className="flex justify-center lg:justify-end mt-12 lg:mt-0 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div 
                className={`relative w-full max-w-sm cursor-pointer transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
                onClick={() => onViewDetails(currentTour)}
              >
                 {/* Glass Card - Featured Tour */}
                 <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl shadow-2xl transform lg:rotate-3 hover:rotate-0 transition-transform duration-500 hover:scale-[1.02] group">
                    <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                      <img 
                        src={currentTour.image} 
                        alt={currentTour.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                      
                      {/* Play/Action Icon */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/30 group-hover:bg-safari-600/90 backdrop-blur-md rounded-full p-4 transition-all scale-100 group-hover:scale-110">
                         <ArrowRight size={24} className="text-white fill-white ml-1" />
                      </div>
                      
                      <div className="absolute top-3 right-3 bg-safari-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                        Featured
                      </div>

                      {/* Progress Bar for the slider timer */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                         <div key={currentIndex} className="h-full bg-safari-400 animate-[shimmer_5s_linear_forward]"></div>
                      </div>
                    </div>
                    
                    <div className="px-2 pb-2">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-white text-xl font-serif font-bold line-clamp-1">{currentTour.title}</h3>
                          <div className="flex items-center gap-3 text-white/70 text-sm mt-1">
                             <span className="flex items-center gap-1"><MapPin size={12}/> Rwanda</span>
                             <span className="flex items-center gap-1"><Clock size={12}/> {currentTour.duration}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-white font-bold text-lg">{currentTour.price}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-1 text-yellow-400 text-sm">
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                         </div>
                         <span className="text-white/60 text-xs hover:text-white transition-colors">Click to view details</span>
                      </div>
                    </div>
                 </div>

                 {/* Decorative card behind - Hidden on small mobile to save space if needed, but keeping for aesthetics */}
                 <div className="absolute -z-10 top-4 -right-4 lg:-right-6 w-full h-full bg-safari-900/40 backdrop-blur-md border border-white/10 rounded-3xl transform -rotate-2 lg:-rotate-6"></div>
                 
                 {/* Slider Indicators */}
                 <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
                    {featuredTours.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-safari-400' : 'w-2 bg-white/20'}`}
                      />
                    ))}
                 </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50 cursor-pointer z-20 hidden md:block" onClick={() => document.getElementById('destinations')?.scrollIntoView({behavior: 'smooth'})}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest font-medium">Scroll to Explore</span>
          <ChevronDown size={24} />
        </div>
      </div>
    </section>
  );
};

export default Hero;