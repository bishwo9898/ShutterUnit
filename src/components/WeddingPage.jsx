import React from 'react';
import Navbar from './Navbar';
import PhotoGallery from './PhotoGallery';
import { weddingsImages } from '../imageLists';

const WeddingPage = () => {

    const halfwayIndex = Math.ceil(weddingsImages.length / 2);
    const firstHalfImages = weddingsImages.slice(0, halfwayIndex);
    const secondHalfImages = weddingsImages.slice(halfwayIndex);
    
  return (
    <div className="w-screen min-h-[100dvh] flex flex-col bg-white">
      <Navbar />

      {/* Banner section with grayscale filter and overlay */}
        <div className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden">
          <img
            src="https://res.cloudinary.com/das25qoma/image/upload/v1754523407/n10_gtqhah.webp"
            alt="Weddings Banner"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full h-auto"
          />



        {/* Semi-transparent black overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0)] pointer-events-none"></div>

        {/* Title (empty for now, can be filled later) */}
        <div className="absolute inset-0 flex items-end md:items-center px-8 md:px-20 pb-10 md:pb-0">
          <h1
            className="text-white text-3xl md:text-4xl font-serif"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {/* Add a title here if desired */}
          </h1>
        </div>
      </div>

 
      <PhotoGallery imageFolder="weddings" imageNames={firstHalfImages} />
      <div className="w-full bg-[#302f2f] py-12 sm:py-16 md:py-24 relative flex flex-col items-center justify-center px-4 sm:px-8">
        <div
          className="absolute top-6 sm:top-10 md:top-12 left-1/2 transform -translate-x-1/2 border-t border-white"
          style={{ width: "180px", opacity: 0.6 }}
        />
        <h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[Cinzel,serif] tracking-widest text-gray-300 mb-4 sm:mb-6 text-center"
          style={{ fontWeight: 400 }}
        >
          Seen enough? Let's Connect{" "}
          <a
            href="/contact"
            className="text-white uppercase hover:text-white-50 font-normal"
          >
            HERE
          </a>
        </h2>
        <p
          className="text-sm sm:text-base md:text-lg font-[Cinzel,serif] text-gray-400 tracking-wide mt-1 sm:mt-2 text-center max-w-lg"
          style={{ fontWeight: 300 }}
        >
          Or keep scrolling for a bit more
        </p>
        <div
          className="absolute bottom-6 sm:bottom-10 md:bottom-12 left-1/2 transform -translate-x-1/2 border-b border-white"
          style={{ width: "180px", opacity: 0.6 }}
        />
      </div>

      <PhotoGallery imageFolder="weddings" imageNames={secondHalfImages} />
    </div>
  );
};

export default WeddingPage;
