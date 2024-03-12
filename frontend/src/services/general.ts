import { User } from "@/types/user"
import { AxiosInstance } from "axios"

export const fetchMe = async (
  client: AxiosInstance,
  token: string
): Promise<User | null> => {
  try {
    const res = await client.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (err) {
    return null
  }
}

export const logOut = async (client: AxiosInstance): Promise<void> => {
  await client.get("/logout")
}
