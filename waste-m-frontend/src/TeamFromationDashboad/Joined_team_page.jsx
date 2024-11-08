"use client";

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { io } from "socket.io-client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Initialize socket connection
const socket = io("http://localhost:5000");

export default function Component() {
  // const { user } = useContext(AuthContext);

  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [userId, setuserid] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data); // Assume response.data is a single user object
        })
        .catch(() => console.error("Error fetching user data"));
    }
  }, []);

  useEffect(() => {
    // Check if user is an object and has an _id property
    if (user && user._id) {
      setuserid(user._id);
    }
  }, [user]);

  useEffect(() => {
    console.log("User ID:", userId); // This should log only when userId is updated and defined
  }, [userId]);

  useEffect(() => {
    // Fetch joined teams

    const fetchTeams = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/teams/joined",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching joined teams:", error);
      }
    };

    fetchTeams();

    // Listen for new messages
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      // Fetch chat messages for the selected team
      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/chat/${selectedTeam._id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching chat messages:", error);
        }
      };

      fetchMessages();

      // Join the team's socket room
      socket.emit("joinRoom", selectedTeam._id);
    }
  }, [selectedTeam]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedTeam) {
      socket.emit("sendMessage", {
        teamId: selectedTeam._id,
        userId: userId,
        message: newMessage,
      });
      setNewMessage("");
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Team Chat</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select
            onValueChange={(value) =>
              setSelectedTeam(teams.find((team) => team._id === value))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a team" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team._id} value={team._id}>
                  {team.teamName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {selectedTeam && (
          <>
            <ScrollArea className="h-[400px] mb-4 p-4 border rounded-md">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start mb-4 ${
                    message.user._id === user.id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`flex ${
                      message.user._id === user.id
                        ? "flex-row-reverse"
                        : "flex-row"
                    } items-start max-w-[70%]`}
                  >
                    <Avatar className="w-8 h-8 mr-2">
                      <AvatarImage
                        src={message.user.profileImage}
                        alt={message.user.name}
                      />
                      <AvatarFallback>
                        {message.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.user._id === user.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary"
                      }`}
                    >
                      <p className="text-sm font-semibold">
                        {message.user.name}
                      </p>
                      <p>{message.message}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {formatTimestamp(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit">Send</Button>
            </form>
          </>
        )}
      </CardContent>
    </Card>
  );
}
