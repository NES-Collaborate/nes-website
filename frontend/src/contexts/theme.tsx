import { createContext, useContext, useState } from "react"

type ThemeContext = {
  theme: string
  setTheme: (updateTheme: (currentTheme: string) => "dark" | "light") => void
}

export const themeContext = createContext<ThemeContext>({
  theme: "dark",
  setTheme: () => {},
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark"
    }
    return "dark"
  })

  return (
    <themeContext.Provider value={{ theme, setTheme }}>{children}</themeContext.Provider>
  )
}

export const useTheme = () => useContext(themeContext)
