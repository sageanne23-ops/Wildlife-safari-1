import React from 'react';
import PageHeader from './PageHeader';

const Gallery: React.FC = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1547995886-6467316ba806?q=80&w=2072&auto=format&fit=crop",
      title: "Tea Plantations",
      desc: "Gisovu"
    },
    {
      url: "https://images.unsplash.com/photo-1577703838048-73b8dbefd031?q=80&w=2067&auto=format&fit=crop",
      title: "Traditional Dancers",
      desc: "Nyanza King's Palace"
    },
    {
      url: "https://images.unsplash.com/photo-1628198758826-6136d837699d?q=80&w=2070&auto=format&fit=crop",
      title: "Mountain Gorillas",
      desc: "Volcanoes National Park"
    },
    {
      url: "https://images.unsplash.com/photo-1544258788-b7f73c4f74d0?q=80&w=2070&auto=format&fit=crop",
      title: "Lake Kivu",
      desc: "Karongi"
    },
    {
      url: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2072&auto=format&fit=crop",
      title: "Zebras",
      desc: "Akagera National Park"
    },
    {
      url: "https://images.unsplash.com/photo-1518182170546-0766aa6f7126?q=80&w=2070&auto=format&fit=crop",
      title: "Canopy Walkway",
      desc: "Nyungwe Forest"
    },
    {
      url: "https://images.unsplash.com/photo-1626270726888-2d8540a83856?q=80&w=2070&auto=format&fit=crop",
      title: "Golden Monkeys",
      desc: "Volcanoes National Park"
    },
    {
      url: "https://images.unsplash.com/photo-1489396160835-7798832a5028?q=80&w=2069&auto=format&fit=crop",
      title: "Savannah Sunset",
      desc: "Akagera National Park"
    },
    {
      url: "https://images.unsplash.com/photo-1589136787383-2287413d964f?q=80&w=2070&auto=format&fit=crop",
      title: "Kigali Convention",
      desc: "Kigali City"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <PageHeader 
        title="Gallery" 
        subtitle="A visual journey through the heart of Africa."
        image="https://images.unsplash.com/photo-1517013892700-1c6e11894d80?q=80&w=2070&auto=format&fit=crop"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div key={idx} className="group relative h-80 overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition-all">
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h4 className="text-white text-xl font-bold font-serif">{img.title}</h4>
                <p className="text-safari-200 text-sm">{img.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
