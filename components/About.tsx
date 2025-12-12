import React from 'react';
import PageHeader from './PageHeader';
import { Target, Shield, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader 
        title="About Us" 
        subtitle="Passionate about Rwanda, Dedicated to You."
        image="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2071&auto=format&fit=crop"
      />

      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="prose prose-lg prose-stone mx-auto">
          <p className="lead text-2xl text-safari-800 font-serif leading-relaxed mb-10">
            Wildlife Safari was born from a simple love for the Land of a Thousand Hills. Founded in 2012, we started as a small team of local guides who wanted to share the hidden gems of Rwanda with the world.
          </p>
          <p className="mb-6">
            Today, we are Rwanda's premier tour operator, specializing in bespoke itineraries that blend luxury, adventure, and cultural immersion. We believe that tourism should be a force for good. That's why we work closely with local communities and conservation groups to ensure that your visit leaves a positive footprint.
          </p>
          <p className="mb-12">
            Whether you are tracking mountain gorillas in the Virungas, kayaking on Lake Kivu, or exploring the vibrant art scene in Kigali, our mission is to provide you with a safe, seamless, and soul-stirring experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 not-prose">
            <div className="text-center">
              <div className="bg-safari-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-safari-600">
                <Target size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">Our Mission</h3>
              <p className="text-stone-600 text-sm">To showcase the beauty of Rwanda through sustainable and authentic travel experiences.</p>
            </div>
            <div className="text-center">
              <div className="bg-safari-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-safari-600">
                <Shield size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">Our Promise</h3>
              <p className="text-stone-600 text-sm">Safety, reliability, and excellence in every detail of your journey.</p>
            </div>
            <div className="text-center">
              <div className="bg-safari-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-safari-600">
                <Users size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">Our Team</h3>
              <p className="text-stone-600 text-sm">Local experts with deep knowledge and passion for their heritage.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
