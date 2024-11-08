import React, { useState, useContext, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Loader2, MapPin, Scale, Camera } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const WasteLogForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    wasteTypes: [],
    weight: "",
    description: "",
    image: null,
    location: { lat: null, lng: null },
    address: "",
    contactNumber: "",
    preferredPickupTime: "",
    urgencyLevel: "normal",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const wasteTypes = [
    { id: "biomedical", label: "Biomedical", color: "red" },
    { id: "non-biodegradable", label: "Non-biodegradable", color: "gray" },
    { id: "organic", label: "Organic", color: "green" },
    { id: "biodegradable", label: "Biodegradable", color: "brown" },
    { id: "recyclable", label: "Recyclable", color: "blue" },
  ];

  const urgencyLevels = [
    { value: "low", label: "Low Priority" },
    { value: "normal", label: "Normal Priority" },
    { value: "high", label: "High Priority" },
    { value: "urgent", label: "Urgent - Same Day" },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Simulate reverse geocoding (in real app, use Google Maps Geocoding API)
            const address = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            setFormData((prev) => ({
              ...prev,
              location: { lat: latitude, lng: longitude },
              address,
            }));
          } catch (error) {
            setError("Failed to get address details");
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setError("Unable to retrieve location");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "location") {
          formPayload.append("latitude", value.lat);
          formPayload.append("longitude", value.lng);
        } else if (key === "image" && value) {
          formPayload.append("image", value);
        } else {
          formPayload.append(key, value);
        }
      });

      console.log("Payload:", formPayload); // Debugging

      const response = await axios.post(
        "http://localhost:5000/api/waste-logs",
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 400 || response.status === 500)
        throw new Error("Failed to submit waste log");

      setSuccess(true);
      setFormData({
        wasteTypes: [],
        weight: "",
        description: "",
        image: null,
        location: { lat: null, lng: null },
        address: "",
        contactNumber: "",
        preferredPickupTime: "",
        urgencyLevel: "normal",
      });
      setImagePreview(null);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Waste Collection Request
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Waste Types Selection */}
          <div className="space-y-2">
            <Label>Waste Types</Label>
            <div className="flex flex-wrap gap-2">
              {wasteTypes.map((type) => (
                <Button
                  key={type.id}
                  type="button"
                  variant={
                    formData.wasteTypes.includes(type.id)
                      ? "default"
                      : "outline"
                  }
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      wasteTypes: prev.wasteTypes.includes(type.id)
                        ? prev.wasteTypes.filter((t) => t !== type.id)
                        : [...prev.wasteTypes, type.id],
                    }));
                  }}
                  className="flex items-center gap-2"
                >
                  <div
                    className={`w-3 h-3 rounded-full bg-${type.color}-500`}
                  />
                  {type.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Weight Input */}
          <div className="space-y-2">
            <Label htmlFor="weight">Approximate Weight (kg)</Label>
            <div className="flex items-center space-x-2">
              <Scale className="w-5 h-5 text-gray-400" />
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, weight: e.target.value }))
                }
                placeholder="Enter weight in kg"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Additional Details</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Any special instructions or details"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image">Upload Image (optional)</Label>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("image-upload").click()}
              >
                <Camera className="w-5 h-5 mr-2" />
                Select Image
              </Button>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Waste preview"
                className="mt-2 max-w-xs rounded-lg"
              />
            )}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label>Location</Label>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={getLocation}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <MapPin className="w-5 h-5" />
                )}
                Get Current Location
              </Button>
            </div>
            {formData.address && (
              <div className="text-sm text-gray-600 mt-1">
                {formData.address}
              </div>
            )}
          </div>

          {/* Contact Number */}
          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  contactNumber: e.target.value,
                }))
              }
              placeholder="Enter contact number"
              required
            />
          </div>

          {/* Preferred Pickup Time */}
          <div className="space-y-2">
            <Label htmlFor="preferredPickupTime">Preferred Pickup Time</Label>
            <Input
              id="preferredPickupTime"
              type="datetime-local"
              value={formData.preferredPickupTime}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  preferredPickupTime: e.target.value,
                }))
              }
              required
            />
          </div>

          {/* Urgency Level */}
          <div className="space-y-2">
            <Label htmlFor="urgencyLevel">Urgency Level</Label>
            <Select
              value={formData.urgencyLevel}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, urgencyLevel: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select urgency level" />
              </SelectTrigger>
              <SelectContent>
                {urgencyLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 border-green-200">
              <AlertTitle className="text-green-800">Success!</AlertTitle>
              <AlertDescription className="text-green-700">
                Your waste collection request has been submitted successfully.
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !formData.location.lat}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              "Submit Collection Request"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WasteLogForm;
