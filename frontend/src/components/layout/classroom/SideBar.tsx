import { useSession } from "@/contexts/session"
import Link from "next/link"
import { Button, Divider } from "react-daisyui"
import { FaHouse } from "react-icons/fa6"
import UserProfileSmall from "../default/UserProfileSmall"
import { ClassroomInfinityScroll } from "./ClassroomsInfinityScroll"

type Props = {
  toggleDrawerVisibility: () => void
}

const SideBar = ({ toggleDrawerVisibility }: Props) => {
  const { user } = useSession()
  return (
    <div className="bg-base-100 max-w-xs w-full h-screen rounded-r-lg">
      <UserProfileSmall user={user} position="right" />
      <Divider className="my-0" color="primary" />

      <ClassroomInfinityScroll />

      <Link href="/app">
        <Button color="accent" className="w-full fixed bottom-0 flex items-center">
          <FaHouse size={20} />
          <span>Voltar para o site principal</span>
        </Button>
      </Link>
    </div>
  )
}

export default SideBar
