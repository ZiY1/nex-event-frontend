import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  logout: () => api.post("/auth/logout")
};

export const eventAPI = {
  getNearbyEvents: (lat, lon) =>
    api.get(`/events/nearby?lat=${lat}&lon=${lon}`),
  getFavoriteEvents: () => api.get("/events/favorite"),
  setFavoriteEvent: (eventId) =>
    api.post(`/events/favorite?event_id=${eventId}`),
  unsetFavoriteEvent: (eventId) =>
    api.delete(`/events/favorite?event_id=${eventId}`),
  getRecommendEvents: (lat, lon) =>
    api.get(`/events/recommend?lat=${lat}&lon=${lon}`)
};
