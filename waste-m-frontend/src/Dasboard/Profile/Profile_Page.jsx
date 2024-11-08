import React, { useContext, useState } from "react";
import { Typography, IconButton, CircularProgress, Box } from "@mui/material";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Add, PhotoCamera } from "@mui/icons-material";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import Modal from "@mui/material/Modal";
import "./uploadcss.css";
import WasteLogProfile from "../waste_log/User_Waste_log_data.jsx";
import WasteAnalytics from "../waste_log/Anlysis_waste.jsx";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  outline: "none", // remove default modal outline
};

const uploadButtonStyle = {
  backgroundColor: "#6200ea",
  color: "white",
  marginTop: "20px",
  padding: "10px 20px",
  borderRadius: "20px",
  fontWeight: "bold",
};

const UserProfile = () => {
  const { user, updateProfileImage } = useContext(AuthContext);
  const data = user?.user;
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // Modal state to handle opening/closing
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Upload image using AuthContext
  const handleImageUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);
      await updateProfileImage(selectedFile); // Use context's method to upload image
      alert("Profile image updated successfully!");
      handleClose(); // Close the modal
    } catch (error) {
      console.error(error);
      alert("Failed to upload profile image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Profile Header Section */}
      <div className="relative h-80">
        <img
          src="/src/assets/Untitled Project.jpg"
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
                src={
                  data?.profileImage
                    ? `http://localhost:5000/${data.profileImage}`
                    : "/src/assets/default_profile.jpg"
                }
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <button
                onClick={handleOpen}
                className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white shadow-lg hover:bg-blue-600 transition-colors"
              >
                <Camera className="w-4 h-4" onClick={handleOpen} />
              </button>
            </motion.div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                {data?.name || "Guest User"}
              </h1>

              <div className="flex flex-wrap gap-4 items-center text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {data?.email || "No Email Provided"}
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
                <div className="text-2xl font-bold text-blue-600">24k</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">4k</div>
                <div className="text-sm text-gray-600">Following</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">40kg</div>
                <div className="text-sm text-gray-600">Impact</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
      </div>

      {/* Modal for Uploading Profile Image */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: 400,
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: 24,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="modal-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="modal-logo">
              <span className="logo-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 512 419.116"
                >
                  <g clipPath="url(#clip-folder-new)">
                    <path
                      d="M16.991,419.116A16.989,16.989,0,0,1,0,402.125V16.991A16.989,16.989,0,0,1,16.991,0H146.124a17,17,0,0,1,10.342,3.513L227.217,57.77H437.805A16.989,16.989,0,0,1,454.8,74.761v53.244h40.213A16.992,16.992,0,0,1,511.6,148.657L454.966,405.222a17,17,0,0,1-16.6,13.332H410.053v.562ZM63.06,384.573H424.722L473.86,161.988H112.2Z"
                      fill="var(--c-action-primary)"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip-folder-new">
                      <rect width="512" height="419.116"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </div>
            <Button className="btn-close" onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                  fill="var(--c-text-secondary)"
                />
              </svg>
            </Button>
          </div>
          <div className="modal-body" style={{ marginTop: "20px" }}>
            <Typography variant="h6" className="modal-title">
              Upload a file
            </Typography>
            <Typography variant="body2" className="modal-description">
              Attach the file below
            </Typography>

            <button
              className="upload-area"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "2px dashed #ccc",
                padding: "20px",
                marginTop: "20px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() =>
                document.querySelector('input[type="file"]').click()
              }
            >
              <span className="upload-area-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  viewBox="0 0 340.531 419.116"
                >
                  <path
                    d="M-2904.708-8.885A39.292,39.292,0,0,1-2944-48.177V-388.708A39.292,39.292,0,0,1-2904.708-428h209.558a13.1,13.1,0,0,1,9.3,3.8l78.584,78.584a13.1,13.1,0,0,1,3.8,9.3V-48.177a39.292,39.292,0,0,1-39.292,39.292Zm-13.1-379.823V-48.177a13.1,13.1,0,0,0,13.1,13.1h261.947a13.1,13.1,0,0,0,13.1-13.1V-323.221h-52.39a26.2,26.2,0,0,1-26.194-26.195v-52.39h-196.46A13.1,13.1,0,0,0-2917.805-388.708Zm146.5,241.621a14.269,14.269,0,0,1-7.883-12.758v-19.113h-68.841c-7.869,0-7.87-47.619,0-47.619h68.842v-18.8a14.271,14.271,0,0,1,7.882-12.758,14.239,14.239,0,0,1,14.925,1.354l57.019,42.764c.242.185.328.485.555.671a13.9,13.9,0,0,1,2.751,3.292,14.57,14.57,0,0,1,.984,1.454,14.114,14.114,0,0,1,1.411,5.987,14.006,14.006,0,0,1-1.411,5.973,14.653,14.653,0,0,1-.984,1.468,13.9,13.9,0,0,1-2.751,3.293c-.228.2-.313.485-.555.671l-57.019,42.764a14.26,14.26,0,0,1-8.558,2.847A14.326,14.326,0,0,1-2771.3-147.087Z"
                    transform="translate(2944 428)"
                    fill="var(--c-action-primary)"
                  />
                </svg>
              </span>
              <span className="upload-area-title">
                Drag file(s) here to upload.
              </span>
              <span className="upload-area-description">
                Alternatively, you can select a file by <br />
                <strong>clicking here</strong>
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </button>
          </div>
          <div
            className="modal-footer"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Button onClick={handleClose} className="btn-secondary">
              Cancel
            </Button>
            {uploading ? (
              <CircularProgress />
            ) : (
              <Button
                onClick={handleImageUpload}
                className="btn-primary"
                disabled={!selectedFile}
              >
                Upload File
              </Button>
            )}
          </div>
        </Box>
      </Modal>

      {/* Profile Details Section */}
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
          <div className="">
            <Card>
              <CardContent className="pt-6">
                <WasteLogProfile />
                <WasteAnalytics />
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Recent Activity</h3>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="grid md:grid-cols-2 gap-6">
          <Card className="overflow-hidden">
            <img src="d" alt="difh" className="w-full h-48 object-cover" />
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">project.title</h3>
                  <p className="text-sm text-gray-500">participants</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm 
                      "Active" === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                  project.status
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Progress</span>
                  <span>progress%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full transition-all duration-300"></div>
                </div>
              </div>
              <Button className="w-full mt-4">View Details</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add other tab contents similarly */}
      </Tabs>

      {/* Conditional Rendering of Tabs */}
    </div>
  );
};

export default UserProfile;
