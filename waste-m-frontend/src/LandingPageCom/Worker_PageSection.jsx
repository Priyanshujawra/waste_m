import React from "react";
import {
  Recycle,
  CheckCircle,
  Map,
  Clock,
  Package,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const WasteManagementSection = () => {
  const features = [
    {
      icon: Map,
      title: "Smart Route Planning",
      description: "AI-powered optimization for efficient waste collection",
    },
    {
      icon: Clock,
      title: "Real-time Tracking",
      description: "Monitor collection status and schedule updates instantly",
    },
    {
      icon: Package,
      title: "Waste Analytics",
      description: "Comprehensive tracking and environmental impact reports",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-blue-50 py-24">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full transform rotate-12">
          <Recycle className="w-96 h-96 text-green-600" />
        </div>
        <div className="absolute top-1/4 right-1/4 w-full h-full transform -rotate-12">
          <Recycle className="w-64 h-64 text-blue-600" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="bg-green-100 text-green-800 text-sm font-medium px-4 py-1 rounded-full">
                  Eco-Friendly Solutions
                </span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                "Help Us Make a Difference – Join as a Waste Collector"
              </h2>
              <p className="text-xl text-gray-600">
                Transform your waste collection operations with our intelligent
                platform that combines AI, IoT, and sustainable practices.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border-none shadow-lg bg-white/80 backdrop-blur"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="p-3 bg-green-100 rounded-lg">
                          <feature.icon className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex space-x-4">
              <Link to="/workerLandingPage">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                Join as Employee
              </Button>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative lg:pl-8">
            <div className="relative">
              {/* Main Image */}
              <img
                src="/src/assets/imagess_land/439659150_796927985266929_8848800905870958353_n.jpeg"
                alt="Waste Management Platform"
                className="rounded-xl shadow-2xl w-full object-cover"
              />

              {/* Stats Card */}
              <Card className="absolute -bottom-6 -left-6 w-48 shadow-xl bg-white/90 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900">95%</p>
                      <p className="text-sm text-gray-600">Collection Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Environmental Impact Card */}
              <Card className="absolute -top-6 -right-6 w-48 shadow-xl bg-white/90 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Recycle className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900">2.5M</p>
                      <p className="text-sm text-gray-600">Tons Recycled</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WasteManagementSection;
