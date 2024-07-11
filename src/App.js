import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import AnimatedBox from "./AnimatedBox";
import AnimatedText from "./AnimatedText";
function App() {
  return (
    <div className="App">
      <div className="flex flex-row gap-[300px]">
        <AnimatedText scrollHeight={1} />
        <AnimatedBox scrollHeight={1} />
      </div>

      <div className="h-[500vh]"></div>

      <div className="text-white"> end of scroll </div>
      <div className="h-[25vh]"></div>
    </div>
  );
}

export default App;
