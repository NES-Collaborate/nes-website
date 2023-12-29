import { Notice } from "@/types/constants"
import { NoticeCard } from "./NoticeCard"

type Props = {
  notices: Notice[]
}

/**
 * A list of notices on Home
 * @param {Notice[]} notices List of notices
 * @returns
 */
export const Notices = ({ notices }: Props) => {
  return (
    <div className="w-full flex flex-col items-center mb-4">
      <h1 className="text-purple-700 text-2xl stroke-1 my-8">Notícias</h1>
      <div className="flex flex-wrap justify-center gap-3">
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
