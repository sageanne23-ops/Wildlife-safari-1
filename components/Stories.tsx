import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Story } from '../types';

const STORIES: Story[] = [
  {
    id: '1',
    author: 'Sarah Jenkins',
    role: 'Adventure Traveler, USA',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop',
    content: "Seeing the gorillas in the mist was a moment I'll never forget. Wildlife Safari organized everything perfectly, from the permits to the amazing lodges. Truly a seamless experience.",
    rating: 5
  },
  {
    id: '2',
    author: 'David Chen',
    role: 'Photographer, Singapore',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop',
    content: "Rwanda is incredibly clean and beautiful. The guides were knowledgeable and passionate about conservation. The cultural village tour in Kigali was an unexpected highlight.",
    rating: 5
  },
  {
    id: '3',
    author: 'Elena Rodriguez',
    role: 'Family Trip, Spain',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
    content: "We felt so safe and welcomed. The itinerary was tailored perfectly for our kids. Akagera is a hidden gem for safari lovers who want a more intimate experience.",
    rating: 5
  }
];

const Stories: React.FC = () => {
  return (
    <section id="stories" className="py-24 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="mb-6 md:mb-0">
            <h2 className="text-sm font-bold tracking-widest text-safari-600 uppercase mb-2">Travel Diaries</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-safari-900">Stories from our Guests</h3>
          </div>
          <button className="text-safari-600 font-semibold hover:text-safari-700 hover:underline underline-offset-4">
            Read More Stories
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STORIES.map((story) => (
            <div key={story.id} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 hover:shadow-xl transition-shadow duration-300 relative">
              <Quote className="absolute top-8 right-8 text-safari-100 h-12 w-12" />
              
              <div className="flex items-center gap-1 text-yellow-400 mb-6">
                {[...Array(story.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              <p className="text-stone-600 mb-8 leading-relaxed italic relative z-10">"{story.content}"</p>

              <div className="flex items-center gap-4">
                <img 
                  src={story.image} 
                  alt={story.author} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-safari-200"
                />
                <div>
                  <h4 className="font-bold text-safari-900 text-sm">{story.author}</h4>
                  <p className="text-stone-500 text-xs uppercase tracking-wide">{story.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stories;
