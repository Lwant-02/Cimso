import axios from "axios";

export const newAxiosInstance = axios.create({
  baseURL: "https://cismo-main-bbgu3m.laravel.cloud/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
