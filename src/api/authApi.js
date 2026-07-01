import axiosInstance from "./axiosInstance";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const loginApi = async ({ username, password }) => {
  const { data } = await axios.post(`${BASE_URL}/api/token/`, {
    username,
    password,
  });
  return data; // { access, refresh }
};

export const registerApi = async ({ username, email, password }) => {
  const { data } = await axios.post(`${BASE_URL}/api/users/register/`, {
    username,
    email,
    password,
  });
  return data;
};

export const logoutApi = async () => {
  const refresh = localStorage.getItem("refresh_token");
  try {
    await axiosInstance.post("/api/auth/logout/", { refresh });
  } catch {
    // silent fail — still clear tokens
  }
};
