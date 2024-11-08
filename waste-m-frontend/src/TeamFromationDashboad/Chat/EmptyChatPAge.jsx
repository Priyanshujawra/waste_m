import React from "react";
import { MessageSquare, Users, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const EmptyChatState = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Card className="max-w-lg w-full mx-4 text-center">
        <CardContent className="pt-12 pb-10">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute -left-8 -top-4">
                <MessageSquare className="w-8 h-8 text-blue-500 opacity-50" />
              </div>
              <Users className="w-16 h-16 text-blue-600" />
              <div className="absolute -right-6 -bottom-3">
                <MessageSquare className="w-8 h-8 text-blue-500 opacity-50" />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Select a Team to Start Chatting
          </h2>

          <p className="text-gray-600 mb-8">
            Choose a team from the sidebar to begin your conversation. Your
            messages will appear here.
          </p>

          <div className="flex justify-center gap-4">
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Choose Team
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>

          <div className="mt-8 flex justify-center gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">Select Team</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">Start Chat</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmptyChatState;
