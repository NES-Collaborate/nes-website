import axios from "axios"

export const axiosApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
})
