import { routes, siteConfig } from "@/config";
import { getLocale } from "@/lib/get-locales";
import { getAccessToken } from "@/lib/get-token";
import { toCamelCase } from "@/lib/to-camel-case";
import { toSnakeCase } from "@/lib/to-snake-case";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: siteConfig.backend.base_api_url, // Replace with your API base URL
  headers: siteConfig.backend.base_headers,
});

const aiApi = axios.create({
  baseURL: siteConfig.backend.llm_ai_url,
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
      if (!error.config.url?.includes("auth")) window.location.href = routes.auth.login;
    }
    return Promise.reject(error);
  }
);

// Interceptor để convert response từ snake_case -> camelCase
// Interceptor để convert response từ snake_case -> camelCase cho cả api và aiApi
[api, aiApi].forEach((instance) => {
  instance.interceptors.response.use((response) => {
    if (response.data) response.data = toCamelCase(response.data);
    return response;
  });
});

// Interceptor để convert request từ camelCase -> snake_case
[api, aiApi].forEach((instance) => {
  instance.interceptors.request.use((config) => {
    if (config.data) config.data = toSnakeCase(config.data);
    return config;
  });
});

export const apiGet = async <ResponseData = unknown>(
  url: string,
  config?: AxiosRequestConfig
) => api.get<ResponseData>(url, config);

export const aiApiGet = async <ResponseData = unknown>(
  url: string,
  config?: AxiosRequestConfig
) => aiApi.get<ResponseData>(url, config);

export const aiApiPost = async <PostData = unknown, ResponseData = unknown>(
  url: string,
  data: PostData,
  config?: AxiosRequestConfig
) => aiApi.post<ResponseData, AxiosResponse<ResponseData>>(url, data, config);

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