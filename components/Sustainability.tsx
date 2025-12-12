import React from 'react';
import PageHeader from './PageHeader';
import { Leaf, Droplets, HeartHandshake } from 'lucide-react';

const Sustainability: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen">
      <PageHeader 
        title="Sustainability" 
        subtitle="Preserving Rwanda for generations to come."
        image="https://images.unsplash.com/photo-1576487248873-1f3020907c8d?q=80&w=2070&auto=format&fit=crop"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl font-serif font-bold text-safari-900 mb-6">Eco-Tourism at Our Core</h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-6">
              Rwanda is a global leader in environmental conservation, and we are proud to contribute to this legacy. Our operations are plastic-free, and we offset our carbon footprint by planting trees in the Gishwati-Mukura landscape.
            </p>
            <p className="text-stone-600 text-lg leading-relaxed">
              When you travel with us, a percentage of your booking goes directly towards the conservation of endangered species like the Mountain Gorilla and the Golden Monkey.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1527&auto=format&fit=crop" className="rounded-2xl shadow-lg w-full h-64 object-cover" alt="Nature" />
             <img src="https://images.unsplash.com/photo-1440557653066-54157b856dc6?q=80&w=1974&auto=format&fit=crop" className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8" alt="Forest" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-safari-100">
             <Leaf className="text-safari-500 w-10 h-10 mb-4" />
             <h3 className="font-bold text-xl mb-3 text-safari-900">Conservation</h3>
             <p className="text-stone-600">We strictly adhere to park guidelines to minimize human impact on wildlife habitats.</p>
           </div>
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-safari-100">
             <HeartHandshake className="text-safari-500 w-10 h-10 mb-4" />
             <h3 className="font-bold text-xl mb-3 text-safari-900">Community</h3>
             <p className="text-stone-600">We hire locally and support community cooperatives for crafts and cultural experiences.</p>
           </div>
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-safari-100">
             <Droplets className="text-safari-500 w-10 h-10 mb-4" />
             <h3 className="font-bold text-xl mb-3 text-safari-900">Environment</h3>
             <p className="text-stone-600">Our lodges and vehicles are selected for their low environmental impact and energy efficiency.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Sustainability;
