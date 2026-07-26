import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_DEV
    ? `${import.meta.env.VITE_BACKEND_DEV}/api/v1`
    : `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    // console.error("Error from axios", error?.response);
    if (error?.response?.status === 403) {
      console.error(error?.response?.data?.message);
    }
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
