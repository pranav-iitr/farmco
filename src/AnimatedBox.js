import React, { useEffect, useRef, useCallback } from "react";

const AnimatedBox = ({ scrollHeight }) => {
  const boxRef = useRef(null);
  const miniBoxRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (boxRef.current) {
      const scrollTop = window.scrollY;
      const maxScroll = scrollHeight * window.innerHeight;
      const scrollFraction = Math.min(scrollTop / maxScroll, 1);
      const adjustedValue = scrollFraction >= 1 ? 0 : 40;
      const endPosition =
        window.innerWidth - (boxRef.current.offsetWidth + adjustedValue);
      const centerPosition =
        window.innerWidth / 2 - boxRef.current.offsetWidth / 2;

      const position =
        endPosition - (endPosition - centerPosition) * scrollFraction;

      const minWidth = 300;

      const minHeight = window.innerHeight * 0.6; // Assuming starting height is 200px

      const newWidth = Math.min(
        Math.max(
          (scrollTop / maxScroll - scrollFraction) * window.innerWidth,
          300
        ),
        window.innerWidth
      );
      const newHeight = Math.min(
        Math.max(
          (scrollTop / maxScroll - scrollFraction) * window.innerHeight,
          window.innerHeight * 0.6
        ),
        window.innerHeight + 10
      );

      if (scrollFraction < 1) {
        boxRef.current.style.transform = `translateX(${position}px)`;
      } else if (1 === scrollFraction) {
        boxRef.current.style.position = "fixed";
        // boxRef.current.style.top = "50%";
        // boxRef.current.style.left = "50%";
        boxRef.current.style.transform = `translateX(${position}px)  scale(${
          newWidth / minWidth
        }, ${newHeight / minHeight})`;
        // boxRef.current.style.borderRadius = `${newWidth / 10}px`;
      }

      if (0.8 < scrollTop / maxScroll - scrollFraction) {
        console.log(scrollTop / maxScroll - scrollFraction);
        // reduce opacity from 1 to 0
        boxRef.current.style.opacity =
          1 - (scrollTop / maxScroll - scrollFraction - 0.8);
      }

      if (miniBoxRef.current) {
        const endXPosition =
          boxRef.current.offsetWidth - miniBoxRef.current.offsetWidth;
        const xPosition = endXPosition * (1 - scrollFraction);
        const endYPosition =
          boxRef.current.offsetHeight - miniBoxRef.current.offsetHeight;
        const yPosition = endYPosition * scrollFraction;
        miniBoxRef.current.style.transform = `translateX(${xPosition}px) translateY(${yPosition}px)`;
      }
    }
  },[scrollHeight]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollHeight, handleScroll]);

  return (
    <div className="animated-box" ref={boxRef}>
      <div
        ref={miniBoxRef}
        style={{
          transform: "translateX(140%)",
        }}
        className="box bg-red-400 w-[40%] h-[40%] transform: translateX(calc(100vw - 300px)) "
      ></div>
    </div>
  );
};

export default AnimatedBox;
