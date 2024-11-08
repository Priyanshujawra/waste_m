import React, { useState } from "react";
import {
  Users,
  Trash2,
  Award,
  BarChart,
  Activity,
  ArrowUp,
  Globe,
  Leaf,
} from "lucide-react";
import UsersFeed from "../All_feed/Users_Feed";

const DashboardHome = () => {
  const [feeds, setFeeds] = useState([
    {
      id: 1,
      user: "Jane Cooper",
      avatar: "/api/placeholder/40/40",
      content:
        "Just collected 5kg of plastic waste from Beach Road! Join us next weekend for another cleanup drive 🌊 #CleanEarth",
      time: "2h ago",
      likes: 24,
      comments: 8,
      image: "/api/placeholder/400/200",
    },
    {
      id: 2,
      user: "Robert Fox",
      avatar: "/api/placeholder/40/40",
      content:
        "Organized a community cleanup drive with 50 volunteers! Together we collected over 100kg of waste. Proud of our community! 💪 #WasteWarriors",
      time: "5h ago",
      likes: 45,
      comments: 12,
      image: "/api/placeholder/400/200",
    },
  ]);

  const stats = [
    {
      label: "Total Waste Collected",
      value: "2,543 kg",
      change: "+12%",
      icon: Trash2,
    },
    { label: "Active Volunteers", value: "1,234", change: "+8%", icon: Users },
    { label: "Impact Score", value: "89.3", change: "+5%", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90" />

            {/* Content */}
            <div className="relative px-8 py-16 md:px-12 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-white space-y-6">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500 bg-opacity-20 backdrop-blur-sm">
                    <Globe className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">
                      Making Earth Cleaner
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                    Together We Can Make a
                    <span className="block text-blue-200">
                      Sustainable Future
                    </span>
                  </h1>

                  <p className="text-blue-100 text-lg">
                    Join our community of eco-warriors making a real difference.
                    Every piece of waste collected contributes to a cleaner
                    planet.
                  </p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center space-x-2">
                        <Leaf className="h-5 w-5 text-green-300" />
                        <span className="text-2xl font-bold">152</span>
                      </div>
                      <p className="text-sm text-blue-100 mt-1">
                        Active Projects
                      </p>
                    </div>
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-yellow-300" />
                        <span className="text-2xl font-bold">12K</span>
                      </div>
                      <p className="text-sm text-blue-100 mt-1">
                        Community Members
                      </p>
                    </div>
                    <div className="hidden md:block bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center space-x-2">
                        <Award className="h-5 w-5 text-purple-300" />
                        <span className="text-2xl font-bold">89%</span>
                      </div>
                      <p className="text-sm text-blue-100 mt-1">Success Rate</p>
                    </div>
                  </div>
                </div>

                {/* Hero Image */}
                <div className="hidden lg:block relative">
                  <img
                    src="/src/assets/susjrenfd.jpeg"
                    alt="Environmental Impact"
                    className="rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Trash2 className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          This Month
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          +284 kg
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
              <span className="flex items-center text-green-500 text-sm font-medium">
                {stat.change}
                <ArrowUp className="h-4 w-4 ml-1" />
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Feed Section */}
        <div className="lg:col-span-2 space-y-6">
          <UsersFeed />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Impact Leaders */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Award className="h-5 w-5 text-yellow-500 mr-2" />
              Impact Leaders
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((leader) => (
                <div
                  key={leader}
                  className="flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors duration-200"
                >
                  <img
                    src={`/api/placeholder/32/32`}
                    alt="Leader"
                    className="w-10 h-10 rounded-full ring-2 ring-yellow-100"
                  />
                  <div className="ml-3 flex-1">
                    <h3 className="font-medium text-gray-800">
                      Eco Warrior {leader}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {100 - leader * 10}kg collected
                    </p>
                  </div>
                  <div className="bg-yellow-50 text-yellow-700 text-xs font-medium px-2.5 py-1 rounded-full">
                    #{leader}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Collections */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <BarChart className="h-5 w-5 text-purple-500 mr-2" />
              Recent Collections
            </h2>
            <div className="space-y-4">
              {["Plastic", "Paper", "Glass"].map((type, index) => (
                <div
                  key={type}
                  className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700">{type}</span>
                    <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Verified
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {15 - index * 3}kg • {["Beach", "Park", "Downtown"][index]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
