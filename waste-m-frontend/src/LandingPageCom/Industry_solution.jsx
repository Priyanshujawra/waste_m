import React from "react";

const IndustrySolutions = () => {
  const solutions = [
    {
      title: "E-Waste Management",
      image: "/src/assets/sevieslandimages/ewaste-1.webp",
      description:
        "E-Coli is the first company of E-Waste recycling in Gujarat who signed MOU in vibrant Gujarat in 2009, before E-Waste rules introduced by government for E-Waste recycling plant & latter signed MOU in vibrant Gujarat in 2015,2017 for plant expansion.",
    },
    {
      title: "Plastic Waste Management",
      image: "src/assets/imagess_land/recycling-mess.avif",
      description:
        "E-Coli has GPCB License and PWM License to recycle the plastic scrap since 2018. E-Coli is legally and technically able to recycle 500 Mt/Month of plastic scrap.",
    },
    {
      title: "Bio Medical Waste Management",
      image:
        "/src/assets/sevieslandimages/efficient-hospital-waste-management-area-with-clearly-marked-medical-waste-bins-hygiene-safety_416256-97846.avif",
      description:
        "E-Coli has GPCB License and PWM License to recycle the plastic scrap since 2018. E-Coli is legally and technically able to recycle 500 Mt/Month of plastic scrap.",
    },
    {
      title: "Pollution Control Devices",
      image: "/src/assets/sevieslandimages/pcontroll.jpg",
      description:
        "Engimech is a sister firm of E-Coli who is one of the most prominent manufacturing of air & water pollution control devices. We also provide modified equipment based on requirement with economical solutions for pollution control.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
        Solutions for various industries
      </h1>
      <p className="text-center text-gray-600 mb-12">
        Wherever you are located, our crew can be there to promptly and expertly
        handle your waste and recycling needs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {solutions.map((solution, index) => (
          <div
            key={index}
            className="bg-white rounded-t-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative rounded-t-lg">
              <div className="aspect-w-1 aspect-h-1 ">
                <img
                  src={solution.image}
                  alt={solution.title}
                  className="w-full h-64 object-cover rounded-t-lg m-3"
                />
              </div>
              <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-green-500 to-transparent opacity-50" />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-green-600 mb-3">
                {solution.title}
              </h3>
              <p className="text-gray-600 text-sm">{solution.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustrySolutions;
