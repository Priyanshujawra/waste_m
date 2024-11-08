const express = require("express");
const Channel = require("../models/Channel"); // Import Channel model
const Team = require("../models/Team");
const router = express.Router();

// POST /api/channels/create
router.post("/create", async (req, res) => {
  const { name, description, type, teamId, userId } = req.body;

  try {
    const newChannel = new Channel({
      name,
      description,
      type,
      team: teamId,
      createdBy: userId,
    });

    await newChannel.save();
    res
      .status(201)
      .json({ message: "Channel created successfully", channel: newChannel });
  } catch (error) {
    res.status(500).json({ message: "Error creating channel", error });
  }
});
router.get("/:teamId", async (req, res) => {
  const { teamId } = req.params;

  try {
    // Fetch team by teamId
    const team = await Team.findById(teamId).populate(
      "createdBy",
      "name email"
    );

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Fetch associated channels
    const channels = await Channel.find({ team: teamId }).populate(
      "createdBy",
      "name email"
    );

    res.status(200).json({ team, channels });
  } catch (error) {
    res.status(500).json({ message: "Error fetching team data", error });
  }
});
module.exports = router;
