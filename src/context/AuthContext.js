import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getTokens } from "../services/localStorage";
import { saveUserID } from "../services/localStorage";
import NewAxios from "../utils/newAxios";
const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const { accessToken, refreshToken, localUserID } = getTokens();

  const [userSubscribed, setUserSubscribed] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userID, setUserID] = useState(localUserID ? localUserID : null);
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
    async function getUserSubscribed() {
      if (accessToken) {
        // Using axios_instance.
        try {
          const res = await api.get("profile/");
          console.log(res);
          setUserSubscribed(res.data.is_subscribed);
          setUserData(res.data);

          saveUserID(res.data.id);
        } catch (error) {
          // console.log(error);
        }
      }
    }
    getUserSubscribed();
  }, [accessToken, authTokens]);
  const contextData = {
    tokens: [authTokens, setAuthTokens],

    subscribed: [userSubscribed, setUserSubscribed],
    // userid: [userID, setUserID],
    user_data: [userData, setUserData],
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
