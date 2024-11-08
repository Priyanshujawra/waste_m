// WasteManagementPage.js
import React from "react";
import { Button, TextField } from "@mui/material";
// import { FaPhoneAlt } from "react-icons/fa";

const WasteManagementPage = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Header Section */}
      <header className="bg-green-900 text-white p-6 flex flex-col md:flex-row items-center justify-between">
        <div className="text-3xl font-bold">Waste Management</div>
        <nav className="flex space-x-6 mt-4 md:mt-0">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/services" className="hover:underline">
            Services
          </a>
          <a href="/projects" className="hover:underline">
            Projects
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </nav>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <span>(239) 543-217-0108</span>
          <Button variant="contained" color="success" className="ml-4">
            Request a Pickup
          </Button>
        </div>
      </header>

      {/* Banner Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat h-64 flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/random?recycling')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded">
          <h2 className="text-4xl font-bold">Our Services</h2>
          <p>Home &gt; Our Services</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="text-center p-10 bg-gray-100">
        <h3 className="text-green-600 text-xl font-semibold">
          Features Services
        </h3>
        <h2 className="text-4xl font-bold mb-10">
          A wide range of waste disposal services
        </h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
          {[
            { title: "Garbage Pickup", icon: "🗑️" },
            { title: "Dumpster Rental", icon: "🚛" },
            { title: "Waste Collection", icon: "♻️" },
            { title: "Recycling Services", icon: "🔄" },
            { title: "Bulk Waste", icon: "🗃️" },
            { title: "Organic Waste", icon: "🌿" },
          ].map((service, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded shadow-lg hover:shadow-2xl transition"
            >
              <div className="text-4xl mb-4 text-green-600">{service.icon}</div>
              <h4 className="text-2xl font-semibold">{service.title}</h4>
              <p className="text-gray-600 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <Button
                size="small"
                variant="text"
                color="success"
                className="mt-4"
              >
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-green-900 text-white p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Waste Management</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam.
            </p>
          </div>
          {/* Links */}
          <div>
            <h4 className="font-semibold mb-2">Links</h4>
            <ul className="space-y-1">
              <li>
                <a href="/" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a href="/projects" className="hover:underline">
                  Projects
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-2">Get In Touch</h4>
            <p className="mb-1">Address: New Hyde Park, NY 11040</p>
            <p className="mb-1">Email: example@info.com</p>
            <p>Phone: 333-666-0000</p>
            <div className="flex space-x-4 mt-4">
              {/* Social Icons */}
              <a href="#">
                <span className="text-2xl">🌐</span>
              </a>
              <a href="#">
                <span className="text-2xl">🐦</span>
              </a>
              <a href="#">
                <span className="text-2xl">📸</span>
              </a>
              <a href="#">
                <span className="text-2xl">💼</span>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <TextField
            label="Subscribe now"
            variant="outlined"
            color="success"
            size="small"
            className="bg-white rounded"
          />
          <Button variant="contained" color="success" className="ml-4">
            Subscribe
          </Button>
        </div>
        <p className="text-center mt-8 text-sm">
          &copy; 2023 Waste Management. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default WasteManagementPage;
