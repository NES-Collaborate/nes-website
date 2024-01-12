import { Image, LandingPage, UserPage } from "@/types/constants"
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
    name: "Turmas",
    url: "/app/classroom",
    icon: FiUsers,
    allowedUserTypes: ["admin", "other"],
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
 * Friendly Names for Breadcrumb Items
 */
export const BREADCRUMB_NAMES: Record<string, string> = {
  app: "Home",
  classrooms: "Turmas",
  admin: "Administração",
  lp: "Landing Page",
  notices: "Notícias",
  bens: "Bens",
  nes: "NES",
  auth: "Autenticação",
  login: "Login",
  about: "Sobre",
  "learn-more": "Saiba mais",
  contact: "Contatos",
  material: "Material Gratuito",
  subscription: "Processo Seletivo",
  schedule: "Cronograma",
}

/**
 * Path to Cache directory to save small files
 */
export const CACHE_DIR = path.join(process.cwd(), "public", "cache")

/**
 * Translatiosns of the `PostType`s
 */
export const POST_TYPE_TRANSLATIONS = {
  Notice: "Aviso",
  ClassMaterial: "Material de Aula",
  Test: "Prova",
  Activity: "Atividade",
}

export type Material = {
  imageUrl: string
  title: string
  description: string
  url: string
}

export type Event = {
  date: string
  description: string
}

export type Selection = {
  year: string
  isOpen: boolean
  schedule: Event[]
}

export const SELECTIONS_EXAMPLES = [
  {
    year: "2024",
    isOpen: true,
    schedule: [
      {
        date: "25/12/2024",
        description: "Natal",
      },
      {
        date: "31/12/2024",
        description: "Ano Novo",
      },
    ],
  },
  {
    year: "2023.2",
    isOpen: false,
    schedule: [
      {
        date: "25/12/2023",
        description: "Natal",
      },
      {
        date: "31/12/2023",
        description: "Ano Novo",
      },
    ],
  },
  {
    year: "2023.1",
    isOpen: false,
    schedule: [
      {
        date: "Junho de 2023",
        description: "São João",
      },
      {
        date: "01/01/2023",
        description: "Ano Novo",
      },
    ],
  },
]
