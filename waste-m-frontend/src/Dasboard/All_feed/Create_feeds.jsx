import React, { useState, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import { Image, Loader2, X, ImagePlus, Send, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CreateFeed = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "clean"],
    ],
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://localhost:5000/api/feeds", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setContent("");
      setImage(null);
      setImagePreview(null);
      // Using the Alert component instead of default alert
    } catch (err) {
      setError("Error creating feed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          Create a New Post
          <span className="ml-2 text-blue-200 text-sm font-normal">
            Share your eco-impact
          </span>
        </h2>
      </div>

      {error && (
        <Alert variant="destructive" className="mx-6 mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="p-6">
        {/* Rich Text Editor */}
        <div className="mb-6">
          <div className="border rounded-2xl overflow-hidden shadow-sm">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              placeholder="Share your environmental journey..."
              className="h-40"
            />
          </div>
        </div>

        {/* Image Preview Section */}
        {imagePreview && (
          <div className="mb-6 relative">
            <div className="relative group rounded-2xl overflow-hidden border border-gray-200">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-90 hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Actions Section */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              ref={fileInputRef}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center px-4 py-2 text-gray-600 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
            >
              <ImagePlus className="h-5 w-5 mr-2" />
              Add Image
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200 ${
              loading
                ? "opacity-75 cursor-not-allowed"
                : "hover:translate-y-[-1px]"
            }`}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            ) : (
              <Send className="h-5 w-5 mr-2" />
            )}
            {loading ? "Posting..." : "Post Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFeed;
