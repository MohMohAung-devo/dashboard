import axios, { AxiosError } from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      try {
        await API.post("/refresh");
        return API({ ...error.config, headers: { ...error.config?.headers } });
      } catch (err) {
        console.error("Token refresh failed");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
export default API;
