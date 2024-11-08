import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";

const TeamJoin = () => {
  const [teamId, setTeamId] = useState("");

  const handleJoinTeam = async () => {
    try {
      const response = await axios.post("http://localhost:5000/example", {
        teamId,
      });
      console.log(response.data);
      alert("Joined team successfully");
    } catch (error) {
      console.error("Error joining team:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Join Team</h2>
      <TextField
        label="Team ID"
        value={teamId}
        onChange={(e) => setTeamId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleJoinTeam}
        className="mt-4"
      >
        Join Team
      </Button>
    </div>
  );
};

export default TeamJoin;
