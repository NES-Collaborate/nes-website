import { useSession } from "@/contexts/session"
import { Post } from "@/types/entities"
import { axiosServer } from "@/utils/axiosClient"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import Loading from "../Loading"
import PostCard from "./PostCard"

const Posts = () => {
  const session = useSession()
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState<Post[]>([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const { ref, inView } = useInView()

  useEffect(() => {
    const getPosts = async (page: number, perPage: number) => {
      try {
        setIsFetching(true)
        const res = await axiosServer.get("/student/posts", {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
          params: {
            p: page,
            pp: perPage,
          },
        })

        if (res.data.data.length > 0) {
          setPosts((prevPosts) => [...prevPosts, ...res.data.data])
          setHasNextPage((_) => res.data.nextPage || false)
        }
      } catch (err: unknown) {
        console.log(err)
      } finally {
        setIsFetching(false)
      }
    }

    if (inView && hasNextPage && !isFetching) {
      getPosts(page, 2)
      setPage((p) => p + 1)
    }
  }, [inView, hasNextPage, page, session.token, isFetching])

  return (
    <div className="flex flex-col gap-3 mx-auto">
      <h1 className="text-3xl font-bold text-center mt-2">Postagens</h1>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}

      <div className="my-3" ref={ref}>
        {hasNextPage ? (
          <Loading text="Carregando..." textClassName="text-lg" center />
        ) : (
          <p className="text-center text-lg">Sem mais postagens</p>
        )}
      </div>
    </div>
  )
}

export default Posts
