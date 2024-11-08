import React from "react";
import Navbar from "./Navbar/Navbar"; // Importing the Navbar component
import { Link } from "react-router-dom";
import HeroSection from "./Hero_Section";
import ImpactSection from "./OverImpactPage";
import IndustrySolutions from "./Industry_solution";
import ProcessFlow from "./Recycleing_approch";
import ZeroWasteFooter from "./Footer";
import TeamSection from "./TeamsEction";
import WasteManagementSection from "./Worker_PageSection";
import Wasteimage from "./Wasteimage";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar /> {/* Navbar component */}
      <HeroSection />
      <ImpactSection />
      <Wasteimage />
      <TeamSection />
      <IndustrySolutions />
      <WasteManagementSection />
      <ProcessFlow />
      <ZeroWasteFooter />
    </div>
  );
};

export default LandingPage;
