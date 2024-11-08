import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, Box, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import TeamChat from "./Chat/ChatPage";
import TeamManagement from "./invite/InviteMembers";
import { Calendar, Users, LinkIcon, Settings } from "lucide-react";
import axios from "axios";

const MainDashboard = () => {
  const [isThumbnailModalOpen, setThumbnailModalOpen] = useState(false);
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const { id } = useParams(); // Assuming you're using React Router to get team ID from URL

  const [teams, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/teams/getby/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setTeam(Array.isArray(response.data) ? response.data : [response.data]); // Set the team data after awaiting the response
      } catch (err) {
        setError("Failed to fetch team details");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam(); // Call the async function
  }, [id]);
  console.log(teams);
  // Load thumbnail from localStorage
  useEffect(() => {
    const storedThumbnail = localStorage.getItem("teamThumbnail");
    if (storedThumbnail) {
      setThumbnail(storedThumbnail);
    }
  }, []);

  // Save thumbnail to localStorage
  const handleThumbnailSave = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      localStorage.setItem("teamThumbnail", result);
      setThumbnail(result);
      setThumbnailModalOpen(false);
    };
    reader.readAsDataURL(file);
  };

  // Memoize avatar and header content to prevent re-renders
  const avatarHeaderContent = useMemo(() => (
    <div className="flex items-center space-x-4">
      {teams.map((team) => (
        <div key={team._id} className="flex">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-200 flex items-center justify-center">
              <img src={`http://localhost:5000${team.thumbnail}`} alt="" />
            </div>
            <span className="text-lg font-medium text-gray-700">
              {team.teamName}
            </span>
          </div>
          <nav className="flex items-center space-x-1 ml-6">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900"
            >
              Posts
            </Button>
          </nav>
        </div>
      ))}
    </div>
  ));

  return (
    <section>
      <div className="w-full">
        {/* Thumbnail Banner */}
        <div className="w-full h-48 bg-gradient-to-r from-purple-100 via-rose-100 to-blue-100 relative overflow-hidden">
          {thumbnail && (
            <img
              src={thumbnail}
              alt="Thumbnail"
              className="absolute inset-0 object-cover w-full h-full"
            />
          )}
          {/* Edit Button */}
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-sm"
            onClick={() => setThumbnailModalOpen(true)}
          >
            Edit Cover
          </Button>
        </div>

        {/* Modal for Editing Thumbnail */}
        <Modal
          open={isThumbnailModalOpen}
          onClose={() => setThumbnailModalOpen(false)}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              p: 4,
              boxShadow: 24,
              borderRadius: 1,
            }}
          >
            <Typography variant="h6" component="h2" className="mb-2">
              Edit Cover Image
            </Typography>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) handleThumbnailSave(file);
              }}
            />
            <Button
              variant="contained"
              onClick={() => setThumbnailModalOpen(false)}
              className="mt-3"
            >
              Cancel
            </Button>
          </Box>
        </Modal>

        {/* Modal for Inviting People */}
        <Modal
          open={isInviteModalOpen}
          onClose={() => setInviteModalOpen(false)}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              p: 4,
              boxShadow: 24,
              borderRadius: 1,
            }}
          >
            <TeamManagement />
          </Box>
        </Modal>

        {/* Navigation Header */}
        <header className="w-full border-b bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-center justify-between px-4 py-2">
            {avatarHeaderContent}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Calendar className="h-5 w-5 text-gray-600" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setInviteModalOpen(true)}
              >
                <Users className="h-5 w-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="icon">
                <LinkIcon className="h-5 w-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="icon">
                <Link to="/teamform/TeamSettings">
                  <Settings className="h-5 w-5 text-gray-600" />
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Team Chat Component */}
        <TeamChat />
      </div>
    </section>
  );
};

export default MainDashboard;
