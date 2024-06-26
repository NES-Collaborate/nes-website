import { User } from "@/types/user"
import { getUserPhotoUrl } from "@/utils/client"
import Image from "next/image"

type UserProps = {
  user: User
}

const MinimalUserPresentation: React.FC<UserProps> = ({ user }) => {
  return (
    <div className="flex items-center space-x-2 p-1 bg-base-200 rounded-lg">
      <Image
        src={getUserPhotoUrl(user)}
        alt={user.name}
        className="rounded-full"
        width={24}
        height={24}
      />

      <span className="text-xs font-semibold">{user.name}</span>
    </div>
  )
}

export default MinimalUserPresentation
