import React, { useState } from "react";
import BlogCarousel from "./BlogCarousel";
import BlogList from "./BlogList";
import BlogHeader from "./Navbar_blog";

const BlogPage = () => {
  const [sortOption, setSortOption] = useState("newest");

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };
  return (
    <div>
      <BlogCarousel />
      <BlogHeader sortOption={sortOption} handleSortChange={handleSortChange} />
      <BlogList />
    </div>
  );
};

export default BlogPage;
