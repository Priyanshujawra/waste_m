import { useState } from "react";
import {
  Users,
  Trash2,
  Recycle,
  Trees,
  GlassWater,
  MapPin,
  Droplet,
  Shield,
  ChevronRight,
  Plus,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";

const TeamSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      id: "cleaning",
      name: "Area Cleaning",
      icon: Trash2,
      color: "bg-blue-500",
    },
    {
      id: "recycling",
      name: "Recycling",
      icon: Recycle,
      color: "bg-green-500",
    },
    {
      id: "plantation",
      name: "Plantation",
      icon: Trees,
      color: "bg-emerald-500",
    },
    {
      id: "water",
      name: "Water Conservation",
      icon: GlassWater,
      color: "bg-cyan-500",
    },
    {
      id: "management",
      name: "Waste Management",
      icon: Shield,
      color: "bg-purple-500",
    },
  ];

  const teams = [
    {
      id: 1,
      name: "Beach Cleanup Warriors",
      category: "cleaning",
      members: 24,
      location: "Santa Monica Beach",
      image:
        "/src/assets/do-beach-cleanups-really-make-a-difference-rotated.webp",
      progress: 75,
      nextEvent: "2024-11-15",
    },
    {
      id: 2,
      name: "Urban Recycling Initiative",
      category: "recycling",
      members: 18,
      location: "Downtown LA",
      image: "/src/assets/istockphoto-1340716614-612x612.jpg",
      progress: 60,
      nextEvent: "2024-11-20",
    },
    {
      id: 3,
      name: "Green Parks Project",
      category: "plantation",
      members: 32,
      location: "Central Park",
      image:
        "/src/assets/large-pile-trash-dominates-foreground-with-city-skyline-background-illustrates-environmental-pollution-urban-waste-management-issues_331695-28223.avif",
      progress: 85,
      nextEvent: "2024-11-18",
    },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Join Forces for a Greener Tomorrow
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with like-minded individuals and create or join teams
            dedicated to environmental conservation.
          </p>
        </div>

        {/* Category Filter and Search */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search teams..."
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Create Team Button */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Team</span>
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === "all"
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-600 hover:bg-green-50"
              } transition-colors`}
            >
              All Teams
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                  selectedCategory === category.id
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-600 hover:bg-green-50"
                } transition-colors`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              {/* Team Image */}
              <div className="relative h-48">
                <img
                  src={team.image}
                  alt={team.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm text-white ${
                      categories.find((c) => c.id === team.category)?.color
                    }`}
                  >
                    {categories.find((c) => c.id === team.category)?.name}
                  </span>
                </div>
              </div>

              {/* Team Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {team.name}
                </h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{team.location}</span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Project Progress</span>
                    <span>{team.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 rounded-full h-2"
                      style={{ width: `${team.progress}%` }}
                    />
                  </div>
                </div>

                {/* Team Stats */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">
                      {team.members} members
                    </span>
                  </div>
                  <Link to="/dashboard">
                    <button className="px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      Join Team
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Achievement Section */}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-green-600 text-white rounded-xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="mb-6">
              Join our community of environmental champions and start making an
              impact today.
            </p>
            <Link to="/dashboard">
              <button className="px-8 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                Get Started Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
