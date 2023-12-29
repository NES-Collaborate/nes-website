import { useTheme } from "@/contexts/theme"
import { useEffect } from "react"
import { FaMoon, FaSun } from "react-icons/fa"
import { themeChange } from "theme-change"

/**
 * Button to toggle theme
 * @returns {JSX.Element} Theme Toggle Buttom
 */
export const ThemeToggle = () => {
  useEffect(() => {
    themeChange(false)
  }, [])

  const { theme, setTheme } = useTheme()

  const themeIcon = (theme: string) =>
    theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />

  return (
    <button
      data-toggle-theme="dark,light"
      data-act-class={theme}
      onClick={() =>
        setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"))
      }
    >
      {themeIcon(theme)}
    </button>
  )
}
