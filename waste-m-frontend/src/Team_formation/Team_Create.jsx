import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Users,
  ArrowRight,
  Heart,
  Globe,
  Target,
  Leaf,
  ChevronRight,
  Star,
  Calendar,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const teams = [
    {
      id: 1,
      name: "Clean City Initiative",
      category: "Environment",
      description: "Working together to keep our cities clean and green",
      members: 24,
      projects: 8,
      image: "/api/placeholder/400/200",
      tags: ["urban", "cleaning", "community"],
    },
    {
      id: 2,
      name: "Ocean Warriors",
      category: "Marine",
      description: "Protecting marine life and keeping our oceans clean",
      members: 18,
      projects: 5,
      image: "/api/placeholder/400/200",
      tags: ["ocean", "marine-life", "conservation"],
    },
    {
      id: 3,
      name: "Green Energy Alliance",
      category: "Energy",
      description: "Promoting sustainable energy solutions",
      members: 15,
      projects: 6,
      image: "/api/placeholder/400/200",
      tags: ["energy", "sustainability", "technology"],
    },
  ];

  const filteredTeams = teams.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesFilter =
      activeFilter === "all" ||
      team.category.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex-grow bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full">
          <div className="py-20 md:py-28 lg:py-32">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Join the Movement for
              <br />a Better Planet
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              Connect with environmental champions and make a real impact in
              your community. Together, we can create lasting change.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/teamform">
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="border-white bg-black text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">150+</div>
              <div className="text-gray-600">Active Teams</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">10k+</div>
              <div className="text-gray-600">Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Join EcoConnect?
            </h2>
            <p className="text-xl text-gray-600">
              Discover the benefits of being part of our global community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Connect with Others
                </h3>
                <p className="text-gray-600">
                  Join like-minded individuals passionate about environmental
                  causes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Make an Impact</h3>
                <p className="text-gray-600">
                  Work on meaningful projects that create real environmental
                  change
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
                <p className="text-gray-600">
                  Be part of a worldwide movement for environmental conservation
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Teams Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Our Teams
            </h2>
            <p className="text-xl text-gray-600">
              Find the perfect team to match your environmental interests
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search teams..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs
              value={activeFilter}
              onValueChange={setActiveFilter}
              className="w-full md:w-auto"
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="environment">Environment</TabsTrigger>
                <TabsTrigger value="marine">Marine</TabsTrigger>
                <TabsTrigger value="energy">Energy</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Team Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map((team) => (
              <Card
                key={team.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={team.image}
                  alt={team.name}
                  className="w-full h-48 object-cover"
                />
                <CardHeader className="px-4 py-2">
                  <h3 className="text-lg font-bold">{team.name}</h3>
                  <Badge className="mt-1">{team.category}</Badge>
                </CardHeader>
                <CardContent className="px-4 py-2">
                  <p>{team.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between px-4 py-2">
                  <div>
                    <span className="font-bold">{team.members} Members</span>
                  </div>
                  <div>
                    <Button size="sm" variant="outline">
                      Join Now
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Making a Real Impact
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Environmental Protection
                    </h3>
                    <p className="text-gray-600">
                      Our teams have planted over 100,000 trees and cleaned up
                      500+ beaches worldwide
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Community Building
                    </h3>
                    <p className="text-gray-600">
                      Created lasting connections between environmental
                      advocates globally
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Regular Events
                    </h3>
                    <p className="text-gray-600">
                      Organizing weekly activities and monthly major
                      environmental initiatives
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/src/assets/impactpafkjds.jpeg"
                alt="Impact"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">1M+</div>
                    <div className="text-gray-600">Lives Impacted</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
