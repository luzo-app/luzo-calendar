import axios, { AxiosResponse } from "axios";
import { API_URL, DOMAIN, PREFIX_BASE_URL } from "./constants";
import { getCookie, setCookie } from "@/lib/cookies";

const api = axios.create({
  baseURL: `${API_URL}${PREFIX_BASE_URL}`,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> => {
    if (/20/.test(response.status.toString())) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.data?.status === 401 && originalRequest.headers.Authorization) {
      originalRequest._retry = true;

      try {
        const refreshToken = getCookie("refreshToken");
        const response = await axios.post("/api/refresh-token", {
          refreshToken,
        });
        const { token } = response.data;

        setCookie("token", token, {
          domain: DOMAIN,
          secure: window.location.protocol === "https:",
          sameSite: "Lax",
        });

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        console.error("Failed to refresh token:", error);
        // Handle refresh token error or redirect to login
      }
    }

    // Handle network error
    if (error.code === "ERR_NETWORK") {
      return Promise.reject({ data: { detail: "Network error" } });
    }

    return Promise.reject(error);
  }
);

export default api;
