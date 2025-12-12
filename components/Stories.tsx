import React, { useState } from 'react';
import { Star, Calendar, User, ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { Story } from '../types';
import PageHeader from './PageHeader';

const STORIES: Story[] = [
  {
    id: '1',
    title: "Face to Face with the Silverbacks: My Gorilla Trekking Experience",
    author: 'Sarah Jenkins',
    role: 'Adventure Traveler, USA',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1576487248873-1f3020907c8d?q=80&w=2070&auto=format&fit=crop',
    excerpt: "The hike was challenging, the mud was deep, but the moment I looked into the eyes of a massive Silverback, time stood still.",
    date: 'October 15, 2023',
    rating: 5,
    content: [
      "I had dreamed of this moment for years. Rwanda, the land of a thousand hills, was everything I imagined and more. Our journey began in Musanze, the gateway to Volcanoes National Park. The morning air was crisp and filled with anticipation as we gathered at the park headquarters for our briefing.",
      "Our guide, Francois, was incredible. He explained the etiquette of being around the gorillas—keep your distance, no flash photography, and submissive gestures if the silverback approaches. We were assigned the 'Susa' family, one of the largest groups in the park.",
      "The trek itself was an adventure. We hiked through bamboo forests and steep slopes, guided by trackers who communicate with the gorillas' movements. After about two hours, the trackers signaled us to stop. 'They are here,' Francois whispered.",
      "Pushing through a thicket of nettles, we stepped into a clearing. There they were. A mother nursing her infant, juveniles playing in the trees, and the massive Silverback watching over them all. It was peaceful, almost human-like in their interactions.",
      "We spent a magical hour observing them. The proximity is startling; you can hear them breathing, chewing on bamboo shoots, and grunting to one another. It’s a humbling experience that reminds you of our deep connection to the natural world.",
      "Wildlife Safari organized everything seamlessly. From the permits to the lodge, which offered a cozy fire and hot water bottles after the trek. If you are considering this trip, do it. It changes you."
    ]
  },
  {
    id: '2',
    title: "Beyond the Safari: Discovering Kigali's Vibrant Culture",
    author: 'David Chen',
    role: 'Photographer, Singapore',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1544258788-b7f73c4f74d0?q=80&w=2070&auto=format&fit=crop',
    excerpt: "Kigali is often just a stopover, but I found a city pulsing with art, history, and some of the best coffee I've ever tasted.",
    date: 'November 02, 2023',
    rating: 5,
    content: [
      "Most people come to Rwanda for the wildlife, but Kigali stole my heart. It is incredibly clean, safe, and modern, yet it retains a deep sense of tradition. My tour started at the Kigali Genocide Memorial. It is a heavy, emotional experience, but essential to understanding the resilience of the Rwandan people.",
      "After the memorial, we explored the Nyamirambo neighborhood. This is the oldest part of Kigali and it feels alive. We took a walking tour, visiting a women's center that empowers local seamstresses. The colors, the fabrics, the smiles—it was a photographer's paradise.",
      "Rwanda's coffee scene is world-class. We visited a local roastery where we learned about the entire process from bean to cup. The flavor profile of Rwandan coffee is unique—fruity, floral, and bright.",
      "In the evenings, the city lights up. We dined at a rooftop restaurant overlooking the valley, enjoying grilled tilapia and plantains. The local art scene is also booming, with galleries like Inema Arts Center showcasing incredible contemporary African art.",
      "Don't just rush to the parks. Spend a few days in Kigali. Let the rhythm of the city sink in. You won't regret it."
    ]
  },
  {
    id: '3',
    title: "A Family Adventure in Akagera: Lions, Giraffes, and Camping",
    author: 'Elena Rodriguez',
    role: 'Family Trip, Spain',
    authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1489396160835-7798832a5028?q=80&w=2069&auto=format&fit=crop',
    excerpt: "Taking kids on safari can be daunting, but Akagera National Park was the perfect playground for our family adventure.",
    date: 'December 10, 2023',
    rating: 5,
    content: [
      "We wanted a safari experience that was accessible and safe for our two children, aged 8 and 10. Akagera National Park exceeded our expectations. Located in the east of Rwanda, it offers a classic savannah landscape that contrasts beautifully with the hills of the west.",
      "We opted for a tented camp experience. Sleeping under the stars, listening to the distant roar of lions and the laughter of hyenas, was a thrill for the kids. The guides were fantastic with the children, turning every game drive into a biology lesson.",
      "We saw it all—herds of elephants crossing the road, giraffes grazing on acacia trees, and yes, we were lucky enough to spot a pride of lions resting in the shade. The park has done an amazing job reintroducing rhinos and lions, making it a Big 5 destination again.",
      "One afternoon, we took a boat trip on Lake Ihema. It was a relaxing break from the bumpy roads. We saw massive crocodiles basking on the banks and hippos popping their heads out of the water. The birdlife was spectacular, even for non-birders like us.",
      "Wildlife Safari tailored the itinerary perfectly, ensuring we had enough downtime for the kids to rest. It was an educational, bonding experience that we will cherish forever."
    ]
  },
  {
    id: '4',
    title: "Hiking the Congo Nile Trail: A Journey of Solitude",
    author: 'Michael O-Brien',
    role: 'Solo Traveler, Ireland',
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1596483758478-43d94266133f?q=80&w=2070&auto=format&fit=crop',
    excerpt: "Four days of hiking along the shores of Lake Kivu revealed the quiet, rural beauty of Rwanda's countryside.",
    date: 'January 05, 2024',
    rating: 5,
    content: [
      "I sought solitude and physical challenge, and the Congo Nile Trail delivered. This trail runs along the watershed of the Congo and Nile rivers, offering stunning views of Lake Kivu at every turn.",
      "I hiked for four days, passing through endless tea plantations, banana groves, and small fishing villages. The terrain is hilly—this is Rwanda after all—but the views are worth every drop of sweat. The locals were incredibly welcoming. 'Mwaramutse!' (Good morning!) was the soundtrack of my hike.",
      "I stayed in simple guesthouses and coffee washing stations along the way. It was a great way to support the local economy directly. One night, I stayed at a coffee cooperative where I roasted my own beans over an open fire.",
      "The trail is not just about nature; it's about people. Children would run out to wave, farmers would stop to chat (mostly in sign language and smiles), and fishermen would sing as they paddled their dugouts on the lake at sunset.",
      "If you want to see the real Rwanda, away from the luxury lodges, lace up your boots and hit the trail. It is safe, beautiful, and deeply rewarding."
    ]
  }
];

const Stories: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  return (
    <div className="bg-stone-50 min-h-screen">
      {!selectedStory ? (
        <>
          <PageHeader 
            title="Travel Diaries" 
            subtitle="Real stories, real adventures, real memories."
            image="https://images.unsplash.com/photo-1519060825-7738b4164518?q=80&w=2070&auto=format&fit=crop"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {STORIES.map((story) => (
                <div 
                  key={story.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col h-full border border-stone-100"
                  onClick={() => {
                    setSelectedStory(story);
                    window.scrollTo(0,0);
                  }}
                >
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={story.coverImage} 
                      alt={story.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-safari-800 flex items-center gap-1">
                      <Calendar size={12} /> {story.date}
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-serif font-bold text-safari-900 mb-4 group-hover:text-safari-600 transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-stone-600 mb-6 line-clamp-3 leading-relaxed">
                      {story.excerpt}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-stone-100">
                      <div className="flex items-center gap-3">
                        <img 
                          src={story.authorImage} 
                          alt={story.author} 
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-safari-100"
                        />
                        <div>
                          <p className="text-sm font-bold text-stone-900">{story.author}</p>
                          <p className="text-xs text-stone-500">{story.role}</p>
                        </div>
                      </div>
                      <span className="text-safari-600 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read Story <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        // Full Story Reading View
        <div className="animate-fade-in-up">
          {/* Hero for Story */}
          <div className="relative h-[60vh]">
            <img 
              src={selectedStory.coverImage} 
              alt={selectedStory.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white max-w-5xl mx-auto">
              <button 
                onClick={() => setSelectedStory(null)}
                className="mb-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
              >
                <ArrowLeft size={16} /> Back to Stories
              </button>
              <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                {selectedStory.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <img src={selectedStory.authorImage} className="w-8 h-8 rounded-full border border-white/50" alt={selectedStory.author} />
                  <span>By {selectedStory.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} /> {selectedStory.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} /> 5 min read
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-4 py-16">
            <div className="prose prose-lg prose-stone prose-headings:font-serif prose-headings:text-safari-900 prose-a:text-safari-600">
              <p className="lead text-xl text-stone-600 italic border-l-4 border-safari-500 pl-6 mb-10">
                {selectedStory.excerpt}
              </p>
              
              {selectedStory.content.map((paragraph, idx) => (
                <p key={idx} className="mb-6 leading-relaxed text-stone-700">
                  {paragraph}
                </p>
              ))}
              
              <hr className="my-12 border-stone-200" />
              
              <div className="bg-safari-50 p-8 rounded-2xl flex items-center gap-6">
                <img src={selectedStory.authorImage} className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-md" alt={selectedStory.author} />
                <div>
                  <h3 className="font-bold text-lg text-safari-900 mb-1">About {selectedStory.author}</h3>
                  <p className="text-stone-600 text-sm mb-3">{selectedStory.role}</p>
                  <p className="text-stone-500 text-sm italic">"Travel is the only thing you buy that makes you richer."</p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h3 className="text-2xl font-serif font-bold text-safari-900 mb-6">Inspired by this story?</h3>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => setSelectedStory(null)}
                  className="px-8 py-3 rounded-full border border-safari-200 text-safari-700 font-bold hover:bg-safari-50 transition-colors"
                >
                  Read More Stories
                </button>
                <button className="px-8 py-3 rounded-full bg-safari-600 text-white font-bold hover:bg-safari-700 transition-colors shadow-lg">
                  Plan Similar Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
