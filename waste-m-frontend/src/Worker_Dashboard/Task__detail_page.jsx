import React, { useState } from "react";
import {
  ChevronLeft,
  MapPin,
  Clock,
  CheckCircle,
  Image,
  PlusCircle,
  Paperclip,
  Share2,
  Send,
  User,
  Edit,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TaskDetailPage = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [status, setStatus] = useState("in-progress");

  // Sample task data
  const task = {
    id: "WR-2024-001",
    type: "Hazardous Waste",
    status: "in-progress",
    urgency: "high",
    location: "123 Green Street, Eco City",
    coordinates: "40.7128° N, 74.0060° W",
    reportedAt: "2024-11-01 09:30 AM",
    estimatedCompletion: "2024-11-01 11:30 AM",
    description:
      "Large container of unknown chemicals requiring immediate attention. Possible leakage observed.",
    reporter: {
      name: "John Smith",
      phone: "+1 (555) 123-4567",
      email: "john.smith@email.com",
      image: "/api/placeholder/40/40",
    },
    images: [
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
    ],
    team: [
      {
        id: 1,
        name: "Alex Worker",
        role: "Lead",
        image: "/api/placeholder/32/32",
      },
      {
        id: 2,
        name: "Sarah Tech",
        role: "Assistant",
        image: "/api/placeholder/32/32",
      },
    ],
    timeline: [
      { time: "09:30 AM", event: "Report received", user: "System" },
      { time: "09:35 AM", event: "Assigned to team", user: "Dispatcher" },
      { time: "09:45 AM", event: "Team en route", user: "Alex Worker" },
      {
        time: "10:15 AM",
        event: "On-site assessment started",
        user: "Alex Worker",
      },
    ],
    notes: [
      {
        id: 1,
        user: "Alex Worker",
        time: "10:20 AM",
        text: "Initial assessment complete. Requires specialized equipment.",
      },
      {
        id: 2,
        user: "Sarah Tech",
        time: "10:25 AM",
        text: "Safety perimeter established. Awaiting additional supplies.",
      },
    ],
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      "in-progress": "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const UrgencyBadge = ({ level }) => {
    const styles = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${styles[level]}`}
      >
        {level.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hover:bg-gray-100">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-xl font-bold">Task {task.id}</h1>
                <StatusBadge status={status} />
                <UrgencyBadge level={task.urgency} />
              </div>
              <p className="text-sm text-gray-500">
                Reported on {task.reportedAt}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex-grow px-4 py-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Main Details */}
          <div className="col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardContent className="p-4">
                <div className="flex space-x-3">
                  <Button className="flex-1">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Complete
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    Update Status
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow">
              <div className="border-b">
                <nav className="flex space-x-4 px-4">
                  {[
                    { id: "details", label: "Details" },
                    { id: "photos", label: "Photos" },
                    { id: "timeline", label: "Timeline" },
                    { id: "notes", label: "Notes" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-2 border-b-2 font-medium ${
                        activeTab === tab.id
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-4">
                {activeTab === "details" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Description</h3>
                      <p className="text-gray-600">{task.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Location Details
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                          <div>
                            <p className="font-medium">{task.location}</p>
                            <p className="text-sm text-gray-500">
                              {task.coordinates}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Assigned Team
                      </h3>
                      <div className="space-y-3">
                        {task.team.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center space-x-3"
                          >
                            <img
                              src={member.image}
                              alt={member.name}
                              className="h-8 w-8 rounded-full"
                            />
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-gray-500">
                                {member.role}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "photos" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {task.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Report image ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-lg flex items-center justify-center">
                            <Button className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <Image className="h-4 w-4 mr-2" />
                              View Full
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Upload New Photo
                    </Button>
                  </div>
                )}

                {activeTab === "timeline" && (
                  <div className="space-y-4">
                    {task.timeline.map((entry, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium">
                            {entry.time} - {entry.event}
                          </p>
                          <p className="text-sm text-gray-500">
                            By {entry.user}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "notes" && (
                  <div className="space-y-4">
                    {task.notes.map((note) => (
                      <div key={note.id} className="border rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <User className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium">{note.user}</p>
                            <p className="text-sm text-gray-500">{note.time}</p>
                          </div>
                        </div>
                        <p className="mt-2">{note.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Task Summary */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Task Summary</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Task Type</h3>
                <p className="text-gray-700">{task.type}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Reported At</h3>
                <p className="text-gray-700">{task.reportedAt}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Estimated Completion</h3>
                <p className="text-gray-700">{task.estimatedCompletion}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Contact Information</h3>
                <p className="text-gray-700">{task.reporter.name}</p>
                <p className="text-gray-700">{task.reporter.phone}</p>
                <p className="text-gray-700">{task.reporter.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
