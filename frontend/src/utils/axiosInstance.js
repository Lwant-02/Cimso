import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:8001/v1/api"
      : "/v1/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
