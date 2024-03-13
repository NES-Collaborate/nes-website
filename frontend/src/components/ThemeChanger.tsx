import { useTheme } from "@/contexts/theme"
import { possibleThemes } from "@/types/constants"
import { useEffect } from "react"
import { themeChange } from "theme-change"

/**
 * Button to toggle theme
 * @returns {JSX.Element} Theme Toggle Buttom
 */
const ThemeChanger = () => {
  useEffect(() => {
    themeChange(false)
  }, [])

  const { theme, setTheme } = useTheme()

  return (
    <select
      data-choose-theme
      onChange={(e) => setTheme(e.target.value)}
      className="select select-sm select-bordered"
      defaultValue={theme}
    >
      {possibleThemes.map((theme) => (
        <option key={theme} value={theme}>
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </option>
      ))}
    </select>
  )
}

export default ThemeChanger
