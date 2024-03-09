import { UserFormData } from "@/schemas/user"
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

export const createUser = async (
  client: AxiosInstance,
  user: UserFormData
): Promise<User> => {
  const res = await client.post("/admin/users", user)
  return res.data.user
}

export const editUser = async (
  client: AxiosInstance,
  user: UserFormData
): Promise<User> => {
  const res = await client.put(`/admin/users/${user.id}`, user)
  return res.data.user
}

export const deleteUser = async (
  client: AxiosInstance,
  userId: number
): Promise<void> => {
  await client.delete(`/admin/users/${userId}`)
}
