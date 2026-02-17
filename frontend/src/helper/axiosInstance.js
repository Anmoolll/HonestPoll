import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: `http://localhost:3000/api/v1`,
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
