import React from "react";
import LandingPage from "../LandingPageCom/LandingPage";
import PlantLoading from "../components/loding_ani/plant_loading_ani";
import WorkerDashboard from "@/Worker_Dashboard/Home_das";
import Loader from "@/Loaders/gloabspin";
import WasteManagementBot from "@/ChatBot/Chatbot";
import TeamJoin from "@/Team_formation/Teamjoin";
import WasteManagementSection from "@/LandingPageCom/Worker_PageSection";

function Home() {
  return (
    <div>
      <LandingPage />

      {/* <Loader /> */}
      <WasteManagementBot />
      {/* <WorkerDashboard /> */}
    </div>
  );
}

export default Home;
