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

// Add other auth-related API calls here (e.g., logout, fetchUserProfile)
