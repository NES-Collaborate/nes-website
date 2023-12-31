import { Image, LandingPage, Notice } from "@/types/constants"
import { FaClipboardList, FaHandHoldingHeart } from "react-icons/fa"
import { FaCircleInfo } from "react-icons/fa6"
import { IoIosMail, IoMdHome } from "react-icons/io"
import { IoDocumentText } from "react-icons/io5"

/**
 * Landing Pages of the project
 */
export const LANDING_PAGES: LandingPage[] = [
  { name: "Home", url: "/nes", icon: IoMdHome },
  { name: "Processo Seletivo", url: "/nes/subscription", icon: FaClipboardList },
  { name: "Material Gratuito", url: "/nes/material", icon: IoDocumentText },
  { name: "Contatos", url: "/nes/contact", icon: IoIosMail },
  { name: "Doações", url: "/nes/donate", icon: FaHandHoldingHeart },
  { name: "Sobre o NES", url: "/nes/about", icon: FaCircleInfo },
]

/**
 * Some default images to use
 */
export const LOGOS: Record<string, Image> = {
  circle: {
    src: "/img/circle.png",
    width: 561,
    height: 562,
  },
  horizontal: {
    src: "/img/horizontal.png",
    width: 756,
    height: 266,
  },
  whiteHorizontal: {
    src: "/img/white-horizontal.png",
    width: 752,
    height: 266,
  },
  banner: {
    src: "/img/banner.png",
    width: 2611,
    height: 1003,
  },
  bannerProcessoSeletivo: {
    src: "/img/banner-processo-seletivo.gif",
    width: 1280,
    height: 326,
  },
  obmepMedals: {
    src: "/img/obmep-medals.jpg",
    width: 3744,
    height: 2494,
  },
  mathBanner: {
    src: "/img/math-banner.jpg",
    width: 6000,
    height: 4000,
  },
}
