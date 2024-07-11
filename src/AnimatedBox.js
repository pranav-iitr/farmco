// src/AnimatedBox.js
import React, { useEffect, useRef } from "react";
// import './AnimatedBox.css';

const AnimatedBox = ({ scrollHeight }) => {
  const boxRef = useRef(null);
  const miniBoxRef = useRef(null);

  const handleScroll = () => {
    if (boxRef.current) {
      const scrollTop = window.scrollY;
      const maxScroll = scrollHeight * window.innerHeight;
      const scrollFraction = Math.min(scrollTop / maxScroll, 1);
      const endPosition = window.innerWidth - (boxRef.current.offsetWidth + 40);
      const centerPosition =
        window.innerWidth / 2 - boxRef.current.offsetWidth / 2;
      const position =
        endPosition - (endPosition - centerPosition) * scrollFraction;

      boxRef.current.style.transform = `translateX(${position}px)`;
      if (miniBoxRef.current) {
        const endXPosition =
          boxRef.current.offsetWidth - miniBoxRef.current.offsetWidth;
        const xPosition = endXPosition * (1 - scrollFraction);
        const endYPosition =
          boxRef.current.offsetHeight - miniBoxRef.current.offsetHeight;
        const yPosition = endYPosition * scrollFraction;
        miniBoxRef.current.style.transform = `translateX(${xPosition}px) translateY(${yPosition}px)`;
      }
      console.log(scrollTop / maxScroll, scrollFraction);
      if (scrollTop / maxScroll - 0.2 > scrollFraction) {
        // transform opacity to 0 in animaed format
        boxRef.current.style.opacity = 0;

        boxRef.current.style.position = "static";
      } else {
        boxRef.current.style.opacity = 1;
        boxRef.current.style.position = "fixed";
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollHeight]);

  return (
    <div className="animated-box" ref={boxRef}>
      <div ref={miniBoxRef} className="box bg-red-400 w-[40%] h-[40%] "></div>
    </div>
  );
};

export default AnimatedBox;
