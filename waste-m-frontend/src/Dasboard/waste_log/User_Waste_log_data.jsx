import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import {
  AlertCircle,
  Calendar,
  Clock,
  MapPin,
  Package,
  Phone,
  Scale,
  Trash2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WasteLogProfile = () => {
  const [wasteLogs, setWasteLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    const fetchWasteLogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/waste-logs",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setWasteLogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching waste logs:", error); // Log error for debugging
        setError("Could not fetch waste logs");
        setLoading(false);
      }
    };

    fetchWasteLogs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="w-16 h-16 border-4 border-t-teal-500 border-teal-200 rounded-full animate-spin"
          aria-live="polite"
        ></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const getUrgencyColor = (level) => {
    const colors = {
      High: "text-red-500 bg-red-50",
      Medium: "text-yellow-500 bg-yellow-50",
      Low: "text-green-500 bg-green-50",
    };
    return colors[level] || "text-gray-500 bg-gray-50";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-600 mb-2">
            Waste Log Dashboard
          </h1>
          <p className="text-gray-600">
            Track and manage your waste disposal records
          </p>
        </div>

        {wasteLogs.length === 0 ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="flex flex-col items-center justify-center p-8">
              <Trash2 className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg">No waste logs found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wasteLogs.map((log) => (
              <Card
                key={log._id}
                className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() =>
                  setSelectedLog(selectedLog?._id === log._id ? null : log)
                }
                role="button" // Added for accessibility
                tabIndex={0} // Added for accessibility
              >
                <CardHeader className="pb-4">
                  <CardTitle className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-teal-700 truncate">
                      Log #{log._id.slice(-6)}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(
                        log.urgencyLevel
                      )}`}
                    >
                      {log.urgencyLevel}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Package className="h-4 w-4" />
                    <span className="font-medium">Types:</span>
                    <span className="flex flex-wrap gap-1">
                      {log.wasteTypes.map((type, index) => (
                        <span
                          key={index}
                          className="bg-teal-50 text-teal-700 px-2 py-1 rounded-full text-sm"
                        >
                          {type}
                        </span>
                      ))}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Scale className="h-4 w-4" />
                    <span className="font-medium">Weight:</span>
                    <span>{log.weight} kg</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">Location:</span>
                    <span className="truncate">{log.location.address}</span>
                  </div>

                  {selectedLog?._id === log._id && (
                    <div className="mt-4 space-y-4 border-t pt-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span className="font-medium">Contact:</span>
                        <span>{log.contactNumber}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">Pickup:</span>
                        <span>{log.preferredPickupTime}</span>
                      </div>

                      <div className="space-y-2">
                        <span className="font-medium text-gray-600">
                          Description:
                        </span>
                        <p className="text-gray-600 text-sm">
                          {log.description}
                        </p>
                      </div>

                      {log.image && (
                        <img
                          src={`http://localhost:5000/${log.image}`}
                          alt="Waste"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WasteLogProfile;
