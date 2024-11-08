const Chat = require("../models/Chat");
const Team = require("../models/Team");
const User = require("../models/User");

const chatController = {
  createChat: async (req, res) => {
    console.log(req.body);
    try {
      const { teamId, message } = req.body;
      const chat = new Chat({
        team: teamId,
        user: req.user.id,
        message,
      });

      await chat.save();
      await Team.findByIdAndUpdate(teamId, { $push: { chats: chat._id } });

      res.status(201).json({
        message: "Chat message sent successfully",
        chat: await chat.populate("user", "name email"),
      });
    } catch (error) {
      res.status(500).json({
        message: "Error sending chat message",
        error: error.message,
      });
    }
  },

  getChats: async (req, res) => {
    try {
      const { teamId } = req.params;
      const team = await Team.findById(teamId);

      if (!team) return res.status(404).json({ message: "Team not found" });

      // Ensure only team members and the creator can view chats
      if (
        team.createdBy.toString() !== req.user.id &&
        !team.members.includes(req.user.id)
      ) {
        return res.status(403).json({ message: "Access denied to view chats" });
      }

      const chats = await Chat.find({ team: teamId })
        .populate("user", "name email profileImage ")
        .sort("timestamp");

      res.json(chats);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching chats", error: error.message });
    }
  },
};

module.exports = chatController;
