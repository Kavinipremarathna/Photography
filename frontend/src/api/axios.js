import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
