import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyRegister from "./services/VerifyRegister";
import PrivateRoute from "./utils/PrivateRoute";
import Profile from "./pages/Profile/Profile";
import RestrictLoginPage from "./utils/RestrictLoginPage";
import Pricing from "./pages/Pricing";
import JobPost from "./pages/JobPost";
import Jobs from "./pages/Jobs/Jobs";
import MainContent from "./pages/Profile/MainContent";
import Contact from "./pages/Contact";
import CompanyJob from "./pages/Jobs/CompanyJob";
import CandidateRegister from "./pages/Register/CandidateRegister";
import UserEducation from "./components/UserPost/UserEducation";
import DefaultContent from "./pages/Profile/Content/DefaultContent";
import Blog from "./pages/Blog/Blog";
import EditProfile from "./pages/Profile/EditProfile";
import LoadingBar from "react-top-loading-bar";
import { useContext, useEffect, useState } from "react";
import SearchPage from "./pages/Search Page/SearchPage";
import AuthContext from "./context/AuthContext";
import CompanyDetails from "./pages/Profile/Company Details/CompanyDetails";
import NotFound from "./pages/NotFound";
function App() {
  const [progress, setProgress] = useState(0);
  const { searchFilter, setSearchFilter } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <div className="App">
        <LoadingBar color="red" progress={progress} />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/" element={<RestrictLoginPage />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/create-job-post" element={<JobPost />} />
            <Route path="/profile/:id" element={<Profile />}>
              <Route index element={<DefaultContent />} />

              <Route path="education" element={<UserEducation />} />
              <Route path="edit-profile" element={<EditProfile />} />
            </Route>
            <Route path="/company-details" element={<CompanyDetails />} />
          </Route>
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/jobs" element={<Jobs setProgress={setProgress} />} />
          <Route path="/jobs/:id" element={<CompanyJob />} />
          <Route
            path={`/users`}
            element={<SearchPage setProgress={setProgress} />}
          />
          <Route path="/candidate-register" element={<CandidateRegister />} />
          <Route
            path="/api/user/verify/:id/:token"
            element={<VerifyRegister />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
