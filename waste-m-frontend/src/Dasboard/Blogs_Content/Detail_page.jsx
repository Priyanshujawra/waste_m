import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import styles from "./MyComponent.module.css";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Clock,
  User,
  Tag,
  ThumbsUp,
  ThumbsDown,
  Send,
  ChevronRight,
} from "lucide-react";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [blogPost, setBlogPost] = useState(null); // State to hold the blog post details

  useEffect(() => {
    // Fetch blog post details by ID
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/blogs/blogs/${id}`
        ); // Update the URL as needed
        const data = await response.json();
        setBlogPost(data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };

    fetchBlogPost();
  }, [id]);

  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Alex Morgan",
      avatar: "/api/placeholder/40/40",
      content:
        "This is such an insightful article! I especially loved the part about AI-powered development tools.",
      likes: 12,
      timestamp: "2 hours ago",
      replies: [],
    },
    {
      id: 2,
      author: "Jamie Chen",
      avatar: "/api/placeholder/40/40",
      content:
        "Great overview of the current trends. Would love to see more detailed examples in future articles.",
      likes: 8,
      timestamp: "5 hours ago",
      replies: [
        {
          id: 3,
          author: "Sarah Johnson",
          avatar: "/api/placeholder/40/40",
          content:
            "Thanks Jamie! I'll definitely include more examples in my next article.",
          likes: 4,
          timestamp: "3 hours ago",
        },
      ],
    },
  ]);

  const relatedPosts = [
    {
      title: "10 Must-Know JavaScript Features for 2024",
      image: "/api/placeholder/100/100",
      category: "JavaScript",
      readTime: "4 min",
    },
    {
      title: "Building Scalable React Applications",
      image: "/api/placeholder/100/100",
      category: "React",
      readTime: "6 min",
    },
    {
      title: "The Complete Guide to CSS Grid",
      image: "/api/placeholder/100/100",
      category: "CSS",
      readTime: "8 min",
    },
  ];

  const handleComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: "Guest User",
        avatar: "/api/placeholder/40/40",
        content: commentText,
        likes: 0,
        timestamp: "Just now",
        replies: [],
      };
      setComments([newComment, ...comments]);
      setCommentText("");
    }
  };
  if (!blogPost) {
    return <div>Loading...</div>; // Show loading state while fetching
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <img
          src={`http://localhost:5000/${blogPost.thumbnail}`}
          alt="Blog Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center space-x-4 mb-4">
              <span className="px-3 py-1 bg-purple-500 rounded-full text-sm font-medium hover:bg-purple-600 transition-colors cursor-pointer">
                {blogPost.category}
              </span>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>5 min read</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 hover:text-purple-200 transition-colors">
              {blogPost.title}
            </h1>
            <div className="flex items-center space-x-4">
              <img
                src={`http://localhost:5000/${blogPost.user?.profileImage}`}
                alt="Author"
                className="w-10 h-10 rounded-full ring-2 ring-purple-300 hover:ring-purple-400 transition-colors"
              />
              <div>
                <p className="font-medium hover:text-purple-200 transition-colors cursor-pointer">
                  {blogPost.user?.name || "Anonymous"}
                </p>
                <p className="text-sm opacity-80">
                  Posted on {blogPost.readTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Social Share Sidebar */}
          <div className="hidden lg:flex flex-col items-center space-y-6 sticky top-8 h-fit">
            <button
              className={`p-3 rounded-full shadow-lg transition-all transform hover:scale-110 ${
                isLiked
                  ? "bg-purple-500 text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`} />
            </button>
            <button className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all transform hover:scale-110">
              <MessageCircle className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all transform hover:scale-110">
              <Share2 className="w-6 h-6 text-gray-600" />
            </button>
            <button
              className={`p-3 rounded-full shadow-lg transition-all transform hover:scale-110 ${
                isBookmarked
                  ? "bg-purple-500 text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark
                className={`w-6 h-6 ${isBookmarked ? "fill-current" : ""}`}
              />
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <article className="prose lg:prose-xl">
              <div className="bg-purple-50 rounded-xl p-6 my-8 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
                <blockquote className="text-lg italic text-gray-700">
                  <FormatQuoteIcon />
                  {blogPost.description}
                </blockquote>
              </div>
            </article>
            <div
              className={styles.preview}
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />

            {/* Tags Section */}
            <div className="mt-12 pt-6 border-t">
              <div className="flex items-center flex-wrap gap-2">
                <Tag className="w-4 h-4 text-purple-600" />
                {["WebDev", "Technology", "Future", "Trends"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-4">
                <img
                  src="/api/placeholder/80/80"
                  alt="Author"
                  className="w-20 h-20 rounded-full ring-4 ring-purple-100"
                />
                <div>
                  <h3 className="text-xl font-bold text-purple-800">
                    Sarah Johnson
                  </h3>
                  <p className="text-purple-600">Senior Tech Writer</p>
                  <p className="mt-2">
                    Sarah has been covering technology trends for over a decade,
                    with a focus on web development and emerging technologies.
                  </p>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4 text-purple-800">
                Comments
              </h3>
              {comments.map((comment) => (
                <div key={comment.id} className="mb-6">
                  <div className="flex space-x-4">
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-bold">{comment.author}</p>
                      <p className="text-sm text-gray-500">
                        {comment.timestamp}
                      </p>
                      <p className="mt-2">{comment.content}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <ThumbsUp className="w-4 h-4 text-purple-500" />
                        <span>{comment.likes}</span>
                        <ThumbsDown className="w-4 h-4 text-gray-500" />
                        <MessageCircle className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Comment Input */}
              <div className="mt-6 flex space-x-4">
                <img
                  src="/api/placeholder/40/40"
                  alt="Your Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-full focus:ring focus:ring-purple-100 outline-none"
                />
                <button
                  onClick={handleComment}
                  className="text-purple-500 hover:text-purple-600"
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Related Posts Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            <h3 className="text-xl font-bold mb-4 text-purple-800">
              Related Posts
            </h3>
            {relatedPosts.map((post, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="font-bold text-purple-800 hover:text-purple-600 transition-colors cursor-pointer">
                    {post.title}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Tag className="w-4 h-4 text-purple-600 mr-1" />
                    <span>{post.category}</span>
                    <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                    <Clock className="w-4 h-4 text-purple-600 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
