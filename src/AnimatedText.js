// src/AnimatedBox.js
import React, { useEffect, useRef } from "react";
// import './AnimatedBox.css';

const AnimatedBox = ({ scrollHeight }) => {
  const boxRef = useRef(null);
  const svgRef = useRef(null);

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
      // reduce the opacity of the box as the user scrolls
      const opacity = 1 - scrollFraction;
      // boxRef.current.style.transform = `translateX(${position}px)`;
      boxRef.current.style.opacity = opacity;
      if (svgRef) {
        // svgRef.current.style.transform = `translateX(${position}px)`;
        svgRef.current.style.height = `${Math.max(scrollFraction * 50, 5)}vh`;
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
    <div
      className=" text-white w-[45vw] h-full  fixed flex flex-col justify-center gap-12 text-xl"
      ref={boxRef}
    >
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 220 166"
        class="h-14 w-auto"
      >
        <path
          fill="#F5975F"
          d="M106 92C20.216 49.546 60.783-21.74 75.778 6.397 87.774 28.907 100.924 72.844 106 92M114.022 91.723c30.712-90.652 106.745-59.889 80.843-41.298-20.721 14.873-62.529 33.73-80.843 41.298M106.174 105.123c-79.74 52.941-121.082-17.898-89.22-16.766 25.49.905 70.101 11.555 89.22 16.766M115.999 104.626c88.709-35.944 115.067 41.726 84.072 34.252-24.795-5.979-66.379-25.326-84.072-34.252"
        ></path>
      </svg>
      some Text
    </div>
  );
};

export default AnimatedBox;
