import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PenLine,
  Image as ImageIcon,
  FileText,
  Settings,
  Upload,
  Link as LinkIcon,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const BlogCreateForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    content: "",
    category: "",
    thumbnail: null,
    thumbnailUrl: "",
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        thumbnail: file,
        thumbnailUrl: "",
      }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleThumbnailUrlChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      thumbnailUrl: value,
      thumbnail: null,
    }));
    setPreviewUrl(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "thumbnail" && formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    if (formData.thumbnail) {
      formDataToSend.append("thumbnail", formData.thumbnail);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/blogs/create",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSubmitStatus({
        type: "success",
        message: "Blog post created successfully!",
      });
      setFormData({
        title: "",
        author: "",
        description: "",
        content: "",
        category: "",
        thumbnail: null,
        thumbnailUrl: "",
      });
      setPreviewUrl(null);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to create blog post. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Blog Post
          </h1>
          <p className="text-gray-600 mb-8">
            Share your thoughts and ideas with the world
          </p>

          {submitStatus && (
            <Alert
              className={`mb-6 ${
                submitStatus.type === "success" ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <AlertDescription>{submitStatus.message}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="content" className="space-y-6">
              <TabsList className="grid grid-cols-3 gap-4 bg-gray-100 p-1">
                <TabsTrigger
                  value="content"
                  className="flex items-center gap-2"
                >
                  <PenLine className="w-4 h-4" /> Content
                </TabsTrigger>
                <TabsTrigger value="media" className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Media
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" /> Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Blog Title</Label>
                        <Input
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="Enter an engaging title"
                          className="text-lg"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Brief description of your blog post"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <div className="border rounded-md">
                          <ReactQuill
                            theme="snow"
                            value={formData.content}
                            onChange={handleContentChange}
                            modules={{ toolbar: toolbarOptions }}
                            className="min-h-[300px]"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="media" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid gap-6">
                      <div className="space-y-4">
                        <Label>Thumbnail Image</Label>
                        <div className="grid gap-4">
                          <div className="border-2 border-dashed rounded-lg p-6 text-center">
                            {previewUrl ? (
                              <div className="relative">
                                <img
                                  src={previewUrl}
                                  alt="Preview"
                                  className="max-h-48 mx-auto rounded"
                                />
                                <Button
                                  type="button"
                                  variant="secondary"
                                  size="sm"
                                  className="mt-2"
                                  onClick={() => {
                                    setPreviewUrl(null);
                                    setFormData((prev) => ({
                                      ...prev,
                                      thumbnail: null,
                                      thumbnailUrl: "",
                                    }));
                                  }}
                                >
                                  Remove
                                </Button>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <div className="flex justify-center">
                                  <Upload className="h-12 w-12 text-gray-400" />
                                </div>
                                <div className="space-y-2">
                                  <Label
                                    htmlFor="thumbnail"
                                    className="cursor-pointer"
                                  >
                                    <span className="text-blue-600 hover:text-blue-700">
                                      Click to upload
                                    </span>
                                    <Input
                                      id="thumbnail"
                                      type="file"
                                      className="hidden"
                                      onChange={handleImageChange}
                                      accept="image/*"
                                      disabled={!!formData.thumbnailUrl}
                                    />
                                  </Label>
                                  <p className="text-sm text-gray-500">
                                    or drag and drop
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                              <LinkIcon className="w-4 h-4" /> Or use image URL
                            </Label>
                            <Input
                              type="text"
                              value={formData.thumbnailUrl}
                              onChange={handleThumbnailUrlChange}
                              placeholder="https://example.com/image.jpg"
                              disabled={!!formData.thumbnail}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="author">Author</Label>
                        <Input
                          id="author"
                          name="author"
                          value={formData.author}
                          onChange={handleInputChange}
                          placeholder="Author name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              category: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Waste Management">
                              Waste Management
                            </SelectItem>
                            <SelectItem value="Recycling">Recycling</SelectItem>
                            <SelectItem value="Environmental">
                              Environmental
                            </SelectItem>
                            <SelectItem value="Sustainability">
                              Sustainability
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-end gap-4">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? "Publishing..." : "Publish Post"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogCreateForm;
