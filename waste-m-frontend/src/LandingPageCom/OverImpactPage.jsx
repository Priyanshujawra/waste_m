import React from "react";

const ImpactSection = () => {
  const impactData = [
    {
      number: "1800+",
      title: "Empowered Waste Pickers",
      image: "/src/assets/imagess_land/wastecollector.png",
    },
    {
      number: "250+",
      title: "Professional Workers",
      image:
        "/src/assets/imagess_land/professional-men-engineer-worker-skills-quality-maintenance-training-industry-factory-worker-warehouse-workshop-for-factory-operators-mechanical-engineering-team-production-photo.jpeg",
    },
    {
      number: "30+",
      title: "Industries Served",
      image: "/src/assets/imagess_land/Industry-4.0.png",
    },
    {
      number: "80k kg+",
      title: "Plastic Waste Recycle",
      image: "/src/assets/imagess_land/recycling-mess.avif",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-20 bg-white">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">Our Impact</h2>
        <p className="text-gray-500 text-lg">
          Zero waste is making social, economic, and environmental impacts in
          the cities it operates.
        </p>
      </div>

      {/* Impact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
        {impactData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-sm p-4 hover:shadow-lg transition-shadow"
          >
            {/* Curved Image Container */}
            <div className="relative w-full h-32 rounded-[40px] overflow-hidden mb-6">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Content */}
            <div className="text-center px-4">
              <h3 className="text-4xl font-bold text-emerald-500 mb-2">
                {item.number}
              </h3>
              <p className="text-gray-600">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* How May We Help Section */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">
          How may we be of assistance?
        </h2>
        <p className="text-gray-500 text-lg mb-16">
          We salvage materials from garbage and give them new life
        </p>

        {/* Mission and Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Mission Card */}
          <div className="bg-blue-50/50 rounded-3xl p-8 flex items-start gap-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-cyan-400 flex items-center justify-center">
                <span className="text-white font-bold text-lg">MISSION</span>
              </div>
              {/* Circular text effect */}
              <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-cyan-400 animate-spin-slow opacity-20"></div>
            </div>
            <div className="flex-1">
              <p className="text-left text-gray-600 leading-relaxed">
                Our goal is to set the standard for excellence in waste
                management across the country by collaborating with public
                agencies, businesses, and citizens.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-green-50/50 rounded-3xl p-8 flex items-start gap-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-emerald-400 flex items-center justify-center">
                <span className="text-white font-bold text-lg">VISION</span>
              </div>
              {/* Circular text effect */}
              <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-emerald-400 animate-spin-slow opacity-20"></div>
            </div>
            <div className="flex-1">
              <p className="text-left text-gray-600 leading-relaxed">
                Our goal is to see a society where trash is correctly managed,
                resulting in a cleaner environment, better health, and safer
                conditions for all forms of life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this to your CSS or tailwind.config.js
const style = `
  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .animate-spin-slow {
    animation: spin-slow 10s linear infinite;
  }
`;

export default ImpactSection;
