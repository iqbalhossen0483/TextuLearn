import { useAuth } from "@/context/AuthContext";
import { loginUser, registerUser } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useRegisterMutation = () => {
  const { login: contextLogin } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data.token && data.user) {
        contextLogin(data.user, data.token);
        router.push("/");
        console.log("Registration successful, user logged in:", data);
      } else {
        console.error(
          "Registration response missing token or user data:",
          data
        );
      }
    },
    onError: (error) => {
      console.error("Registration failed:", error.message);
    },
  });
};

export const useLoginMutation = () => {
  const { login: contextLogin } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.token && data.user) {
        contextLogin(data.user, data.token);
        router.push("/");
        console.log("Login successful:", data);
      } else {
        console.error("Login response missing token or user data:", data);
      }
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });
};
