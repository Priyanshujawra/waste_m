"use client";

import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { Users, Target, Upload, X, Loader2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function Component() {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    teamName: "",
    primaryGoal: "",
    location: "",
    description: "",
    selectedTypes: [],
    thumbnail: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const teamTypes = [
    {
      value: "recycling",
      label: "Recycling Management",
      icon: "♻️",
      color: "bg-green-100 text-green-800",
    },
    {
      value: "waste",
      label: "Waste Management",
      icon: "🗑️",
      color: "bg-gray-100 text-gray-800",
    },
    {
      value: "cleanup",
      label: "Area Cleanup",
      icon: "🧹",
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "awareness",
      label: "Environmental Awareness",
      icon: "📢",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "conservation",
      label: "Conservation",
      icon: "🌱",
      color: "bg-emerald-100 text-emerald-800",
    },
    {
      value: "composting",
      label: "Composting",
      icon: "🌿",
      color: "bg-lime-100 text-lime-800",
    },
    {
      value: "education",
      label: "Environmental Education",
      icon: "📚",
      color: "bg-indigo-100 text-indigo-800",
    },
    {
      value: "energy",
      label: "Energy Conservation",
      icon: "⚡",
      color: "bg-purple-100 text-purple-800",
    },
  ];

  const filteredTeamTypes = useMemo(() => {
    if (!searchQuery) return teamTypes;
    return teamTypes.filter((type) =>
      type.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.teamName.trim()) newErrors.teamName = "Team name is required";
    if (!formData.primaryGoal.trim())
      newErrors.primaryGoal = "Primary goal is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (formData.selectedTypes.length === 0)
      newErrors.selectedTypes = "At least one team type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleTypeSelect = (typeValue) => {
    if (
      formData.selectedTypes.length < 3 &&
      !formData.selectedTypes.includes(typeValue)
    ) {
      setFormData((prev) => ({
        ...prev,
        selectedTypes: [...prev.selectedTypes, typeValue],
      }));
      setSearchQuery("");
      setIsSearching(false);
      if (errors.selectedTypes) {
        setErrors((prev) => ({ ...prev, selectedTypes: undefined }));
      }
    }
  };

  const removeType = (typeToRemove) => {
    setFormData((prev) => ({
      ...prev,
      selectedTypes: prev.selectedTypes.filter((type) => type !== typeToRemove),
    }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image size should be less than 5MB",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Error",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }

      setFormData((prev) => ({ ...prev, thumbnail: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".search-container")) {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const formDataToSend = new FormData();
      formDataToSend.append("teamName", formData.teamName);
      formDataToSend.append("primaryGoal", formData.primaryGoal);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("description", formData.description);
      formData.selectedTypes.forEach((type) => {
        formDataToSend.append("selectedTypes[]", type);
      });
      if (formData.thumbnail) {
        formDataToSend.append("thumbnail", formData.thumbnail);
      }

      // Add createdBy field (replace with actual user ID)

      const response = await axios.post(
        "http://localhost:5000/api/teams/create",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast({
        title: "Success",
        description: "Team created successfully!",
        variant: "success",
      });

      // Reset form
      setFormData({
        teamName: "",
        primaryGoal: "",
        location: "",
        description: "",
        selectedTypes: [],
        thumbnail: null,
      });
      setThumbnailPreview(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create team",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Users className="h-6 w-6" />
            Create Environmental Team
          </CardTitle>
          <CardDescription>
            Form a new team to make a positive impact on our environment.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <Label>Team Thumbnail</Label>
            <div className="flex items-center gap-4">
              <div className="relative w-40 h-40 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden hover:border-primary/50 transition-colors">
                {thumbnailPreview ? (
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Upload thumbnail</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">
                  Upload a team thumbnail image
                </p>
                <p className="text-xs text-gray-400">
                  Recommended size: 400x400px (max 5MB)
                </p>
              </div>
            </div>
          </div>

          {/* Team Name */}
          <div className="space-y-2">
            <Label htmlFor="teamName">
              Team Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="teamName"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              placeholder="Enter your team name"
              className={errors.teamName ? "border-red-500" : ""}
            />
            {errors.teamName && (
              <p className="text-sm text-red-500">{errors.teamName}</p>
            )}
          </div>

          {/* Team Types Selection */}
          <div className="space-y-2">
            <Label className="flex items-center justify-between">
              Team Types <span className="text-red-500">*</span>
              <span className="text-sm text-gray-500">
                Selected: {formData.selectedTypes.length}/3
              </span>
            </Label>

            <div className="flex flex-wrap gap-2 min-h-[2rem] mb-2">
              {formData.selectedTypes.map((type) => {
                const typeInfo = teamTypes.find((t) => t.value === type);
                return (
                  <Badge
                    key={type}
                    className={`${typeInfo.color} px-3 py-1 flex items-center gap-1 transition-all hover:scale-105`}
                  >
                    <span>{typeInfo.icon}</span>
                    {typeInfo.label}
                    <button
                      type="button"
                      onClick={() => removeType(type)}
                      className="ml-1 hover:bg-black/10 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                );
              })}
            </div>

            <div className="relative search-container">
              <Input
                placeholder={
                  formData.selectedTypes.length >= 3
                    ? "Maximum types selected"
                    : "Search or click to see team types..."
                }
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearching(true);
                }}
                onFocus={() => setIsSearching(true)}
                disabled={formData.selectedTypes.length >= 3}
                className={errors.selectedTypes ? "border-red-500" : "bg-white"}
              />

              {isSearching && formData.selectedTypes.length < 3 && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-48 overflow-auto">
                  {filteredTeamTypes.length > 0 ? (
                    filteredTeamTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-100 ${
                          formData.selectedTypes.includes(type.value)
                            ? "opacity-50 cursor-not-allowed bg-gray-50"
                            : ""
                        }`}
                        onClick={() => handleTypeSelect(type.value)}
                        disabled={formData.selectedTypes.includes(type.value)}
                      >
                        <span>{type.icon}</span>
                        {type.label}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">
                      No matching team types found
                    </div>
                  )}
                </div>
              )}
            </div>
            {errors.selectedTypes && (
              <p className="text-sm text-red-500">{errors.selectedTypes}</p>
            )}
          </div>

          {/* Primary Goal */}
          <div className="space-y-2">
            <Label htmlFor="primaryGoal">
              Primary Goal <span className="text-red-500">*</span>
            </Label>
            <Input
              id="primaryGoal"
              name="primaryGoal"
              value={formData.primaryGoal}
              onChange={handleChange}
              placeholder="What does your team want to achieve?"
              className={errors.primaryGoal ? "border-red-500" : ""}
            />
            {errors.primaryGoal && (
              <p className="text-sm text-red-500">{errors.primaryGoal}</p>
            )}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">
              Operating Location <span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Where will your team work?"
              className={errors.location ? "border-red-500" : ""}
            />
            {errors.location && (
              <p className="text-sm  text-red-500">{errors.location}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Team Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your team's mission and activities"
              className={errors.description ? "border-red-500" : ""}
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Team...
              </>
            ) : (
              <>
                <Target className="mr-2 h-4 w-4" />
                Create Team
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
