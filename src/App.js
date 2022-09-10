import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditPageProtect from "./components/EditPageProtect";
import StateContext from "./context/StateContext";
import Blog from "./pages/Blog/Blog";
import Contact from "./pages/Contact";
import Faq from "./pages/FAQ/Faq";
import Home from "./pages/Home";
import JobPost from "./pages/JobPost";
import CompanyJob from "./pages/Jobs/CompanyJob";
import Jobs from "./pages/Jobs/Jobs";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import CompanyDetails, {
  CompanyDefaultContent,
} from "./pages/Profile/Company Details/CompanyDetails";
import CompanyJobDetails from "./pages/Profile/Company Details/CompanyJobDetails";
import CreateCompany from "./pages/Profile/Company Details/CreateCompany";
import Certification from "./pages/Profile/Content/Certification";
import DefaultContent from "./pages/Profile/Content/DefaultContent";
import UserEducation from "./pages/Profile/Content/UserEducation";
import EditProfile from "./pages/Profile/EditProfile";
import Profile from "./pages/Profile/Profile";
import SearchPage from "./pages/Search Page/SearchPage";
import Signup from "./pages/Signup";
import VerifyRegister from "./services/VerifyRegister";
import PrivateRoute from "./utils/PrivateRoute";
import RestrictLoginPage from "./utils/RestrictLoginPage";
import SubscribedRoute from "./utils/SubscribedRoute";
function App() {
  const { isValidUser, companyData, companyJobs } = useContext(StateContext);
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
            <Route path="/" element={<SubscribedRoute />}>
              <Route path="/create-job-post" element={<JobPost />} />
            </Route>
            <Route path="/profile/:id" element={<Profile />}>
              <Route index element={<DefaultContent />} />
              <Route path="education" element={<UserEducation />} />
              <Route
                path="edit-profile"
                element={isValidUser ? <EditProfile /> : <EditPageProtect />}
              />
              <Route path="certification" element={<Certification />} />
            </Route>
            <Route path="/company/:id" element={<CompanyDetails />}>
              <Route
                index
                element={
                  <CompanyDefaultContent
                    companyJobs={companyJobs}
                    companyData={companyData}
                  />
                }
              />
              <Route
                path=":jobTitle/:jobID"
                element={<CompanyJobDetails companyData={companyData} />}
              />
            </Route>

            <Route path="/create-company" element={<CreateCompany />} />
            <Route path="/pricing" element={<Pricing />} />
          </Route>
          <Route path="/blog" element={<Blog />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/jobs/:id" element={<CompanyJob />} />
          <Route path={`/users`} element={<SearchPage />} />
          <Route path="verify/:id/:token" element={<VerifyRegister />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
