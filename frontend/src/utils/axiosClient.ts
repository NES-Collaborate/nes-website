import axios from "axios"

export const axiosSesh = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
})
