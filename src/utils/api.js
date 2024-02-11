import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
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