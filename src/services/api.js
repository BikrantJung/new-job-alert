import axios from "axios";
import { getTokens, saveTokens } from "../services/localStorage";

const { refreshToken, accessToken } = getTokens();
// console.log("refresh", refreshToken);
// axios.defaults.baseURL = "http://192.168.1.71:8000/api/user/";
// let refresh = false;
// axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
// console.log("HELLO WORLD ");

// axios.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     // const originalRequest = error.config;
//     console.log("ERROR FOUND", error);
//     if (error.response.status === 401 && !refresh) {
//       // originalRequest._retry = true;
//       console.log("GOTCHA first", error);
//       console.log("REFRESH 2", refresh);

//       refresh = true;
//       const response = await axios.post("token/refresh/", {
//         refresh: refreshToken,
//       });
//       console.log(response);
//       saveTokens(response.data);
//       if (response.status === 200) {
//         axios.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${response.data.access}`;

//         return axios(error.config);
//       }
//     }
//     return error;
//   }
// );
let refresh = false;
const baseURL = "http://192.168.1.71:8000/api/user/";
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
 
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + "token/refresh/"
    ) {
      window.location.href = "/login/";
      refresh = true;
      console.log("originalRequest",originalRequest)
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized" &&
      !refresh
    ) {
      refresh = true;
      if (refreshToken) {
        const tokenParts = JSON.parse(window.atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post("token/refresh/", { refresh: refreshToken })
            .then((response) => {
              saveTokens(response.data);

              console.log("RESPONSE",response)
              axiosInstance.defaults.headers["Authorization"] =
                "Bearer " + response.data.access;
              originalRequest.headers["Authorization"] =
                "Bearer " + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log("err",err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          // window.location.href = "/login/";
        }
      } else {
        console.log("Refresh token not available.");
        // window.location.href = "/login/";
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);
export default axiosInstance;
