import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyRegister from "./services/VerifyRegister";
import PrivateRoute from "./utils/PrivateRoute";
import Profile from "./pages/Profile/Profile";
import RestrictLoginPage from "./utils/RestrictLoginPage";
import Pricing from "./pages/Pricing";
import JobPost from "./pages/JobPost";
import Jobs from "./pages/Jobs/Jobs";
import Contact from "./pages/Contact";
import CompanyJob from "./pages/Jobs/CompanyJob";
import UserEducation from "./pages/Profile/Content/UserEducation";
import DefaultContent from "./pages/Profile/Content/DefaultContent";
import Blog from "./pages/Blog/Blog";
import EditProfile from "./pages/Profile/EditProfile";
import LoadingBar from "react-top-loading-bar";
import { useContext, useState } from "react";
import SearchPage from "./pages/Search Page/SearchPage";
import CompanyDetails from "./pages/Profile/Company Details/CompanyDetails";
import NotFound from "./pages/NotFound";
import CreateCompany from "./pages/Profile/Company Details/CreateCompany";
import Certification from "./pages/Profile/Content/Certification";
import StateContext from "./context/StateContext";
import EditPageProtect from "./components/EditPageProtect";
import Faq from "./pages/FAQ/Faq";
function App() {
  const [progress, setProgress] = useState(0);
  const { isValidUser } = useContext(StateContext);
  console.log(isValidUser);
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
              <Route
                path="edit-profile"
                element={isValidUser ? <EditProfile /> : <EditPageProtect />}
              />
              <Route path="certification" element={<Certification />} />
            </Route>
            <Route path="/company/:id" element={<CompanyDetails />} />

            <Route path="/create-company" element={<CreateCompany />} />
          </Route>
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/jobs/:id" element={<CompanyJob />} />
          <Route path={`/users`} element={<SearchPage />} />
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
