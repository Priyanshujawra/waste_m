import React, { useState } from "react";
import { Users, Calendar, ChevronDown, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";

const TeamEventNavbar = () => {
  const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false);

  // Sample teams data - in real app this would come from props or API
  const teams = [
    { id: 1, name: "Engineering", color: "bg-blue-500" },
    { id: 2, name: "Marketing", color: "bg-purple-500" },
    { id: 3, name: "Sales", color: "bg-green-500" },
    { id: 4, name: "Design", color: "bg-orange-500" },
  ];

  const [selectedTeam, setSelectedTeam] = useState(teams[0]);

  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section with logo and team selector */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-lg font-semibold text-gray-900">
                TeamEvents
              </span>
            </div>

            {/* Team Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsTeamMenuOpen(!isTeamMenuOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className={`w-3 h-3 rounded-full ${selectedTeam.color}`} />
                <span className="text-gray-700">{selectedTeam.name}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {/* Team Dropdown Menu */}
            </div>
          </div>

          {/* Center section with search */}
          <div className="flex-1 max-w-xl px-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right section with create button */}
          <div className="flex items-center space-x-4">
            <Link to="/teamform/events/create">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                <Plus className="h-5 w-5 mr-2" />
                Create Event
              </button>
            </Link>

            {/* Calendar Icon */}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Calendar className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TeamEventNavbar;
