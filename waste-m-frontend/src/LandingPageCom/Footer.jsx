import { Mail, Clock, MapPin, ChevronRight } from "lucide-react";
import { useState } from "react";

const ZeroWasteFooter = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const latestEvents = [
    {
      title: "Zero trash helps youngsters properly recycle on Children's Day",
      date: "August 20, 2020",
      image: "/api/placeholder/100/100",
    },
    {
      title: "Sustainable Waste Management urges everyone to properly recycle.",
      date: "July 05, 2020",
      image: "/api/placeholder/100/100",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-green-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-green-50 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Intent on taking up arms?</span>
                  <span className="block text-green-600">
                    in favor of a clean, green environment.
                  </span>
                </h1>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-start">
                  <div className="rounded-md shadow">
                    <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10">
                      Request for Waste Collection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full"></div>
              <span className="text-xl font-bold">ZERO WASTE</span>
            </div>
            <p className="text-gray-600">
              There should be millions of people striving for zero waste, rather
              than a select few who achieve it perfectly.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>2175 Southside Lane Los Angeles, CA 90017</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="w-5 h-5" />
                <span>wmhelpinfo.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>Mon - Sat: 9.00am to 7.00pm</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h2 className="text-xl font-bold mb-4">Links</h2>
            <nav className="space-y-2">
              {["Home", "About Us", "Service", "Event", "Privacy Policy"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="block text-gray-600 hover:text-green-600 transition-colors"
                  >
                    {item}
                  </a>
                )
              )}
            </nav>
          </div>

          {/* Latest Events */}
          <div>
            <h2 className="text-xl font-bold mb-4">Latest Event</h2>
            <div className="space-y-4">
              {latestEvents.map((event, index) => (
                <div key={index} className="flex space-x-4">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500">
            Copyright 2022 zerowaste. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ZeroWasteFooter;
