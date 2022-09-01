import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { getTokens } from "../services/localStorage";
import AuthContext from "./AuthContext";
const StateContext = createContext();
export default StateContext;
export const StateProvider = ({ children }) => {
  const { localUserID } = getTokens();

  const [navHeight, setNavHeight] = useState(0);
  const [renderNav, setRenderNav] = useState(true);
  const [justRegistered, setJustRegistered] = useState(false);
  const [successfulPost, setSuccessfulPost] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [hasCompany, setHasCompany] = useState(false);
  const { decodedID, authTokens, initialUserData, userProfileData } =
    useContext(AuthContext);
  const [userCompany, setUserCompany] = useState("");
  const [recentJobs, setRecentJobs] = useState([]);
  const [isValidUser, setIsValidUser] = useState(false);
  useEffect(() => {
    const hasCompany = async () => {
      if (decodedID) {
        try {
          const res = await axios.get(`companySelf/${decodedID}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokens?.accessToken}`,
            },
          });
          setHasCompany(true);
          setUserCompany(res.data.companyUsername);
          console.log("COMPANY", res);
        } catch (error) {
          if (
            error.response.data.statusText === "Not found" &&
            error.response.data.status === 404
          ) {
            setHasCompany(false);
          }
        }
      }
    };
    hasCompany();
  }, [decodedID]);

  useEffect(() => {
    if (userProfileData?.user || initialUserData?.user) {
      const checkID =
        window.btoa(
          window.btoa(
            window.btoa(window.btoa(window.btoa(userProfileData?.user)))
          )
        ) ||
        window.btoa(
          window.btoa(
            window.btoa(window.btoa(window.btoa(initialUserData?.user)))
          )
        );
      setIsValidUser(checkID === localUserID);
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
