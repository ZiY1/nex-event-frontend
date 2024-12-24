import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

const HTTP_STATUS_UNAUTHORIZED = 401;

export const setupInterceptors = (logout, setNotification) => {
  // Request Interceptor
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response &&
        error.response.status === HTTP_STATUS_UNAUTHORIZED
      ) {
        const originalRequest = error.config;

        if (!originalRequest.url.includes("/auth/login")) {
          console.log("Token expired or invalid. Logging out...");
          localStorage.removeItem("token");
          setNotification("Session expired. Please log in again.");
          logout();
        }
      }
      return Promise.reject(error);
    }
  );
};

export default api;
