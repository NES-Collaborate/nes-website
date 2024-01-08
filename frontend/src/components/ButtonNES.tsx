import Link from "next/link"
import { useEffect, useState } from "react"

type Props = {
  type?: "navigation" | "action"
  style?: "fill" | "outline" | "ghost" | "link"
  className?: string
  href?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  children?: React.ReactNode
}

/**
 * Personalized buttom component
 * @param {string} type Type of the button. Defaults to action
 * @param {number} style The style of the button. Defaults to fill
 * @param {string} className Additional classes
 * @param {string} href The reference of the button
 * @param {React.MouseEventHandler<HTMLButtonElement>} onClick Function to call when click
 * @param {boolean} disabled True if the button is disabled
 * @param {React.ReactNode} children The content inside the button
 * @returns {Link | button} Button
 */
const ButtonNES = ({
  type = "action",
  style = "fill",
  className = "",
  href = "",
  onClick,
  disabled = false,
  children,
}: Props) => {
  const [buttonStyle, setButtonStyle] = useState("")

  useEffect(() => {
    switch (style) {
      case "fill":
        setButtonStyle("btn text-gray-300 bg-primary hover:bg-secondary")
        break
      case "outline":
        setButtonStyle(
          "btn btn-outline text-primary hover:bg-primary hover:text-gray-300"
        )
        break
      case "ghost":
        setButtonStyle("btn btn-ghost text-gray-300 hover:bg-primary")
        break
      case "link":
        setButtonStyle("btn-link text-gray-300 hover:bg-primary")
        break
    }

    setButtonStyle((currentStyle) => `${currentStyle} ${className}`)
  }, [style, className])

  return (
    <>
      {type === "navigation" && (
        <Link className={buttonStyle} href={href}>
          {children}
        </Link>
      )}
      {type === "action" && (
        <button className={buttonStyle} onClick={onClick} disabled={disabled}>
          {children}
        </button>
      )}
    </>
  )
}

export default ButtonNES
