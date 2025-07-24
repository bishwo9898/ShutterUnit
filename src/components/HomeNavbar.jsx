import React, { useEffect, useState } from "react";
//import "./HomeNavbar.css";

const HomeNavbar = () => {
  const radius = 150;
  const buttons = ["Info", "Weddings", "Portraits", "Contact Me",];
  const [rotation, setRotation] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let animationFrame;
    
    const animate = () => {
      if (!paused) {
        setRotation((prev) => (prev + 0.2) % 360); // Slower speed
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [paused]);


  return (
    <div className="home-nav-wrapper">
      <div className="center-button">What can I do for you?</div>

      <div className="rotating-container" style={{ pointerEvents: "auto" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        >
        {buttons.map((label, i) => {
          const angle = rotation + (360 / buttons.length) * i;

          return (
            <div
              key={i}
              className="orbit-wrapper"
              style={{
                transform: `rotate(${angle}deg) translate(${radius}px)`
              }}
            >
            <div
            className="orbit-button"
            style={{
                transform: `rotate(${-angle}deg)`
            }}
            >
            <div className="orbit-button-inner">
                {label}
            </div>
            </div>


            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeNavbar;
