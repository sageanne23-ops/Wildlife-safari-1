import React, { useState, useRef } from 'react';
import { 
  Star, Calendar, User, ArrowLeft, ArrowRight, Clock, 
  PenTool, X, Send, Heart, Camera, Upload, 
  Image as ImageIcon, Trash2, Plus, Sparkles 
} from 'lucide-react';
import { Story } from '../types';
import PageHeader from './PageHeader';

const INITIAL_STORIES: Story[] = [
  {
    id: '1',
    title: "Face to Face with the Silverbacks: My Gorilla Trekking Experience",
    author: 'Sarah Jenkins',
    role: 'Adventure Traveler, USA',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1576487248873-1f3020907c8d?q=80&w=2070&auto=format&fit=crop',
    gallery: [
        'https://images.unsplash.com/photo-1628198758826-6136d837699d',
        'https://images.unsplash.com/photo-1626270726888-2d8540a83856',
        'https://images.unsplash.com/photo-1577703838048-73b8dbefd031'
    ],
    excerpt: "The hike was challenging, the mud was deep, but the moment I looked into the eyes of a massive Silverback, time stood still.",
    date: 'October 15, 2023',
    rating: 5,
    status: 'approved',
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
    status: 'approved',
    content: [
      "Most people come to Rwanda for the wildlife, but Kigali stole my heart. It is incredibly clean, safe, and modern, yet it retains a deep sense of tradition. My tour started at the Kigali Genocide Memorial. It is a heavy, emotional experience, but essential to understanding the resilience of the Rwandan people.",
      "After the memorial, we explored the Nyamirambo neighborhood. This is the oldest part of Kigali and it feels alive. We took a walking tour, visiting a women's center that empowers local seamstresses. The colors, the fabrics, the smiles—it was a photographer's paradise.",
      "Rwanda's coffee scene is world-class. We visited a local roastery where we learned about the entire process from bean to cup. The flavor profile of Rwandan coffee is unique—fruity, floral, and bright.",
      "In the evenings, the city lights up. We dined at a rooftop restaurant overlooking the valley, enjoying grilled tilapia and plantains. The local art scene is also booming, with galleries like Inema Arts Center showcasing incredible contemporary African art.",
      "Don't just rush to the parks. Spend a few days in Kigali. Let the rhythm of the city sink in. You won't regret it."
    ]
  }
];

const Stories: React.FC = () => {
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    title: '',
    content: '',
    rating: 5,
    authorImage: '',
    coverImage: '',
    gallery: [] as string[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'author' | 'cover' | 'gallery') => {
    const files = e.target.files;
    if (!files) return;

    if (type === 'gallery') {
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({ 
            ...prev, 
            gallery: [...prev.gallery, reader.result as string] 
          }));
        };
        reader.readAsDataURL(file);
      });
    } else {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({ 
            ...prev, 
            [type === 'author' ? 'authorImage' : 'coverImage']: reader.result as string 
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeGalleryItem = (index: number) => {
    setFormData(prev => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newStory: Story = {
      id: Date.now().toString(),
      title: formData.title,
      author: formData.name,
      role: formData.role || 'Happy Traveler',
      authorImage: formData.authorImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=34ae6f&color=fff`,
      coverImage: formData.coverImage || (formData.gallery.length > 0 ? formData.gallery[0] : 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2071&auto=format&fit=crop'),
      gallery: formData.gallery,
      excerpt: formData.content.substring(0, 120) + '...',
      content: formData.content.split('\n').filter(p => p.trim() !== ''),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      rating: formData.rating,
      status: 'pending'
    };

    setStories([newStory, ...stories]);
    setIsFormOpen(false);
    setFormData({ name: '', role: '', title: '', content: '', rating: 5, authorImage: '', coverImage: '', gallery: [] });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    alert("Thank you! Your story has been submitted for moderation and will appear once approved.");
  };

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
            
            {/* Share Your Story CTA */}
            <div className="bg-white rounded-2xl p-8 mb-16 shadow-lg border border-safari-100 flex flex-col md:flex-row items-center justify-between gap-8 animate-fade-in-up">
              <div className="flex-1">
                <h3 className="text-2xl font-serif font-bold text-safari-900 mb-2 flex items-center gap-2">
                   <Heart className="text-red-500 fill-red-500" size={24} /> Share Your Experience
                </h3>
                <p className="text-stone-600">
                  Did you travel with us recently? We'd love to see your photos and hear about your adventure! 
                  Your story could inspire the next traveler to discover Rwanda.
                </p>
              </div>
              <button 
                onClick={() => setIsFormOpen(true)}
                className="bg-safari-600 hover:bg-safari-700 text-white px-8 py-4 rounded-xl font-bold shadow-md transition-all flex items-center gap-2 shrink-0"
              >
                <PenTool size={20} /> Write a Story
              </button>
            </div>

            {/* Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {stories.map((story) => (
                <div 
                  key={story.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col h-full border border-stone-100 animate-fade-in-up"
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
                    {story.gallery && story.gallery.length > 0 && (
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-2 py-1 rounded text-[10px] text-white font-bold flex items-center gap-1">
                            <ImageIcon size={12} /> +{story.gallery.length} Photos
                        </div>
                    )}
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-serif font-bold text-safari-900 mb-4 group-hover:text-safari-600 transition-colors">
                      {story.title}
                    </h3>
                    
                    <div className="flex items-center gap-1 mb-3">
                       {[...Array(5)].map((_, i) => (
                         <Star 
                           key={i} 
                           size={14} 
                           className={i < story.rating ? "text-yellow-400 fill-yellow-400" : "text-stone-300"} 
                         />
                       ))}
                    </div>

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

          {/* Submission Modal */}
          {isFormOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-safari-950/80 backdrop-blur-sm" onClick={() => setIsFormOpen(false)}></div>
              
              <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden animate-fade-in-up">
                <div className="bg-safari-900 p-8 flex justify-between items-center text-white shrink-0">
                  <div className="flex items-center gap-4">
                    <div className="bg-safari-500 p-3 rounded-2xl">
                      <PenTool size={32} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-serif font-bold">Share Your Rwanda Story</h3>
                      <p className="text-safari-200 text-sm">Inspire others with your journey</p>
                    </div>
                  </div>
                  <button onClick={() => setIsFormOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                    <X size={32} />
                  </button>
                </div>
                
                <div className="p-10 overflow-y-auto bg-stone-50 flex-1">
                   <form onSubmit={handleSubmit} className="space-y-10">
                      {/* Identity Section */}
                      <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm space-y-6">
                        <h4 className="text-xs font-black uppercase text-stone-400 tracking-widest border-b border-stone-50 pb-2">Your Profile</h4>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                          <div className="md:col-span-3 flex flex-col items-center gap-3">
                             <div className="relative group cursor-pointer" onClick={() => document.getElementById('author-photo-input')?.click()}>
                                <div className="w-24 h-24 rounded-full overflow-hidden bg-stone-100 border-4 border-white shadow-md flex items-center justify-center">
                                    {formData.authorImage ? <img src={formData.authorImage} className="w-full h-full object-cover" /> : <User size={40} className="text-stone-300"/>}
                                </div>
                                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera size={24} className="text-white"/>
                                </div>
                             </div>
                             <span className="text-[10px] font-bold text-stone-400 uppercase">Author Photo</span>
                             <input type="file" id="author-photo-input" hidden accept="image/*" onChange={(e) => handleFileUpload(e, 'author')} />
                          </div>
                          
                          <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                               <label className="text-[10px] font-black uppercase text-stone-500 tracking-wider">Your Name</label>
                               <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-safari-500 outline-none" placeholder="e.g. Liam Smith" />
                            </div>
                            <div className="space-y-1">
                               <label className="text-[10px] font-black uppercase text-stone-500 tracking-wider">Role / Origin</label>
                               <input required name="role" value={formData.role} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-safari-500 outline-none" placeholder="e.g. Solo Backpacker, UK" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Story Content Section */}
                      <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm space-y-6">
                         <h4 className="text-xs font-black uppercase text-stone-400 tracking-widest border-b border-stone-50 pb-2">The Narrative</h4>
                         <div className="space-y-4">
                            <div className="space-y-1">
                               <label className="text-[10px] font-black uppercase text-stone-500 tracking-wider">Story Title</label>
                               <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-4 text-xl font-serif font-bold text-safari-900 rounded-xl border border-stone-200 focus:ring-2 focus:ring-safari-500 outline-none" placeholder="Catchy Headline for your Adventure" />
                            </div>
                            <div className="space-y-1">
                               <label className="text-[10px] font-black uppercase text-stone-500 tracking-wider">Your Experience</label>
                               <textarea required name="content" value={formData.content} onChange={handleInputChange} rows={8} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-safari-500 outline-none resize-none leading-relaxed" placeholder="Tell us everything... What were the highlights? Any advice for other travelers?"></textarea>
                            </div>
                            <div className="flex items-center gap-4">
                                <label className="text-[10px] font-black uppercase text-stone-500 tracking-wider">Rating</label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button type="button" key={star} onClick={() => setFormData({...formData, rating: star})} className="transition-transform hover:scale-110">
                                            <Star size={24} className={star <= formData.rating ? "text-yellow-400 fill-yellow-400" : "text-stone-200"} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                         </div>
                      </div>

                      {/* Photo Gallery Section */}
                      <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm space-y-6">
                         <h4 className="text-xs font-black uppercase text-stone-400 tracking-widest border-b border-stone-50 pb-2">Safari Gallery</h4>
                         <div className="space-y-4">
                            <p className="text-sm text-stone-500">Upload the photos you took during the trip. The first one will be used as the cover.</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                               {formData.gallery.map((img, idx) => (
                                 <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group shadow-inner bg-stone-100">
                                    <img src={img} className="w-full h-full object-cover" />
                                    <button 
                                        type="button" 
                                        onClick={() => removeGalleryItem(idx)}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                    {idx === 0 && <span className="absolute bottom-2 left-2 bg-safari-600 text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded">Cover</span>}
                                 </div>
                               ))}
                               <button 
                                 type="button" 
                                 onClick={() => document.getElementById('gallery-upload-input')?.click()}
                                 className="aspect-square rounded-2xl border-2 border-dashed border-stone-200 flex flex-col items-center justify-center gap-2 text-stone-400 hover:border-safari-500 hover:text-safari-600 hover:bg-safari-50 transition-all"
                               >
                                  <Plus size={24} />
                                  <span className="text-[10px] font-bold uppercase">Add Photo</span>
                               </button>
                               <input type="file" id="gallery-upload-input" hidden multiple accept="image/*" onChange={(e) => handleFileUpload(e, 'gallery')} />
                            </div>
                         </div>
                      </div>

                      <div className="pt-6">
                        <button type="submit" className="w-full bg-safari-600 hover:bg-safari-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-safari-200 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm">
                           Publish My Story <Send size={20} />
                        </button>
                      </div>
                   </form>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        // Full Story Reading View
        <div className="animate-fade-in-up">
          {/* Hero for Story */}
          <div className="relative h-[70vh]">
            <img 
              src={selectedStory.coverImage} 
              alt={selectedStory.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-safari-950/90 via-safari-950/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 text-white max-w-6xl mx-auto">
              <button 
                onClick={() => setSelectedStory(null)}
                className="mb-8 flex items-center gap-2 text-white/70 hover:text-white transition-colors uppercase tracking-[0.2em] text-xs font-black"
              >
                <ArrowLeft size={16} /> All Diaries
              </button>
              <div className="flex items-center gap-2 mb-4">
                 {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < selectedStory.rating ? "text-yellow-400 fill-yellow-400" : "text-white/20"} />
                 ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight max-w-4xl drop-shadow-2xl">
                {selectedStory.title}
              </h1>
              <div className="flex flex-wrap items-center gap-10 text-sm">
                <div className="flex items-center gap-3">
                  <img src={selectedStory.authorImage} className="w-12 h-12 rounded-full border-2 border-white/50 object-cover" alt={selectedStory.author} />
                  <div>
                    <p className="font-bold text-white uppercase tracking-wider">{selectedStory.author}</p>
                    <p className="text-white/60 text-xs">{selectedStory.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-l border-white/20 pl-10">
                  <Calendar size={18} className="text-safari-400"/>
                  <span className="font-medium uppercase tracking-tighter">{selectedStory.date}</span>
                </div>
                <div className="flex items-center gap-2 border-l border-white/20 pl-10">
                  <Clock size={18} className="text-safari-400"/>
                  <span className="font-medium uppercase tracking-tighter">6 min read</span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col lg:flex-row gap-16">
            <div className="lg:w-2/3">
                <div className="prose prose-xl prose-stone prose-headings:font-serif prose-headings:text-safari-900 prose-a:text-safari-600 max-w-none">
                    <p className="lead text-2xl text-stone-500 font-serif leading-relaxed italic border-l-4 border-safari-500 pl-8 mb-12">
                        {selectedStory.excerpt}
                    </p>
                    
                    {selectedStory.content.map((paragraph, idx) => (
                        <p key={idx} className="mb-8 leading-relaxed text-stone-700 text-lg">
                        {paragraph}
                        </p>
                    ))}
                </div>

                {/* TRIP GALLERY */}
                {selectedStory.gallery && selectedStory.gallery.length > 0 && (
                   <div className="mt-20 space-y-10">
                      <h3 className="text-3xl font-serif font-bold text-safari-900 flex items-center gap-3">
                        <ImageIcon className="text-safari-500" /> Traveler's Lens
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {selectedStory.gallery.map((img, idx) => (
                            <div key={idx} className={`rounded-3xl overflow-hidden shadow-lg group cursor-pointer ${idx % 3 === 0 ? 'md:col-span-2 aspect-video' : 'aspect-square'}`}>
                                <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Safari Shot ${idx+1}`} />
                            </div>
                         ))}
                      </div>
                   </div>
                )}
            </div>

            {/* Sidebar for Story */}
            <div className="lg:w-1/3">
                <div className="sticky top-28 space-y-8">
                    <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
                        <h4 className="text-xs font-black uppercase text-stone-400 tracking-widest mb-6">About the Author</h4>
                        <div className="flex items-center gap-4 mb-6">
                            <img src={selectedStory.authorImage} className="w-16 h-16 rounded-full object-cover shadow-inner" />
                            <div>
                                <p className="font-bold text-safari-900">{selectedStory.author}</p>
                                <p className="text-xs text-stone-500">{selectedStory.role}</p>
                            </div>
                        </div>
                        <p className="text-sm text-stone-600 leading-relaxed italic">"My trip to Rwanda was transformative. The people, the animals, and the sheer natural beauty were unlike anything I've experienced."</p>
                    </div>

                    <div className="bg-safari-950 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
                        <img src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2071" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-1000" />
                        <div className="relative z-10">
                            <h4 className="text-xl font-serif font-bold mb-2">Inspired by this journey?</h4>
                            <p className="text-safari-300 text-sm mb-6">Start planning your own custom Rwanda adventure with our AI expert.</p>
                            <button className="w-full py-4 bg-safari-500 hover:bg-safari-400 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg flex items-center justify-center gap-2">
                                Plan Similar Safari <Sparkles size={16}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="bg-stone-100 py-16">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h3 className="text-2xl font-serif font-bold text-safari-900 mb-8">Ready to see more?</h3>
                <button 
                  onClick={() => { setSelectedStory(null); window.scrollTo(0,0); }}
                  className="px-10 py-4 rounded-full border-2 border-safari-600 text-safari-700 font-black uppercase tracking-widest text-xs hover:bg-safari-600 hover:text-white transition-all shadow-md"
                >
                  Return to Travel Diaries
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
