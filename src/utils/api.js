import axios from "axios";
import {app} from "../constants/constants";
const axiosInstance = axios.create({
    baseURL: app.SERVER_URL,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const authToken = window.localStorage.getItem("auth-token");
  
      if (authToken) {
        config.headers.authorization = `Bearer ${authToken}`;
      }
  
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  export default axiosInstance;