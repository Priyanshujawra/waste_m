import React, { useState } from "react";
import {
  FileText,
  Video,
  MapPin,
  Tags,
  Clock,
  Calendar,
  ChevronRight,
  Upload,
  X,
  Check,
  AlertCircle,
  FileType,
  Info,
  Upload as UploadIcon,
  Paperclip,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Timeline Step Component
const TimelineStep = ({
  number,
  title,
  description,
  isActive,
  isCompleted,
}) => (
  <div className="flex flex-col items-center relative">
    <div
      className={`
        w-10 h-10 rounded-full flex items-center justify-center 
        transition-all duration-300 ease-in-out transform
        ${
          isActive
            ? "bg-blue-600 text-white scale-110 shadow-lg"
            : isCompleted
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-gray-500"
        }
      `}
    >
      {isCompleted ? (
        <Check className="w-5 h-5 animate-appear" />
      ) : (
        <span className="font-semibold">{number}</span>
      )}
    </div>
    <div className="mt-3 text-center">
      <h3
        className={`
          font-medium text-sm mb-1 
          ${isActive ? "text-blue-600" : "text-gray-700"}
        `}
      >
        {title}
      </h3>
      <p className="text-xs text-gray-500 max-w-[150px]">{description}</p>
    </div>
  </div>
);

// File Upload Component
const FileUploadBox = ({ accept, onChange, error, type }) => (
  <div className="mt-2">
    <div className="relative">
      <input
        type="file"
        accept={accept}
        onChange={onChange}
        className="hidden"
        id={`file-upload-${type}`}
      />
      <label
        htmlFor={`file-upload-${type}`}
        className={`
          flex flex-col items-center justify-center w-full h-32
          px-4 py-6 border-2 border-dashed rounded-lg
          cursor-pointer bg-gray-50 hover:bg-gray-100
          transition-all duration-300
          ${error ? "border-red-300" : "border-gray-300"}
        `}
      >
        <Upload className="w-8 h-8 mb-2 text-gray-400" />
        <p className="text-sm text-gray-500">
          Click or drag to upload {type} file
        </p>
      </label>
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

// Tag Input Component
const TagInput = ({
  tags,
  onAddTag,
  onRemoveTag,
  currentTag,
  setCurrentTag,
}) => (
  <div className="space-y-2">
    <div className="flex gap-2">
      <input
        type="text"
        className="flex-1 px-4 py-3 rounded-lg border bg-gray-50 focus:bg-white 
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-all duration-300"
        value={currentTag}
        onChange={(e) => setCurrentTag(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && onAddTag()}
        placeholder="Enter tags"
      />
      <button
        type="button"
        onClick={onAddTag}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg 
                   hover:bg-blue-700 transition-colors duration-300
                   focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add
      </button>
    </div>
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 bg-blue-50 rounded-full text-blue-700 
                     flex items-center group hover:bg-blue-100
                     transition-all duration-300"
        >
          <Tags className="w-3 h-3 mr-1" />
          {tag}
          <button
            type="button"
            onClick={() => onRemoveTag(tag)}
            className="ml-2 text-blue-500 hover:text-red-600 
                       group-hover:scale-110 transition-all duration-300"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
    </div>
  </div>
);

// Main Form Component
const ResourceCreationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: "",
    team: "",
    area: "",
    title: "",
    description: "",
    tags: [],
    status: "active",
    author: "",
    duration: "",
    videoFile: null,
    pages: "",
    documentFile: null,
  });
  const [currentTag, setCurrentTag] = useState("");
  const [errors, setErrors] = useState({});

  const teams = [
    "Recycling Unit",
    "Composting Division",
    "Collection Operations",
  ];
  const areas = ["North District", "East Zone", "South District", "West Area"];

  const timeline = [
    {
      number: 1,
      title: "Resource Type",
      description: "Choose document or video",
      icon: FileType,
    },
    {
      number: 2,
      title: "Basic Info",
      description: "Enter resource details",
      icon: Info,
    },
    {
      number: 3,
      title: "Upload",
      description: "Add your content",
      icon: UploadIcon,
    },
  ];

  const validateStep = (currentStep) => {
    const newErrors = {};

    switch (currentStep) {
      case 1:
        if (!formData.type) newErrors.type = "Please select a resource type";
        break;
      case 2:
        if (!formData.team) newErrors.team = "Please select a team";
        if (!formData.area) newErrors.area = "Please select an area";
        if (!formData.title) newErrors.title = "Title is required";
        if (!formData.description)
          newErrors.description = "Description is required";
        break;
      case 3:
        if (formData.type === "video") {
          if (!formData.duration) newErrors.duration = "Duration is required";
          if (!formData.videoFile)
            newErrors.videoFile = "Video file is required";
        } else {
          if (!formData.pages) newErrors.pages = "Number of pages is required";
          if (!formData.documentFile)
            newErrors.documentFile = "Document file is required";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      console.log("Form submitted:", formData);
      setFormData({
        type: "",
        team: "",
        area: "",
        title: "",
        description: "",
        tags: [],
        status: "active",
        author: "",
        duration: "",
        videoFile: null,
        pages: "",
        documentFile: null,
      });
      setStep(1);
    }
  };

  const addTag = () => {
    if (currentTag && !formData.tags.includes(currentTag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <FileType className="w-6 h-6 text-blue-600" />
              Select Resource Type
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  type: "video",
                  icon: Video,
                  title: "Video Resource",
                  description:
                    "Upload training videos, tutorials, or presentations",
                },
                {
                  type: "document",
                  icon: FileText,
                  title: "Document Resource",
                  description: "Upload PDFs, guidelines, or documentation",
                },
              ].map(({ type, icon: Icon, title, description }) => (
                <div
                  key={type}
                  className={`
                    p-6 rounded-xl border-2 cursor-pointer
                    transform transition-all duration-300
                    hover:scale-105 hover:shadow-lg
                    ${
                      formData.type === type
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                    }
                  `}
                  onClick={() => setFormData((prev) => ({ ...prev, type }))}
                >
                  <Icon
                    className={`
                      h-8 w-8 transition-colors duration-300
                      ${
                        formData.type === type
                          ? "text-blue-500"
                          : "text-gray-400"
                      }
                    `}
                  />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-gray-600">{description}</p>
                </div>
              ))}
            </div>
            {errors.type && (
              <Alert className="bg-red-50 text-red-800 border-red-200">
                <AlertCircle className="h-5 w-5" />
                <AlertDescription>{errors.type}</AlertDescription>
              </Alert>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-600" />
              Basic Information
            </h2>
            <div className="grid gap-6">
              {/* Team Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg border bg-gray-50 
                           focus:bg-white focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent transition-colors duration-300"
                  value={formData.team}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, team: e.target.value }))
                  }
                >
                  <option value="">Select Team</option>
                  {teams.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
                {errors.team && (
                  <p className="mt-1 text-sm text-red-600">{errors.team}</p>
                )}
              </div>

              {/* Area Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg border bg-gray-50 
                           focus:bg-white focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent transition-colors duration-300"
                  value={formData.area}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, area: e.target.value }))
                  }
                >
                  <option value="">Select Area</option>
                  {areas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                {errors.area && (
                  <p className="mt-1 text-sm text-red-600">{errors.area}</p>
                )}
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border bg-gray-50 
                           focus:bg-white focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent transition-colors duration-300"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter resource title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg border bg-gray-50 
                           focus:bg-white focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent transition-colors duration-300"
                  rows="4"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Enter resource description"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <TagInput
                  tags={formData.tags}
                  onAddTag={addTag}
                  onRemoveTag={removeTag}
                  currentTag={currentTag}
                  setCurrentTag={setCurrentTag}
                />
              </div>
            </div>
          </div>
        );

      // ... (previous code remains the same until case 3 in renderStep)

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <UploadIcon className="w-6 h-6 text-blue-600" />
              {formData.type === "video"
                ? "Video Resource Details"
                : "Document Resource Details"}
            </h2>
            <div className="grid gap-6">
              {formData.type === "video" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (in minutes)
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border bg-gray-50 
                               focus:bg-white focus:ring-2 focus:ring-blue-500 
                               focus:border-transparent transition-colors duration-300"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          duration: e.target.value,
                        }))
                      }
                      placeholder="Enter video duration"
                    />
                    {errors.duration && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.duration}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video File
                    </label>
                    <FileUploadBox
                      accept="video/*"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          videoFile: e.target.files[0],
                        }))
                      }
                      error={errors.videoFile}
                      type="video"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Pages
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border bg-gray-50 
                               focus:bg-white focus:ring-2 focus:ring-blue-500 
                               focus:border-transparent transition-colors duration-300"
                      value={formData.pages}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          pages: e.target.value,
                        }))
                      }
                      placeholder="Enter number of pages"
                    />
                    {errors.pages && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.pages}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document File
                    </label>
                    <FileUploadBox
                      accept=".pdf,.doc,.docx"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          documentFile: e.target.files[0],
                        }))
                      }
                      error={errors.documentFile}
                      type="document"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 space-y-8">
      {/* Timeline */}
      <div className="mb-12 relative">
        <div className="flex justify-between items-center relative">
          {/* Progress bar */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{
                width: `${((step - 1) / (timeline.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Timeline steps */}
          <div className="flex justify-between w-full relative z-10">
            {timeline.map((t, i) => (
              <TimelineStep
                key={i}
                number={t.number}
                title={t.title}
                description={t.description}
                isActive={step === t.number}
                isCompleted={step > t.number}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Form Card */}
      <Card className="border-t-4 border-t-blue-600 shadow-lg">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {renderStep()}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6 pt-6 border-t border-gray-200">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg 
                           hover:bg-gray-200 transition-all duration-300 
                           flex items-center gap-2 group"
                >
                  <ChevronRight
                    className="w-4 h-4 rotate-180 transform 
                                         group-hover:-translate-x-1 transition-transform"
                  />
                  Back
                </button>
              )}
              <button
                type={step === 3 ? "submit" : "button"}
                onClick={step === 3 ? handleSubmit : handleNext}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg 
                         hover:bg-blue-700 transition-all duration-300 
                         flex items-center gap-2 ml-auto group"
              >
                {step < 3 ? (
                  <>
                    Next
                    <ChevronRight
                      className="w-4 h-4 transform 
                                           group-hover:translate-x-1 transition-transform"
                    />
                  </>
                ) : (
                  <>
                    Submit
                    <Check className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Success Notification - You can add this for form submission feedback */}
      {/* {showSuccess && (
        <Alert className="fixed bottom-4 right-4 bg-green-50 text-green-800 border-green-200">
          <Check className="h-5 w-5" />
          <AlertDescription>Resource created successfully!</AlertDescription>
        </Alert>
      )} */}
    </div>
  );
};

export default ResourceCreationForm;
