import { useCallback, useState } from "react"
import { Drawer } from "react-daisyui"
import NavBar from "./NavBar"
import SideBar from "./SideBar"

type Props = {
  children: React.ReactNode
}

/**
 * Drawer component controller for show SideBar dynamically
 * @param {React.ReactNode} children
 */
const DrawerNES = ({ children }: Props) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = useCallback(() => {
    setVisible((v) => !v)
  }, [])

  return (
    <Drawer side={<SideBar toggleDrawerVisibility={toggleVisible} />} open={visible} onClickOverlay={toggleVisible}>
      <NavBar toggleDrawerVisibility={toggleVisible} />
      {children}
    </Drawer>
  )
}

export default DrawerNES
