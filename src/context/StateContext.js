import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

import AuthContext from "./AuthContext";
const StateContext = createContext();
export default StateContext;
export const StateProvider = ({ children }) => {
  const [navHeight, setNavHeight] = useState(0);
  const [renderNav, setRenderNav] = useState(true);
  const [justRegistered, setJustRegistered] = useState(false);
  const [successfulPost, setSuccessfulPost] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [hasCompany, setHasCompany] = useState(false);
  const { userID, authTokens, initialUserData, userProfileData } =
    useContext(AuthContext);
  const [userCompany, setUserCompany] = useState("");
  const [recentJobs, setRecentJobs] = useState([]);
  const [isValidUser, setIsValidUser] = useState(false);
  const [companyJobs, setCompanyJobs] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [localCover, setLocalCover] = useState("");
  const [localLogo, setLocalLogo] = useState("");
  const [loading, setLoading] = useState(true);
  const [popularCategory, setPopularCategory] = useState([]);
  const [jobApplications, setJobApplications] = useState([]);
  useEffect(() => {
    const hasCompany = async () => {
      if (userID) {
        try {
          const res = await axios.get(`companySelf/${userID}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokens?.accessToken}`,
            },
          });
          setHasCompany(true);
          setUserCompany(res.data.companyUsername);
        } catch (error) {
          if (
            error.response?.data?.statusText === "Not found" &&
            error.response?.data?.status === 404
          ) {
            setHasCompany(false);
          }
        }
      }
    };
    setLoading(false);
    hasCompany();
  }, [userID]);

  useEffect(() => {
    if (userProfileData?.user || initialUserData?.user) {
      const checkID = userProfileData?.user || initialUserData?.user;

      setIsValidUser(checkID === userID);
    }
  }, [userProfileData?.user, initialUserData?.user]);

  const contextData = {
    nav: [navHeight, setNavHeight],
    render_nav: [renderNav, setRenderNav],
    successfulPost,
    setSuccessfulPost,
    jobData,
    setJobData,
    hasCompany,
    setHasCompany,
    userCompany,
    setUserCompany,
    recentJobs,
    setRecentJobs,
    isValidUser,
    companyData,
    setCompanyData,
    companyJobs,
    setCompanyJobs,
    localCover,
    setLocalCover,
    localLogo,
    setLocalLogo,
    jobApplications,
    setJobApplications,
    popularCategory,
    setPopularCategory,
    justRegistered,
    setJustRegistered,
  };

  return (
    <StateContext.Provider value={contextData}>
      {loading ? (
        <div
          style={{
            height: "97vh",
            width: "97vw",
            display: "grid",
            placeItems: "center",
            margin: 0,
            padding: 0,
          }}
        >
          <PuffLoader color="rgb(54, 215, 183)" />
        </div>
      ) : (
        children
      )}
    </StateContext.Provider>
  );
};
