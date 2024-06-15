import { User } from "@/types/user"
import { cn, getUserPhotoUrl } from "@/utils/client"
import Image from "next/image"
import { Button } from "react-daisyui"
import LoginButtom from "./LoginButtom"

type Props = {
  user: User | null
  position?: "bottom" | "right"
}

const UserProfileSmall = ({ user, position = "bottom" }: Props) => {
  if (!user)
    return (
      <div className="justify-center flex items-center my-3">
        <LoginButtom />
      </div>
    )

  return (
    <div
      className={cn(
        "flex gap-1 items-center",
        position === "bottom" && "flex-col",
        position === "right" && "ml-2 mt-2"
      )}
    >
      <Button shape="circle">
        <Image
          src={getUserPhotoUrl(user)}
          alt={`${user?.name} profile photo`}
          width={50}
          height={50}
          className="rounded-full"
        />
      </Button>
      <span className="text-md text-center">{user?.name}</span>
    </div>
  )
}

export default UserProfileSmall
