import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const blogsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/blogs/blogs`,
          {
            params: { page, limit: blogsPerPage },
          }
        );
        setBlogs(response.data.blogs);
        setTotalBlogs(response.data.totalBlogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, [page]);

  const getCategoryColor = (category) => {
    const colors = {
      Travel: "bg-blue-100 text-blue-800",
      Food: "bg-green-100 text-green-800",
      Lifestyle: "bg-purple-100 text-purple-800",
      Technology: "bg-yellow-100 text-yellow-800",
      default: "bg-gray-100 text-gray-800",
    };
    return colors[category] || colors.default;
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            onClick={() => navigate(`/blogs/${blog._id}`)}
          >
            <Card className="h-full flex flex-col overflow-hidden">
              <div className="relative overflow-hidden group">
                <img
                  src={`http://localhost:5000/${blog.thumbnail}`}
                  alt={blog.title}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
              </div>

              <CardHeader className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Badge
                    variant="secondary"
                    className={getCategoryColor(blog.category)}
                  >
                    {blog.category}
                  </Badge>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {blog.readTime}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                  {blog.title}
                </h3>
              </CardHeader>

              <CardContent className="p-4 flex-grow">
                <p className="text-gray-600 line-clamp-3">{blog.description}</p>
              </CardContent>

              <CardFooter className="p-4 border-t">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center space-x-2">
                    <img
                      src={`http://localhost:5000/${blog.user?.profileImage}`}
                      alt="Author"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-gray-700">
                      {blog.user?.name || "Anonymous"}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/blogs/${blog._id}`);
                    }}
                  >
                    Read More →
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      {/* Custom Pagination */}
      <div className="flex justify-center items-center mt-12 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Previous
        </Button>
        <div className="flex items-center space-x-2">
          {Array.from({ length: Math.ceil(totalBlogs / blogsPerPage) }).map(
            (_, idx) => (
              <Button
                key={idx}
                variant={page === idx + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setPage(idx + 1)}
                className="w-8 h-8 p-0"
              >
                {idx + 1}
              </Button>
            )
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setPage((p) =>
              Math.min(Math.ceil(totalBlogs / blogsPerPage), p + 1)
            )
          }
          disabled={page === Math.ceil(totalBlogs / blogsPerPage)}
          className="flex items-center"
        >
          Next <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default BlogList;
