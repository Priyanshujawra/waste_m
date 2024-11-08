import React from "react";
import "./PlantLoading.css";

const PlantLoading = () => {
  return (
    <div className="loading-container">
      <div className="plant">
        <svg
          className="plant-svg"
          viewBox="0 0 100 100"
          width="100"
          height="100"
        >
          {/* Stem */}
          <line
            x1="50"
            y1="90"
            x2="50"
            y2="50"
            stroke="#4caf50"
            strokeWidth="2"
            className="growing-stem"
          />

          {/* Left Leaf */}
          <path
            d="M50 65 Q 40 55 35 45"
            fill="none"
            stroke="#4caf50"
            strokeWidth="2"
            className="growing-leaf leaf-sway"
          />

          {/* Right Leaf */}
          <path
            d="M50 65 Q 60 55 65 45"
            fill="none"
            stroke="#4caf50"
            strokeWidth="2"
            className="growing-leaf leaf-sway"
          />

          {/* Top Leaf */}
          <path
            d="M50 50 Q 45 40 50 30 Q 55 40 50 50"
            fill="#4caf50"
            className="growing-leaf leaf-sway"
          />
        </svg>
      </div>
      <p className="loading-text">Nurturing your data...</p>
    </div>
  );
};

export default PlantLoading;
