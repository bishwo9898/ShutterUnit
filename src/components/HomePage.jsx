import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import PhotoGallery from "./PhotoGallery";
import { homeImages } from "../imageLists";
import BackgroundBanner from "./BackgroundBanner";

const HomePage = () => {
  const fullText = "WHAT WOULD YOU LIKE TO CAPTURE?";
  const [displayedText, setDisplayedText] = useState("");
  const [hoveredSection, setHoveredSection] = useState(null);
  const [headingDone, setHeadingDone] = useState(false);
  const [buttonText, setButtonText] = useState({ Portraits: "", Weddings: "" });

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      const nextChar = fullText.charAt(index);
      if (nextChar) {
        setDisplayedText((prev) => prev + nextChar);
        index++;
      } else {
        clearInterval(interval);
        setHeadingDone(true);
      }
    }, 75);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (headingDone) {
      const labels = ["Portraits", "Weddings"];
      labels.forEach((label) => {
        let idx = 0;
        const interval = setInterval(() => {
          setButtonText((prev) => ({
            ...prev,
            [label]: label.slice(0, idx + 1),
          }));
          idx++;
          if (idx === label.length) clearInterval(interval);
        }, 100);
      });
    }
  }, [headingDone]);

  const halfwayIndex = Math.ceil(homeImages.length / 2);
  const firstHalfImages = homeImages.slice(0, halfwayIndex);
  const secondHalfImages = homeImages.slice(halfwayIndex);

  return (
    <div className="w-full min-h-[100dvh] flex flex-col bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[100dvh] sm:h-screen bg-cover bg-center bg-no-repeat">
        <BackgroundBanner hoveredSection={hoveredSection} />
        <div className="absolute inset-0 bg-[rgba(94,94,94,0)] z-10"></div>

        <div className="absolute inset-x-0 bottom-[55%] sm:bottom-[60%] z-20 px-4 sm:px-6 md:px-8 text-center w-full">
          <h1
            className="text-white font-normal mb-4 sm:mb-6 text-[0.85rem] xs:text-sm sm:text-base md:text-2xl lg:text-5xl"
            style={{
              fontFamily: "'Rock Salt', 'Comic Sans MS', 'Comic Sans', cursive",
              letterSpacing: '-0.09em',
              fontWeight: 400,
              WebkitFontSmoothing: 'antialiased',
              lineHeight: 1.3
            }}
          >
            {(() => {
              const styleMap = [
                { size: '0.85em', rot: -8, up: true },
                { size: '0.78em', rot: 6, up: false },
                { size: '0.92em', rot: 0, up: true },
                { size: '0.8em', rot: -4, up: false },
                { size: '0.38em', rot: 0, up: false },
                { size: '0.85em', rot: 10, up: true },
                { size: '0.78em', rot: -6, up: false },
                { size: '0.85em', rot: 4, up: false },
                { size: '0.8em', rot: 0, up: false },
                { size: '0.78em', rot: -10, up: false },
                { size: '0.38em', rot: 0, up: false },
                { size: '0.85em', rot: 8, up: true },
                { size: '0.78em', rot: -8, up: false },
                { size: '0.8em', rot: 6, up: false },
                { size: '0.38em', rot: 0, up: false },
                { size: '0.8em', rot: -6, up: false },
                { size: '0.85em', rot: 8, up: false },
                { size: '0.78em', rot: 0, up: false },
                { size: '0.92em', rot: -12, up: true },
                { size: '0.38em', rot: 0, up: false },
                { size: '0.85em', rot: 10, up: true },
                { size: '0.78em', rot: -8, up: false },
                { size: '0.38em', rot: 0, up: false },
                { size: '0.8em', rot: 6, up: false },
                { size: '0.85em', rot: -6, up: true },
                { size: '0.78em', rot: 8, up: false },
                { size: '0.8em', rot: 0, up: false },
                { size: '0.85em', rot: 10, up: false },
                { size: '0.78em', rot: -10, up: false },
                { size: '0.92em', rot: 8, up: true },
                { size: '0.78em', rot: 0, up: false },
              ];
              const questionIdx = displayedText.indexOf('?');
              const renderText = questionIdx !== -1 ? displayedText.slice(0, questionIdx + 1) : displayedText;
              return renderText.split('').map((char, j) => {
                const s = styleMap[j % styleMap.length];
                if (char === ' ') return <span key={j} style={{ display: 'inline-block', width: '0.4em' }}> </span>;
                return (
                  <span
                    key={j}
                    style={{
                      display: 'inline-block',
                      fontSize: s?.size || '1em',
                      transform: `rotate(${s?.rot || 0}deg) skewY(${s?.rot ? s.rot / 2 : 0}deg)`,
                      textTransform: s?.up ? 'uppercase' : 'lowercase',
                      marginRight: '0.005em',
                      fontWeight: 400,
                    }}
                  >
                    {char}
                  </span>
                );
              });
            })()}
          </h1>

              {headingDone && (
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 md:gap-20 mt-4 sm:mt-6">
                  {["Portraits", "Weddings"].map((label) => (
                    <button
                      key={label}
                      className="group relative px-5 sm:px-6 py-3 sm:py-4 rounded-full text-white tracking-wider uppercase transition-transform duration-300 text-base sm:text-xl md:text-2xl focus:outline-none focus:ring-0 bg-transparent hover:bg-transparent active:bg-transparent"
                      style={{
                        fontFamily: "'Times New Roman', Times, serif",
                        border: "none",
                        background: "transparent",
                      }}
                      onClick={() => window.location.href = label === "Portraits" ? "/portraits" : "/weddings"}
                      onMouseEnter={() => setHoveredSection(label.toLowerCase())}
                      onMouseLeave={() => setHoveredSection(null)}
                    >
                      <span className="relative z-10 font-normal tracking-widest drop-shadow-md transition-all duration-300 ease-in-out group-hover:text-[2rem] sm:group-hover:text-[2.5rem] md:group-hover:text-[3rem]">
                        {buttonText[label].split("").map((char, i) => (
                          <span
                            key={i}
                            style={{
                              display: 'inline-block',
                              transition: 'transform 0.2s',
                              transform: `rotate(${(i % 2 === 0 ? -5 : 5)}deg)`,
                            }}
                          >
                            {char}
                          </span>
                        ))}
                      </span>
                    </button>
                  ))}
            </div>
          )}
        </div>
      </div>

      {/* WHY Section */}
      <div className="relative w-full min-h-[450px] sm:min-h-[500px] md:min-h-[600px] mt-0">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" style={{ backgroundImage: "url('/why.png')", filter: "grayscale(100%) brightness(1)" }} />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 max-w-3xl sm:max-w-4xl md:max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-16 md:py-24">
          <h2 className="text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-[Playfair_Display] font-medium mb-4 sm:mb-6 tracking-normal leading-snug text-left">WHY CHOOSE US?</h2>
          <p className="text-white text-sm sm:text-lg md:text-xl font-light font-[Playfair_Display] leading-relaxed tracking-wide text-left max-w-xl sm:max-w-2xl">
            You are one of a kind—your photos should be too.<br /><br />
            We believe your story deserves to be told in a way that reflects your essence—
            whether that’s timeless and elegant, bold and colorful, or soft and romantic.<br /><br />
            What do you dream your day will feel like? Let us turn that into a visual legacy.
          </p>
        </div>
      </div>

      {/* Scroll prompt */}
      <div className="w-full bg-gray-50 py-8 sm:py-10 md:py-12 flex justify-center items-center mt-6 md:mt-10">
        <div className="flex flex-col items-center space-y-4 md:space-y-6">
          <h2 className="text-sm sm:text-xl md:text-3xl font-[Playfair_Display] tracking-wide text-gray-700 uppercase">See My Work</h2>
          <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-1 animate-bounce">
            <div className="w-1 h-2 bg-gray-600 rounded-full" />
          </div>
        </div>
      </div>

      <PhotoGallery imageFolder="home" imageNames={firstHalfImages} />

      {/* Contact Teaser */}
      <div className="w-full bg-[#302f2f] py-12 sm:py-16 md:py-24 flex flex-col items-center justify-center relative">
        <div className="absolute top-6 sm:top-10 left-1/2 transform -translate-x-1/2 border-t border-white opacity-60" style={{ width: "180px" }}></div>
        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-[Cinzel,serif] tracking-widest text-gray-300 mb-3 sm:mb-5 text-center font-normal">
          Seen enough? Let's Connect <a href="/contact" className="text-white uppercase hover:text-white/80">HERE</a>
        </h2>
        <p className="text-xs sm:text-sm md:text-lg font-[Cinzel,serif] text-gray-400 tracking-wide font-light text-center">
          Or keep scrolling for a bit more
        </p>
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 border-b border-white opacity-60" style={{ width: "180px" }}></div>
      </div>

      <PhotoGallery imageFolder="home" imageNames={secondHalfImages} />

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap');
        `}
      </style>
    </div>
  );
};

export default HomePage;
