import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  PlayCircle,
  PauseCircle,
  ChevronRight,
  Leaf,
  Recycle,
  AlertTriangle,
  Trash,
  Factory,
  Droplet,
  Wind,
} from "lucide-react";

const RecyclingGuide = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const wasteSections = [
    {
      id: 1,
      title: "Organic Waste",
      color: "bg-green-600",
      icon: <Leaf className="w-6 h-6 text-white" />,
      description:
        "Food scraps, yard waste, and biodegradable materials go in the green bin. These materials are converted into compost.",
      tips: [
        "Collect food scraps in a kitchen container",
        "Include yard trimmings and plant waste",
        "Avoid meat and dairy in home composting",
        "Keep materials loose, not bagged",
      ],
    },
    {
      id: 2,
      title: "Recyclable Materials",
      color: "bg-blue-600",
      icon: <Recycle className="w-6 h-6 text-white" />,
      description:
        "Paper, cardboard, plastic bottles, and metal cans go in the blue bin. These materials are processed and transformed into new products.",
      tips: [
        "Rinse containers before recycling",
        "Flatten cardboard boxes",
        "Remove caps from bottles",
        "Check local recycling guidelines",
      ],
    },
    {
      id: 3,
      title: "Hazardous Waste",
      color: "bg-red-600",
      icon: <AlertTriangle className="w-6 h-6 text-white" />,
      description:
        "Batteries, electronics, and chemicals need special disposal. These materials require careful handling to prevent environmental damage.",
      tips: [
        "Store in original containers",
        "Keep away from children and pets",
        "Never mix chemicals",
        "Find local collection events",
      ],
    },
    {
      id: 4,
      title: "General Waste",
      color: "bg-gray-600",
      icon: <Trash className="w-6 h-6 text-white" />,
      description:
        "Non-recyclable and non-hazardous items go in the black bin. These materials typically end up in landfills.",
      tips: [
        "Reduce consumption when possible",
        "Reuse items when possible",
        "Double-check if items can be recycled",
        "Use proper bin liners",
      ],
    },
  ];

  const environmentalImpact = [
    {
      title: "Air Pollution",
      icon: <Wind className="w-6 h-6" />,
      description:
        "Improper waste disposal contributes to air pollution through burning and decomposition.",
      solutions: [
        "Reduce waste generation",
        "Proper sorting of materials",
        "Support clean energy initiatives",
        "Use eco-friendly transportation",
      ],
    },
    {
      title: "Water Pollution",
      icon: <Droplet className="w-6 h-6" />,
      description: "Waste can contaminate water sources and harm marine life.",
      solutions: [
        "Proper disposal of chemicals",
        "Reduce plastic usage",
        "Support water cleanup initiatives",
        "Use biodegradable products",
      ],
    },
    {
      title: "Industrial Impact",
      icon: <Factory className="w-6 h-6" />,
      description:
        "Manufacturing and waste processing facilities affect local environments.",
      solutions: [
        "Support sustainable manufacturing",
        "Choose recycled products",
        "Advocate for clean industry",
        "Reduce consumption",
      ],
    },
  ];

  const handleVideoPlayPause = () => {
    const video = document.getElementById("recycling-video");
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Video Section */}
        <Card className="relative">
          <CardContent className="p-0">
            <div className="relative">
              <video
                id="recycling-video"
                className="w-full h-[80vh] object-cover rounded-lg"
                src="/src/LandingPageCom/Giudedpage/Recycling_Animation_2018_Full(1080p).mp4"
                playsInline
              />
              <button
                onClick={handleVideoPlayPause}
                className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-lg"
              >
                {isPlaying ? (
                  <PauseCircle className="w-8 h-8 text-blue-600" />
                ) : (
                  <PlayCircle className="w-8 h-8 text-blue-600" />
                )}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="waste" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="waste">Waste Management Guide</TabsTrigger>
            <TabsTrigger value="impact">Environmental Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="waste" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wasteSections.map((section) => (
                <Card
                  key={section.id}
                  className={`${section.color} text-white`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      {section.icon}
                      <CardTitle>{section.title}</CardTitle>
                    </div>
                    <CardDescription className="text-white/90">
                      {section.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.tips.map((tip, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {environmentalImpact.map((impact, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      {impact.icon}
                      <CardTitle>{impact.title}</CardTitle>
                    </div>
                    <CardDescription>{impact.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {impact.solutions.map((solution, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-blue-600" />
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RecyclingGuide;
