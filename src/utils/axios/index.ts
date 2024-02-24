import axios from 'axios';
import Router from 'next/router';

const BASE_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('tracer-token');
  if (token) {
    if (config.headers) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      Router.push('/login');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
