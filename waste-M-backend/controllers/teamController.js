const Team = require("../models/Team");

const teamController = {
  getTeamById: async (req, res) => {
    try {
      const teamId = req.params.id;
      const team = await Team.findById(teamId).populate(
        "createdBy",
        "name email profileImage"
      );

      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }

      res.json(team);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching team",
        error: error.message,
      });
    }
  },
  getAllTeams: async (req, res) => {
    try {
      const teams = await Team.find().populate(
        "createdBy",
        "name email profileImage"
      );
      res.json(teams);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching all teams",
        error: error.message,
      });
    }
  },
  getJoinedTeams: async (req, res) => {
    console.log(req.user.id);
    try {
      const teams = await Team.find({ members: req.user.id }).populate(
        "_id",
        "teamName"
      );

      res.json(teams);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching joined teams",
        error: error.message,
      });
    }
  },
  createTeam: async (req, res) => {
    try {
      const { teamName, primaryGoal, location, description, selectedTypes } =
        req.body;

      if (selectedTypes.length > 3) {
        return res
          .status(400)
          .json({ message: "Maximum of 3 team types allowed" });
      }

      const thumbnailPath = req.file ? `/uploads/${req.file.filename}` : null;

      const team = new Team({
        teamName,
        primaryGoal,
        location,
        description,
        selectedTypes,
        thumbnail: thumbnailPath,
        createdBy: req.user.id,
      });

      await team.save();

      res.status(201).json({
        message: "Team created successfully",
        team: await team.populate("createdBy", "name email profileImage"),
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating team",
        error: error.message,
      });
    }
  },

  getTeam: async (req, res) => {
    try {
      const userId = req.user.id; // Assuming user ID comes from the token payload
      const teams = await Team.find({ createdBy: userId }).populate(
        "createdBy",
        "name email profileImage"
      );

      if (!teams) {
        return res
          .status(404)
          .json({ message: "No teams found for this user" });
      }

      res.json(teams);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching teams",
        error: error.message,
      });
    }
  },

  updateTeam: async (req, res) => {
    try {
      const team = await Team.findById(req.params.id);

      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }

      if (team.createdBy.toString() !== req.user.id) {
        return res
          .status(403)
          .json({ message: "Not authorized to update team" });
      }

      const { teamName, primaryGoal, location, description, selectedTypes } =
        req.body;

      if (req.file) {
        team.thumbnail = `/uploads/${req.file.filename}`;
      }

      team.teamName = teamName || team.teamName;
      team.primaryGoal = primaryGoal || team.primaryGoal;
      team.location = location || team.location;
      team.description = description || team.description;
      team.selectedTypes = selectedTypes || team.selectedTypes;

      await team.save();

      res.json({
        message: "Team updated successfully",
        team: await team.populate("createdBy", "name email"),
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating team",
        error: error.message,
      });
    }
  },

  deleteTeam: async (req, res) => {
    try {
      const team = await Team.findById(req.params.id);

      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }

      if (team.createdBy.toString() !== req.user.id) {
        return res
          .status(403)
          .json({ message: "Not authorized to delete team" });
      }

      await team.deleteOne();

      res.json({ message: "Team deleted successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting team",
        error: error.message,
      });
    }
  },

  addMember: async (req, res) => {
    try {
      const team = await Team.findById(req.params.id);

      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }

      if (team.members.includes(req.user.id)) {
        return res
          .status(400)
          .json({ message: "User is already a team member" });
      }

      team.members.push({ _id: req.user.id });
      await team.save();

      res.json({
        message: "Member added successfully",
        team: await team.populate("members", "name email"),
      });
    } catch (error) {
      res.status(500).json({
        message: "Error adding team member",
        error: error.message,
      });
    }
  },

  removeMember: async (req, res) => {
    try {
      const team = await Team.findById(req.params.id);

      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }

      if (team.createdBy.toString() !== req.user.id) {
        return res
          .status(403)
          .json({ message: "Not authorized to remove members" });
      }

      const { userId } = req.body;

      if (userId === team.createdBy.toString()) {
        return res.status(400).json({ message: "Cannot remove team creator" });
      }

      team.members = team.members.filter(
        (member) => member.toString() !== userId
      );
      await team.save();

      res.json({
        message: "Member removed successfully",
        team: await team.populate("members", "name email"),
      });
    } catch (error) {
      res.status(500).json({
        message: "Error removing team member",
        error: error.message,
      });
    }
  },

  inviteMember: async (req, res) => {
    try {
      const { teamId, memberId } = req.body;
      const team = await Team.findById(teamId);

      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }

      if (team.createdBy.toString() !== req.user.id) {
        return res
          .status(403)
          .json({ message: "Not authorized to invite members" });
      }

      if (!team.members.includes(memberId)) {
        team.members.push(memberId);
        await team.save();
      }

      res.json({ message: "Member invited successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Error inviting member",
        error: error.message,
      });
    }
  },
};
module.exports = teamController;
