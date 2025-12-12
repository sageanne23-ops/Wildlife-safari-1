import React from 'react';
import PageHeader from './PageHeader';
import { HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const faqs = [
    {
      q: "When is the best time to visit Rwanda?",
      a: "The best time is during the dry seasons: June to September and December to February. These months offer the best hiking conditions for gorilla trekking."
    },
    {
      q: "Do I need a visa to enter Rwanda?",
      a: "Citizens of all countries are granted a visa on arrival at Kigali International Airport and all land borders. Fees may apply depending on your nationality."
    },
    {
      q: "Is Rwanda safe for tourists?",
      a: "Yes, Rwanda is ranked as one of the safest countries in the world. Kigali is safe to walk around, even at night. However, standard travel precautions should always be taken."
    },
    {
      q: "What should I pack for Gorilla Trekking?",
      a: "Pack waterproof hiking boots, long trousers (to protect against nettles), a waterproof jacket, gardening gloves, insect repellent, and a camera."
    },
    {
      q: "How physically demanding is the trek?",
      a: "It varies. Some gorilla families are close to the park entrance (30 min walk), while others require 4-5 hours of hiking through dense rainforest. Porters are available to help carry your bags."
    }
  ];

  return (
    <div className="bg-stone-50 min-h-screen">
      <PageHeader 
        title="Frequently Asked Questions" 
        subtitle="Everything you need to know before you go."
        image="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop"
      />

      <div className="max-w-3xl mx-auto px-4 py-20">
        <div className="space-y-6">
          {faqs.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
              <div className="flex gap-4">
                <HelpCircle className="text-safari-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-safari-900 mb-2">{item.q}</h3>
                  <p className="text-stone-600 leading-relaxed">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
