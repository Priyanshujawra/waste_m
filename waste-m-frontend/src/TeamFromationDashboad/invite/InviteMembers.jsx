"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Mail, Link, Phone, Copy, Check } from "lucide-react";
import axios from "axios";

export default function TeamManagement() {
  const [inviteLink, setInviteLink] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [contactType, setContactType] = useState("email");
  const [showAlert, setShowAlert] = useState(false);
  const [copied, setCopied] = useState(false);
  const [teams, setTeams] = useState([]);

  const [alertMessage, setAlertMessage] = useState("");
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
            isExpanded: false, // Initially, no team is expanded
            channels: team.channels || [], // Ensure channels exist
          }));
          setTeams(fetchedTeams);
        })
        .catch(() => setTeams([]));
    }
  }, []);

  const teamIdarr = teams.map((team) => {
    return team._id;
  });
  const teamId = teamIdarr[0];
  useEffect(() => {
    // Generate invite link when component mounts
    setInviteLink(`${window.location.origin}/api/teams/${teamId}/members`);
  }, [teamId]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validateInput = () => {
    if (contactType === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(contactInfo);
    } else {
      const phoneRegex = /^\+?[\d\s-()]{10,}$/;
      return phoneRegex.test(contactInfo);
    }
  };

  const handleSendInvite = async () => {
    if (contactInfo && validateInput()) {
      try {
        const response = await fetch(`/api/teams/${teamId}/invite`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add your authentication token here
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            [contactType]: contactInfo,
          }),
        });

        if (response.ok) {
          setAlertMessage(`Invitation sent to ${contactInfo}`);
          setShowAlert(true);
          setContactInfo("");
        } else {
          const errorData = await response.json();
          setAlertMessage(errorData.message || "Failed to send invitation");
          setShowAlert(true);
        }
      } catch (error) {
        console.error("Error sending invitation:", error);
        setAlertMessage("An error occurred while sending the invitation");
        setShowAlert(true);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Invite Team Members</CardTitle>
          <CardDescription>
            Add new members to your team via email, phone number, or sharing an
            invite link
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Invite Link Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Invite Link</label>
            <div className="flex gap-2">
              <Input value={inviteLink} readOnly className="flex-1" />
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="w-24"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>

          {/* Contact Info Invite Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Send Invite</label>
            <div className="flex gap-2 mb-2">
              <Button
                variant={contactType === "email" ? "default" : "outline"}
                onClick={() => setContactType("email")}
                className="w-32"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button
                variant={contactType === "phone" ? "default" : "outline"}
                onClick={() => setContactType("phone")}
                className="w-32"
              >
                <Phone className="h-4 w-4 mr-2" />
                Phone
              </Button>
            </div>
            <div className="flex gap-2">
              <Input
                type={contactType === "email" ? "email" : "tel"}
                placeholder={
                  contactType === "email"
                    ? "Enter email address"
                    : "Enter phone number"
                }
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleSendInvite}
                disabled={!validateInput()}
                className="w-24"
              >
                Send
              </Button>
            </div>
            {contactInfo && !validateInput() && (
              <p className="text-sm text-red-500 mt-1">
                Please enter a valid{" "}
                {contactType === "email" ? "email address" : "phone number"}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Success Alert Dialog */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Invitation Status</AlertDialogTitle>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
