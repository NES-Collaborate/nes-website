import { BREADCRUMB_NAMES } from "@/data/constants"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Breadcrumbs, Divider } from "react-daisyui"

export const Breadcrumb = () => {
  const pathname = usePathname()
  const [splitedPath, setSplitedPath] = useState<string[]>([])
  const [render, setRender] = useState(false)

  useEffect(() => {
    setSplitedPath(pathname.split("/").filter((x) => x))

    if (!pathname.startsWith("/app") || splitedPath.length === 1) setRender(false)
    else setRender(true)
  }, [render, pathname, splitedPath.length])

  return (
    <div className={clsx(!render && "hidden")}>
      <div className="flex justify-around pt-1">
        <Breadcrumbs>
          {splitedPath.map((x, i) => {
            const url = `/${splitedPath.slice(0, i + 1).join("/")}`

            return (
              <Breadcrumbs.Item key={i} href={url}>
                {BREADCRUMB_NAMES[x] || x}
              </Breadcrumbs.Item>
            )
          })}
        </Breadcrumbs>
      </div>
      <Divider color="accent" className="m-0" />
    </div>
  )
}
