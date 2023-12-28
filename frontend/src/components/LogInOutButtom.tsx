import { useSession } from "@/contexts/session"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IoIosLogIn, IoIosLogOut } from "react-icons/io"

export const LogInOutButtom = () => {
  const pathname = usePathname()
  const session = useSession()

  if (pathname === "/auth/login") return null

  return (
    <Link
      className="btn btn-primary"
      href={session.user ? "/auth/logout" : "/auth/login"}
    >
      {session.user ? <IoIosLogOut /> : <IoIosLogIn />}
      {session.user ? "Sair" : "Entrar"}
    </Link>
  )
}
