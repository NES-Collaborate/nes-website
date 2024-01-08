import { useSession } from "@/contexts/session"
import { useEffect, useState } from "react"
import LoggedUserDropDown from "./LoggedUserDropDown"
import LoginButtom from "./LoginButtom"
import Logo from "./Logo"
import NavBarDropDown from "./NavBarDropDown"
import ThemeToggle from "./ThemeToggle"

/**
 * NavBar component for Landing Page
 * @returns {JSX.Element} Navbar
 */
const NavBar = () => {
  const session = useSession()
  const [windowWidth, setWindowWidth] = useState(1080)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start gap-3">
        <NavBarDropDown />
        <ThemeToggle />
      </div>
      <div className="navbar-center">
        <Logo type={windowWidth < 410 ? "circle" : "horizontal"} size={40} />
      </div>
      <div className="navbar-end gap-3">
        {session.user ? <LoggedUserDropDown /> : <LoginButtom />}
      </div>
    </div>
  )
}

export default NavBar
