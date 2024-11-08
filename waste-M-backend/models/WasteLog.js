const mongoose = require("mongoose");

const wasteLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  wasteTypes: { type: [String], required: true },
  weight: { type: Number, required: true },
  description: { type: String },
  image: { type: String }, // Store image path
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String },
  },
  contactNumber: { type: String, required: true },
  preferredPickupTime: { type: Date, required: true },
  urgencyLevel: {
    type: String,
    enum: ["low", "normal", "high", "urgent"],
    default: "normal",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "in-progress", "completed"],
    default: "pending",
  },
  dustbinType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("WasteLog", wasteLogSchema);
