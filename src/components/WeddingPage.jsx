import React from 'react';
import Navbar from './Navbar';
import PhotoGallery from './PhotoGallery';
import { weddingsImages } from '../imageLists'; // Your generated list of wedding images

const WeddingPage = () => {
  return (
    <div className="w-screen min-h-[100dvh] flex flex-col bg-white">
      <Navbar />

      {/* Container for banner image + overlay + title */}
      <div className="relative flex-grow w-full">
        {/* Background banner image with grayscale */}
        <img
          src="/banner.png"
          alt="Weddings Banner"
          className="w-full h-full object-cover object-center"
          style={{ minHeight: 'calc(90dvh - 79px)' }}
        />

        {/* Black overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] pointer-events-none"></div>

        {/* Title */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-left px-100">
          <h1
            className="text-white text-4xl font-serif"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {/* text goes here if needed */}
          </h1>
        </div>
      </div>

      {/* Wedding Gallery */}
      <PhotoGallery imageFolder="weddings" imageNames={weddingsImages} />
    </div>
  );
};

export default WeddingPage;
