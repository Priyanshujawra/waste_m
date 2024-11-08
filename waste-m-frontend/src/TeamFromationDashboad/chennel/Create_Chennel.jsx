import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Plus, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthContext } from "../../contexts/AuthContext"; // Assuming you have an AuthContext

const ChannelCreationForm = (props) => {
  const { user } = useContext(AuthContext); // Assuming user info is stored in AuthContext
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [channelData, setChannelData] = useState({
    name: "",
    description: "",
    teamId: props.teamId,
    type: "public",
    teamMembers: [], // This can be populated via API if required
    allowedFileTypes: ["video", "document"],
    maxFileSize: "100",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, type, teamId } = channelData;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/channel/create",
        {
          name,
          description,
          type,
          teamId,
          userId: user._id, // Sending the userId from context
        }
      );

      if (response.status === 201) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        // Reset form or handle post-submission state here
      }
    } catch (error) {
      console.error("Error creating channel:", error);
      // Handle error (e.g., show error alert)
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Channel Name *</label>
        <input
          type="text"
          className="w-full p-2 border rounded-lg"
          placeholder="Enter channel name"
          value={channelData.name}
          onChange={(e) =>
            setChannelData({ ...channelData, name: e.target.value })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description *</label>
        <textarea
          className="w-full p-2 border rounded-lg h-32"
          placeholder="Describe the purpose of this channel"
          value={channelData.description}
          onChange={(e) =>
            setChannelData({ ...channelData, description: e.target.value })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Channel Type *</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="type"
              value="public"
              checked={channelData.type === "public"}
              onChange={(e) =>
                setChannelData({ ...channelData, type: e.target.value })
              }
              className="mr-2"
            />
            Public
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="type"
              value="private"
              checked={channelData.type === "private"}
              onChange={(e) =>
                setChannelData({ ...channelData, type: e.target.value })
              }
              className="mr-2"
            />
            Private
          </label>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Channel Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Basic Information</h4>
              <p className="text-sm text-gray-600">Name: {channelData.name}</p>
              <p className="text-sm text-gray-600">Type: {channelData.type}</p>
            </div>

            <div>
              <h4 className="font-medium">Team Members</h4>
              <p className="text-sm text-gray-600">
                {channelData.teamMembers.length} members selected
              </p>
            </div>

            <div>
              <h4 className="font-medium">File Settings</h4>
              <p className="text-sm text-gray-600">
                Allowed types: {channelData.allowedFileTypes.join(", ")}
              </p>
              <p className="text-sm text-gray-600">
                Max file size: {channelData.maxFileSize} MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please review all details before creating the channel. This action
          can't be undone.
        </AlertDescription>
      </Alert>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle size={20} />
          Channel created successfully!
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Create New Channel</CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              Step {step} of 3
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Progress Indicator */}
            <div className="flex items-center mb-8">
              {[1, 2, 3].map((num) => (
                <React.Fragment key={num}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= num ? "bg-blue-600 text-white" : "bg-gray-200"
                    }`}
                  >
                    {num}
                  </div>
                  {num < 3 && (
                    <div
                      className={`flex-1 h-1 ${
                        step > num ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Step Content */}
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ml-auto flex items-center gap-2"
                >
                  <Plus size={18} />
                  Create Channel
                </button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChannelCreationForm;
