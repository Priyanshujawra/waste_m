import axios from "axios";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Send, User } from "lucide-react";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [teams, setTeams] = useState([]);
  const [allchat, setAllchat] = useState([]);
  const { id } = useParams(); // Get team/chat ID from route params

  // Fetch teams on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/teams/allteams", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const fetchedTeams = response.data.map((team) => ({
            ...team,
            isExpanded: false,
            channels: team.channels || [],
          }));
          setTeams(fetchedTeams);
        })
        .catch(() => setTeams([]));
    }
  }, []);

  // Fetch messages for the selected chat
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && id) {
      axios
        .get(`http://localhost:5000/api/chat/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setAllchat(response.data);
        })
        .catch((error) => {
          console.error("Error fetching chat messages", error);
          setAllchat([]);
        });
    }
  }, [allchat]);

  const teamId = teams.length > 0 ? teams[0]._id : null;
  const userId = teams.length > 0 ? teams[0].createdBy._id : null;

  useEffect(() => {
    if (teamId) {
      // Join the room for the chat team
      socket.emit("joinRoom", teamId);

      socket.on("receiveMessage", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [teamId]);

  const handleSendMessage = () => {
    if (message.trim() && teamId && userId) {
      const newMessage = {
        teamId,
        userId,
        message,
      };
      socket.emit("sendMessage", newMessage);

      // Optionally, optimistically update the UI with the new message
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...newMessage,
          timestamp: new Date(),
          user: { _id: userId, name: "You", profileImage: "" },
        },
      ]);

      setMessage(""); // Clear the input
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Team Chat</h2>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {allchat.map((msg, index) => (
              <div key={msg._id} className="flex items-start space-x-3">
                {msg.user.profileImage ? (
                  <img
                    src={`http://localhost:5000/${msg.user.profileImage}`}
                    className="w-10 h-10 rounded-full object-cover"
                    alt={msg.user.name || "User"}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-500" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-baseline">
                    <span className="font-medium text-gray-900">
                      {msg.user.name || "User"}
                    </span>
                    <span className="ml-2 text-xs text-gray-500">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="mt-1 w-[34rem] text-gray-800 bg-white rounded-lg p-3 shadow-sm">
                    {msg.message}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
