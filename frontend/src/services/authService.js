import axiosInstance from "@/lib/axiosInstance";

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "An unknown error occurred during registration.",
      }
    );
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "An unknown error occurred during login.",
      }
    );
  }
};

export const checkLoginStatus = async () => {
  try {
    const response = await axiosInstance.get("/auth/check_login");
    return response.data;
  } catch (error) {
    console.error(
      "checkLoginStatus error:",
      error.response?.data || error.message
    );
    return {
      user: null,
      message: error.response?.data?.message || "Session check failed",
    };
  }
};

// Add other auth-related API calls here (e.g., logout, fetchUserProfile)
