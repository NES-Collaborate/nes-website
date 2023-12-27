import { IconType } from "react-icons"
import { FaClipboardList, FaHandHoldingHeart } from "react-icons/fa"
import { FaCircleInfo } from "react-icons/fa6"
import { IoIosMail, IoMdHome } from "react-icons/io"
import { IoDocumentText } from "react-icons/io5"

type LandingPage = {
  name: string
  url: string
  icon: IconType
}

export const LANDING_PAGES: LandingPage[] = [
  { name: "Home", url: "/home", icon: IoMdHome },
  { name: "Processo Seletivo", url: "/subscription", icon: FaClipboardList },
  { name: "Material Gratuito", url: "/material", icon: IoDocumentText },
  { name: "Contatos", url: "/contact", icon: IoIosMail },
  { name: "Doações", url: "/donate", icon: FaHandHoldingHeart },
  { name: "Sobre o NES", url: "/about", icon: FaCircleInfo },
]
