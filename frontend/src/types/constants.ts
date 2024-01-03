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
  targetUrl: string
  imageUrl: string
  title: string
  subtitle: string
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


export type SuccessCase = {
  id: number
  imagePath: string
  name: string
  city: string
  results: string
  difficulties: string
  phrase: string
}