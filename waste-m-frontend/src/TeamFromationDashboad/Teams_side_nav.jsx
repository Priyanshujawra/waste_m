import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown, ChevronRight } from "lucide-react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TeamFormationForm from "./forms/Teamcreation_form";
import ChannelCreationForm from "./chennel/Create_Chennel";
import axios from "axios";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: "90vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SideNav = () => {
  const [teams, setTeams] = useState([]);
  const [open, setOpen] = useState(false);
  const [openteamform, setOpenteamform] = useState(false);

  // Fetch all teams with channels
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/teams/allteams", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const fetchedTeams = response.data.map((team) => ({
            ...team,
            isExpanded: false, // Initially, no team is expanded
            channels: team.channels || [], // Ensure channels exist
          }));
          setTeams(fetchedTeams);
        })
        .catch(() => setTeams([]));
    }
  }, []);

  // Toggle Team Expansion and fetch team details with channels
  const toggleTeam = async (teamId) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team._id === teamId ? { ...team, isExpanded: !team.isExpanded } : team
      )
    );

    const teamFound = teams.find((team) => team._id === teamId);
    if (!teamFound || teamFound.isExpanded) return;

    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:5000/api/channel/${teamId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { channels } = response.data;
      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team._id === teamId
            ? { ...team, channels: channels, isExpanded: true }
            : team
        )
      );
    } catch (error) {
      console.log("Error fetching team details:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenteamform = () => setOpenteamform(true);
  const handleCloseteamform = () => setOpenteamform(false);

  return (
    <nav className="w-64 h-screen bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 p-4">
      {/* Create New Team Button */}
      <Button
        className="w-full mb-6 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm"
        size="sm"
        onClick={handleOpenteamform}
      >
        <Plus className="h-4 w-4 mr-2" />
        Create New Team
      </Button>
      <Modal open={openteamform} onClose={handleCloseteamform}>
        <Box sx={style} className="overflow-y-scroll">
          <TeamFormationForm />
        </Box>
      </Modal>

      {/* Teams and Channels List */}
      <div className="space-y-4">
        {teams.map((team) => (
          <div key={team._id} className="space-y-1">
            {/* Team Header */}
            <Link to={`chat/${team._id}`}>
              <button
                onClick={() => toggleTeam(team._id)}
                className="w-full flex items-center px-2 py-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-150 group"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg mr-3 text-lg shadow-sm">
                  <img src={`http://localhost:5000${team.thumbnail}`} alt="" />
                </div>
                <span className="flex-1 text-sm font-medium text-gray-700 text-left">
                  {team.teamName}
                </span>
                {team.isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                )}
              </button>
            </Link>

            {/* Channel List */}
            {team.isExpanded && (
              <div className="ml-4 space-y-1">
                {team.channels.map((channel) => (
                  <button
                    key={channel._id}
                    className="w-full flex items-center px-3 py-1.5 text-sm text-gray-600 hover:bg-white hover:text-gray-900 rounded-md cursor-pointer"
                  >
                    <Link to="/teamform/TeamChannel">
                      <span className="text-gray-400 mr-2">#</span>
                      {channel.name}
                    </Link>
                  </button>
                ))}
                <Button
                  variant="link"
                  className="text-sky-400"
                  onClick={handleOpen}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Channel
                </Button>
              </div>
            )}
            <Modal open={open} onClose={handleClose}>
              <Box sx={style} className="overflow-y-scroll">
                <ChannelCreationForm teamId={team._id} />
              </Box>
            </Modal>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default SideNav;
