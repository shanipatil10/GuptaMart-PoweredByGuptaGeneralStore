import axios from "axios";
import { getAuthToken } from "./auth-token";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getAuthToken();

      config.headers.Authorization = `Bearer ${token}`;
    } catch {
      // Request can continue without a token.
      // Protected backend routes will reject unauthenticated requests.
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;