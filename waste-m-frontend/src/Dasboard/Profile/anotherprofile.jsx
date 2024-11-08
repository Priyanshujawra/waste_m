import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import {
  Users,
  Mail,
  Globe,
  MapPin,
  Camera,
  Plus,
  Award,
  BookOpen,
  Group,
  TreePine,
  Activity,
  ChevronRight,
  Share2,
  Heart,
  Calendar,
  Upload,
} from "lucide-react";

const UserProfile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Mock data - replace with actual data from context
  const userData = {
    name: "Alex Johnson",
    role: "Environmental Activist",
    email: "alex.johnson@example.com",
    location: "San Francisco, CA",
    profileImage: "/api/placeholder/150/150",
    coverImage: "/api/placeholder/1200/300",
    stats: {
      followers: "2.5K",
      following: "1.2K",
      impact: "500kg",
    },
    achievements: [
      {
        title: "Eco Warrior",
        description: "Saved 100kg of waste",
        icon: TreePine,
      },
      {
        title: "Community Leader",
        description: "Led 10 cleanup drives",
        icon: Users,
      },
      {
        title: "Innovation Star",
        description: "Started 3 initiatives",
        icon: Award,
      },
    ],
    activities: [
      {
        type: "waste_log",
        description: "Logged 5kg plastic waste",
        date: "2h ago",
      },
      { type: "event", description: "Joined Beach Cleanup", date: "1d ago" },
      {
        type: "achievement",
        description: "Earned Eco Warrior Badge",
        date: "2d ago",
      },
    ],
    projects: [
      {
        title: "Ocean Cleanup Initiative",
        progress: 75,
        image: "/api/placeholder/400/200",
        participants: 120,
        status: "Active",
      },
      {
        title: "Urban Recycling Program",
        progress: 45,
        image: "/api/placeholder/400/200",
        participants: 85,
        status: "In Progress",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section with Cover Image */}
      <div className="relative h-80">
        <img
          src={userData.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
      </div>

      {/* Profile Info Section */}
      <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-32">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Profile Image */}
            <motion.div whileHover={{ scale: 1.05 }} className="relative">
              <img
                src={userData.profileImage}
                alt={userData.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <button
                onClick={() => setShowUploadModal(true)}
                className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white shadow-lg hover:bg-blue-600 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </motion.div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                {userData.name}
              </h1>
              <p className="text-gray-500 mb-4">{userData.role}</p>

              <div className="flex flex-wrap gap-4 items-center text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {userData.email}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {userData.location}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="default"
                  className="gap-2"
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? (
                    <Heart className="w-4 h-4 fill-current" />
                  ) : (
                    <Heart className="w-4 h-4" />
                  )}
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Profile
                </Button>
                <Button variant="outline" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Post
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {userData.stats.followers}
                </div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {userData.stats.following}
                </div>
                <div className="text-sm text-gray-600">Following</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {userData.stats.impact}
                </div>
                <div className="text-sm text-gray-600">Impact</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white rounded-lg p-1 shadow-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              {userData.achievements.map((achievement, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <achievement.icon className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Recent Activity</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.activities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="p-2 bg-blue-50 rounded-full">
                        <Activity className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">{activity.description}</p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="grid md:grid-cols-2 gap-6">
            {userData.projects.map((project, index) => (
              <Card key={index} className="overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <p className="text-sm text-gray-500">
                        {project.participants} participants
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        project.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <Button className="w-full mt-4">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Add other tab contents similarly */}
        </Tabs>
      </div>

      {/* Upload Modal */}
      <AlertDialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Profile Picture</AlertDialogTitle>
            <AlertDialogDescription>
              Choose a new profile picture to upload
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="mt-4">
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <Upload className="w-8 h-8 mx-auto text-gray-400 mb-4" />
              <p className="text-sm text-gray-600">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                accept="image/*"
              />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <Button
                variant="outline"
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={!selectedFile || uploading}
                onClick={() => {
                  /* Handle upload */
                }}
              >
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserProfile;
