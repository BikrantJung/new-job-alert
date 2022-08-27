import { createContext, useEffect, useState } from "react";

import { getTokens, saveTokens } from "../services/localStorage";
import { saveUserID } from "../services/localStorage";
import axios from "axios";
import axiosInstance from "../services/api";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const { accessToken, refreshToken, localUserID } = getTokens();
  const [userSubscribed, setUserSubscribed] = useState(false);
  const [userData, setUserData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [userProfileData, setUserProfileData] = useState([]);
  const [isExpired, setIsExpired] = useState(true);
  const [allowData, setAllowData] = useState(true);
  const [initialUserData, setInitialUserData] = useState([]);
  const [urlID, setUrlID] = useState("");
  const [encodedID, setEncodedID] = useState("");
  const [decodedID, setDecodedID] = useState("");
  const [blogData, setBlogData] = useState([]);
  const [latestBlog, setLatestBlog] = useState([]);
  const [authTokens, setAuthTokens] = useState(
    accessToken && refreshToken
      ? {
          accessToken,
          refreshToken,
        }
      : {
          accessToken: null,
          refreshToken: null,
        }
  );

  useEffect(() => {
    if (localUserID) {
      const decoded = window.atob(
        window.atob(window.atob(window.atob(window.atob(localUserID))))
      );
      setEncodedID(
        window.btoa(window.btoa(window.btoa(window.btoa(window.btoa(decoded)))))
      );
      setDecodedID(decoded);
    }
  }, [localUserID]);
  useEffect(() => {
    async function getUserProfileData() {
      console.log("AUTH");
      if (allowData && decodedID && !initialUserData.length) {
        try {
          const res = await axiosInstance.get(`profileSelf/${decodedID}`);
          setInitialUserData(res.data);
          console.log("Initial User Data", res);
        } catch (error) {
          console.log(error);
        }
      }
    }
    getUserProfileData();
    setLoading(false);
  }, [accessToken, decodedID]);
  const contextData = {
    authTokens,
    setAuthTokens,
    userSubscribed,
    setUserSubscribed,
    userData,
    setUserData,
    userProfileData,
    setUserProfileData,
    isExpired,
    setIsExpired,
    allowData,
    setAllowData,
    loading,
    setLoading,
    initialUserData,
    setInitialUserData,
    urlID,
    setUrlID,
    decodedID,
    encodedID,
    blogData,
    setBlogData,
    latestBlog,
    setLatestBlog,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
