import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Users,
  Calendar,
  DollarSign,
  Settings,
  Menu,
  Search,
  Bell,
  FileText,
  Target,
  ChevronRight,
  PlusCircle,
  Send,
  Image,
  Paperclip,
  Gift,
  Users2Icon,
  Link as LinkIcon,
  Share2,
  MoreHorizontal,
  Group,
} from "lucide-react";

import MainDashboard from "./Main_das";
import { Link, Outlet } from "react-router-dom";
import SideNav from "./Teams_side_nav";

const Dashboard = () => {
  const [isSidenavCollapsed, setSidenavCollapsed] = useState(false);
  const [activeTeam, setActiveTeam] = useState("team1");
  const [activeChannel, setActiveChannel] = useState("general");

  // Navigation structure (simplified - removed teams from sidebar)
  const mainNavigation = [
    {
      id: "Teams",
      label: "Teams",
      link: "/teamform/team",
      icon: Group,
      subItems: [
        { id: "upcoming", label: "Upcoming Events" },
        { id: "my-events", label: "My Events" },
        { id: "calendar", label: "Calendar" },
      ],
    },
    {
      id: "Joined Teams",
      label: "Joined Teams",
      link: "/teamform/Joined",
      icon: Users2Icon,
      subItems: [
        { id: "upcoming", label: "Upcoming Events" },
        { id: "my-events", label: "My Events" },
        { id: "calendar", label: "Calendar" },
      ],
    },
    {
      id: "events",
      label: "Events",
      link: "/teamform/events/details",
      icon: Calendar,
      subItems: [
        { id: "upcoming", label: "Upcoming Events" },
        { id: "my-events", label: "My Events" },
        { id: "calendar", label: "Calendar" },
      ],
    },

    {
      id: "donations",
      label: "Donations",
      icon: Gift,
      badge: "$2.5k",
      link: "/teamform/DonationPage",

      subItems: [
        { id: "campaigns", label: "Campaigns" },
        { id: "donors", label: "Donors" },
        { id: "reports", label: "Reports" },
      ],
    },
    {
      id: "resources",
      label: "Resources",
      icon: FileText,
      link: "/teamform/WasteManagementChannels",

      subItems: [
        { id: "documents", label: "Documents" },
        { id: "media", label: "Media Library" },
        { id: "guides", label: "Guides" },
      ],
    },
  ];

  // Teams data
  const teams = [
    {
      id: "team1",
      name: "Clean City Initiative",
      channels: ["general", "events", "resources"],
      members: [
        {
          id: 1,
          name: "Sarah Johnson",
          role: "Team Lead",
          avatar: "/api/placeholder/32/32",
          status: "online",
        },
        {
          id: 2,
          name: "Mike Chen",
          role: "Coordinator",
          avatar: "/api/placeholder/32/32",
          status: "offline",
        },
      ],
    },
    {
      id: "team2",
      name: "Green Warriors",
      channels: ["general", "projects"],
      members: [
        {
          id: 4,
          name: "John Smith",
          role: "Team Lead",
          avatar: "/api/placeholder/32/32",
          status: "online",
        },
      ],
    },
  ];

  const currentTeam = teams.find((team) => team.id === activeTeam);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Kept original but removed teams section */}
      <div
        className={`${
          isSidenavCollapsed ? "w-20" : "w-64"
        } bg-white border-r border-gray-200 flex flex-col transition-all duration-300`}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {!isSidenavCollapsed && (
            <span className="font-bold text-xl">EcoConnect</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidenavCollapsed(!isSidenavCollapsed)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation Items */}
        <ScrollArea className="flex-1 py-4">
          {mainNavigation.map((item) => (
            <div key={item.id} className="mb-2">
              <Link to={item.link}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start mb-1 ${
                    isSidenavCollapsed ? "px-2" : "px-4"
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 ${
                      isSidenavCollapsed ? "mr-0" : "mr-3"
                    }`}
                  />
                  {!isSidenavCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary">{item.badge}</Badge>
                      )}
                    </>
                  )}
                </Button>
              </Link>
            </div>
          ))}
        </ScrollArea>

        {/* User Profile Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/api/placeholder/32/32" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            {!isSidenavCollapsed && (
              <>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium">User Name</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <ScrollArea className="w-full">
        <div className="flex-1 flex flex-col  ">
          {/* Enhanced Top Header with Teams */}
          <header className="bg-white border-b border-gray-200">
            {/* Main Header */}
            <div className="h-16 flex items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold">Teams</h1>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search..." className="pl-10" />
                </div>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/api/placeholder/32/32" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Teams & Channels Bar */}
          </header>
          <Outlet />
        </div>
      </ScrollArea>
    </div>
  );
};

export default Dashboard;
