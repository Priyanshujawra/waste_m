// RecyclingGuide.js
import React, { useState } from "react";
import { Search, Filter, MapPin, Info } from "lucide-react";
import { recyclingItems } from "./recycleitem"; // Adjust the path as necessary
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";

const RecyclingGuide = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [showMap, setShowMap] = useState(false);
  const [difficulty, setDifficulty] = useState("all");
  const [savedItems, setSavedItems] = useState([]);
  const [showTips, setShowTips] = useState(true);

  const categories = [
    { id: "all", label: "All Items" },
    { id: "plastic", label: "Plastics", count: 12 },
    { id: "paper", label: "Paper & Cardboard", count: 8 },
    { id: "glass", label: "Glass", count: 6 },
    { id: "metal", label: "Metal", count: 7 },
    { id: "electronic", label: "Electronics", count: 5 },
    { id: "organic", label: "Organic Waste", count: 4 },
    { id: "hazardous", label: "Hazardous Waste", count: 3 },
  ];

  const toggleSavedItem = (itemId) => {
    setSavedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const DifficultyBadge = ({ level }) => {
    const colors = {
      easy: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      hard: "bg-red-100 text-red-800",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-sm ${colors[level]}`}>
        {level.charAt(0).toUpperCase() + level.slice(1)}
      </span>
    );
  };

  const filteredItems = recyclingItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesDifficulty =
      difficulty === "all" || item.difficulty === difficulty;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl p-8 mb-8">
        <h1 className="text-4xl font-bold mb-4">Recycling Guide</h1>
        <p className="text-xl opacity-90">
          Make a difference by recycling properly
        </p>
        <div className="flex gap-4 mt-6">
          <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90">
            Get Started
          </button>
          <button className="border border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-green-600">
            Learn More
          </button>
        </div>
      </div>

      {/* Quick Tips Alert */}
      {showTips && (
        <Alert className="bg-blue-50 border-blue-200 mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Did you know? Recycling one aluminum can saves enough energy to run
            a TV for three hours!
            <button
              className="ml-4 text-blue-600 hover:underline"
              onClick={() => setShowTips(false)}
            >
              Dismiss
            </button>
          </AlertDescription>
        </Alert>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search recycling items..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap flex items-center gap-2 transition-all ${
                selectedCategory === category.id
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {category.label}
              {category.count && (
                <span className="bg-white bg-opacity-20 px-2 rounded-full text-sm">
                  {category.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className="relative p-6 bg-white shadow-md rounded-lg"
          >
            <img
              src={item.videoPlaceholder}
              alt="Video Tutorial Placeholder"
              className="w-full h-56 object-cover rounded-lg"
            />
            <CardHeader>
              <Link to={`/dashboard/RecyclingCampaign/${item.id}`}>
                <CardTitle>{item.title}</CardTitle>
              </Link>
            </CardHeader>
            <CardContent>
              <DifficultyBadge level={item.difficulty} />
              <p className="mt-2">{item.description}</p>
              <p className="text-gray-500 mt-1">{item.impact}</p>
              <div className="mt-4">
                <button
                  onClick={() => toggleSavedItem(item.id)}
                  className={`text-sm ${
                    savedItems.includes(item.id)
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {savedItems.includes(item.id)
                    ? "Remove from Saved"
                    : "Save for Later"}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecyclingGuide;
