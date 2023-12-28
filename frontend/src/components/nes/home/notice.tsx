import Image from "next/image"
import { Notice } from "@/data/constants"

export const NoticeCard = (obj: Notice) => {
  return (
    <>
      <a className="card w-96 bg-base-100 shadow-xl hover:bg-zinc-500/75" href={obj.targetUrl} target="_blank">
        <Image src={obj.imageUrl} width={500} height={500} alt=""/>
        <div className="card-body">
          <h2 className="card-title">{obj.title}</h2>
          <span>{obj.subtitle}</span>
        </div>
      </a>
    </>
  )
}
