import { createContext, useContext, useEffect, useState } from "react"

type ThemeContext = {
  theme: string
  setTheme: (updateTheme: (currentTheme: string) => "dark" | "light") => void
}

export const themeContext = createContext<ThemeContext>({
  theme: "dark",
  setTheme: () => {},
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "dark")
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <themeContext.Provider value={{ theme, setTheme }}>{children}</themeContext.Provider>
  )
}

/**
 * The hook to get the current theme state
 * @returns Current user's theme
 */
export const useTheme = () => useContext(themeContext)
