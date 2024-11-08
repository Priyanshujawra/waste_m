import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Users,
  Recycle,
  MapPin,
  Calendar,
  ArrowRight,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";

const sampleNGOs = [
  {
    id: 1,
    name: "EcoLife Foundation",
    description:
      "Working towards sustainable waste management through community participation",
    location: "New York, USA",
    members: 1240,
    initiatives: [
      "Weekly community cleanup",
      "Plastic recycling program",
      "Waste segregation workshops",
    ],
    upcomingEvents: [
      {
        title: "Beach Cleanup Drive",
        date: "Nov 15, 2024",
        participants: 45,
      },
    ],
    tags: ["recycling", "community", "education"],
    impactStats: {
      wasteCleaned: "12.5 tons",
      recycledMaterial: "8.3 tons",
      treesPlanted: 350,
    },
  },
  {
    id: 2,
    name: "Green Earth Initiative",
    description:
      "Promoting zero waste lifestyle and sustainable waste management practices",
    location: "London, UK",
    members: 890,
    initiatives: [
      "Home composting program",
      "E-waste collection drives",
      "School awareness programs",
    ],
    upcomingEvents: [
      {
        title: "Waste Management Workshop",
        date: "Nov 20, 2024",
        participants: 30,
      },
    ],
    tags: ["zero-waste", "education", "e-waste"],
    impactStats: {
      wasteCleaned: "9.2 tons",
      recycledMaterial: "6.1 tons",
      treesPlanted: 225,
    },
  },
];

const NGOPlatform = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-700 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">
            Join the Waste Management Movement
          </h1>
          <p className="text-lg mb-6">
            Connect with NGOs working towards a cleaner, sustainable future
          </p>

          <div className="flex gap-4">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search NGOs by name, location, or initiatives..."
                className="pl-10 py-6 w-full bg-white text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-white text-green-700 hover:bg-gray-100">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleNGOs.map((ngo) => (
            <Card key={ngo.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl mb-2">{ngo.name}</CardTitle>
                  <Badge className="bg-green-100 text-green-700">Active</Badge>
                </div>
                <CardDescription className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {ngo.location}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="mb-4">{ngo.description}</p>

                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{ngo.members} members</span>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Current Initiatives:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {ngo.initiatives.map((initiative, index) => (
                      <li key={index} className="text-gray-600">
                        {initiative}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Upcoming Event:</h4>
                  {ngo.upcomingEvents[0] && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700 font-medium">
                        <Calendar className="h-4 w-4" />
                        {ngo.upcomingEvents[0].title}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {ngo.upcomingEvents[0].date} •{" "}
                        {ngo.upcomingEvents[0].participants} participants
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {ngo.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-gray-100"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex justify-between items-center bg-gray-50">
                <div className="flex gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Waste Cleaned</div>
                    <div className="font-semibold">
                      {ngo.impactStats.wasteCleaned}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Recycled</div>
                    <div className="font-semibold">
                      {ngo.impactStats.recycledMaterial}
                    </div>
                  </div>
                </div>
                <Link to="/dashboard/NGODetailPage">
                  <Button
                    className="bg-green-700 hover:bg-green-800"
                    onClick={() => setSelectedNGO(ngo)}
                  >
                    See NGO Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-green-50 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Our Collective Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-green-700">
                  21.7
                </CardTitle>
                <CardDescription>Tons of Waste Cleaned</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-green-700">
                  14.4
                </CardTitle>
                <CardDescription>Tons of Material Recycled</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-green-700">
                  575
                </CardTitle>
                <CardDescription>Trees Planted</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOPlatform;
