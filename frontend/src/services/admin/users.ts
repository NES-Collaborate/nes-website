import { User } from "@/types/user"
import { AxiosInstance } from "axios"

export const fetchUsers = async (client: AxiosInstance, q: string): Promise<User[]> => {
  const res = await client.get("/admin/users", {
    params: {
      q,
    },
  })
  return res.data.users
}
