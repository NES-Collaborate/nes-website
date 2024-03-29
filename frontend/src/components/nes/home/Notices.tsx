import Loading from "@/components/Loading"
import { useNotices } from "@/hooks/admin/lp"
import NoticeCard from "./NoticeCard"

/**
 * Get a notice lists from backend and show them.
 * @returns {JSX.Element} Notices list
 */
const Notices = () => {
  const { data: notices = [], isLoading } = useNotices()

  if (notices.length === 0) {
    return null
  }

  return (
    <div className="w-full flex flex-col items-center mb-4">
      <h1 className="text-primary text-2xl stroke-1 my-8">Notícias</h1>
      <div className="flex flex-wrap justify-center gap-3">
        {isLoading && (
          <div className="w-full">
            <Loading text="Carregando notícias..." textClassName="text-lg" center />
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

export default Notices
