import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "http://192.168.1.71:8000/api/user/",
  headers: {
    "Content-Type": "application/json",
  },
});
