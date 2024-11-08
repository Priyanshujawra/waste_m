import React, { useEffect, useState } from "react";
import {
  Search,
  Send,
  Image as ImageIcon,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import CreateFeed from "./Create_feeds";
import styles from "./feedstyle.module.css";
const UsersFeed = () => {
  const [feeds, setFeeds] = useState([]);
  const [newComment, setNewComment] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({ content: "", image: null });
  const [filteredFeeds, setFilteredFeeds] = useState([]);

  // Fetch feeds from the backend
  const fetchFeeds = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/feeds");
      const data = await response.json();
      setFeeds(data.feeds);
      setFilteredFeeds(data.feeds);
    } catch (error) {
      console.error("Error fetching feeds:", error);
    }
  };

  // Handle search
  useEffect(() => {
    const filtered = feeds.filter(
      (feed) =>
        feed.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feed.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFeeds(filtered);
  }, [searchQuery, feeds]);

  // Handle like functionality
  const handleLike = async (feedId) => {
    try {
      await fetch(`http://localhost:5000/api/feeds/${feedId}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchFeeds();
    } catch (error) {
      console.error("Error liking feed:", error);
    }
  };

  // Handle creating a new post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", newPost.content);
    if (newPost.image) {
      formData.append("image", newPost.image);
    }

    try {
      await fetch("http://localhost:5000/api/feeds", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      setNewPost({ content: "", image: null });
      setShowCreatePost(false);
      fetchFeeds();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Handle adding a comment
  const handleComment = async (feedId) => {
    try {
      await fetch(`http://localhost:5000/api/feeds/${feedId}/comment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newComment[feedId] }),
      });
      setNewComment((prev) => ({ ...prev, [feedId]: "" }));
      fetchFeeds();
    } catch (error) {
      console.error("Error commenting on feed:", error);
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 bg-white shadow-md p-4 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Social Feed</h1>
          <div className="relative flex-1 mx-8">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowCreatePost(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            Create Post
          </button>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-5xl">
            <CreateFeed />
            <button
              type="button"
              onClick={() => setShowCreatePost(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Feeds Container */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="space-y-6">
          {filteredFeeds.map((feed) => (
            <div
              key={feed._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Post Header */}
              <div className="p-4 flex items-center justify-between border-b">
                <div className="flex items-center space-x-3">
                  <img
                    src={`http://localhost:5000/${feed.user.profileImage}`}
                    alt="profile"
                    className="w-12 h-12 rounded-full border-2 border-gray-200"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {feed.user.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{feed.user.location || "Location"}</span>
                      <span className="mx-2">•</span>
                      <span>
                        {new Date(feed.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="h-6 w-6" />
                </button>
              </div>

              {/* Post Content */}
              <div className="p-4">
                <p className="text-gray-800 whitespace-pre-wrap">
                  <div
                    className={styles.preview}
                    dangerouslySetInnerHTML={{ __html: feed.content }}
                  />
                </p>
              </div>

              {/* Post Image */}
              {feed.image && (
                <div className="px-4">
                  <img
                    src={`http://localhost:5000/${feed.image}`}
                    alt="post"
                    className="rounded-lg w-full object-cover max-h-96"
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="p-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(feed._id)}
                      className="flex items-center space-x-1 text-gray-500 hover:text-red-500"
                    >
                      <Heart className="h-5 w-5" />
                      <span>{feed.likes.length}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                      <MessageCircle className="h-5 w-5" />
                      <span>{feed.comments.length}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="mt-4 space-y-2">
                  {feed.comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="flex items-start space-x-2"
                    >
                      <img
                        src={`http://localhost:5000/${comment.user.profileImage}`}
                        alt="profile"
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1 bg-gray-50 rounded-lg p-2">
                        <span className="font-medium text-gray-800">
                          {comment.user.name}
                        </span>
                        <p className="text-gray-600">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Comment Input */}
                <div className="mt-4 flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 bg-gray-50 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={newComment[feed._id] || ""}
                    onChange={(e) =>
                      setNewComment((prev) => ({
                        ...prev,
                        [feed._id]: e.target.value,
                      }))
                    }
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleComment(feed._id);
                      }
                    }}
                  />
                  <button
                    onClick={() => handleComment(feed._id)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersFeed;
