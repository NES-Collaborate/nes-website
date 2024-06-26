import { useCallback, useEffect, useState } from "react"
import { Drawer } from "react-daisyui"
import ClassroomSideBar from "./classroom/SideBar"
import Breadcrumb from "./default/Breadcrumb"
import NavBar from "./default/NavBar"
import DefaultSideBar from "./default/SideBar"

type Props = {
  children: React.ReactNode
  type: "default" | "classroom"
}

const Layout = ({ children, type }: Props) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = useCallback(() => {
    setVisible((v) => !v)
  }, [])

  const [sideBar, setSideBar] = useState<JSX.Element>(
    <DefaultSideBar toggleDrawerVisibility={toggleVisible} />
  )
  const [navBarCenter, setNavBarCenter] = useState<JSX.Element>(<Breadcrumb />)

  useEffect(() => {
    if (type === "classroom") {
      setSideBar(<ClassroomSideBar toggleDrawerVisibility={toggleVisible} />)
    } else if (type === "default") {
      setSideBar(<DefaultSideBar toggleDrawerVisibility={toggleVisible} />)
    }
  }, [type, toggleVisible])

  useEffect(() => {
    if (type === "classroom") {
      setNavBarCenter(<>Classroom NES</>)
    } else if (type === "default") {
      setNavBarCenter(<Breadcrumb />)
    }
  }, [type])

  return (
    <Drawer side={sideBar} open={visible} onClickOverlay={toggleVisible}>
      <NavBar toggleDrawerVisibility={toggleVisible} center={navBarCenter} />
      {children}
    </Drawer>
  )
}

export default Layout
