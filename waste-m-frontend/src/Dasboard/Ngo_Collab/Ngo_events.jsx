import React, { useState } from "react";
import { Calendar, MapPin, Clock, Users, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const NGOEventsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample events data
  const events = [
    {
      id: 1,
      title: "Community Cleanup Drive",
      ngoName: "Green Earth Foundation",
      date: "2024-11-15",
      time: "09:00 AM",
      location: "Central Park",
      participants: 45,
      maxParticipants: 100,
      description:
        "Join us for a community-wide cleanup initiative focusing on plastic waste collection and segregation.",
      type: "Cleanup",
    },
    {
      id: 2,
      title: "Waste Segregation Workshop",
      ngoName: "EcoAware",
      date: "2024-11-20",
      time: "02:00 PM",
      location: "Community Center",
      participants: 28,
      maxParticipants: 50,
      description:
        "Learn proper waste segregation techniques and sustainable waste management practices.",
      type: "Workshop",
    },
    {
      id: 3,
      title: "Recycling Awareness Campaign",
      ngoName: "Waste Warriors",
      date: "2024-11-25",
      time: "10:00 AM",
      location: "City Hall",
      participants: 35,
      maxParticipants: 75,
      description:
        "Educational campaign about recycling best practices and its impact on the environment.",
      type: "Campaign",
    },
  ];

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.ngoName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">NGO Events</h2>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <p className="text-sm text-blue-600">{event.ngoName}</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {event.type}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">{event.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                  <span>
                    {event.participants}/{event.maxParticipants} participants
                  </span>
                </div>
              </div>

              <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Register Now
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NGOEventsSection;
