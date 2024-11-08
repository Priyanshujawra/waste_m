import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  Scale,
  BarChart3,
  Archive,
  Plus,
  Filter,
  TrendingUp,
  ArrowUpDown,
  Search,
  RefreshCcw,
  Download,
  Trash2,
  Edit,
  AlertTriangle,
  Circle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const WasteInventory = () => {
  // Sample inventory data
  const [inventory, setInventory] = useState({
    summary: {
      totalItems: 1250,
      totalWeight: "2,500 kg",
      capacityUsed: 75,
      recyclable: "1,875 kg",
      nonRecyclable: "625 kg",
    },
    categories: [
      { name: "Plastic", amount: "850 kg", percentage: 34 },
      { name: "Paper", amount: "625 kg", percentage: 25 },
      { name: "Metal", amount: "500 kg", percentage: 20 },
      { name: "Glass", amount: "375 kg", percentage: 15 },
      { name: "Other", amount: "150 kg", percentage: 6 },
    ],
    recentActivity: [
      {
        id: "INV001",
        type: "Plastic",
        quantity: "100 kg",
        status: "In Storage",
        location: "Zone A",
        dateReceived: "2024-11-01",
        processedBy: "John Doe",
        quality: "High",
      },
      {
        id: "INV002",
        type: "Paper",
        quantity: "75 kg",
        status: "Processing",
        location: "Zone B",
        dateReceived: "2024-11-01",
        processedBy: "Jane Smith",
        quality: "Medium",
      },
      // Add more items as needed
    ],
  });

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getStatusColor = (status) => {
    switch (status) {
      case "In Storage":
        return "bg-blue-500";
      case "Processing":
        return "bg-yellow-500";
      case "Completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getQualityIndicator = (quality) => {
    switch (quality) {
      case "High":
        return "text-green-500";
      case "Medium":
        return "text-yellow-500";
      case "Low":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header with Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Waste Inventory Management</h1>
          <p className="text-gray-500">
            Track and manage collected waste materials
          </p>
        </div>
        <div className="flex gap-4">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Item
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <Package className="h-8 w-8 text-blue-500" />
              <Badge variant="outline">Total</Badge>
            </div>
            <h3 className="text-2xl font-bold mt-2">
              {inventory.summary.totalItems}
            </h3>
            <p className="text-sm text-gray-500">Items in inventory</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <Scale className="h-8 w-8 text-green-500" />
              <Badge variant="outline">Weight</Badge>
            </div>
            <h3 className="text-2xl font-bold mt-2">
              {inventory.summary.totalWeight}
            </h3>
            <p className="text-sm text-gray-500">Total weight</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <Archive className="h-8 w-8 text-yellow-500" />
              <Badge variant="outline">Capacity</Badge>
            </div>
            <h3 className="text-2xl font-bold mt-2">
              {inventory.summary.capacityUsed}%
            </h3>
            <Progress value={inventory.summary.capacityUsed} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <RefreshCcw className="h-8 w-8 text-purple-500" />
              <Badge variant="outline">Recyclable</Badge>
            </div>
            <h3 className="text-2xl font-bold mt-2">
              {inventory.summary.recyclable}
            </h3>
            <p className="text-sm text-gray-500">Recyclable materials</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <Trash2 className="h-8 w-8 text-red-500" />
              <Badge variant="outline">Non-Recyclable</Badge>
            </div>
            <h3 className="text-2xl font-bold mt-2">
              {inventory.summary.nonRecyclable}
            </h3>
            <p className="text-sm text-gray-500">Non-recyclable waste</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Inventory Management</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort
              </Button>
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Quality</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.recentActivity.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Circle
                            className={`h-3 w-3 mr-2 ${getQualityIndicator(
                              item.quality
                            )}`}
                          />
                          {item.quality}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="categories">
              <div className="grid grid-cols-2 gap-4">
                {inventory.categories.map((category) => (
                  <Card key={category.name}>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">{category.name}</h3>
                        <Badge variant="outline">{category.percentage}%</Badge>
                      </div>
                      <Progress value={category.percentage} className="mb-2" />
                      <p className="text-sm text-gray-500">
                        Total: {category.amount}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <div className="space-y-4">
                {inventory.recentActivity.map((activity) => (
                  <Card key={activity.id}>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold">
                            #{activity.id} - {activity.type}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Processed by {activity.processedBy} on{" "}
                            {activity.dateReceived}
                          </p>
                        </div>
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Waste Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center">
                      <p className="text-gray-500">Chart placeholder</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Processing Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center">
                      <p className="text-gray-500">Chart placeholder</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WasteInventory;
