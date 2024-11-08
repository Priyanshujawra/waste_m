const express = require("express");
const {
  createWasteLog,
  getUserWasteLogs,
} = require("../controllers/wasteLogController");
const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload"); // Import Multer setup

const router = express.Router();

// Use `upload.single('image')` for single file upload in the route
router.post("/waste-logs", auth, upload.single("image"), createWasteLog);
router.get("/waste-logs", auth, getUserWasteLogs);

module.exports = router;
