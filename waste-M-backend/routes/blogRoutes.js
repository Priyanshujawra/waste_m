const express = require("express");
const multer = require("multer");
const Blog = require("../models/Blog");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

// Multer setup for blog thumbnail uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Create a new blog with reference to the logged-in user
router.post("/create", auth, upload.single("thumbnail"), async (req, res) => {
  const { title, description, content, category } = req.body;
  const thumbnail = req.file ? req.file.path : null;

  try {
    const newBlog = new Blog({
      title,
      description,
      content,
      category,
      thumbnail,
      user: req.user.id, // Associate the blog with the logged-in user
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog" });
  }
});

// Update blog
router.put("/:id", auth, upload.single("thumbnail"), async (req, res) => {
  const { title, description, content, category } = req.body;
  const thumbnail = req.file ? req.file.path : null;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, description, content, category, thumbnail },
      { new: true }
    );

    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to update blog" });
  }
});

// GET route to fetch all blogs with pagination
router.get("/blogs", async (req, res) => {
  const { page = 1, limit = 6 } = req.query; // Get page and limit from query params

  try {
    // Fetch the blogs with pagination
    const blogs = await Blog.find()
      .populate("user", "name profileImage") // Populating user (author) details
      .skip((page - 1) * limit) // Skip blogs for previous pages
      .limit(Number(limit)); // Limit the number of blogs per page

    // Get total number of blogs for pagination
    const totalBlogs = await Blog.countDocuments();

    // Return blogs and total count
    res.json({ blogs, totalBlogs });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// GET route to fetch a specific blog post by ID
router.get("/blogs/:id", async (req, res) => {
  try {
    const blogPost = await Blog.findById(req.params.id).populate(
      "user",
      "name profileImage"
    );

    if (!blogPost) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog details" });
  }
});

module.exports = router;
