import { Notice } from "@/types/constants"
import Image from "next/image"

type Props = {
  notice: Notice
}

/**
 * Notice representation on Home
 * @param {Notice} Notice object to show
 * @returns {JSX.Element} The Card
 */
export const NoticeCard = ({ notice }: Props) => {
  return (
    <>
      <a href={notice.url} target="_blank">
        <div className="card card-compact w-96 bg-base-100 shadow-xl hover:bg-zinc-500/75">
          <figure>
            <Image src={notice.image} alt={notice.title} width={500} height={500} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{notice.title}</h2>
            <p>{notice.description}</p>
          </div>
        </div>
      </a>
    </>
  )
}
