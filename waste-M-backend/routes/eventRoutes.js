const express = require("express");
const { createEvent, joinEvent } = require("../controllers/eventController");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", auth, createEvent);
router.post("/join", auth, joinEvent);

module.exports = router;
