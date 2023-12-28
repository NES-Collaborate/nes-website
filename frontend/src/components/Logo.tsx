import { useTheme } from "@/contexts/theme"
import { LOGOS } from "@/data/constants"
import Image from "next/image"

type Props = {
  type: "circle" | "horizontal"
  size?: number
}

export const Logo = ({ type, size }: Props) => {
  const { theme } = useTheme()

  const realType = () => {
    if (type == "horizontal" && theme == "dark") return "whiteHorizontal"
    return type
  }

  const logo = LOGOS[realType()]
  const finalHeight = size || logo.height
  const finalWidth = size ? (logo.width / logo.height) * finalHeight : logo.width

  return <Image alt="Logo" src={logo.src} height={finalHeight} width={finalWidth} />
}
