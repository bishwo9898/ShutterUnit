import React from 'react';
import Navbar from './Navbar';
import PhotoGallery from './PhotoGallery';
import { weddingsImages } from '../imageLists';

const WeddingPage = () => {
  return (
    <div className="w-screen min-h-[100dvh] flex flex-col bg-white">
      <Navbar />

      {/* Banner section with grayscale filter and overlay */}
      <div className="relative w-full h-[60vh] md:h-[120vh]">
        {/* Grayscale background image */}
        <img
          src="/banner.webp"
          alt="Weddings Banner"
          className="w-full h-full object-cover object-center"
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

      {/* Wedding Gallery immediately after banner */}
      <PhotoGallery imageFolder="weddings" imageNames={weddingsImages} />
    </div>
  );
};

export default WeddingPage;
