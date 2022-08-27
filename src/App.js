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
function App() {
  return (
    <BrowserRouter>
      <div className="App">
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
            </Route>
          </Route>
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<CompanyJob />} />
          <Route path="/candidate-register" element={<CandidateRegister />} />
          <Route
            path="/api/user/verify/:id/:token"
            element={<VerifyRegister />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
