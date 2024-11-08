const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const chatController = require("../controllers/chatController");

router.post("/create", auth, chatController.createChat);
router.get("/:teamId", auth, chatController.getChats);

module.exports = router;
