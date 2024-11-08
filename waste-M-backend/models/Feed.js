// models/Feed.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const feedSchema = new mongoose.Schema({
  content: { type: String, required: true },
  image: { type: String }, // For image uploads
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of user IDs who liked the feed
  comments: [commentSchema], // Array of comments
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who created the feed
});

module.exports = mongoose.model("Feed", feedSchema);
