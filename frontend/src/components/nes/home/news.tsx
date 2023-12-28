import { News } from "@/data/constants"

const News = (obj: News) => {
  return (
    <>
      <a className="card w-96 bg-base-100 shadow-xl hover:bg-zinc-500/75" href={obj.targetUrl} target="_blank">
        <img src={obj.imageUrl}/>
        <div className="card-body">
          <h2 className="card-title">{obj.title}</h2>
          <span>{obj.subtitle}</span>
        </div>
      </a>
    </>
  )
}

export default News
