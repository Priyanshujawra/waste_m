import React, { useState } from "react";
import {
  Users,
  Settings,
  Bell,
  Share2,
  MoreVertical,
  Shield,
  Eye,
  Globe,
  Megaphone,
  FileText,
  Upload,
  Download,
  Calendar,
  File,
  FolderOpen,
  Search,
} from "lucide-react";

const TeamChannel = () => {
  const [activeTab, setActiveTab] = useState("resources");

  const channelInfo = {
    name: "Waste Management Updates",
    description:
      "Official channel for waste management updates and announcements",
    subscribers: 1234,
    visibility: "public",
    created: "March 15, 2024",
    admins: [
      {
        id: 1,
        name: "Sarah Chen",
        role: "Owner",
        avatar: "/api/placeholder/32/32",
      },
      {
        id: 2,
        name: "Mike Johnson",
        role: "Admin",
        avatar: "/api/placeholder/32/32",
      },
    ],
  };

  const [resources] = useState([
    {
      id: 1,
      name: "Q1 Safety Guidelines 2024.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadedBy: "Sarah Chen",
      uploadDate: "Mar 15, 2024",
      views: 234,
      category: "Guidelines",
    },
    {
      id: 2,
      name: "Waste Collection Schedule.xlsx",
      type: "XLSX",
      size: "1.8 MB",
      uploadedBy: "Mike Johnson",
      uploadDate: "Mar 14, 2024",
      views: 156,
      category: "Schedules",
    },
    {
      id: 3,
      name: "Environmental Compliance Report.pdf",
      type: "PDF",
      size: "5.2 MB",
      uploadedBy: "Sarah Chen",
      uploadDate: "Mar 13, 2024",
      views: 89,
      category: "Reports",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Original Channel Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Megaphone className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{channelInfo.name}</h1>
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                    Official Channel
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{channelInfo.description}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {channelInfo.subscribers.toLocaleString()} subscribers
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    {channelInfo.visibility}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-6 mt-6">
            {[
              { id: "resources", label: "Resources", icon: FolderOpen },
              { id: "analytics", label: "Analytics", icon: Eye },
              { id: "members", label: "Members", icon: Users },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {activeTab === "resources" && (
          <div className="grid grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="col-span-2 space-y-6">
              {/* Search and Upload */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search resources..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload
                  </button>
                </div>
              </div>

              {/* Resources List */}
              <div className="bg-white rounded-xl shadow-sm divide-y">
                {resources.map((resource) => (
                  <div key={resource.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{resource.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <File className="w-4 h-4" />
                              {resource.type} • {resource.size}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {resource.uploadDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {resource.views} views
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Download className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Quick Upload */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mt-4">Quick Upload</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Drag and drop files here or click to browse
                  </p>
                  <button className="mt-4 w-full bg-green-100 text-green-600 px-4 py-2 rounded-lg hover:bg-green-200">
                    Choose Files
                  </button>
                </div>
              </div>

              {/* Channel Admins */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Resource Admins
                </h3>
                <div className="space-y-4">
                  {channelInfo.admins.map((admin) => (
                    <div
                      key={admin.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={admin.avatar}
                          alt={admin.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="font-medium">{admin.name}</div>
                          <div className="text-sm text-gray-500">
                            {admin.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamChannel;
