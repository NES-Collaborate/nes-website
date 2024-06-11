import axios from "axios"

export const axiosApi = axios.create({
  baseURL: `/api`,
})

export const axiosServer = axios.create({
  baseURL: `/api/server`,
  headers: {
    "Content-Type": "application/json",
  },
})
