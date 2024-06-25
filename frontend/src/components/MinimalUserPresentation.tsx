import { User } from "@/types/user"
import { cn, getUserPhotoUrl } from "@/utils/client"
import Image from "next/image"

type UserProps = {
  user: User
  type: "small" | "full"
}

const MinimalUserPresentation: React.FC<UserProps> = ({ user, type }) => {
  return (
    <div
      className={cn(
        type === "full" ? "p-3" : "p-1",
        "flex items-center space-x-2 bg-base-200 rounded-lg"
      )}
    >
      <Image
        src={getUserPhotoUrl(user)}
        alt={user.name}
        className="rounded-full"
        width={24}
        height={24}
      />

      <span className={type === "full" ? "font-sm font-normal" : "font-sm font-semibold"}>
        {user.name}
      </span>
    </div>
  )
}

export default MinimalUserPresentation
