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
    <div className="w-screen min-h-[100dvh] flex flex-col bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-screen bg-cover bg-center bg-no-repeat">
        <BackgroundBanner hoveredSection={hoveredSection} />
        <div className="absolute inset-0 bg-[rgba(94,94,94,0.4)] z-11"></div>

        <div
          className="absolute left-1/2 z-20 transform -translate-x-1/2 text-center w-full px-2 sm:px-4 md:px-8 lg:px-0"
          style={{
            bottom: '60%',
            /* Default for mobile */
          }}
        >
          <h1
            className="text-white font-normal tracking-tight mb-2 md:mb-10 mt-8 sm:mt-0
              text-lg xs:text-xl sm:text-2xl md:text-4xl lg:text-5xl
              "
            style={{
              fontFamily: "'Rock Salt', 'Comic Sans MS', 'Comic Sans', cursive",
              letterSpacing: '-0.09em',
              fontWeight: 400,
              WebkitFontSmoothing: 'antialiased',
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

          {/* Buttons */}
          {headingDone && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-16 md:gap-28 lg:gap-44 mt-4 md:mt-6 w-full">
              {["Portraits", "Weddings"].map((label) => (
                <button
                  key={label}
                  className="group relative px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 rounded-full text-white font-serif tracking-wider uppercase transition-transform duration-300 ease-in-out bg-none overflow-hidden text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl"
                  style={{ background: "none", border: "none", fontFamily: "'Times New Roman', Times, serif" }}
                  onClick={() => window.location.href = label === "Portraits" ? "/portraits" : "/weddings"}
                  onMouseEnter={() => setHoveredSection(label.toLowerCase())}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <span className="relative z-10 font-normal tracking-widest drop-shadow-md transition-all duration-300 ease-in-out group-hover:text-[2.5rem] md:group-hover:text-[3.5rem]" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                    {buttonText[label].split("").map((char, i) => (
                      <span key={i} style={{ display: 'inline-block', transition: 'transform 0.2s', transform: `rotate(${(i % 2 === 0 ? -5 : 5)}deg)` }}>
                        {char}
                      </span>
                    ))}
                  </span>
                </button>
              ))}
            </div>
          )}

          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap');
              @keyframes gradient-border {
                0% {
                  border-image: linear-gradient(90deg, #ec4899, #a78bfa, #3b82f6) 1;
                  opacity: 0;
                }
                100% {
                  border-image: linear-gradient(90deg, #ec4899, #a78bfa, #3b82f6) 1;
                  opacity: 1;
                }
              }
              .animate-gradient-border {
                border-width: 2px;
                border-style: solid;
                border-image: linear-gradient(90deg, #ec4899, #a78bfa, #3b82f6) 1;
                opacity: 1;
                animation: gradient-border 0.6s forwards;
              }
            `}
          </style>
        </div>
      </div>

      {/* Keep your remaining layout exactly the same */}
      <div className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] mt-0">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" style={{ backgroundImage: "url('/why.png')", filter: "grayscale(100%) brightness(1)" }} />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 max-w-3xl sm:max-w-4xl md:max-w-5xl mx-auto px-2 sm:px-4 md:px-8 py-10 sm:py-16 md:py-24">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[Playfair_Display] font-medium mb-4 sm:mb-6 md:mb-8 tracking-normal leading-snug drop-shadow-md text-left">WHY CHOOSE US?</h2>
          <p className="text-white text-base sm:text-lg md:text-xl font-light font-[Playfair_Display] leading-loose tracking-wide drop-shadow-md text-left max-w-2xl md:max-w-3xl">
            You are one of a kind—your photos should be too.<br /><br />
            We believe your story deserves to be told in a way that reflects your essence—
            whether that’s timeless and elegant, bold and colorful, or soft and romantic.<br /><br />
            What do you dream your day will feel like? Let us turn that into a visual legacy.
          </p>
        </div>
      </div>

      <div className="w-full bg-gray-00 py-8 sm:py-10 md:py-12 flex justify-center items-center mt-6 md:mt-10">
        <div className="flex flex-col items-center space-y-6 md:space-y-10">
          <h2 className="text-base sm:text-xl md:text-3xl font-[Playfair_Display] tracking-wide text-gray-700 uppercase">See My Work</h2>
          <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-gray-00 rounded-full flex items-start justify-center p-1 animate-bounce">
            <div className="w-1 h-2 bg-gray-600 rounded-full" />
          </div>
        </div>
      </div>

      <PhotoGallery imageFolder="home" imageNames={firstHalfImages} />

      <div className="w-full bg-[#302f2f] py-12 sm:py-16 md:py-24 relative flex flex-col items-center justify-center">
        <div className="absolute top-6 sm:top-10 md:top-12 left-1/2 transform -translate-x-1/2 border-t border-white" style={{ width: "180px", opacity: 0.6 }}></div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[Cinzel,serif] tracking-widest text-gray-300 mb-4 sm:mb-6 text-center" style={{ fontWeight: 400 }}>
          Seen enough? Let's Connect{" "}
          <a href="/contact" className="text-white uppercase hover:text-white-50 font-normal">HERE</a>
        </h2>
        <p className="text-sm sm:text-base md:text-lg font-[Cinzel,serif] text-gray-400 tracking-wide mt-1 sm:mt-2" style={{ fontWeight: 300 }}>
          Or keep scrolling for a bit more
        </p>
        <div className="absolute bottom-6 sm:bottom-10 md:bottom-12 left-1/2 transform -translate-x-1/2 border-b border-white" style={{ width: "180px", opacity: 0.6 }}></div>
      </div>

      <PhotoGallery imageFolder="home" imageNames={secondHalfImages} />
    </div>
  );
};

export default HomePage;
