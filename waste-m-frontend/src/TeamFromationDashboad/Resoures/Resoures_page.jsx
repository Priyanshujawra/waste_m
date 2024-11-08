import React, { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Users,
  Trash2,
  ChevronRight,
  Calendar,
  Clock,
  FileText,
  Video,
  Share2,
  Eye,
  Download,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const WasteManagementChannels = () => {
  const [resources] = useState([
    {
      id: 1,
      team: "Recycling Unit",
      area: "North District",
      type: "video",
      title: "New Recycling Process Implementation",
      description:
        "Complete guide on implementing the new sorting system for recyclables",
      date: "2024-03-15",
      author: "Sarah Johnson",
      views: 145,
      duration: "15:30",
      thumbnail: "/api/placeholder/400/225",
      tags: ["recycling", "process improvement", "training"],
      status: "active",
      url: "#",
    },
    {
      id: 2,
      team: "Composting Division",
      area: "East Zone",
      type: "document",
      title: "Organic Waste Processing Guidelines 2024",
      description:
        "Updated standards for organic waste collection and processing",
      date: "2024-03-10",
      author: "Mike Chen",
      views: 89,
      pages: 12,
      thumbnail: "/api/placeholder/400/225",
      tags: ["composting", "organic waste", "guidelines"],
      status: "important",
      url: "#",
    },
    {
      id: 3,
      team: "Collection Operations",
      area: "South District",
      type: "video",
      title: "Route Optimization Training",
      description:
        "New route planning system training for waste collection vehicles",
      date: "2024-03-05",
      author: "Alex Martinez",
      views: 234,
      duration: "22:15",
      thumbnail: "/api/placeholder/400/225",
      tags: ["routes", "operations", "efficiency"],
      status: "active",
      url: "#",
    },
  ]);

  const [selectedResource, setSelectedResource] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesTeam =
      selectedTeam === "all" || resource.team === selectedTeam;
    const matchesArea =
      selectedArea === "all" || resource.area === selectedArea;
    const matchesType =
      selectedType === "all" || resource.type === selectedType;
    return matchesSearch && matchesTeam && matchesArea && matchesType;
  });

  const teams = ["all", ...new Set(resources.map((r) => r.team))];
  const areas = ["all", ...new Set(resources.map((r) => r.area))];
  const types = ["all", ...new Set(resources.map((r) => r.type))];

  const getStatusColor = (status) => {
    switch (status) {
      case "important":
        return "bg-gradient-to-r from-red-500 to-pink-500";
      case "active":
        return "bg-gradient-to-r from-green-500 to-emerald-500";
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto p-6">
        {!selectedResource ? (
          <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text">
                  Resource Center
                </h1>
                <p className="text-gray-600 mt-2">
                  Access and manage waste management resources
                </p>
              </div>
              <Link to="/teamform/ResourceCreationForm">
                <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Upload Resource
                </button>
              </Link>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex flex-wrap gap-4">
                <div className="relative flex-1 min-w-[300px]">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search resources..."
                    className="pl-10 pr-4 py-3 w-full border rounded-xl bg-gray-50 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {[
                  {
                    options: teams,
                    value: selectedTeam,
                    onChange: setSelectedTeam,
                    placeholder: "All Teams",
                  },
                  {
                    options: areas,
                    value: selectedArea,
                    onChange: setSelectedArea,
                    placeholder: "All Areas",
                  },
                  {
                    options: types,
                    value: selectedType,
                    onChange: setSelectedType,
                    placeholder: "All Types",
                  },
                ].map((filter, index) => (
                  <select
                    key={index}
                    className="px-4 py-3 border rounded-xl bg-gray-50 hover:bg-white transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 min-w-[160px]"
                    value={filter.value}
                    onChange={(e) => filter.onChange(e.target.value)}
                  >
                    {filter.options.map((option) => (
                      <option key={option} value={option}>
                        {option === "all" ? filter.placeholder : option}
                      </option>
                    ))}
                  </select>
                ))}
              </div>
            </div>

            {/* Resources Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((resource) => (
                <Card
                  key={resource.id}
                  className="group cursor-pointer overflow-hidden rounded-xl border-0 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => setSelectedResource(resource)}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={resource.thumbnail}
                        alt={resource.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div
                        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm text-white ${getStatusColor(
                          resource.status
                        )}`}
                      >
                        {resource.team}
                      </div>
                      {resource.type === "video" && (
                        <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 px-2 py-1 rounded-lg text-white text-sm">
                          {resource.duration}
                        </div>
                      )}
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                          {resource.title}
                        </h3>
                        <p className="text-gray-600 mt-2 line-clamp-2">
                          {resource.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {resource.area}
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          {resource.views}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {resource.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-gray-200 transition-colors duration-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // Detail View
          <div className="space-y-6">
            <button
              className="text-green-600 hover:text-green-800 flex items-center gap-2 group"
              onClick={() => setSelectedResource(null)}
            >
              <ChevronRight className="h-5 w-5 rotate-180 transition-transform group-hover:-translate-x-1" />
              Back to Resources
            </button>

            <Card className="overflow-hidden border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={selectedResource.thumbnail}
                    alt={selectedResource.title}
                    className="w-full h-64 object-cover"
                  />
                  <div
                    className={`absolute top-6 left-6 px-4 py-2 rounded-full text-white ${getStatusColor(
                      selectedResource.status
                    )}`}
                  >
                    {selectedResource.team}
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-gray-900">
                      {selectedResource.title}
                    </h2>
                    <p className="text-xl text-gray-600">
                      {selectedResource.description}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      { icon: MapPin, text: selectedResource.area },
                      { icon: Users, text: `By ${selectedResource.author}` },
                      { icon: Eye, text: `${selectedResource.views} views` },
                      {
                        icon: Clock,
                        text:
                          selectedResource.type === "video"
                            ? selectedResource.duration
                            : `${selectedResource.pages} pages`,
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <item.icon className="h-5 w-5" />
                        {item.text}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedResource.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                      {selectedResource.type === "video" ? (
                        <>
                          <Video className="h-5 w-5" />
                          Watch Video
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5" />
                          Download Document
                        </>
                      )}
                    </button>
                    <button className="border border-gray-200 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center gap-2">
                      <Share2 className="h-5 w-5" />
                      Share Resource
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default WasteManagementChannels;
