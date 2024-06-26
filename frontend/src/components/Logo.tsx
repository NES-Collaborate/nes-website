import { useTheme } from "@/contexts/theme"
import { LOGOS } from "@/data/constants"
import { isDarkTheme } from "@/utils/client"
import Image from "next/image"

type Props = {
  type:
    | "circle"
    | "horizontal"
    | "banner"
    | "bannerProcessoSeletivo"
    | "obmepMedals"
    | "computerBanner"
    | "library"
    | "calendarBanner"
    | "bannerInscricoes"
    | "bannerResultados"
  size?: number
  alt?: string
  className?: string
  onClick?: React.MouseEventHandler<HTMLImageElement>
}

/**
 * Handler to render some default images like logos and banners.
 * @param {string} type Type of logo (image key in `LOGOS`)
 * @param {number} size Size of the image (px, the width will be calculated based on the height)
 * @param {string} alt Alternative text
 * @param {string} className Class name
 * @param {React.MouseEventHandler<HTMLImageElement>} onClick Function to call when click
 * @returns {Image} Image component
 */
const Logo = ({ type, size, alt = "Logo", className = "", onClick }: Props) => {
  const { theme } = useTheme()

  const realType = () => {
    if (type == "horizontal" && isDarkTheme(theme)) return "whiteHorizontal"
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
      onClick={onClick}
    />
  )
}

export default Logo
