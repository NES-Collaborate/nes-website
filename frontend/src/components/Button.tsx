import Link from "next/link"
import clsx from "clsx"
import { useEffect, useState } from "react"

type Props = {
  type: "navigation" | "action"
  style: "fill" | "outline" | "ghost" | "link" 
  color?: "primary" | "secondary"
  className?: string
  href?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  children?: React.ReactNode
}

/**
 * Button component.
 * @param {string} type Type of the button
 * @param {number} style The style of the button
 * @param {string} color The color of the button
 * @param {string} className Additional classes
 * @param {string} href The reference of the button
 * @param {React.MouseEventHandler<HTMLButtonElement>} onClick Function to call when click
 * @param {boolean} disabled True if the button is disabled
 * @param {React.ReactNode} children The content inside the button
 * @returns {Link | button} Button 
 */
export const Button = ({type, 
                        style, 
                        color, 
                        className = "", 
                        href="", 
                        onClick,
                        disabled,
                        children }: Props) => {
  const [buttonStyle, setButtonStyle] = useState("")

  useEffect(() => {
    let styleClasses: string = ""

    if (style === "fill") {
      styleClasses += "btn text-gray-300  "
      if (color === "primary") {
        styleClasses += "bg-primary hover:bg-accent "
      } else if (color === "secondary") {
        styleClasses += "bg-secondary hover:bg-neutral "
      }
    } else if (style === "outline") {
      styleClasses += "btn btn-outline "
      if (color === "primary") {
        styleClasses += "text-primary hover:bg-primary hover:text-gray-300 "
      } else if (color === "secondary") {
        styleClasses += "text-secondary hover:bg-secondary hover:text-gray-300 "
      }
    } else if (style === "ghost") {
      styleClasses += "btn btn-ghost text-gray-300 "
      if (color === "primary") {
        styleClasses += "hover:bg-primary "
      } else if (color === "secondary") {
        styleClasses += "hover:bg-secondary "
      }
    } else if (style === "link") {
      styleClasses += "btn-link text-gray-300 hover:bg-primary "
    }

    styleClasses += className

    setButtonStyle(styleClasses)

  }, [style, color, className])  

  return (
    <>
      {type === "navigation" && (
      <Link className={clsx(buttonStyle)} href={href}>
        {children}
      </Link>
      )}
      {type === "action" && (
        <button
        className={clsx(buttonStyle)}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
      )}
    </>
  )
}
