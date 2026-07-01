import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginApi, registerApi, logoutApi } from "../api/authApi";
import { useAuthStore } from "../components/store/authStore";

export function useLogin() {
  const navigate = useNavigate();
  const { setTokens, setUser } = useAuthStore();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data, variables) => {
      setTokens(data.access, data.refresh);
      setUser({ username: variables.username });
      toast.success("Welcome back!");
      navigate("/dashboard");
    },
    onError: (err) => {
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.non_field_errors?.[0] ||
        "Invalid credentials. Please try again.";
      toast.error(msg);
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      toast.success("Account created! Please log in.");
      navigate("/login");
    },
    onError: (err) => {
      const data = err.response?.data;
      const msg =
        data?.username?.[0] ||
        data?.email?.[0] ||
        data?.password?.[0] ||
        data?.detail ||
        "Registration failed. Please try again.";
      toast.error(msg);
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutApi,
    onSettled: () => {
      logout();
      queryClient.clear();
      toast.success("Logged out successfully.");
      navigate("/login");
    },
  });
}
