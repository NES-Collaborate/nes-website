import { axiosSesh } from "@/utils/axiosClient"

export const getUser = async (username: string) => {
  // TODO: Add error handling
  return (await axiosSesh.get(`/users/${username}`)).data
}
