import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Recycle,
  Users,
  Trophy,
  Leaf,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const AboutPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Recycle className="w-12 h-12 text-green-600" />,
      title: "Smart Waste Collection",
      description:
        "Our AI-powered system optimizes collection routes and schedules, reducing fuel consumption and improving efficiency.",
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: "Community Engagement",
      description:
        "Connect with local recycling initiatives and participate in community cleanup events.",
    },
    {
      icon: <Trophy className="w-12 h-12 text-yellow-600" />,
      title: "Rewards Program",
      description:
        "Earn points for responsible waste disposal and recycling. Redeem them for eco-friendly products.",
    },
    {
      icon: <Leaf className="w-12 h-12 text-emerald-600" />,
      title: "Environmental Impact",
      description:
        "Track your carbon footprint reduction and contribution to sustainability goals.",
    },
  ];

  const stats = [
    { label: "Active Users", value: "50K+" },
    { label: "Waste Collected", value: "1M+ tons" },
    { label: "Cities Covered", value: "25+" },
    { label: "Recycling Rate", value: "75%" },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Environmental engineer with 15+ years of experience in waste management.",
    },
    {
      name: "Mike Chen",
      role: "Technical Director",
      bio: "Expert in IoT solutions and smart city infrastructure.",
    },
    {
      name: "Emma Williams",
      role: "Community Manager",
      bio: "Passionate about building sustainable communities and public engagement.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Revolutionizing Waste Management
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We're on a mission to create cleaner cities and a healthier planet
          through innovative waste management solutions.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="text-center hover:shadow-lg transition-shadow"
          >
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`hover:shadow-lg transition-all cursor-pointer ${
                activeFeature === index ? "border-green-500 border-2" : ""
              }`}
              onClick={() => setActiveFeature(index)}
            >
              <CardContent className="pt-6 text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <Tabs defaultValue="team" className="mb-16">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="team">Our Team</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>
        <TabsContent value="team">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {team.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <div className="text-green-600 mb-2">{member.role}</div>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="contact">
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="max-w-md mx-auto space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="text-green-600" />
                  <span>contact@wastemanagement.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="text-green-600" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="text-green-600" />
                  <span>123 Eco Street, Green City, EC 12345</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AboutPage;
