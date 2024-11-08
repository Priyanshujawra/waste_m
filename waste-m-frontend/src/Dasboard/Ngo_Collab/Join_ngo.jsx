import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  Heart,
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";

const StylishJoinRequest = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    experience: "",
    availability: "",
    message: "",
  });

  const [focused, setFocused] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Handle form submission
    console.log("Request submitted:", formData);

    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        interest: "",
        experience: "",
        availability: "",
        message: "",
      });
      setSubmitted(false);
    }, 2000);
  };

  const interests = [
    "Waste Collection",
    "Recycling",
    "Community Engagement",
    "Education",
    "Research",
    "Event Organization",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Join Our NGO Community
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Make a difference in waste management
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <div className="relative">
                <User
                  className={`absolute left-3 top-3 h-5 w-5 transition-colors duration-200 
                  ${focused === "name" ? "text-blue-600" : "text-black"}`}
                />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused("")}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent transition-all duration-200 bg-white/10 "
                />
              </div>

              <div className="relative">
                <Mail
                  className={`absolute left-3 top-3 h-5 w-5 transition-colors duration-200 
                  ${focused === "email" ? "text-blue-600" : "text-gray-400"}`}
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent transition-all duration-200 bg-white/10 "
                />
              </div>

              <div className="relative">
                <Phone
                  className={`absolute left-3 top-3 h-5 w-5 transition-colors duration-200 
                  ${focused === "phone" ? "text-blue-600" : "text-gray-400"}`}
                />
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onFocus={() => setFocused("phone")}
                  onBlur={() => setFocused("")}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent transition-all duration-200 bg-white/10 "
                />
              </div>
            </div>

            {/* Areas of Interest Section */}
            <div className="space-y-2">
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-pink-500" />
                Areas of Interest
              </label>
              <div className="grid grid-cols-2 gap-3">
                {interests.map((interest) => (
                  <label
                    key={interest}
                    className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 
                      hover:border-blue-500 cursor-pointer transition-all duration-200 bg-white/10 "
                  >
                    <input
                      type="checkbox"
                      name="interests"
                      value={interest}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability Section */}
            <div className="relative">
              <Clock
                className={`absolute left-3 top-3 h-5 w-5 transition-colors duration-200 
                ${
                  focused === "availability" ? "text-blue-600" : "text-gray-400"
                }`}
              />
              <select
                name="availability"
                required
                value={formData.availability}
                onChange={handleInputChange}
                onFocus={() => setFocused("availability")}
                onBlur={() => setFocused("")}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 
                  focus:border-transparent transition-all duration-200 bg-white/10 appearance-none"
              >
                <option value="">Select Your Availability</option>
                <option value="weekdays">Weekdays</option>
                <option value="weekends">Weekends</option>
                <option value="both">Both Weekdays and Weekends</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            {/* Experience & Message Section */}
            <div className="relative">
              <MessageSquare
                className={`absolute left-3 top-3 h-5 w-5 transition-colors duration-200 
                ${focused === "message" ? "text-blue-600" : "text-gray-400"}`}
              />
              <textarea
                name="message"
                placeholder="Tell us about your experience and why you'd like to join..."
                value={formData.message}
                onChange={handleInputChange}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused("")}
                rows="4"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 
                  focus:border-transparent transition-all duration-200 bg-white/10 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitted}
              className={`w-full py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2
                ${
                  submitted
                    ? "bg-green-500 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                }`}
            >
              {submitted ? (
                <>
                  <span>Request Sent!</span>
                  <Check className="h-5 w-5" />
                </>
              ) : (
                <>
                  <span>Send Request</span>
                  <Send className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StylishJoinRequest;
