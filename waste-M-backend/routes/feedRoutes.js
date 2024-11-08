// routes/feedRoutes.js
const express = require("express");
const Feed = require("../models/Feed");
const auth = require("../middlewares/authMiddleware");
const multer = require("multer");

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Create a new feed post with image upload
router.post("/", auth, upload.single("image"), async (req, res) => {
  const { content } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const newFeed = new Feed({
      content,
      image,
      user: req.user.id,
    });

    const savedFeed = await newFeed.save();
    res.status(201).json(savedFeed);
  } catch (error) {
    res.status(500).json({ error: "Failed to create feed" });
  }
});

// Fetch all feed posts with pagination
router.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const feeds = await Feed.find()
      .populate("user", "name profileImage")
      .populate("likes", "name profileImage")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalFeeds = await Feed.countDocuments();
    res.json({ feeds, totalFeeds });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch feeds" });
  }
});

// Like a feed post
router.post("/:id/like", auth, async (req, res) => {
  const feedId = req.params.id;
  const userId = req.user.id;

  try {
    const feed = await Feed.findById(feedId);
    if (!feed) return res.status(404).json({ error: "Feed not found" });

    // Check if user already liked the post
    if (feed.likes.includes(userId)) {
      feed.likes.pull(userId); // Remove like
    } else {
      feed.likes.push(userId); // Add like
    }

    await feed.save();
    res.json(feed);
  } catch (error) {
    res.status(500).json({ error: "Failed to like feed" });
  }
});

// Comment on a feed post
router.post("/:id/comment", auth, async (req, res) => {
  const feedId = req.params.id;
  const { content } = req.body;

  try {
    const feed = await Feed.findById(feedId);
    if (!feed) return res.status(404).json({ error: "Feed not found" });

    const comment = {
      user: req.user.id,
      content,
    };

    feed.comments.push(comment);
    await feed.save();
    res.status(201).json(feed);
  } catch (error) {
    res.status(500).json({ error: "Failed to comment on feed" });
  }
});

// Share a feed (create a new feed with the same content and image)
router.post("/:id/share", auth, async (req, res) => {
  const feedId = req.params.id;

  try {
    const feed = await Feed.findById(feedId);
    if (!feed) return res.status(404).json({ error: "Feed not found" });

    const newFeed = new Feed({
      content: feed.content,
      image: feed.image,
      user: req.user.id,
    });

    const savedFeed = await newFeed.save();
    res.status(201).json(savedFeed);
  } catch (error) {
    res.status(500).json({ error: "Failed to share feed" });
  }
});

module.exports = router;
