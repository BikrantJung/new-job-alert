import axios from "axios";
import jwt_decode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { getTokens } from "../services/localStorage";
import { saveUserID } from "../services/localStorage";
import NewAxios from "../utils/newAxios";
const AuthContext = createContext("");
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const { accessToken, refreshToken, localUserID } = getTokens();
  const [userSubscribed, setUserSubscribed] = useState(false);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState(localUserID ? localUserID : null);
  const [userProfileData, setUserProfileData] = useState([]);
  const [isExpired, setIsExpired] = useState(true);
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

  const api = NewAxios();

  useEffect(() => {
    async function getUserProfileData() {
      if (localUserID) {
        try {
          const res = await api.get(`profile/${localUserID}`);
          setUserProfileData(res.data);
          saveUserID(res.data.id);
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      }
    }
    setLoading(false);
    getUserProfileData();
  }, [accessToken, isExpired, localUserID]);

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
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
