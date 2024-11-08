import React, { useState } from "react";
import {
  Recycle,
  CheckCircle,
  Map,
  Bell,
  Clock,
  Truck,
  Package,
  Users,
  ChevronRight,
  Award,
  Shield,
  BarChart2,
  Camera,
  Smartphone,
  Calendar,
  Star,
  Target,
  Coffee,
  PenToolIcon,
  Compass,
  BookOpen,
  DollarSign,
  Heart,
  Sun,
  Zap,
  MessageCircle,
  PhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";

const WorkerLandingPage = () => {
  const features = [
    {
      icon: Map,
      title: "Smart Route Planning",
      description:
        "Optimize your collection routes with AI-powered route planning",
    },
    {
      icon: Bell,
      title: "Real-time Notifications",
      description: "Get instant alerts for new waste collection requests",
    },
    {
      icon: Clock,
      title: "Time Management",
      description: "Track your work hours and schedule assignments efficiently",
    },
    {
      icon: Package,
      title: "Waste Tracking",
      description: "Monitor different types of waste collection and disposal",
    },
  ];

  const workflowSteps = [
    {
      icon: Smartphone,
      title: "Log In to Mobile App",
      description:
        "Access your personalized dashboard with daily routes and tasks",
    },
    {
      icon: Compass,
      title: "Review Route Plan",
      description:
        "Check optimized collection routes and waste pickup locations",
    },
    {
      icon: Camera,
      title: "Document Collections",
      description: "Take photos and log waste types for each collection point",
    },
    {
      icon: CheckCircle,
      title: "Complete Tasks",
      description:
        "Mark collections as complete and update status in real-time",
    },
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Competitive Pay",
      description: "Earn competitive wages with performance bonuses",
    },
    {
      icon: Heart,
      title: "Health Benefits",
      description: "Comprehensive health insurance coverage",
    },
    {
      icon: Calendar,
      title: "Flexible Schedule",
      description: "Choose shifts that work best for you",
    },
    {
      icon: Target,
      title: "Growth Opportunities",
      description: "Career advancement and skill development",
    },
  ];

  const equipmentTools = [
    {
      icon: Truck,
      title: "Collection Vehicles",
      items: [
        "GPS-equipped trucks",
        "Maintenance tracking",
        "Fuel efficiency monitoring",
      ],
    },
    {
      icon: PenToolIcon,
      title: "Safety Equipment",
      items: ["High-visibility gear", "Safety gloves", "Protective footwear"],
    },
    {
      icon: Smartphone,
      title: "Digital Tools",
      items: [
        "Mobile app access",
        "Route optimization",
        "Digital documentation",
      ],
    },
  ];

  const trainingModules = [
    {
      icon: Shield,
      title: "Safety Protocols",
      duration: "2 weeks",
      topics: [
        "Workplace safety",
        "Equipment handling",
        "Emergency procedures",
      ],
    },
    {
      icon: Recycle,
      title: "Waste Management",
      duration: "1 week",
      topics: [
        "Waste classification",
        "Environmental guidelines",
        "Disposal procedures",
      ],
    },
    {
      icon: Smartphone,
      title: "Technology Training",
      duration: "1 week",
      topics: ["App usage", "Digital reporting", "Route navigation"],
    },
  ];

  const performanceMetrics = [
    {
      icon: Clock,
      title: "Response Time",
      value: "< 30 mins",
      description: "Average response time to new collection requests",
    },
    {
      icon: CheckCircle,
      title: "Completion Rate",
      value: "95%",
      description: "Average task completion rate",
    },
    {
      icon: Star,
      title: "Customer Rating",
      value: "4.8/5",
      description: "Average customer satisfaction score",
    },
    {
      icon: Zap,
      title: "Efficiency",
      value: "92%",
      description: "Route optimization efficiency",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Recycle className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold">EcoTrack Worker</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Login</Button>
              <Link to="/register/WorkerOnboarding">
                <Button>Register</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Join Our Professional Waste Management Team
              </h1>
              <p className="text-xl">
                Make a difference in environmental sustainability while building
                a rewarding career.
              </p>
              <Link to="/workerDash">
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100"
                >
                  Start Your Journey
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="hidden md:block">
              <img
                src="/src/assets/imagess_land/439659150_796927985266929_8848800905870958353_n.jpeg"
                alt="Waste Management Platform"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Daily Workflow Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Your Daily Workflow</h2>
            <p className="text-gray-600">
              Simple and efficient process for waste management
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => (
              <Card key={index} className="relative">
                <CardContent className="p-6">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <step.icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Equipment and Tools Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Equipment & Tools</h2>
            <p className="text-gray-600">
              State-of-the-art equipment for efficient waste management
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {equipmentTools.map((tool, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <tool.icon className="h-12 w-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-4">{tool.title}</h3>
                  <ul className="space-y-2">
                    {tool.items.map((item, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Training Program Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Comprehensive Training Program
            </h2>
            <p className="text-gray-600">
              Get equipped with the knowledge and skills you need
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {trainingModules.map((module, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <module.icon className="h-12 w-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Duration: {module.duration}
                  </p>
                  <ul className="space-y-2">
                    {module.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-gray-600">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Performance Standards</h2>
            <p className="text-gray-600">
              What we strive for in our daily operations
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {performanceMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <metric.icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{metric.title}</h3>
                  <p className="text-3xl font-bold text-green-600 mb-2">
                    {metric.value}
                  </p>
                  <p className="text-gray-600 text-sm">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Worker Benefits</h2>
            <p className="text-gray-600">
              Great benefits for our valued team members
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <benefit.icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="bg-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">24/7 Worker Support</h2>
            <p className="text-gray-600">We're here to help you succeed</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <PhoneCall className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
                <p className="text-gray-600">
                  24/7 emergency hotline for immediate assistance
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600">
                  Instant messaging support for quick queries
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Resource Center</h3>
                <p className="text-gray-600">
                  Access to guides, tutorials, and best practices
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Recycle className="h-6 w-6 text-green-400" />
                <span className="ml-2 text-lg font-bold">EcoTrack Worker</span>
              </div>
              <p className="text-gray-400">
                Making waste management efficient and sustainable.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@ecotrack.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Eco Street, Green City</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2024 EcoTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WorkerLandingPage;
