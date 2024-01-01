import Link from "next/link"
import { usePathname } from "next/navigation"
import { IoIosLogIn } from "react-icons/io"

/**
 * Buttom to redirect user to login page
 * @returns {JSX.Element} Buttom
 */
export const LoginButtom = () => {
  const pathname = usePathname()
  if (pathname === "/auth/login") return null

  return (
    <Link className="btn btn-primary" href="/auth/login">
      <IoIosLogIn />
      Entrar
    </Link>
  )
}
