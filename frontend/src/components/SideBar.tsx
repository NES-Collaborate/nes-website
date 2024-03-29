import { useSession } from "@/contexts/session"
import { LANDING_PAGES, USER_PAGES } from "@/data/constants"
import { User } from "@/types/user"
import { getUserPhotoUrl } from "@/utils/client"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { Button, Menu } from "react-daisyui"
import { IoClose } from "react-icons/io5"
import LoginButtom from "./LoginButtom"
import ThemeChanger from "./ThemeChanger"

type Props = {
  toggleDrawerVisibility: () => void
}

const SideBar = ({ toggleDrawerVisibility }: Props) => {
  const session = useSession()
  const profilePhoto = getUserPhotoUrl(session.user as User)

  const userPages = USER_PAGES.filter((page) =>
    page.allowedUserTypes.includes(session.user?.type as User["type"])
  )

  return (
    <div className="flex flex-col gap-1 bg-base-200 h-screen">
      <Button
        className="!absolute right-2 top-2 bg-red-500 btn-circle"
        size="xs"
        onClick={toggleDrawerVisibility}
      >
        <IoClose size={21} />
      </Button>

      <div
        className={clsx(
          session.user && "hidden",
          "justify-center flex items-center my-3"
        )}
      >
        <LoginButtom />
      </div>

      <div className={clsx(!session.user && "hidden", "p-2 flex flex-col items-center")}>
        <Button shape="circle">
          <Image
            src={profilePhoto}
            alt={`${session.user?.name} profile photo`}
            width={50}
            height={50}
            className="rounded-full"
          />
        </Button>
        <span className="text-md text-center">Olá, {session.user?.name}</span>
      </div>

      <Menu className={clsx(!session.user && "hidden", "p-4 w-60 md:w-80")}>
        <h1 className="text-xl text-center">Área Protegida</h1>
        {userPages.map((page, i) => (
          <Menu.Item key={i}>
            <Link href={page.url}>
              <page.icon /> {page.name}
            </Link>
          </Menu.Item>
        ))}
      </Menu>

      <Menu className="p-4">
        <h1 className="text-xl text-center">Área de Visitantes</h1>
        {LANDING_PAGES.map((page, i) => (
          <Menu.Item key={i}>
            <Link href={page.url}>
              <page.icon /> {page.name}
            </Link>
          </Menu.Item>
        ))}
      </Menu>

      <div className="p-4 max-w-lg flex flex-col mx-auto">
        <h1 className="text-lg text-center">Tema do Site</h1>
        <ThemeChanger />
      </div>
    </div>
  )
}

export default SideBar
