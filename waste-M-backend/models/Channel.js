const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  type: { type: String, enum: ["public", "private"], default: "public" },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Channel", ChannelSchema);
