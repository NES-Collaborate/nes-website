import { useTheme } from "@/contexts/theme"
import { LOGOS } from "@/data/constants"
import Image from "next/image"
import { useEffect, useState } from "react"

type Props = {
  type: "circle" | "horizontal" | "banner" | "bannerProcessoSeletivo" | "obmepMedals" | "mathBanner"
  size?: number
  alt?: string
  className?: string
}

/**
 * Handler to render some default images like logos and banners.
 * @param {string} type Type of logo (image key in `LOGOS`)
 * @param {number} size Size of the image (px, the width will be calculated based on the height)
 * @param {string} alt Alternative text
 * @param {string} className Class name
 * @returns {Image} Image component
 */
export const Logo = ({ type, size, alt = "Logo", className = "" }: Props) => {
  const { theme } = useTheme()

  const realType = () => {
    if (type == "horizontal" && theme == "dark") return "whiteHorizontal"
    return type
  }

  const logo = LOGOS[realType()]
  const finalHeight = size || logo.height
  const finalWidth = size ? (logo.width / logo.height) * finalHeight : logo.width

  return (
    <Image
      alt={alt}
      className={className}
      src={logo.src}
      height={finalHeight}
      width={finalWidth}
    />
  )
}
