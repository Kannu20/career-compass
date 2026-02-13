import axios from "axios";

/**
 * Base Axios instance
 * - Centralized API calls
 * - Token auto-injection
 * - Clean error handling
 */

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});


 
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


/**
 * Response Interceptor
 * Central error normalization
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    return Promise.reject({
      status: error?.response?.status,
      message,
    });
  }
);

export default api;
