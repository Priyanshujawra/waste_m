import React from "react";
import Slider from "react-slick";
import { blogs } from "./data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BlogCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  // Slice the blogs array to show only the first 3 blogs
  const displayedBlogs = blogs.slice(0, 3);

  return (
    <Slider {...settings} className="w-full mt-2">
      {displayedBlogs.map((blog, index) => (
        <div key={index} className="relative">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-[30rem] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/30 text-white">
            <h2 className="text-3xl font-bold">{blog.title}</h2>
            <p className="mt-2">{blog.content}</p>
            <div className="flex items-center mt-2">
              {/* Display author image */}
              <img
                src={blog.authorImage}
                alt={blog.author}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-sm mr-4">{blog.author}</span>
              <span className="text-sm">
                {blog.date} | {blog.readTime}
              </span>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default BlogCarousel;
