import axios, { AxiosError } from "axios";
import { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}
const API = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,

  // headers: {
  //   "Content-Type": "application/json",
  // },
  timeout: 5000,
});

API.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  return config;
});

// API.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     if (error.response?.status === 401) {
//       try {
//         await API.post("/refresh");
//         return API({ ...error.config, headers: { ...error.config?.headers } });
//       } catch (err) {
//         console.error("Token refresh failed");
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

API.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/refresh")
    ) {
      originalRequest._retry = true;

      try {
        // Call refresh endpoint, it will set new cookies
        await API.post("/refresh");
        // Retry original request with new cookies (no need to set Authorization header)
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed. Redirect to login or logout.");
        // TODO: logout user / redirect to login page here
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
