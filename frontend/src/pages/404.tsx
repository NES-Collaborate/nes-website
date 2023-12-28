import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { FaExclamationCircle } from "react-icons/fa"

const NotFoundError = () => {
  const pathname = usePathname()
  const [friendlyPathname, setFriendlyPathname] = useState("")
  useEffect(() => {
    setFriendlyPathname(pathname.replace("/", "").split("/").join(" → "))
  }, [pathname])

  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <div className="text-red-500 text-9xl mb-4">
        <FaExclamationCircle />
      </div>
      <h1 className="text-center text-4xl font-bold mb-2">Erro 404</h1>
      <p className="text-center text-2xl">
        A página especificada (<span className="text-red-500">{friendlyPathname}</span>)
        não foi encontrada.
      </p>
    </div>
  )
}

export default NotFoundError
