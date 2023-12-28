import { useTheme } from "@/contexts/theme"
import { useEffect } from "react"
import { FaMoon, FaSun } from "react-icons/fa"
import { themeChange } from "theme-change"

export const ThemeToggle = () => {
  "use client"
  useEffect(() => {
    themeChange(false)
  }, [])

  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme)
    }
  }, [theme])

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
