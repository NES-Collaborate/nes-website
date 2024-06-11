import axios from "axios"

export const axiosApi = axios.create({
  baseURL: `/api`,
})

export const axiosServer = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:8000/api" : "/api/server",
  headers: {
    "Content-Type": "application/json",
  },
})
