import axios from "axios";

const envApiUrl = (import.meta.env.VITE_API_URL || "").trim();
const fallbackApiUrl = import.meta.env.DEV
  ? "http://localhost:5000/api"
  : "/api";
const baseURL = (envApiUrl || fallbackApiUrl).replace(/\/+$/, "");

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const admin = localStorage.getItem("admin");

  if (admin) {
    const parsed = JSON.parse(admin);
    config.headers.Authorization = `Bearer ${parsed.token}`;
  }

  return config;
});

export default api;
