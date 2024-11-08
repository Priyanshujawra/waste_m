import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Settings,
  Lock,
  Link as LinkIcon,
  Trash2,
  Mail,
  Shield,
  Bell,
  Hash,
  PlusCircle,
  Share2,
  MessageSquare,
  MoreVertical,
  Edit2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TeamSettings = () => {
  const [teamData, setTeamData] = useState({
    id: "team1",
    name: "Clean City Initiative",
    description: "Working together to make our city cleaner and greener",
    visibility: "public",
    channels: [
      {
        id: "general",
        name: "general",
        description: "General team discussions",
        isDefault: true,
        members: 24,
      },
      {
        id: "announcements",
        name: "announcements",
        description: "Important team announcements",
        isDefault: false,
        members: 24,
      },
      {
        id: "events",
        name: "events",
        description: "Upcoming cleanup events",
        isDefault: false,
        members: 20,
      },
      {
        id: "resources",
        name: "resources",
        description: "Team resources and documents",
        isDefault: false,
        members: 18,
      },
    ],
    members: [
      {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        role: "Admin",
        avatar: "/api/placeholder/32/32",
        status: "active",
        joinedDate: "2024-01-15",
      },
      {
        id: 2,
        name: "Mike Chen",
        email: "mike.c@example.com",
        role: "Member",
        avatar: "/api/placeholder/32/32",
        status: "active",
        joinedDate: "2024-01-20",
      },
      {
        id: 3,
        name: "Emma Williams",
        email: "emma.w@example.com",
        role: "Moderator",
        avatar: "/api/placeholder/32/32",
        status: "active",
        joinedDate: "2024-02-01",
      },
    ],
    integrations: [
      {
        id: "slack",
        name: "Slack",
        status: "connected",
        lastSync: "2024-03-15",
      },
      {
        id: "drive",
        name: "Google Drive",
        status: "connected",
        lastSync: "2024-03-14",
      },
    ],
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Team Settings</h1>
            <p className="text-gray-500">
              Manage your team preferences and members
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share Team
            </Button>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Invite Members
            </Button>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">
                      Team Name
                    </label>
                    <Input value={teamData.name} className="max-w-md" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">
                      Description
                    </label>
                    <Textarea
                      value={teamData.description}
                      className="max-w-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">
                      Team Visibility
                    </label>
                    <Select defaultValue={teamData.visibility}>
                      <SelectTrigger className="max-w-md">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="invite">Invite Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Danger Zone</h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="text-red-600 font-medium mb-2">
                      Delete Team
                    </h4>
                    <p className="text-red-600 text-sm mb-3">
                      This action cannot be undone. All team data will be
                      permanently deleted.
                    </p>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Team
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Team Members</CardTitle>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamData.members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>{member.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-gray-500">
                                {member.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{member.role}</Badge>
                        </TableCell>
                        <TableCell>{member.joinedDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              member.status === "active"
                                ? "success"
                                : "secondary"
                            }
                          >
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Channels Tab */}
          <TabsContent value="channels">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Team Channels</CardTitle>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New Channel
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamData.channels.map((channel) => (
                    <div
                      key={channel.id}
                      className="flex items-center justify-between p-4 border rounded-lg bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <Hash className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{channel.name}</p>
                          <p className="text-sm text-gray-500">
                            {channel.description}
                          </p>
                        </div>
                        {channel.isDefault && (
                          <Badge variant="secondary">Default</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">
                          {channel.members} members
                        </span>
                        <Button variant="ghost" size="icon">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Connected Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamData.integrations.map((integration) => (
                    <div
                      key={integration.id}
                      className="flex items-center justify-between p-4 border rounded-lg bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{integration.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{integration.name}</p>
                          <p className="text-sm text-gray-500">
                            Last synced: {integration.lastSync}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeamSettings;
