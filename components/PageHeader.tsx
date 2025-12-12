import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  image: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, image }) => {
  return (
    <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-safari-950/70"></div>
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">{title}</h1>
        <p className="text-lg md:text-xl text-safari-100 max-w-2xl mx-auto">{subtitle}</p>
      </div>
    </div>
  );
};

export default PageHeader;
