// components/App.js
import { Outlet } from "react-router-dom";
import Sidebar from "../Dasboard/Sidebar";
import Das_Navbar from "../Dasboard/Das_nav";
// import PostView from "./second";
// import SidebarRight from "./third";

function Home2() {
  return (
    <div className="flex">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content (Feed and Posts) */}
      <div className=" h-screen w-full overflow-y-scroll bg-gray-100 p-2">
        <div className="max-w-7xl mx-auto">
          <Das_Navbar />
          <Outlet />
        </div>
      </div>

      {/* Right Sidebar */}
      {/* <SidebarRight /> */}
    </div>
  );
}

export default Home2;
