import { createContext, useEffect, useState } from "react";

import { getTokens, saveTokens } from "../services/localStorage";
import { saveUserID } from "../services/localStorage";
import NewAxios from "../utils/newAxios";
import { axiosPrivate } from "../utils/axiosPrivate";
import axios from "axios";
const AuthContext = createContext();



export default AuthContext;

export const AuthProvider = ({ children }) => {
  const { accessToken, refreshToken, localUserID } = getTokens();
  const [userSubscribed, setUserSubscribed] = useState(false);
  const [userData, setUserData] = useState([]);

  const [userID, setUserID] = useState(localUserID ? localUserID : null);

  const [userProfileData, setUserProfileData] = useState([]);
  const [isExpired, setIsExpired] = useState(true);
  const [profileID, setProfileID] = useState(null);
  const [allowData, setAllowData] = useState(true);

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

  // useEffect(() => {
  //   async function getUserProfileData() {
  //     if (localUserID && allowData) {
  //       console.log("I RAN");
  //       try {
  //         const res = await api.get(`profileSelf/${localUserID}`);
  //         setUserProfileData([]);
  //         setUserProfileData(res.data);
  //         saveUserID(res.data.id);
  //         console.log("PROFILESELF", res);
  //         console.log(res);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   }
  //   setLoading(false);
  //   getUserProfileData();
  // }, [accessToken, isExpired, localUserID]);

  useEffect(() => {

    console.log("I ALSO RUN");
    async function getUserSubscribed() {
      try {
        const res = await axios({
          url: "profile/",
          method: "GET",
          headers: {
            authorization: `Bearer ${authTokens.accessToken}`,
          },
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    getUserSubscribed();
  }, [accessToken, authTokens.accessToken]);


  const updateToken = async () => {
    console.log("I RAN");

    const res = await axios({
      url: "token/refresh/",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        refresh: authTokens?.refreshToken,
      },
    });

    console.log(res);
    saveTokens(res.data);
    setAuthTokens({
      accessToken: res.data.access,
      refreshToken: res.data.refresh,
    });
    if (loading) {
      setLoading(false);
      console.log("IT IS LOADING");
    }
  };

  useEffect(() => {
    if (loading && authTokens.accessToken) {
      console.log("1");
      updateToken();
    }
    let interval = setInterval(() => {
      if (authTokens.accessToken && authTokens.refreshToken) {
        console.log("2");
        updateToken();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [accessToken, loading]);

  useEffect( ()=>{
    async function getUserProfileData() {
      if (localUserID && allowData) {
        console.log("I RAN");
        try {
          const res = await axiosPrivate.get(`profileSelf/${localUserID}`);

          console.log(res);
        } catch (error) {
          console.log(error);
        }
      }
    }
    setLoading(false);
    getUserProfileData();
  },[accessToken, isExpired, localUserID])
    





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
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );

  }