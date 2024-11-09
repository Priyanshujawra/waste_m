const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

// Route imports
const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
const blogRoutes = require("./routes/blogRoutes");
const feedRoutes = require("./routes/feedRoutes");
const eventRoutes = require("./routes/eventRoutes");
const wasteRoutes = require("./routes/wasteLogRoutes");
const channelRoutes = require("./routes/channelRoutes");
const chatRoutes = require("./routes/Chats");
const Chat = require("./models/Chat");
const User = require("./models/User");

const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsconfig = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.options("", cors(corsconfig));
app.use(cors(corsconfig));

app.use(
  cors({
    origin: "https://hotel-backend-xi.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/", (req, res) => {
  res.send("Hello from server");
});

// Existing Routes
app.use("/api", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api", wasteRoutes);
app.use("/api/feeds", feedRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/channel", channelRoutes);
app.use("/api/chat", chatRoutes);

// Socket.io event handling
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Join team room for chat
  socket.on("joinRoom", (teamId) => {
    socket.join(teamId);
    console.log(`User joined room: ${teamId}`);
  });

  // Listen for chat messages
  socket.on("sendMessage", async (data) => {
    const { teamId, userId, message } = data;

    // Save chat message to the database
    const newChat = await Chat.create({
      team: teamId,
      user: userId,
      message,
    });

    // Emit message to all clients in the room
    io.to(teamId).emit("receiveMessage", {
      _id: newChat._id,
      team: teamId,
      user: await User.findById(userId).select("name profileImage"),
      message,
      timestamp: newChat.timestamp,
    });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
