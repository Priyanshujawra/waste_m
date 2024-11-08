const Event = require("../models/Event");
const Team = require("../models/Team");

// Create a new event
exports.createEvent = async (req, res) => {
  const { title, description, date, location, teamId } = req.body;

  try {
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ error: "Team not found" });

    const event = new Event({
      title,
      description,
      date,
      location,
      team: teamId,
    });
    await event.save();

    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create event" });
  }
};

// Join an event
exports.joinEvent = async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    if (!event.participants.includes(userId)) {
      event.participants.push(userId);
      await event.save();
    }
    res.status(200).json({ message: "Joined event successfully", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to join event" });
  }
};
