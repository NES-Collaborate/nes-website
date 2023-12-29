import { Notice } from "@/types/constants"
import { axiosApi } from "@/utils/axiosClient"
import { useEffect, useState } from "react"
import { Loading } from "react-daisyui"
import { NoticeCard } from "./NoticeCard"

/**
 * Get a notice lists from backend and show them.
 * @returns
 */
export const Notices = () => {
  const [notices, setNotices] = useState<Notice[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axiosApi
      .get("/notice/all")
      .then((res) => {
        setNotices(res.data.notices)
      })
      // TODO: Add visual feedback on error
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  if (!notices) {
    return null
  }

  return (
    <div className="w-full flex flex-col items-center mb-4">
      <h1 className="text-purple-700 text-2xl stroke-1 my-8">Notícias</h1>
      <div className="flex flex-wrap justify-center gap-3">
        {isLoading && (
          <div className="w-full flex items-center gap-3">
            <Loading /> <span className="text-lg">Carregando notícias...</span>
          </div>
        )}
        {notices.map((notice, i) => {
          return (
            <div key={i} className="group transform transition-transform hover:scale-105">
              <NoticeCard notice={notice} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
