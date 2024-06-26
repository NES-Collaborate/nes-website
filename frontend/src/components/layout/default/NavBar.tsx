import { useEffect, useState } from "react"
import { Button } from "react-daisyui"
import { FaBars } from "react-icons/fa6"
import Logo from "./Logo"

type Props = {
  toggleDrawerVisibility: () => void
  center?: JSX.Element
}

/**
 * NavBar component for Landing Page
 * @param {function} toggleDrawerVisibility Function to toggle the drawer
 * @param {JSX.Element} center A center component to be in the middle. Default is a Breadcrumb
 * @returns {JSX.Element} Navbar
 */
const NavBar = ({ toggleDrawerVisibility, center }: Props) => {
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
        <Button shape="circle" onClick={toggleDrawerVisibility}>
          <FaBars />
        </Button>
      </div>
      <div className="navbar-center">{center}</div>
      <div className="navbar-end gap-3">
        <Logo
          type={windowWidth < 500 ? "circle" : "horizontal"}
          size={40}
          className="ml-3"
        />
      </div>
    </div>
  )
}

export default NavBar
