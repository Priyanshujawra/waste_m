import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";

const AddMemberPage = () => {
  const { user } = useContext(AuthContext); // Authenticated user context
  const [memberEmail, setMemberEmail] = useState("");
  const [message, setMessage] = useState(null);
  const { id } = useParams(); // Team ID from route

  const handleAddMember = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/teams/${id}/members`,
        { email: memberEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message); // Display success message
      setMemberEmail(""); // Clear input field
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Error adding member. Please try again."
      );
    }
  };

  return (
    <div className="add-member-page">
      <h2>Add Member to Team</h2>
      {message && <p>{message}</p>}
      <input
        type="email"
        placeholder="Enter member's email"
        value={memberEmail}
        onChange={(e) => setMemberEmail(e.target.value)}
      />
      <button onClick={handleAddMember}>Add Member</button>
    </div>
  );
};

export default AddMemberPage;
