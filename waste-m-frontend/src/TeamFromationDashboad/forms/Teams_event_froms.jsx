import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Calendar as CalendarIcon,
  Clock,
  Send,
  Target,
  FileText,
  Timer,
  Section,
} from "lucide-react";
import TeamEventNavbar from "../Team_event_nav";

// Project Event Creation Form Component
const ProjectEventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    type: "",
    area: "",
    distance: "",
    additionalNotes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Target className="h-6 w-6 text-blue-500" />
          Create New Project Event
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Event Title</label>
                <Input
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Event Type</label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beach">Beach Cleanup</SelectItem>
                    <SelectItem value="park">Park Maintenance</SelectItem>
                    <SelectItem value="community">Community Service</SelectItem>
                    <SelectItem value="education">
                      Educational Workshop
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Location</label>
                <div className="flex gap-2 mt-1">
                  <Input
                    placeholder="Enter location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon">
                    <MapPin className="h-4 w-4 text-blue-500" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">
                    Area (sq. meters)
                  </label>
                  <Input
                    type="number"
                    placeholder="Area coverage"
                    value={formData.area}
                    onChange={(e) =>
                      setFormData({ ...formData, area: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Distance (km)</label>
                  <Input
                    type="number"
                    placeholder="Total distance"
                    value={formData.distance}
                    onChange={(e) =>
                      setFormData({ ...formData, distance: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Start Date & Time</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                  />
                  <Input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">End Date & Time</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                  />
                  <Input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Enter event description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="mt-1 h-32"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Additional Notes</label>
            <Textarea
              placeholder="Any additional information about the event"
              value={formData.additionalNotes}
              onChange={(e) =>
                setFormData({ ...formData, additionalNotes: e.target.value })
              }
              className="mt-1"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              <Send className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// Project Event Details Component
const ProjectEventDetails = ({ event }) => {
  return (
    <section>
      <TeamEventNavbar />
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="border-t-4 border-t-blue-500">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold">{event?.title}</h2>
                  <Badge variant="secondary">{event?.type}</Badge>
                </div>
                <div className="flex items-center gap-4 text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {event?.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Timer className="h-4 w-4" />
                    Duration: {event?.duration}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-blue-600">
                    <CalendarIcon className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Start</p>
                      <p className="text-sm">
                        {event?.startDate} {event?.startTime}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-purple-600">
                    <Clock className="h-5 w-5" />
                    <div>
                      <p className="font-medium">End</p>
                      <p className="text-sm">
                        {event?.endDate} {event?.endTime}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-green-600">
                    <Target className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Coverage</p>
                      <p className="text-sm">
                        Area: {event?.area}m² • Distance: {event?.distance}km
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-gray-500" />
                <h3 className="font-semibold">Description</h3>
              </div>
              <p className="text-gray-600 pl-7">{event?.description}</p>
            </div>

            {event?.additionalNotes && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <h3 className="font-semibold">Additional Notes</h3>
                </div>
                <p className="text-gray-600 pl-7">{event?.additionalNotes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export { ProjectEventForm, ProjectEventDetails };
