import Loading from "@/components/Loading"
import { useNotices } from "@/hooks/admin/lp"
import HorizontalScroll from "./HorizontalScroll"

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
      <div className="flex flex-nowrap gap-3 w-11/12">
        {isLoading && (
          <div className="w-full">
            <Loading text="Carregando notícias..." textClassName="text-lg" center />
          </div>
        )}
        <HorizontalScroll notices={notices} />
      </div>
    </div>
  )
}

export default Notices
