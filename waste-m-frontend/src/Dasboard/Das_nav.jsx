import React, { useContext, useState } from "react";
import { Bell, Search, MessageSquare, Command, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 container mx-auto">
        {/* Left section: Search */}
        <div className="relative flex items-center flex-1">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              type="search"
              placeholder="Search or type a command..."
              className="pl-10 pr-12 w-full"
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
              <kbd className="inline-flex items-center gap-1 rounded border bg-muted px-2 text-xs text-muted-foreground">
                <Command className="h-3 w-3" /> K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Create Button */}
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create
          </Button>
          {/* Messages */}
          <Button variant="ghost" size="icon" className="relative">
            <MessageSquare className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </Button>
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </Button>
          {/* Profile Dropdown */}
          {/* {usedetail.map((item) => { */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <img
                  src={`http://localhost:5000/jk` || "default_imagejpg"}
                  alt="Profile"
                  className="rounded-full object-cover"
                />
              </Button>
            </DropdownMenuTrigger>{" "}
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="/dashboard/profile">
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Messages</DropdownMenuItem>
              <DropdownMenuSeparator />
              <span onClick={logout}>
                <DropdownMenuItem className="text-red-600">
                  Log out
                </DropdownMenuItem>
              </span>
            </DropdownMenuContent>
          </DropdownMenu>
          ;{/* })} */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
