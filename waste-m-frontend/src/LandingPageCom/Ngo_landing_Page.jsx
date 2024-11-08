import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Facebook, Instagram, Youtube } from "lucide-react";
import NGOEventsSection from "@/Dasboard/Ngo_Collab/Ngo_events";
import NGOPlatform from "@/Dasboard/Ngo_Collab/Ngo_Groups";

const NgoLandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-bold">EcoUnite</div>
        <div className="flex gap-8">
          <a href="#about" className="hover:text-green-700">
            About Us
          </a>
          <a href="#campaigns" className="hover:text-green-700">
            Campaigns
          </a>
          <a href="#contact" className="hover:text-green-700">
            Contact Us
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="grid grid-cols-2 gap-12 max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-serif font-bold mb-6">
            Every Act of Recycling Makes Our Earth Greener
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Join over 25,000 eco-warriors in our mission to create a sustainable
            future through community-driven waste management initiatives.
          </p>
          <div className="flex gap-4 mb-12">
            <Button className="bg-green-700 hover:bg-green-800 text-white px-8 py-6 text-lg">
              Donate Now
            </Button>
            <Button variant="outline" className="px-8 py-6 text-lg">
              Join Movement
            </Button>
          </div>
          <div className="flex gap-6">
            <Youtube className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
            <Facebook className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
            <Instagram className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-6 -right-6 w-4/5 h-4/5 bg-yellow-300 rounded-3xl" />
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/team-discussion-about-business-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--meeting-teamwork-group-communication-product-teams-pack-illustrations-6723339.png"
            alt="Community cleaning activity"
            className="w-4/5 h-4/5 object-cover rounded-3xl relative z-10"
          />
        </div>
      </div>
      <NGOPlatform />
      {/* Stats Section */}
      <div className="bg-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8 px-6">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">985+</div>
            <div className="text-sm">Communities Reached</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">$10M</div>
            <div className="text-sm">Funds Raised</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">12+</div>
            <div className="text-sm">Active Campaigns</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">60M</div>
            <div className="text-sm">KG Waste Recycled</div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <NGOEventsSection />

      {/* CTA Section */}
      <div className="bg-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">
            Let's Help Others With Your Support
          </h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join our community of change-makers and help create a sustainable
            future for generations to come.
          </p>
          <Button className="bg-yellow-400 text-green-900 hover:bg-yellow-500 px-8 py-6 text-lg">
            Get Started
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="text-2xl font-bold mb-4">EcoUnite</div>
            <p className="text-gray-600 mb-4 max-w-md">
              Building a sustainable future through community-driven waste
              management initiatives.
            </p>
          </div>
          <div>
            <div className="font-medium mb-4">Quick Links</div>
            <div className="space-y-2 text-gray-600">
              <div>About Us</div>
              <div>Campaigns</div>
              <div>Contact</div>
              <div>Donate</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-4">Newsletter</div>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 border border-gray-300 rounded-l-lg flex-1"
              />
              <Button className="bg-green-700 rounded-l-none">Subscribe</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NgoLandingPage;
