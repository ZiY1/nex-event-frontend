export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const setAuthCredentials = (userId, fullName, token) => {
  if (token) {
    localStorage.setItem("userId", userId);
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("userId");
    localStorage.removeItem("fullName");
    localStorage.removeItem("token");
  }
};
