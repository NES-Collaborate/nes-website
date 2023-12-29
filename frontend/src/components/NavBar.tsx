import { useEffect, useState } from "react"
import { LandingPageDropDown } from "./LandingPageDropDown"
import { LogInOutButtom } from "./LogInOutButtom"
import { Logo } from "./Logo"
import { ThemeToggle } from "./ThemeToggle"

export const NavBar = () => {
  const [windowWidth, setWindowWidth] = useState(1080)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <LandingPageDropDown />
      </div>
      <div className="navbar-center">
        <Logo type={windowWidth < 410 ? "circle" : "horizontal"} size={40} />
      </div>
      <div className="navbar-end gap-3">
        <ThemeToggle />
        <LogInOutButtom />
      </div>
    </div>
  )
}
