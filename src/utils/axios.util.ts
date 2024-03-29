import axios from "axios";
import { envConfig } from "../config/env.config";

export const axiosInstance = axios.create({
  baseURL: envConfig.baseUrl,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (request) => {
    if (request.headers) {
      request.headers.Authorization = `Bearer ${envConfig.apiKey}`;
    }
    return request;
  },
  (error) => Promise.reject(createError(error))
);

function createError(error: any) {
  if (axios.isCancel(error)) return error; // when we cancel a request internally

  const statusCode = error?.response.status;
  const statusText =
    error?.response?.data?.error?.message ||
    error?.response?.statusText ||
    error?.message ||
    "Something went wrong";

  return { code: statusCode, message: statusText };
}
