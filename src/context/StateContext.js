import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { getTokens } from "../services/localStorage";
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
    just_registered: [justRegistered, setJustRegistered],
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
  };

  return (
    <StateContext.Provider value={contextData}>
      {children}
    </StateContext.Provider>
  );
};
