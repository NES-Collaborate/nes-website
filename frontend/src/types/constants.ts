import { IconType } from "react-icons"

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
