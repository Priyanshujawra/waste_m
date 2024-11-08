import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Mail,
  AddCircleOutline,
  Home,
  Feed,
  Person,
  Pages,
  PinDrop,
  Group,
  Bookmark,
  Star,
  Camera,
  Handshake,
} from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex flex-col bg-gradient-to-b from-card to-background p-4 border-r ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 h-screen`}
    >
      <div className="flex items-center justify-between mb-6">
        <h1
          className={`flex items-center space-x-2 text-xl font-bold ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <span className="flex px-1">
            <img
              className="w-8"
              src="/src/assets/green_leaf-removebg-preview.png"
              alt="EcoConnect logo"
            />
          </span>
          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            EcoConnect
          </span>
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="hover:bg-accent"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 -mr-4 pr-4">
        <nav className="flex flex-col space-y-1">
          <SidebarSection title="Menu" isOpen={isOpen}>
            <Link to="/dashboard">
              <SidebarItem Icon={Home} label="Home" isOpen={isOpen} />
            </Link>
            <Link to="/dashboard/inbox">
              <SidebarItem
                Icon={Mail}
                label="Messages"
                notificationCount={12}
                isOpen={isOpen}
              />
            </Link>
            <Link to="/dashboard/BlogCreate">
              <SidebarItem
                Icon={AddCircleOutline}
                label="Post Blog"
                isOpen={isOpen}
              />
            </Link>

            <Link to="/dashboard/feed">
              <SidebarItem Icon={Feed} label="Feed" isOpen={isOpen} />
            </Link>
            <Link to="/dashboard/Profile">
              <SidebarItem Icon={Person} label="Profile" isOpen={isOpen} />
            </Link>
          </SidebarSection>

          <SidebarSection title="Explore" isOpen={isOpen}>
            <Link to="/dashboard/Blog">
              <SidebarItem Icon={Pages} label="Blogs" isOpen={isOpen} />
            </Link>
            <Link to="/dashboard/WasteLogForm">
              <SidebarItem
                Icon={PinDrop}
                label="Report Waste"
                isOpen={isOpen}
              />
            </Link>
            <Link to="/dashboard/CreateTeam">
              <SidebarItem Icon={Group} label="Join Groups" isOpen={isOpen} />
            </Link>
            <SidebarItem Icon={Bookmark} label="Saved" isOpen={isOpen} />
            <Link to="/dashboard/RecyclingGuide">
              <SidebarItem
                Icon={Star}
                label="Recommendations"
                isOpen={isOpen}
              />
            </Link>
            <SidebarItem Icon={Camera} label="Memories" isOpen={isOpen} />
          </SidebarSection>

          <SidebarSection title="Partnerships" isOpen={isOpen}>
            <Link to="/dashboard/NgoLandingPage">
              <SidebarItem
                Icon={Handshake}
                label="NGO Collaboration"
                isOpen={isOpen}
                highlight
              />
            </Link>
          </SidebarSection>
        </nav>
      </ScrollArea>
    </div>
  );
}

function SidebarSection({ title, children, isOpen }) {
  return (
    <div className="mb-6">
      {isOpen && (
        <h2 className="mb-2 px-4 text-sm font-semibold tracking-tight text-muted-foreground">
          {title}
        </h2>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function SidebarItem({ Icon, label, notificationCount, isOpen, highlight }) {
  const content = (
    <div
      className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors
        ${
          highlight
            ? "bg-accent text-accent-foreground hover:bg-accent/80"
            : "hover:bg-accent hover:text-accent-foreground"
        }
      `}
    >
      <Icon className={`h-5 w-5 ${isOpen ? "mr-2" : ""} transition-colors`} />
      {isOpen && (
        <div className="flex flex-1 items-center justify-between">
          <span>{label}</span>
          {notificationCount && (
            <Badge variant="secondary" className="ml-auto">
              {notificationCount}
            </Badge>
          )}
        </div>
      )}
    </div>
  );

  return !isOpen ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right" className="text-sm">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    content
  );
}
