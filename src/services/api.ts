import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getAccessToken } from "@/lib/get-token";
import { getLocale } from "@/lib/get-locales";
import { routes, siteConfig } from "@/config";

// Create an Axios instance
const api = axios.create({
  baseURL: siteConfig.backend.base_api_url, // Replace with your API base URL
  headers: siteConfig.backend.base_headers,
});

// Add a request interceptor to include the JWT token in the headers
api.interceptors.request.use(
  async (config) => {
    const [token, locale] = await Promise.all([getAccessToken(), getLocale()]);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    config.headers["Accept-Language"] = locale;
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor (optional, for handling errors or specific responses globally)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      // Handle 401 Unauthorized errors
      window.location.href = routes.login;
    }
    return Promise.reject(error);
  }
);

export const apiGet = async <ResponseData = unknown>(
  url: string,
  config?: AxiosRequestConfig
) => api.get<ResponseData>(url, config);

export const apiPost = async <PostData = unknown, ResponseData = unknown>(
  url: string,
  data: PostData,
  config?: AxiosRequestConfig
) => api.post<ResponseData, AxiosResponse<ResponseData>>(url, data, config);

export const apiPut = async <PutData = unknown, ResponseData = unknown>(
  url: string,
  data: PutData,
  config?: AxiosRequestConfig
) => api.put<ResponseData, AxiosResponse<ResponseData>>(url, data, config);

export const apiPatch = async <PatchData = unknown, ResponseData = unknown>(
  url: string,
  data: PatchData,
  config?: AxiosRequestConfig
) => api.patch<ResponseData, AxiosResponse<ResponseData>>(url, data, config);

export const apiDelete = async <ResponseData = unknown>(
  url: string,
  config?: AxiosRequestConfig
) => api.delete<ResponseData>(url, config);

export default api;
