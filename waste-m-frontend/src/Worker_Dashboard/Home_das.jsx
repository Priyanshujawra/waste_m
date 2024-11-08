import React, { useState } from "react";
import {
  Menu,
  AlertTriangle,
  MapPin,
  Clock,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  Filter,
  ChevronDown,
  Edit,
  BarChart2,
  Calendar,
  CheckCircle,
  XCircle,
  Recycle,
  AlertCircle,
  Monitor,
  Truck,
  Package,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";

const WorkerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedUrgency, setSelectedUrgency] = useState("all");

  // Sample data
  const wasteReports = [
    {
      id: 1,
      user: "John Smith",
      type: "Hazardous Waste",
      location: "123 Green Street, Eco City",
      coordinates: "40.7128° N, 74.0060° W",
      urgency: "high",
      status: "pending",
      timestamp: "2024-11-01 09:30",
      description: "Large container of unknown chemicals",
      image: "/api/placeholder/400/300",
    },
    {
      id: 2,
      user: "Mary Johnson",
      type: "Bulk Waste",
      location: "456 Park Avenue, Eco City",
      coordinates: "40.7129° N, 74.0061° W",
      urgency: "medium",
      status: "in-progress",
      timestamp: "2024-11-01 10:15",
      description: "Old furniture and appliances",
      image: "/api/placeholder/400/300",
    },
    {
      id: 3,
      user: "Robert Davis",
      type: "Recyclables",
      location: "789 River Road, Eco City",
      coordinates: "40.7130° N, 74.0062° W",
      urgency: "low",
      status: "completed",
      timestamp: "2024-11-01 11:00",
      description: "Large pile of cardboard boxes and plastic containers",
      image: "/api/placeholder/400/300",
    },
  ];

  const performanceData = [
    { day: "Mon", completed: 12, pending: 5 },
    { day: "Tue", completed: 15, pending: 3 },
    { day: "Wed", completed: 10, pending: 7 },
    { day: "Thu", completed: 18, pending: 4 },
    { day: "Fri", completed: 14, pending: 6 },
  ];

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-600";
      case "medium":
        return "bg-yellow-100 text-yellow-600";
      case "low":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return AlertCircle;
      case "in-progress":
        return Clock;
      case "completed":
        return CheckCircle;
      default:
        return AlertCircle;
    }
  };

  const Sidebar = () => (
    <div
      className={`fixed left-0 top-0 h-full bg-white shadow-lg w-64 transition-transform duration-300 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <Recycle className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-bold">EcoTrack Worker</h2>
        </div>

        <nav className="space-y-2">
          {[
            { icon: Monitor, label: "Dashboard", link: "/WasteInventory" },
            {
              icon: AlertTriangle,
              label: "Urgent Reports",
              link: "/WasteInventory",
            },
            { icon: Truck, label: "Active Routes", link: "/WasteInventory" },
            { icon: Package, label: "Inventory", link: "/WasteInventory" },
            { icon: Users, label: "Team", link: "/WasteInventory" },
            { icon: Settings, label: "Settings", link: "/WasteInventory" },
          ].map(({ icon: Icon, label, link }) => (
            <button
              key={label}
              className="flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Link to={link}>
                <Icon className="h-5 w-5 text-gray-500" />
                <span>{label}</span>
              </Link>
            </button>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 w-full p-4 border-t">
        <button className="flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  const Header = () => (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              3
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="/api/placeholder/32/32"
              alt="Worker Avatar"
              className="h-8 w-8 rounded-full"
            />
            <span className="font-medium">Alex Worker</span>
          </div>
        </div>
      </div>
    </header>
  );

  const StatsCard = ({ icon: Icon, title, value, trend }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
          <div
            className={`px-2 py-1 rounded-full text-sm ${
              trend >= 0
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {trend >= 0 ? "+" : ""}
            {trend}%
          </div>
        </div>
        <h3 className="mt-4 text-2xl font-bold">{value}</h3>
        <p className="text-gray-500">{title}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div
        className={`${
          sidebarOpen ? "ml-64" : "ml-0"
        } transition-margin duration-300`}
      >
        <Header />

        <main className="p-6">
          {/* Search and Filters */}
          <div className="mb-6">
            <div className="flex space-x-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>

            <div className="flex space-x-4">
              <select
                value={selectedUrgency}
                onChange={(e) => setSelectedUrgency(e.target.value)}
                className="p-2 rounded-lg border"
              >
                <option value="all">All Urgency Levels</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="p-2 rounded-lg border"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <StatsCard
              icon={AlertTriangle}
              title="Urgent Reports"
              value="5"
              trend={2}
            />
            <StatsCard
              icon={Clock}
              title="Pending Tasks"
              value="12"
              trend={-3}
            />
            <StatsCard
              icon={CheckCircle}
              title="Completed Today"
              value="28"
              trend={5}
            />
            <StatsCard icon={Truck} title="Active Routes" value="8" trend={0} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Reports List */}
            <div className="lg:col-span-2 space-y-4">
              {wasteReports.map((report) => (
                <Card
                  key={report.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span
                            className={`px-2 py-1 rounded-full text-sm ${getUrgencyColor(
                              report.urgency
                            )}`}
                          >
                            {report.urgency.toUpperCase()}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {report.timestamp}
                          </span>
                        </div>
                        <h3 className="font-medium">{report.type}</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {report.description}
                        </p>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {report.location}
                        </div>
                      </div>
                      <img
                        src={report.image}
                        alt="Waste Report"
                        className="w-24 h-24 rounded-lg object-cover ml-4"
                      />
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <img
                          src="/api/placeholder/24/24"
                          alt={report.user}
                          className="h-6 w-6 rounded-full"
                        />
                        <span className="text-sm">{report.user}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Link to="/TaskDetailPage">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                        <Link to="/WasteCollectionTask">
                          <Button size="sm">Take Action</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="completed"
                        stroke="#10B981"
                        name="Completed"
                      />
                      <Line
                        type="monotone"
                        dataKey="pending"
                        stroke="#EF4444"
                        name="Pending"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="text-green-600 font-medium">
                      Response Time
                    </h4>
                    <p className="text-2xl font-bold">28 min</p>
                    <p className="text-sm text-green-600">↓ 12% vs last week</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-blue-600 font-medium">
                      Resolution Rate
                    </h4>
                    <p className="text-2xl font-bold">92%</p>
                    <p className="text-sm text-blue-600">↑ 5% vs last week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WorkerDashboard;
