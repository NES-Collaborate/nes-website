import { IconType } from "react-icons"
import { User } from "./user"

/**
 * Landing Page Representation
 */
export type LandingPage = {
  name: string
  url: string
  icon: IconType
}

/**
 * Notice type that appears on Landing Page
 */
export type Notice = {
  id: number
  url: string
  image: string
  title: string
  description: string
}

/**
 * Properties of an event in the schedule of a Selection
 */
export type Event = {
  id: number
  date: string
  description: string
}

/**
 * Properties of a student in the results of a Selection
 */
export type Student = {
  id: number
  name: string
  city: string
  UF: string
}

/**
 * Properties of a selection process
 */
export type Selection = {
  id: number
  year: string
  isOpen: boolean
  subscriptionUrl: string
  programUrl: string
  schedule?: Event[]
  results?: Student[]
}

/**
 * Image representation
 */
export type Image = {
  src: string
  width: number
  height: number
}

/**
 * Type for Logged User Page
 */
export type UserPage = {
  name: string
  url: string
  icon: IconType
  allowedUserTypes: User["type"][]
}

/**
 * Success Case's representation
 */
export type SuccessCase = {
  id: number
  imagePath: string
  name: string
  city: string
  results: string
  difficulties: string
  phrase: string
}

/**
 * Serie representation
 */
export type Serie = "9º EF" | "1º EM" | "2º EM" | "3º EM"

/**
 * User Type representation
 */
export type UserType = "admin" | "other" | "student"

export const possibleThemes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
]
