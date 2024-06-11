import ButtonNES from "@/components/ButtonNES"
import { usePathname } from "next/navigation"
import { IoIosLogIn } from "react-icons/io"

/**
 * Buttom to redirect user to login page
 * @returns {JSX.Element} Buttom
 */
const LoginButtom = () => {
  const pathname = usePathname()
  if (pathname === "/auth/login") return null

  return (
    <ButtonNES type="navigation" style="fill" href="/auth/login">
      <IoIosLogIn />
      Entrar
    </ButtonNES>
  )
}

export default LoginButtom
