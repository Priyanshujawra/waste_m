import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Archive,
  Trash2,
  Clock,
  MoreVertical,
  Reply,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const sampleEmails = [
  {
    id: 1,
    sender: "William Smith",
    subject: "Meeting Tomorrow",
    preview:
      "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share...",
    timestamp: "about 1 year ago",
    tags: ["meeting", "work", "important"],
    email: "williamsmith@example.com",
    fullContent: `Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.

Please come prepared with any questions or insights you may have. Looking forward to our meeting!

Best regards, William`,
  },
  {
    id: 2,
    sender: "Alice Smith",
    subject: "Re: Project Update",
    preview: `Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done...'`,
    timestamp: "about 1 year ago",
    tags: ["work", "important"],
    email: "alice@example.com",
    fullContent: `Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done an excellent job.`,
  },
  {
    id: 3,
    sender: "Bob Johnson",
    subject: "Weekend Plans",
    preview: `Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor...`,
    timestamp: "over 1 year ago",
    tags: ["personal"],
    email: "bob@example.com",
    fullContent: `Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor activity.`,
  },
];

const ModernInbox = () => {
  const [selectedEmail, setSelectedEmail] = useState(sampleEmails[0]);
  const [replyText, setReplyText] = useState("");

  return (
    <div className="flex h-screen bg-black text-gray-100">
      {/* Left sidebar - Email list */}
      <div className="w-[450px] border-r border-gray-800">
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold">Inbox</h1>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                All mail
              </Button>
              <Button variant="ghost" size="sm">
                Unread
              </Button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search"
              className="pl-9 bg-gray-900 border-gray-800"
            />
          </div>
        </div>

        {/* Email list */}
        <div className="overflow-auto">
          {sampleEmails.map((email) => (
            <div
              key={email.id}
              onClick={() => setSelectedEmail(email)}
              className={`p-4 cursor-pointer border-b border-gray-800 hover:bg-gray-900 ${
                selectedEmail?.id === email.id ? "bg-gray-900" : ""
              }`}
            >
              <div className="flex justify-between mb-1">
                <span className="font-medium">{email.sender}</span>
                <span className="text-sm text-gray-500">{email.timestamp}</span>
              </div>
              <div className="font-medium mb-1">{email.subject}</div>
              <div className="text-sm text-gray-500 truncate">
                {email.preview}
              </div>
              <div className="flex gap-2 mt-2">
                {email.tags?.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-gray-800 text-gray-300"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Email content */}
      <div className="flex-1 flex flex-col">
        {/* Email actions header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <div className="flex gap-4">
            <Button variant="ghost" size="icon">
              <Archive className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Clock className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Email content */}
        {selectedEmail && (
          <div className="flex-1 overflow-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  {selectedEmail.sender}
                </h2>
                <div className="text-gray-500">{selectedEmail.subject}</div>
                <div className="text-sm text-gray-500">
                  Reply-To: {selectedEmail.email}
                </div>
              </div>
              <div className="text-gray-500">{selectedEmail.timestamp}</div>
            </div>
            <div className="mb-8 whitespace-pre-wrap">
              {selectedEmail.fullContent || selectedEmail.preview}
            </div>

            {/* Reply section */}
            <div className="border-t border-gray-800 pt-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Reply William Smith..."
                  className="w-full bg-transparent border-none outline-none resize-none"
                  rows={3}
                />
                <div className="flex justify-between items-center mt-2">
                  <label className="flex items-center gap-2 text-sm text-gray-500">
                    <input
                      type="checkbox"
                      className="rounded border-gray-700"
                    />
                    Mute this thread
                  </label>
                  <Button className="bg-white text-black hover:bg-gray-200">
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernInbox;
