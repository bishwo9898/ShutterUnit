import React, { useEffect, useRef, useState } from "react";

const weddingImages = [
  "/banners/wedding1.png",
  "/banners/wedding2.png",
  "/banners/wedding3.png",
];
const portraitImages = [
  "/banners/portrait1.png",
  "/banners/portrait2.png",
  "/banners/portrait3.png",
];


const BackgroundBanner = ({ hoveredSection }) => {
  // Persist the last hovered section until a new button is hovered
  const [activeSection, setActiveSection] = useState(null); // 'weddings' | 'portraits' | null
  const [imagesArr, setImagesArr] = useState([...weddingImages, ...portraitImages]);
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(true);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const slideDuration = 900;
  const intervalTime = 5000;

  useEffect(() => {
    if (hoveredSection === "weddings" && activeSection !== "weddings") {
      setActiveSection("weddings");
      setImagesArr(weddingImages);
      setTransitioning(false);
      setIndex(0);
      setTimeout(() => setTransitioning(true), 20);
    } else if (hoveredSection === "portraits" && activeSection !== "portraits") {
      setActiveSection("portraits");
      setImagesArr(portraitImages);
      setTransitioning(false);
      setIndex(0);
      setTimeout(() => setTransitioning(true), 20);
    } else if (!activeSection && hoveredSection == null) {
      // On first load, show all images
      setImagesArr([...weddingImages, ...portraitImages]);
      setTransitioning(false);
      setIndex(0);
      setTimeout(() => setTransitioning(true), 20);
    }
    // If hoveredSection is null but activeSection is set, do nothing (persist last hovered)
  }, [hoveredSection, activeSection]);

  // For seamless loop, clone only the first image at the end
  const images = [...imagesArr, imagesArr[0]];

  // Slide interval
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => prev + 1);
      setTransitioning(true);
    }, intervalTime);
    return () => clearInterval(intervalRef.current);
  }, [imagesArr]);

  // Handle seamless loop for animation (always forward)
  useEffect(() => {
    if (!transitioning) return;
    if (index === images.length - 1) {
      timeoutRef.current = setTimeout(() => {
        setTransitioning(false);
        setIndex(0); // Always jump to index 0 for right-to-left
      }, slideDuration);
    } else {
      setTransitioning(true);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [index, images.length]);

  // Reset transition after jump
  // No need for extra transition reset, handled above

  const sliderStyle = {
    display: "flex",
    width: `${images.length * 100}%`,
    transform: `translateX(-${index * (100 / images.length)}%)`,
    transition: transitioning ? `transform ${slideDuration}ms cubic-bezier(0.6, 0.05, 0.01, 0.99)` : "none",
    height: "100%",
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      <div style={sliderStyle}>
        {images.map((img, idx) => (
          <div
            key={idx}
            className="w-full h-full flex-shrink-0"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: `${100 / images.length}%`,
              height: "100%",
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-black/30 z-10" />
    </div>
  );
};

export default BackgroundBanner;