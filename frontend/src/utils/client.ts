import { Attach } from "@/types/entities"
import { User } from "@/types/user"
import { axiosServer } from "./axiosClient"

/**
 * Get user photo url to display
 * @param user The user instance
 * @returns string
 */
export const getUserPhotoUrl = (user: User) =>
  user?.photo?.location || "/img/default-user.png"

/**
 * Upload a file to backend and register it as an attachment
 * @param attach A file to upload
 * @param token The logged user session
 * @returns Attach if success or error message
 */
export const uploadAttach = async (attach: any, token: string) => {
  const form = new FormData()
  form.append("data", attach)
  try {
    const res = await axiosServer.post("/upload", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data as Attach
  } catch {
    return "Erro ao registrar anexo. Tente novamente mais tarde."
  }
}
