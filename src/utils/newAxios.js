import axios from "axios";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";

import { saveTokens, getTokens } from "../services/localStorage";

export default function NewAxios() {
  const { accessToken, refreshToken } = getTokens();
  //   const { tokens } = useContext(AuthContext);
  //   const [authTokens, setAuthTokens] = tokens;
  const baseURL = "http://192.168.1.75:8000/api/user/";

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  });
  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwtDecode(accessToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    console.log("expired", isExpired);

    //    Wherever I use axiosInstance, they will only work if accesstoken is not expired
    //    If I use default axios, they will work anytime
    if (!isExpired) {
      console.log("HELLO");
      return req; // if user is not expired return request here, don't run following functions
    }
    try {
      const response = await axios({
        method: "POST",
        url: `token/refresh/`,
        data: {
          refresh: refreshToken,
        },
      });
      console.log("New response", response);
      saveTokens(response.data);

      req.headers.authorization = `Bearer ${response.data.access}`;
    } catch (error) {
      console.log(error);
    }

    //   saveTokens()

    return req;
  });
  return axiosInstance;
}
