import axios from "axios"

export const axiosApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
})

export const axiosServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/server`,
})
