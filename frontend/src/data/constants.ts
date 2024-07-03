import { Image, LandingPage, Serie, UserPage, UserType } from "@/types/constants"
import path from "path"
import { FaClipboardList, FaHandHoldingHeart, FaUser } from "react-icons/fa"
import { FaCircleInfo } from "react-icons/fa6"
import { FiBook, FiLogOut, FiSettings, FiUsers } from "react-icons/fi"
import { IoIosMail, IoMdHome } from "react-icons/io"
import { IoDocumentText } from "react-icons/io5"

/**
 * Landing Pages of the project
 */
export const LANDING_PAGES: LandingPage[] = [
  { name: "Início", url: "/nes", icon: IoMdHome },
  { name: "Processo Seletivo", url: "/nes/selection", icon: FaClipboardList },
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
  computerBanner: {
    src: "/img/computer-banner.jpg",
    width: 1440,
    height: 960,
  },
  library: {
    src: "/img/library.jpg",
    width: 960,
    height: 1440,
  },
  calendarBanner: {
    src: "/img/calendarBanner.jpg",
    width: 1500,
    height: 1175,
  },
  bannerInscricoes: {
    src: "/img/bannerInscricoes.png",
    width: 1366,
    height: 768,
  },
  bannerResultados: {
    src: "/img/bannerResultados.png",
    width: 1366,
    height: 768,
  },
}

/**
 * Logged User Dropdown
 */
export const USER_PAGES: UserPage[] = [
  {
    name: "Home",
    url: "/app",
    icon: IoMdHome,
    allowedUserTypes: ["admin", "other", "student"],
  },
  {
    name: "Perfil",
    url: "/app/profile",
    icon: FaUser,
    allowedUserTypes: ["admin", "other", "student"],
  },
  {
    name: "Matérias",
    url: "/app/subject",
    icon: FiBook,
    allowedUserTypes: ["student"],
  },
  {
    name: "Administração",
    url: "/app/admin",
    icon: FiSettings,
    allowedUserTypes: ["admin"],
  },
  {
    name: "Sair",
    url: "/auth/logout",
    icon: FiLogOut,
    allowedUserTypes: ["admin", "other", "student"],
  },
]

/**
 * Path to Cache directory to save small files
 */
export const CACHE_DIR = path.join(process.cwd(), "public", "cache")

/**
 * Properties of a material (e.g.: Books and videos)
 */
export type Material = {
  imageUrl: string
  title: string
  description: string
  url: string
}

/**
 * Possible series
 */
export const SERIES: [Serie, ...Serie[]] = ["9º EF", "1º EM", "2º EM", "3º EM"]

/**
 * Possible user types
 */
export const USER_TYPES: [string, ...string[]] = ["admin", "other", "student"]

export const USER_TYPES_MASK: Record<UserType | string, string> = {
  admin: "Administrador",
  other: "Professor/Monitor",
  student: "Aluno",
}
