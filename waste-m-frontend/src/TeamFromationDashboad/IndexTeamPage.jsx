import React from "react";
import { UserPlus, Users, Mail, Share2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const EmptyDashboardHome = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Welcome Header */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to Your Team Workspace
        </h1>
        <p className="text-gray-600 text-lg">
          Get started by building your team and inviting members to collaborate
        </p>
      </div>

      {/* Main Empty State Card */}
      <Card className="max-w-3xl mx-auto mb-8 bg-white">
        <CardContent className="p-8">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-50 p-4 rounded-full">
              <Users className="h-12 w-12 text-blue-500" />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-center mb-4">
            Your Team is Empty
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Start building your team by inviting members to join your workspace
          </p>

          {/* Primary CTA Button */}
          <div className="flex justify-center mb-8">
            <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <UserPlus className="h-5 w-5 mr-2" />
              Invite Team Members
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Getting Started Steps */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <Mail className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="font-semibold mb-2">Send Invites</h3>
            <p className="text-gray-600 text-sm">
              Invite team members via email to join your workspace
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <Share2 className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="font-semibold mb-2">Share Access</h3>
            <p className="text-gray-600 text-sm">
              Set roles and permissions for your team members
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="font-semibold mb-2">Start Collaborating</h3>
            <p className="text-gray-600 text-sm">
              Begin working together on projects and tasks
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Help Text */}
      <div className="max-w-2xl mx-auto mt-8 text-center">
        <p className="text-gray-600">
          Need help getting started?
          <button className="text-blue-600 hover:text-blue-700 ml-1 underline">
            View our quick start guide
          </button>
        </p>
      </div>
    </div>
  );
};

export default EmptyDashboardHome;
