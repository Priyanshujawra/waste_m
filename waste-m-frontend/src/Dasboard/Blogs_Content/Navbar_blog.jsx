import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  { name: "All", color: "bg-gray-100 hover:bg-gray-200" },
  { name: "Destination", color: "bg-blue-100 hover:bg-blue-200" },
  { name: "Culinary", color: "bg-yellow-100 hover:bg-yellow-200" },
  { name: "Lifestyle", color: "bg-green-100 hover:bg-green-200" },
  { name: "Tips & Hacks", color: "bg-red-100 hover:bg-red-200" },
];

const BlogHeader = ({ sortOption, handleSortChange }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header Text */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Travel Blog
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Here, we share travel tips, destination guides, and stories that
          inspire your next adventure.
        </p>
      </div>

      {/* Category and Sort Section */}
      <div className="space-y-6">
        {/* Category Cards */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`${category.color} transition-all duration-300 transform hover:scale-105`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex justify-end items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select value={sortOption} onValueChange={handleSortChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
