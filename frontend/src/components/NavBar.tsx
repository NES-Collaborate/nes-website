import { useSession } from "@/contexts/session"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IoHome } from "react-icons/io5"
import { LogInOutButtom } from "./LogInOutButtom"
import { Logo } from "./Logo"
import { NavBarDropDown } from "./NavBarDropDown"
import { ThemeToggle } from "./ThemeToggle"

/**
 * NavBar component for Landing Page
 * @returns {JSX.Element} Navbar
 */
export const NavBar = () => {
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
        {session.user && (
          <Link href="/app">
            <IoHome size={20} />
          </Link>
        )}
        <LogInOutButtom />
      </div>
    </div>
  )
}
