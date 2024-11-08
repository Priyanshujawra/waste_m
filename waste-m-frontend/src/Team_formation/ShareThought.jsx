import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";

const ShareThought = () => {
  const [teamId, setTeamId] = useState("");
  const [thought, setThought] = useState("");

  const handleShareThought = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/team/share-thought",
        {
          teamId,
          thought,
        }
      );
      console.log(response.data);
      alert("Thought shared successfully");
    } catch (error) {
      console.error("Error sharing thought:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Share Thought</h2>
      <TextField
        label="Team ID"
        value={teamId}
        onChange={(e) => setTeamId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Thought"
        value={thought}
        onChange={(e) => setThought(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleShareThought}
        className="mt-4"
      >
        Share Thought
      </Button>
    </div>
  );
};

export default ShareThought;
