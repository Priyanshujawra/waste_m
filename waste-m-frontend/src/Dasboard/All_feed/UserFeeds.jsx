import React, { useEffect, useState } from "react";
import { FavoriteBorder, Comment, Share, MoreHoriz } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import CreateFeed from "./Create_feeds"; // Import the CreateFeed component

const UsersFeed = () => {
  const [feeds, setFeeds] = useState([]);
  const [newComment, setNewComment] = useState({});

  // Fetch feeds from the backend
  const fetchFeeds = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/feeds");
      setFeeds(response.data.feeds);
    } catch (error) {
      console.error("Error fetching feeds:", error);
    }
  };

  // Handle like functionality
  const handleLike = async (feedId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/feeds/${feedId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your token here
          },
        }
      );
      fetchFeeds(); // Refresh feeds after liking
    } catch (error) {
      console.error("Error liking feed:", error);
    }
  };

  // Handle adding a comment
  const handleComment = async (feedId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/feeds/${feedId}/comment`,
        { content: newComment[feedId] },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your token here
          },
        }
      );
      setNewComment((prev) => ({ ...prev, [feedId]: "" })); // Clear the input
      fetchFeeds(); // Refresh feeds after commenting
    } catch (error) {
      console.error("Error commenting on feed:", error);
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return (
    <div className="flex flex-col space-y-8 p-6 bg-gray-50">
      <CreateFeed /> {/* Add the CreateFeed component */}
      {feeds.map((feed) => (
        <div key={feed._id} className="bg-white p-6 rounded-2xl shadow-md">
          {/* Post Header */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-4 items-center">
              <img
                src={`http://localhost:5000/${feed.user.profileImage}`}
                alt="profile"
                className="rounded-full w-12 h-12"
              />
              <div>
                <h3 className="font-bold text-lg">{feed.user.name}</h3>
                <span className="text-sm text-gray-500">
                  {feed.user.location || "Location"}
                </span>
                <span className="text-xs text-gray-400 block">
                  {new Date(feed.createdAt).toLocaleDateString()}{" "}
                  {/* Format date */}
                </span>
              </div>
            </div>
            <IconButton>
              <MoreHoriz />
            </IconButton>
          </div>

          {/* Post Content */}
          <p className="mt-4 text-gray-700 leading-relaxed">{feed.content}</p>

          {/* Post Images */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <img
              src={`http://localhost:5000/${feed.image}` || "jlgyug"}
              alt="post"
              className="rounded-lg object-cover shadow-md"
            />
          </div>

          {/* Post Footer */}
          <div className="flex justify-between items-center mt-6 text-gray-600">
            <div className="flex space-x-6">
              <IconButton onClick={() => handleLike(feed._id)}>
                <FavoriteBorder className="hover:text-red-500" />
              </IconButton>
              <IconButton onClick={() => handleComment(feed._id)}>
                <Comment className="hover:text-blue-500" />
              </IconButton>
              <IconButton>
                <Share className="hover:text-green-500" />
              </IconButton>
            </div>
            <span className="text-sm">{feed.likes.length} likes</span>
          </div>

          {/* Comment Input */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-400 shadow-sm"
              value={newComment[feed._id] || ""}
              onChange={(e) =>
                setNewComment({ ...newComment, [feed._id]: e.target.value })
              }
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleComment(feed._id);
                }
              }}
            />
          </div>

          {/* Display Comments */}
          {feed.comments.map((comment) => (
            <div key={comment._id} className="mt-2 text-gray-600">
              <strong>{comment.user.name}</strong>: {comment.content}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default UsersFeed;
