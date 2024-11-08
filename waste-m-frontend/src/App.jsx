import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Dashboard from "./Pages/Dasboard_Home";
import AuthProvider from "./contexts/AuthContext";
import Home from "./Pages/Home";
import Signup from "./components/Auth/SignUp";
import UsersFeed from "./Dasboard/All_feed/Users_Feed";
import BlogCreate from "./Dasboard/Blogs_Content/form_Section/Blog_create";
import BlogPage from "./Dasboard/Blogs_Content/Blog_Main";
import UserProfile from "./Dasboard/Profile/Profile_Page";
import CreateFeed from "./Dasboard/All_feed/UserFeeds";
import WasteLogForm from "./Dasboard/waste_log/Waste_log_form";
import { WasteLogProvider } from "./contexts/WasteLogContext";
import PrivateRoute from "./contexts/PrivateRoute_context"; // Import the PrivateRoute component
import TeamCreate from "./Team_formation/Team_Create";
import Error404TV from "./components/pageNotFound/Page404";
import RecyclingGuide from "./Dasboard/Recycle_reco/Recycle_reco_page";
import WasteManagementPage from "./Services_Page/Our_servies";
import WasteDashboardHome from "./Dasboard/Home/Home_page";
import BlogDetailPage from "./Dasboard/Blogs_Content/Detail_page";
import InboxPage from "./Dasboard/notification/Notification_inbox_Page";
import MailDetail from "./Dasboard/notification/Mail_Detail_page";
import NgoLandingPage from "./LandingPageCom/Ngo_landing_Page";
import UserNGORequest from "./Dasboard/Ngo_Collab/Join_ngo";
import NGODetailPage from "./Dasboard/Ngo_Collab/Ngo_Detail_page";
import TaskDetailPage from "./Worker_Dashboard/Task__detail_page";
import WasteCollectionTask from "./Worker_Dashboard/Task_action_page";
import WasteInventory from "./Worker_Dashboard/Inventory_page";
import WorkerOnboarding from "./Worker_Dashboard/auth/Sign_Up";
import ModernChatDashboard from "./TeamFromationDashboad/Teams_Dashboard";
import CreateTeamForm from "./TeamFromationDashboad/forms/Teamcreation_form";
import {
  ProjectEventForm,
  ProjectEventDetails,
} from "./TeamFromationDashboad/forms/Teams_event_froms";
import TeamSettings from "./TeamFromationDashboad/Team_Setting";
import Das_home_ofTeams from "./TeamFromationDashboad/Das_home_ofTeams";
import DonationPage from "./TeamFromationDashboad/Donation_page";
import WasteManagementChannels from "./TeamFromationDashboad/Resoures/Resoures_page";
import ResourceCreationForm from "./TeamFromationDashboad/Resoures/UploadsREsours_form";
import WorkerDashboard from "./Worker_Dashboard/Home_das";
import WorkerLandingPage from "./Worker_Dashboard/Landing_page/Landingpage";
import RecyclingScroll from "./LandingPageCom/Giudedpage/GuidePage";
import MainDashboard from "./TeamFromationDashboad/Main_das";
import TeamChannel from "./TeamFromationDashboad/chennel/ChennalPage";
import AddMemberPage from "./TeamFromationDashboad/invite/Accept_Member";
import EmptyChatState from "./TeamFromationDashboad/Chat/EmptyChatPAge";
import TeamChatInterface from "./TeamFromationDashboad/Joined_team_page";
import EmptyDashboardHome from "./TeamFromationDashboad/IndexTeamPage";
import AboutPage from "./LandingPageCom/About_page";
import { ContactPage } from "@mui/icons-material";
import ContactPagesto from "./LandingPageCom/Contect_us";
import RecyclingCampaign from "./Dasboard/Recycle_reco/Recycle_info_oftutorial";

function App() {
  return (
    <AuthProvider>
      <WasteLogProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recyclingScroll" element={<RecyclingScroll />} />

            <Route path="/api/teams/:id/members" element={<AddMemberPage />} />
            <Route path="/services" element={<WasteManagementPage />} />
            <Route path="/AboutPage" element={<AboutPage />} />
            <Route path="/contect" element={<ContactPagesto />} />
            <Route path="/TaskDetailPage" element={<TaskDetailPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route
              path="/register/WorkerOnboarding"
              element={<WorkerOnboarding />}
            />

            <Route path="/mail/:id" element={<MailDetail />} />
            <Route path="/workerLandingPage" element={<WorkerLandingPage />} />

            <Route path="/blogs/:id" element={<BlogDetailPage />}></Route>
            <Route
              path="/WasteCollectionTask"
              element={<WasteCollectionTask />}
            />
            <Route path="/workerDash" element={<WorkerDashboard />}>
              <Route
                path="/workerDash/WasteInventory"
                element={<WasteInventory />}
              ></Route>
            </Route>
            {/* Protect dashboard routes with PrivateRoute */}

            <Route
              path="/teamform"
              element={
                <PrivateRoute>
                  <ModernChatDashboard />
                </PrivateRoute>
              }
            >
              <Route index element={<EmptyDashboardHome />} />
              <Route path="team" element={<Das_home_ofTeams />}>
                <Route index element={<EmptyChatState />} />
                <Route path="chat/:id" element={<MainDashboard />} />
              </Route>

              <Route path="Joined" element={<TeamChatInterface />} />
              <Route path="CreateTeam" element={<CreateTeamForm />} />
              <Route path="TeamChannel" element={<TeamChannel />} />

              <Route path="TeamSettings" element={<TeamSettings />} />
              <Route
                path="WasteManagementChannels"
                element={<WasteManagementChannels />}
              />
              <Route
                path="ResourceCreationForm"
                element={<ResourceCreationForm />}
              />
              <Route path="DonationPage" element={<DonationPage />} />
              <Route path="events/create" element={<ProjectEventForm />} />
              <Route path="events/details" element={<ProjectEventDetails />} />
            </Route>

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route path="feed" element={<UsersFeed />} />
              <Route index element={<WasteDashboardHome />} />
              <Route path="create_Feed" element={<CreateFeed />} />
              <Route path="Profile" element={<UserProfile />} />
              <Route path="inbox" element={<InboxPage />} />

              <Route path="CreateTeam" element={<TeamCreate />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="NgoLandingPage" element={<NgoLandingPage />} />
              <Route path="NGODetailPage" element={<NGODetailPage />} />
              <Route path="UserNGORequest" element={<UserNGORequest />} />
              <Route path="RecyclingGuide" element={<RecyclingGuide />} />
              <Route
                path="RecyclingCampaign/:Rid"
                element={<RecyclingCampaign />}
              />
              <Route path="WasteLogForm" element={<WasteLogForm />} />
              <Route path="BlogCreate" element={<BlogCreate />} />
            </Route>
            <Route path="*" element={<Error404TV />} />
          </Routes>
        </Router>
      </WasteLogProvider>
    </AuthProvider>
  );
}

export default App;
