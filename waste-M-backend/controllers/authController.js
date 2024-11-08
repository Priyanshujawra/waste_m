// controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const multer = require("multer");

// Multer setup for profile image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Register functionality
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const profileImage = req.file ? req.file.path : "uploads/default_profile.jpg"; // Use default image if none provided

  try {
    const user = new User({ name, email, password, profileImage });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error registering user" });
  }
};

// Login functionality
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update Profile Image functionality
exports.updateProfileImage = async (req, res) => {
  const userId = req.user.id;
  const profileImage = req.file ? req.file.path : null;

  if (!profileImage)
    return res.status(400).json({ error: "No image uploaded" });

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { profileImage },
      { new: true }
    );
    res.status(200).json({ message: "Profile image updated", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update profile image" });
  }
};
