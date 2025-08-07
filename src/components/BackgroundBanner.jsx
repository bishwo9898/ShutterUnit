import React, { useEffect, useRef, useState } from "react";


const portraitImages = [
  "https://res.cloudinary.com/das25qoma/image/upload/v1754509090/toughhhhhhnh_oo2jgg.webp",
  "https://res.cloudinary.com/das25qoma/image/upload/v1754509055/faith_11_ba9fz9.webp",
  "https://res.cloudinary.com/das25qoma/image/upload/v1754509047/cap_3_phl4dc.webp",
];

const weddingImages = [
  "https://res.cloudinary.com/das25qoma/image/upload/v1754509186/eunice_187_jqn2gk.webp",
  "https://res.cloudinary.com/das25qoma/image/upload/v1754509208/n1_absgnc.webp",
  "https://res.cloudinary.com/das25qoma/image/upload/v1754523406/n4_l9jah1.webp",
];


const BackgroundBanner = ({ hoveredSection }) => {
  const [activeSection, setActiveSection] = useState(null);
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
      setImagesArr([...weddingImages, ...portraitImages]);
      setTransitioning(false);
      setIndex(0);
      setTimeout(() => setTransitioning(true), 20);
    }
  }, [hoveredSection, activeSection]);

  const images = [...imagesArr, imagesArr[0]];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => prev + 1);
      setTransitioning(true);
    }, intervalTime);
    return () => clearInterval(intervalRef.current);
  }, [imagesArr]);

  useEffect(() => {
    if (!transitioning) return;
    if (index === images.length - 1) {
      timeoutRef.current = setTimeout(() => {
        setTransitioning(false);
        setIndex(0);
      }, slideDuration);
    } else {
      setTransitioning(true);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [index, images.length]);

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
            className="w-full h-full flex-shrink-0 min-h-[300px] sm:min-h-[400px] md:min-h-[500px]"
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
