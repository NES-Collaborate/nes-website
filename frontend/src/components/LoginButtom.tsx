import { usePathname } from "next/navigation"
import { IoIosLogIn } from "react-icons/io"
import { Button } from "./Button"

/**
 * Buttom to redirect user to login page
 * @returns {JSX.Element} Buttom
 */
export const LoginButtom = () => {
  const pathname = usePathname()
  if (pathname === "/auth/login") return null

  return (
  <Button
    type="navigation"
    style="fill" 
    href="/auth/login"
  >
    <IoIosLogIn />
    Entrar
  </Button>
  )
}
