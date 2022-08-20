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
import Profile from "./pages/Profile";
import RestrictLoginPage from "./utils/RestrictLoginPage";
import Pricing from "./pages/Pricing";
import JobPost from "./pages/JobPost";
import Jobs from "./pages/Jobs";
import { MainContent, Posts } from "./pages/Profile";
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
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />}>
              <Route index element={<MainContent />} />
              <Route path="posts" element={<Posts />} />
            </Route>
          </Route>
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/create-job-post" element={<JobPost />} />
          <Route path="/jobs" element={<Jobs />} />
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
