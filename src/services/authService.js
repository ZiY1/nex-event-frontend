import { authAPI } from "./api";
import { setAuthCredentials } from "../utils/auth";

export const login = async (credentials) => {
  try {
    const response = await authAPI.login(credentials);
    setAuthCredentials(
      response.data.payload.userId,
      response.data.payload.fullName,
      response.data.payload.accessToken
    );
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.statusMessage || "Login failed"
    };
  }
};

export const register = async (registerData) => {
  try {
    await authAPI.register(registerData);
    return { success: true, message: "Registration successful!" };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.statusMessage || "Registration failed"
    };
  }
};

export const logout = async () => {
  try {
    await authAPI.logout();
    setAuthCredentials(null, null, null);
    console.log("Logout successful");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};
