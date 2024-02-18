import { User } from "@/types/user"
import { AxiosInstance } from "axios"

export const getUser = async (
  userId: number,
  axios: AxiosInstance
): Promise<User | null> => {
  try {
    const res = await axios.get("/admin/users", {
      params: {
        id: userId,
      },
    })

    const users = res.data.users as User[]
    if (users.length == 0) return null
    return users[0]
  } catch {
    return null
  }
}
