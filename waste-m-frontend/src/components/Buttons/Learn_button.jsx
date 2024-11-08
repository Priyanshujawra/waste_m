import React from "react";
import "./LearnMoreButton.css";

const LearnMoreButton = () => {
  return (
    <button className="learn-more-button">
      <span className="circle" aria-hidden="true">
        <span className="icon arrow"></span>
      </span>
      <span className="button-text">Learn More</span>
    </button>
  );
};

export default LearnMoreButton;
