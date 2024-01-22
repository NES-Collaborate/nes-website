import { BREADCRUMB_NAMES } from "@/data/constants"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Breadcrumbs } from "react-daisyui"

const BLACK_LIST = ["about"]

/**
 * Breadcrumb component for navigation on NavBAr
 */
const Breadcrumb = () => {
  const pathname = usePathname()
  const [splitedPath, setSplitedPath] = useState<string[]>([])

  useEffect(() => {
    setSplitedPath(pathname.split("/").filter((x) => x && !BLACK_LIST.includes(x)))
  }, [pathname, splitedPath.length])

  return (
    <Breadcrumbs className="max-w-[85%] w-72 text-sm flex justify-center">
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
