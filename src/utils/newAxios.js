import axios from "axios";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

import { saveTokens, getTokens, saveUserID } from "../services/localStorage";

function NewAxios() {
  const { accessToken, refreshToken } = getTokens();
  const { setIsExpired } = useContext(AuthContext);
  //   const [authTokens, setAuthTokens] = tokens;
  const baseURL = "http://192.168.1.71:8000/api/user/";

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  });
  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwtDecode(accessToken);
    console.log("`")
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    //    Wherever I use axiosInstance, they will only work if accesstoken is not expired
    //    If I use default axios, they will work anytime
    console.log(isExpired);
    if (!isExpired) {
      return req; // if user is not expired return request here, don't run following functions
    }
    //   saveTokens()

    try {
      const response = await axios({
        method: "POST",
        url: `token/refresh/`,
        data: {
          refresh: refreshToken,
        },
      });

      req.headers.authorization = `Bearer ${response.data.access}`;
      saveTokens(response.data);
      console.log(response.data);
      setIsExpired(false);
    } catch (error) {
      console.log("NEW AXIOS", error);
    }

    return req;
  });
  return axiosInstance;
}
export default NewAxios;
