import { BREADCRUMB_NAMES } from "@/data/translations"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Breadcrumbs } from "react-daisyui"

const BLACK_LIST: string[] = ["about"]

/**
 * Breadcrumb component for navigation on NavBar
 */
const Breadcrumb = () => {
  const pathname = usePathname()
  const [splitedPath, setSplitedPath] = useState<string[]>([])

  useEffect(() => {
    setSplitedPath(pathname.split("/").filter((x) => x && !BLACK_LIST.includes(x)))
  }, [pathname, splitedPath.length])

  return (
    <Breadcrumbs className="max-w-16 min-[280px]:max-w-32 min-[340px]:max-w-48 min-[410px]:max-w-64 min-[590px]:max-w-xs min-[768px]:max-w-full text-sm flex justify-start">
      {splitedPath.map((x, i) => {
        const url = `/${splitedPath.slice(0, i + 1).join("/")}`

        return (
          <Breadcrumbs.Item key={i} href={url}>
            {BREADCRUMB_NAMES[x] || x}
          </Breadcrumbs.Item>
        )
      })}
    </Breadcrumbs>
  )
}

export default Breadcrumb
