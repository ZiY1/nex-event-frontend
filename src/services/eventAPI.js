import api from "./api";

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
