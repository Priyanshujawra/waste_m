const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

// Team CRUD operations with protected routes
router.post(
  "/create",
  auth,
  upload.single("thumbnail"),
  teamController.createTeam
);
router.get("/allteams", auth, teamController.getTeam);
router.get("/teamspublic", teamController.getAllTeams);
router.put("/:id", auth, upload.single("thumbnail"), teamController.updateTeam);
router.delete("/:id", auth, teamController.deleteTeam);
router.get("/joined", auth, teamController.getJoinedTeams);
// Team member management
router.post("/:id/members", auth, teamController.addMember);
router.delete("/:id/members", auth, teamController.removeMember);
router.get("/getby/:id", auth, teamController.getTeamById);
// New route: Invite member to team (only team creator can invite)
router.post("/:id", auth, teamController.inviteMember);

module.exports = router;
