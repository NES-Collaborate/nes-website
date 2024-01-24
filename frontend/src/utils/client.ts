import { User } from "@/types/user"

/**
 * Get user photo url to display
 * @param user The user instance
 * @returns string
 */
export const getUserPhotoUrl = (user: User) =>
  user?.photo?.location || "/img/default-user.png"
