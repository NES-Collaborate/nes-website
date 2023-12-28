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

export type News = {
  targetUrl: string
  imageUrl: string
  title: string
  subtitle: string
}

export const LANDING_PAGES: LandingPage[] = [
  { name: "Home", url: "/nes", icon: IoMdHome },
  { name: "Processo Seletivo", url: "/nes/subscription", icon: FaClipboardList },
  { name: "Material Gratuito", url: "/nes/material", icon: IoDocumentText },
  { name: "Contatos", url: "/nes/contact", icon: IoIosMail },
  { name: "Doações", url: "/nes/donate", icon: FaHandHoldingHeart },
  { name: "Sobre o NES", url: "/nes/about", icon: FaCircleInfo },
]

export const LOGOS = {
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
}

export const DEFAULT_NEWS: News = {
  targetUrl: "https://globoplay.globo.com/v/12067813/",
  imageUrl: "https://lh3.googleusercontent.com/proxy/DopkzTmH0exoPyCwqPaZki-sleBMqYX3J-jyV_lPilZ04YxmfDvmCXkpgrjbURfySDj8s442q8eHflHtvyLW5-M7IAYrm-5R",
  title: "AL TV 1ª Edição | Instituto de Matemática prepara talentos na área de exatas, ciências e computação | Globoplay",
  subtitle: "Projeto reúne alunos do ensino médio."
}