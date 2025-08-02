import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import PhotoGallery from "./PhotoGallery";
import { homeImages } from "../imageLists";
import BackgroundBanner from "./BackgroundBanner";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
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
    <div className="w-full min-h-[100dvh] flex flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative min-h-[100dvh] bg-cover bg-center bg-no-repeat w-full">
        <BackgroundBanner hoveredSection={hoveredSection} />
        <div className="absolute inset-0 bg-[rgba(81,80,80,0.25)] z-11"></div>

        <div
          className="absolute bottom-[65%] left-1/2 z-20 transform -translate-x-1/2 text-center w-full px-4 sm:px-6 md:px-12 lg:px-0"
          style={{
            maxWidth: "70vw",
            overflowX: "visible",
            margin: "0 auto",
          }}
        >
          <h1
            className="text-white font-normal tracking-tight mb-6 md:mb-10 text-center"
            style={{
              fontFamily: "'Rock Salt', 'Comic Sans MS', 'Comic Sans', cursive",
              fontWeight: 400,
              WebkitFontSmoothing: "antialiased",
              fontSize: "clamp(1.2rem, 2.8vw, 2.2rem)",
              lineHeight: 1.2,
              whiteSpace: "normal",
              wordBreak: "keep-word",
              overflowWrap: "break-word",
              padding: "0 1rem",
              maxWidth: "85%",
              margin: "0 auto"
            }}
          >
            {(() => {
              const groupedWords = ["WHAT", "WOULD", "YOU", "LIKE", "TO", "CAPTURE?"];
              const styleMap = [
                { size: "0.85em", rot: -8, up: true },
                { size: "0.78em", rot: 6, up: false },
                { size: "0.92em", rot: 0, up: true },
                { size: "0.8em", rot: -4, up: false },
                { size: "0.85em", rot: 10, up: true },
                { size: "0.78em", rot: -6, up: false },
                { size: "0.85em", rot: 4, up: false },
                { size: "0.8em", rot: 0, up: false },
                { size: "0.78em", rot: -10, up: false },
              ];

              return groupedWords.map((word, wordIdx) => (
                <span
                  key={wordIdx}
                  style={{
                    display: "inline-block",
                    marginRight: "0.5ch",
                    whiteSpace: "nowrap",
                    overflow: "visible"
                  }}
                >
                  {word.split("").map((char, j) => {
                    const s = styleMap[(wordIdx * 5 + j) % styleMap.length];
                    return (
                      <span
                        key={j}
                        style={{
                          display: "inline-block",
                          fontSize: s?.size || "1em",
                          transform: `rotate(${s?.rot || 0}deg) skewY(${s?.rot ? s.rot / 2 : 0}deg)`,
                          textTransform: s?.up ? "uppercase" : "lowercase",
                          marginRight: "0.004em",
                          fontWeight: 400,
                          lineHeight: 1,
                          userSelect: "none",
                        }}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              ));
            })()}
          </h1>

          {/* Buttons */}
          {headingDone && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-12 md:gap-20 lg:gap-32 mt-3 md:mt-5 w-full px-4 sm:px-0 max-w-[100vw] sm:max-w-[80vw] md:max-w-[60vw] lg:max-w-[50vw] mx-auto overflow-x-hidden">
              {["Portraits", "Weddings"].map((label) => (
                <button
                  key={label}
                  className="group relative px-5 sm:px-8 md:px-10 py-3 sm:py-5 md:py-6 rounded-full text-white font-serif tracking-wider uppercase transition-transform duration-300 ease-in-out bg-none overflow-visible text-base sm:text-lg md:text-xl lg:text-2xl max-w-[140px] sm:max-w-[160px] md:max-w-[290px]"
                  style={{
                    background: "none",
                    border: "none",
                    fontFamily: "'Times New Roman', Times, serif",
                    whiteSpace: "nowrap",
                  }}
                  onClick={() =>
                    navigate(label === "Portraits" ? "/portraits" : "/weddings")
                  }
                  onMouseEnter={() => setHoveredSection(label.toLowerCase())}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <span
                    className="relative z-10 font-normal tracking-widest drop-shadow-md transition-all duration-300 ease-in-out group-hover:text-[2.1rem] sm:group-hover:text-[2.8rem] md:group-hover:text-[3.2rem]"
                    style={{
                      fontFamily: "'Times New Roman', Times, serif",
                      overflowWrap: "normal",
                      wordBreak: "keep-all",
                      display: "inline-block",
                    }}
                  >
                    {buttonText[label].split("").map((char, i) => (
                      <span
                        key={i}
                        style={{
                          display: "inline-block",
                          transition: "transform 0.2s",
                          transform: `rotate(${i % 2 === 0 ? -5 : 5}deg)`,
                          userSelect: "none",
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

          <style>{`
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
            @media (min-width: 640px) {
              h1 {
                font-size: 2.8rem !important;
                letter-spacing: -0.07em !important;
              }
            }
            @media (min-width: 768px) {
              h1 {
                font-size: 3.6rem !important;
                letter-spacing: -0.09em !important;
              }
            }
            @media (min-width: 1024px) {
              h1 {
                font-size: 4.25rem !important;
                letter-spacing: -0.09em !important;
              }
            }
          `}</style>
        </div>
      </div>

      {/* Remaining content untouched */}
      


      {/* Keep your remaining layout exactly the same */}
      <div
        className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] mt-0"
        style={{ overflowWrap: "break-word" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('/why.webp')",
            filter: "grayscale(100%) brightness(1)",
          }}
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 max-w-3xl sm:max-w-4xl md:max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-16 md:py-24">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[Playfair_Display] font-medium mb-4 sm:mb-6 md:mb-8 tracking-normal leading-snug drop-shadow-md text-left">
            WHY CHOOSE US?
          </h2>
          <p className="text-white text-base sm:text-lg md:text-xl font-light font-[Playfair_Display] leading-relaxed tracking-wide drop-shadow-md text-left max-w-full md:max-w-3xl whitespace-normal">
            You are one of a kind—your photos should be too.
            <br />
            <br />
            We believe your story deserves to be told in a way that reflects your
            essence—whether that’s timeless and elegant, bold and colorful, or
            soft and romantic.
            <br />
            <br />
            What do you dream your day will feel like? Let us turn that into a
            visual legacy.
          </p>
        </div>
      </div>

      <div className="w-full bg-gray-00 py-8 sm:py-10 md:py-12 flex justify-center items-center mt-6 md:mt-10">
        <div className="flex flex-col items-center space-y-6 md:space-y-10">
          <h2 className="text-base sm:text-xl md:text-3xl font-[Playfair_Display] tracking-wide text-gray-700 uppercase select-none">
            See My Work
          </h2>
          <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-gray-00 rounded-full flex items-start justify-center p-1 animate-bounce">
            <div className="w-1 h-2 bg-gray-600 rounded-full" />
          </div>
        </div>
      </div>

      <PhotoGallery imageFolder="home" imageNames={firstHalfImages} />

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

      <PhotoGallery imageFolder="home" imageNames={secondHalfImages} />
    </div>
  );
};

export default HomePage;
