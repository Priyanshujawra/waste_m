// routes/authRoutes.js
const express = require("express");
const {
  register,
  login,
  updateProfileImage,
} = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");
const multer = require("multer");
const User = require("../models/User");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Register and login routes
router.post("/register", upload.single("profileImage"), register);
router.post("/login", login);

// Profile routes
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.put(
  "/profile-image",
  auth,
  upload.single("profileImage"),
  updateProfileImage
);

module.exports = router;
