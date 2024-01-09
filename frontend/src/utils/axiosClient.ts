import axios from "axios"

export const axiosApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api`,
})

export const axiosServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/server`,
})
