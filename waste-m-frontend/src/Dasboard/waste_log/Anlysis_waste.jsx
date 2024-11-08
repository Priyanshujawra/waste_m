import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  TrendingUp,
  Package,
  Scale,
  AlertTriangle,
  Calendar,
  ArrowUp,
  ArrowDown,
  Activity,
  MapPin,
  Clock,
  Phone,
  Trash2,
  CheckCircle2,
  Timer,
} from "lucide-react";

const COLORS = {
  primary: "#6366f1",
  secondary: "#ec4899",
  tertiary: "#14b8a6",
  accent: "#8b5cf6",
  success: "#22c55e",
  danger: "#ef4444",
  warning: "#f59e0b",
  background: "#f8fafc",
  card: "#ffffff",
  text: "#1e293b",
  textLight: "#64748b",
  dustbinRed: "#ef4444",
  dustbinYellow: "#f59e0b",
  dustbinBlue: "#3b82f6",
  dustbinGreen: "#22c55e",
};

const STATUS_COLORS = {
  pending: COLORS.warning,
  processing: COLORS.primary,
  completed: COLORS.success,
  cancelled: COLORS.danger,
};

const URGENCY_COLORS = {
  low: COLORS.success,
  normal: COLORS.warning,
  high: COLORS.danger,
};

const WasteAnalytics = () => {
  const [wasteLogs, setWasteLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState("all");

  useEffect(() => {
    const fetchWasteLogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/waste-logs",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setWasteLogs(response.data);
      } catch (error) {
        setError("Could not fetch waste logs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWasteLogs();
  }, []);

  const calculateAnalytics = () => {
    if (!wasteLogs.length) return null;

    const totalWeight = wasteLogs.reduce(
      (sum, log) => sum + (log.weight || 0),
      0
    );

    // Monthly data calculation
    const monthlyData = wasteLogs.reduce((acc, log) => {
      const date = new Date(log.createdAt);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      if (!acc[monthYear]) acc[monthYear] = { weight: 0, count: 0 };
      acc[monthYear].weight += log.weight || 0;
      acc[monthYear].count += 1;
      return acc;
    }, {});

    // Status distribution
    const statusDistribution = wasteLogs.reduce((acc, log) => {
      acc[log.status] = (acc[log.status] || 0) + 1;
      return acc;
    }, {});

    // Dustbin type distribution
    const dustbinDistribution = wasteLogs.reduce((acc, log) => {
      acc[log.dustbinType] = (acc[log.dustbinType] || 0) + 1;
      return acc;
    }, {});

    // Location data
    const locationData = wasteLogs.map((log) => ({
      latitude: log.location.latitude,
      longitude: log.location.longitude,
      weight: log.weight,
    }));

    // Time-based analytics
    const timeDistribution = wasteLogs.reduce((acc, log) => {
      const hour = new Date(log.preferredPickupTime).getHours();
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {});

    return {
      totalWeight,
      monthlyData,
      statusDistribution,
      dustbinDistribution,
      locationData,
      timeDistribution,
      totalLogs: wasteLogs.length,
      averageWeight: totalWeight / wasteLogs.length,
    };
  };

  const analytics = calculateAnalytics();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-16 h-16 border-4 border-t-primary border-primary/20 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-danger flex items-center gap-2 p-4 bg-danger/10 rounded-lg">
          <AlertTriangle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  const getStatusColor = (status) => STATUS_COLORS[status] || COLORS.textLight;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-2xl text-white">
          <h1 className="text-4xl font-bold">Waste Analytics</h1>
          <p className="mt-2 opacity-90">
            Comprehensive analysis of your waste management patterns
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-tertiary/10 to-card shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-tertiary">
                    Total Weight
                  </p>
                  <p className="text-2xl font-bold text-text mt-2">
                    {analytics.totalWeight.toFixed(1)} kg
                  </p>
                </div>
                <Scale className="h-8 w-8 text-tertiary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-card shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-accent">
                    Average Weight
                  </p>
                  <p className="text-2xl font-bold text-text mt-2">
                    {analytics.averageWeight.toFixed(1)} kg
                  </p>
                </div>
                <Scale className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-card shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-primary">Total Logs</p>
                  <p className="text-2xl font-bold text-text mt-2">
                    {analytics.totalLogs}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-card shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-secondary">
                    Pending Pickups
                  </p>
                  <p className="text-2xl font-bold text-text mt-2">
                    {Object.entries(analytics.statusDistribution).find(
                      ([status]) => status === "pending"
                    )?.[1] || 0}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status and Dustbin Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-text">
                Status Distribution
              </CardTitle>
              <CardDescription className="text-textLight">
                Current status of waste collection requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={Object.entries(analytics.statusDistribution).map(
                      ([name, value]) => ({
                        name,
                        value,
                      })
                    )}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {Object.entries(analytics.statusDistribution).map(
                      ([status], index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={getStatusColor(status)}
                        />
                      )
                    )}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-text">
                Dustbin Type Distribution
              </CardTitle>
              <CardDescription className="text-textLight">
                Distribution of waste by dustbin type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={Object.entries(analytics.dustbinDistribution).map(
                      ([name, value]) => ({
                        name,
                        value,
                      })
                    )}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {Object.entries(analytics.dustbinDistribution).map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry[0] === "Red"
                              ? COLORS.dustbinRed
                              : entry[0] === "Yellow"
                              ? COLORS.dustbinYellow
                              : entry[0] === "Blue"
                              ? COLORS.dustbinBlue
                              : COLORS.dustbinGreen
                          }
                        />
                      )
                    )}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Pickup Time Distribution */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-text">
              Preferred Pickup Time Distribution
            </CardTitle>
            <CardDescription className="text-textLight">
              Number of pickups requested by hour of day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={Object.entries(analytics.timeDistribution).map(
                  ([hour, count]) => ({
                    hour: `${hour}:00`,
                    count,
                  })
                )}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: COLORS.card,
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar dataKey="count" fill={COLORS.primary} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Location Map Placeholder */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-text">
              Pickup Locations
            </CardTitle>
            <CardDescription className="text-textLight">
              Geographic distribution of waste collection points
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-textLight">
                Map integration available - Coordinates range: Lat:{" "}
                {Math.min(...analytics.locationData.map((l) => l.latitude))} to{" "}
                {Math.max(...analytics.locationData.map((l) => l.latitude))},
                Long:{" "}
                {Math.min(...analytics.locationData.map((l) => l.longitude))} to{" "}
                {Math.max(...analytics.locationData.map((l) => l.longitude))}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WasteAnalytics;
