import React from "react";
import { Play, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const highlights = [
    "Eco-Friendly Solutions",
    "24/7 Support",
    "Smart Collection",
  ];

  return (
    <div className="relative min-h-[85vh] bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-6 items-center pt-20 pb-16">
          {/* Content Side */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-block animate-fade-in-up">
                <span className="bg-green-100 text-green-800 text-sm font-medium px-4 py-1 rounded-full">
                  Sustainable Future
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight animate-fade-in-up animation-delay-200">
                Transform Your
                <span className="text-green-600 block">Waste Management</span>
                Solutions
              </h1>

              <p className="text-xl text-gray-600 animate-fade-in-up animation-delay-400">
                Join us in creating a cleaner, greener future with our
                innovative waste management platform. Smart solutions for a
                sustainable tomorrow.
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-600">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 animate-fade-in-up animation-delay-800">
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <button className="group flex items-center space-x-3 px-4 py-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-100 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-300" />
                  <div className="relative h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Play className="h-5 w-5 text-green-600 ml-1" />
                  </div>
                </div>
                <span className="text-gray-700 font-medium">Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 animate-fade-in-up animation-delay-1000">
              <div>
                <div className="text-3xl font-bold text-gray-900">2.5M+</div>
                <div className="text-sm text-gray-600">Tons Recycled</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative w-full animate-fade-in-up animation-delay-200">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-2 gap-4 relative">
                    <div className="relative h-96 overflow-hidden rounded-lg">
                      <img
                        src="/src/assets/large-pile-trash-dominates-foreground-with-city-skyline-background-illustrates-environmental-pollution-urban-waste-management-issues_331695-28223.avif"
                        alt="Industrial waste"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="relative h-96 overflow-hidden rounded-lg">
                      <img
                        src="src/assets/istockphoto-1340716614-612x612.jpg"
                        alt="Factory"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Circular Icon Overlay */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-green-500 rounded-full p-4">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -left-6 top-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Smart Collection
                        </p>
                        <p className="text-xs text-gray-600">
                          AI-Powered Routes
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-6 bottom-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <ArrowRight className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Real-time Tracking
                        </p>
                        <p className="text-xs text-gray-600">24/7 Monitoring</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
