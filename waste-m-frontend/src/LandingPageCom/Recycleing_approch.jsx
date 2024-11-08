import React from "react";

const ProcessFlow = () => {
  const steps = [
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-green-500">
          <path
            fill="currentColor"
            d="M15,12H17A5,5 0 0,0 12,7V9A3,3 0 0,1 15,12M19,12H21C21,7 16.97,3 12,3V5C15.86,5 19,8.13 19,12M20,15.5C18.75,15.5 17.55,15.3 16.43,14.93C16.08,14.82 15.69,14.9 15.41,15.18L13.21,17.38C10.38,15.94 8.06,13.62 6.62,10.79L8.82,8.59C9.1,8.31 9.18,7.92 9.07,7.57C8.7,6.45 8.5,5.25 8.5,4A1,1 0 0,0 7.5,3H4A1,1 0 0,0 3,4A17,17 0 0,0 20,21A1,1 0 0,0 21,20V16.5A1,1 0 0,0 20,15.5Z"
          />
        </svg>
      ),
      title: "Receiving & Pickup",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-green-500">
          <path
            fill="currentColor"
            d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V9.21L13,12.58V19.29L19,15.91Z"
          />
        </svg>
      ),
      title: "Hazard Removal",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-green-500">
          <path
            fill="currentColor"
            d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2M12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20M15 6.5V9.5L14.28 9.1L10.28 7.1L9 6.5V13.5L13 15.5L15 16.5V19.5L14.44 19.22L9.44 16.22L7 15V8L7.56 7.78L12.56 4.78L15 3.5Z"
          />
        </svg>
      ),
      title: "Sortation",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-green-500">
          <path
            fill="currentColor"
            d="M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.32,20.45 4.93,20.07V20.07C3.12,18.26 2,15.76 2,13A10,10 0 0,1 12,3M22,13C22,15.76 20.88,18.26 19.07,20.07V20.07C18.68,20.45 18.05,20.45 17.66,20.06C17.27,19.67 17.27,19.04 17.66,18.65V18.65C19.11,17.2 20,15.21 20,13C20,12 19.81,11 19.46,10.1L20.67,8C21.5,9.5 22,11.18 22,13Z"
          />
        </svg>
      ),
      title: "Processing",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-green-500">
          <path
            fill="currentColor"
            d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M13,13V18H15V13H13M9,13V18H11V13H9Z"
          />
        </svg>
      ),
      title: "Reporting",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 bg-gradient-to-b from-white to-gray-50">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
        The waste recycling approach
      </h1>
      <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
        We follow a procedure we've established for recycling waste and make
        sure it's followed!
      </p>

      <div className="relative flex justify-between items-center max-w-4xl mx-auto py-12">
        {/* Enhanced curved connection lines */}
        <svg
          className="absolute top-1/2 left-0 w-full h-32 -mt-16 z-0"
          viewBox="0 0 1000 150"
        >
          {/* Main curved path - more pronounced curves */}
          <path
            d="M 0,75 
               C 125,75 125,25 250,25 
               S 375,125 500,125 
               S 625,25 750,25 
               S 875,125 1000,125"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="2"
            className="path-line"
          />

          {/* Arrow lines */}
          <path d="M 245,25 L 255,25 L 250,35 Z" fill="#9CA3AF" />
          <path d="M 495,125 L 505,125 L 500,115 Z" fill="#9CA3AF" />
          <path d="M 745,25 L 755,25 L 750,35 Z" fill="#9CA3AF" />
          <path d="M 995,125 L 985,125 L 990,115 Z" fill="#9CA3AF" />
        </svg>

        {/* Process steps */}
        <div className="relative flex justify-between w-full">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Enhanced circular card with deeper shadow and gradient */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="w-24 h-24 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
              </div>

              {/* Enhanced title styling */}
              <div className="mt-4 space-y-1 text-center">
                <p className="text-sm font-semibold text-gray-800">
                  {step.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessFlow;
