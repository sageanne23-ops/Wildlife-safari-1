import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2071&auto=format&fit=crop" 
          alt="Rwanda Landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-safari-950/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
        <div className="inline-block bg-safari-500/20 backdrop-blur-sm border border-safari-400/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in-up">
          <span className="text-safari-200 uppercase tracking-widest text-xs font-bold">Welcome to Rwanda</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
          Discover the Land of a <br/><span className="text-safari-400 italic">Thousand Hills</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Experience the majestic mountain gorillas, vibrant culture, and breathtaking landscapes of East Africa's hidden gem.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onCtaClick}
            className="bg-safari-600 hover:bg-safari-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-safari-500/30 flex items-center justify-center gap-3"
          >
            Start Planning With AI <ArrowRight className="h-5 w-5" />
          </button>
          <a 
            href="#destinations"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center"
          >
            View Packages
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
