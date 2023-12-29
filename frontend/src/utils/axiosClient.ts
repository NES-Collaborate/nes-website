import axios from "axios"

export const axiosSesh = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
})

export const axiosApi = axios.create({
  baseURL: "http://localhost:3000/api",
})
