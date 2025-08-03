import React from 'react';
import Navbar from './Navbar';
import PhotoGallery from './PhotoGallery';
import { portraitsImages } from '../imageLists';

const Portraits = () => {
  return (
    <div className="w-screen min-h-[100dvh] flex flex-col bg-white">
      <Navbar />

      {/* Banner section with responsive height */}
      <div className="relative w-full h-[60vh] md:h-[80vh]">
        {/* Grayscale banner image */}
        <img
          src="/portraits.jpeg"
          alt="Portraits Banner"
          className="w-full h-full object-cover object-center"
        />

        {/* Transparent overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0)] pointer-events-none"></div>

        {/* Optional title overlay */}
        <div className="absolute inset-0 flex items-end md:items-center px-8 md:px-20 pb-10 md:pb-0">
          <h1
            className="text-white text-3xl md:text-4xl font-serif"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {/* Title goes here if needed */}
          </h1>
        </div>
      </div>

      {/* Portrait Gallery starts immediately after the banner */}
      <PhotoGallery imageFolder="portraits" imageNames={portraitsImages} />
    </div>
  );
};

export default Portraits;
