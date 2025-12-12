import React from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax-like feel */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2071&auto=format&fit=crop" 
          alt="Rwanda Landscape" 
          className="w-full h-full object-cover scale-105 animate-fade-in"
        />
        {/* Advanced Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-safari-950/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/10 to-black/40"></div>
      </div>

      {/* Floating Particles/Glows (Decorative) */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-safari-500/20 rounded-full blur-[100px] animate-float hidden md:block"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-safari-300/10 rounded-full blur-[120px] animate-float" style={{animationDelay: '1.5s'}}></div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto mt-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8 animate-fade-in-up shadow-lg hover:bg-white/15 transition-colors cursor-default">
          <Sparkles size={14} className="text-yellow-400" />
          <span className="text-safari-50 uppercase tracking-[0.2em] text-xs font-bold">The Heart of Africa</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-none tracking-tight drop-shadow-2xl animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          Discover the <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-safari-200 to-safari-400">
            Thousand Hills
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-2xl text-stone-200 mb-12 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          Embark on a journey where majestic gorillas roam, volcanoes touch the sky, and culture warms the soul.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <button 
            onClick={onCtaClick}
            className="group relative overflow-hidden bg-safari-600 hover:bg-safari-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-[0_0_40px_-10px_rgba(52,174,111,0.6)] flex items-center justify-center gap-3"
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>
            <span className="relative z-20 flex items-center gap-2">Start Planning With AI <Sparkles size={18} /></span>
          </button>
          
          <a 
            href="#destinations"
            className="group bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center hover:border-white/60"
          >
            Explore Packages <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50 cursor-pointer" onClick={() => document.getElementById('destinations')?.scrollIntoView({behavior: 'smooth'})}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest font-medium">Scroll to Explore</span>
          <ChevronDown size={24} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
