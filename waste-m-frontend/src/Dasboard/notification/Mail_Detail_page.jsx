// MailDetail.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const MailDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data for the example
  const messages = [
    {
      id: 1,
      sender: "William Smith",
      subject: "Meeting Tomorrow",
      content: "Hi, let's have a meeting tomorrow to discuss the project...",
      timestamp: "about 1 year ago",
      tags: ["meeting", "work", "important"],
      email: "williamsmith@example.com",
    },
    {
      id: 2,
      sender: "Alice Smith",
      subject: "Re: Project Update",
      content:
        "Thank you for the project update. It looks great! I've gone through...",
      timestamp: "about 1 year ago",
      tags: ["work", "important"],
    },
  ];

  const message = messages.find((msg) => msg.id === parseInt(id));

  if (!message) {
    return <p>Mail not found</p>;
  }

  return (
    <div className="p-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Inbox
      </Button>
      <h2 className="text-2xl font-semibold mb-2">{message.subject}</h2>
      {/* <p className="text-gray-600 mb-4">{message.sender}</p> */}
      {/* <p className="text-sm text-muted-foreground mb-4">{message.timestamp}</p> */}
      <p>{message.content}</p>
      <div className="flex gap-2 mt-4">
        {message.tags.map((tag) => (
          <span key={tag} className="px-2 py-1 bg-gray-200 text-xs rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MailDetail;
