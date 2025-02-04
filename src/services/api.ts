import { siteConfig } from "@/config";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: siteConfig.backend.base_api_url, // Replace with your API base URL
  headers: siteConfig.backend.base_headers,
});

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

export const apiDelete = async <ResponseData = unknown>(
  url: string,
  config?: AxiosRequestConfig
) => api.delete<ResponseData>(url, config);

export default api;
