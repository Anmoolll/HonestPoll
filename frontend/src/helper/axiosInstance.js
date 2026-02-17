import axios from "axios";

const normalizeBaseUrl = (value) => {
  if (!value || typeof value !== "string") return value;
  return value.replace(/\/+$/, "");
};

const backendBaseUrl = normalizeBaseUrl(import.meta.env.VITE_BACKEND_URL);

const axiosInstance = axios.create({
  // baseURL: `http://localhost:3000/api/v1`,
  baseURL: `${backendBaseUrl}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
