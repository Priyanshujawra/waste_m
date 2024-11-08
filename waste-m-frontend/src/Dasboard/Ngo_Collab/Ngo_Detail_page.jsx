import React, { useState } from "react";
import {
  Globe,
  Mail,
  Phone,
  MapPin,
  Users,
  Calendar,
  ExternalLink,
  Heart,
  Share2,
  BookOpen,
  Award,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";

const NGODetailPage = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  const ngoData = {
    name: "Green Earth Initiative",
    description:
      "Working towards environmental conservation and sustainable development through community engagement and education.",
    website: "https://example.org",
    email: "contact@greenearth.org",
    phone: "+1 (555) 123-4567",
    location: "123 Earth Street, Green City, 12345",
    foundedYear: "2010",
    members: 250,
    impact: {
      treesPlanted: "50,000+",
      communitiesServed: "100+",
      volunteersEngaged: "1,000+",
    },
    socialLinks: {
      facebook: "https://facebook.com/greenearth",
      twitter: "https://twitter.com/greenearth",
      linkedin: "https://linkedin.com/company/greenearth",
    },
    events: [
      {
        title: "Annual Earth Day Festival",
        date: "2024-04-22",
        location: "Central Park",
        image: "/api/placeholder/400/200",
        registered: 156,
      },
      {
        title: "Beach Cleanup Drive",
        date: "2024-05-15",
        location: "Sunny Beach",
        image: "/api/placeholder/400/200",
        registered: 89,
      },
    ],
    projects: [
      {
        title: "Tree Planting Drive",
        description: "Goal to plant 10,000 trees in urban areas",
        status: "Active",
        progress: 75,
        image: "/api/placeholder/400/200",
        volunteers: 120,
      },
      {
        title: "Ocean Cleanup",
        description: "Coastal cleanup initiative",
        status: "Planning",
        progress: 30,
        image: "/api/placeholder/400/200",
        volunteers: 45,
      },
    ],
    achievements: [
      "Environmental Excellence Award 2023",
      "Community Impact Recognition",
      "Sustainable Development Partner",
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden">
        <img
          src="/api/placeholder/1200/400"
          alt="NGO Cover"
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <h1 className="text-3xl font-bold text-white mb-2">{ngoData.name}</h1>
          <p className="text-white/90">{ngoData.description}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          className={`flex items-center gap-2 ${
            isFollowing ? "bg-green-600" : "bg-blue-600"
          }`}
          onClick={() => setIsFollowing(!isFollowing)}
        >
          <Heart className="w-4 h-4" />
          {isFollowing ? "Following" : "Follow"}
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
        <Link to="/dashboard/UserNGORequest">
          <Button className="bg-green-700 hover:bg-green-800">
            Join NGO
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="about" className="space-y-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-6">
          {/* Contact Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500" />
                <a
                  href={ngoData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Visit Website
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-500" />
                <a href={`mailto:${ngoData.email}`} className="hover:underline">
                  {ngoData.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-500" />
                <span>{ngoData.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span>{ngoData.location}</span>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-500" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {ngoData.achievements.map((achievement, index) => (
                  <div key={index} className="p-4 bg-blue-50 rounded-lg">
                    <Award className="w-8 h-8 text-blue-500 mb-2" />
                    <p className="font-medium">{achievement}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {ngoData.projects.map((project, index) => (
              <Card key={index}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          project.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {project.status}
                      </span>
                      <span className="text-sm text-gray-600">
                        {project.volunteers} volunteers
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <Button className="w-full">Join Project</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {ngoData.events.map((event, index) => (
              <Card key={index}>
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {event.registered} people registered
                      </span>
                    </div>
                    <Button className="w-full">Register Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(ngoData.impact).map(([key, value], index) => (
              <Card key={index}>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {value}
                  </div>
                  <div className="text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NGODetailPage;
