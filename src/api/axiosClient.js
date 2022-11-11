import axios from "axios";
import { parse, stringify } from "qs";
import apiConfig from "./apiConfig";

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  },
});

axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return {
        status: response.status,
        data: response.data,
      };
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
