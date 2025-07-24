import React, { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import AOS from "aos";
import "aos/dist/aos.css";

const PhotoGallery = ({ imageFolder, imageNames }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    let loadedCount = 0;
    imageNames.forEach((filename) => {
      const img = new Image();
      img.src = `/${imageFolder}/${filename}`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imageNames.length) {
          setAllLoaded(true);
          AOS.refresh(); // Re-initialize after images load
        }
      };
    });
  }, [imageFolder, imageNames]);

  const isPortrait = (filename) =>
    filename.toLowerCase().includes("portrait") || filename.includes("_p");

  const goPrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? imageNames.length - 1 : prev - 1));
  };
  const goNext = () => {
    setLightboxIndex((prev) => (prev === imageNames.length - 1 ? 0 : prev + 1));
  };

  const handleLightboxClick = (event) => {
    const clickX = event.clientX;
    const windowWidth = window.innerWidth;
    if (clickX < windowWidth / 2) {
      goPrev();
    } else {
      goNext();
    }
  };

  return (
    <div className="w-full max-w-full mx-auto px-10 ml-3 py-22">
      {allLoaded ? (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-1 space-y-2">
          {imageNames.map((filename, i) => (
            <div
              key={i}
              data-aos="fade-up"
              className="w-full break-inside-avoid cursor-zoom-in overflow-hidden shadow-md"
              onClick={() => {
                setLightboxIndex(i);
                setLightboxOpen(true);
              }}
            >
            <img
              src={`/${imageFolder}/${filename}`}
              alt={`Gallery ${i}`}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className={`w-full h-auto object-cover transition-transform duration-300 hover:scale-[1.02] ${
                isPortrait(filename)
                  ? "md:w-[120%]"
                  : "md:w-[140%] mx-auto"
              }`}
              style={{
                display: "block",
                margin: "0 auto",
                maxWidth: isPortrait(filename) ? "100%" : "100%",
                maxHeight: isPortrait(filename) ? "300px" : "none", // reduce portrait height
                objectFit: "cover",
              }}
            />


            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 font-serif">Loading gallery...</div>
      )}

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        onClick={handleLightboxClick}
        styles={{
          container: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            transition: "background-color 0.3s ease",
            cursor: "default",
          },
        }}
        slides={imageNames.map((filename) => ({
          src: `/${imageFolder}/${filename}`,
        }))}
      />
    </div>
  );
};

export default PhotoGallery;
