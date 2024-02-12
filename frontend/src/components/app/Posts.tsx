import { useBackend } from "@/contexts/backend"
import { Post } from "@/types/entities"
import { useEffect, useRef, useState } from "react"
import { Button, Input, Tooltip } from "react-daisyui"
import { FaSearch } from "react-icons/fa"
import { useInView } from "react-intersection-observer"
import Loading from "../Loading"
import PostCard from "./PostCard"

const Posts = () => {
  const { backend } = useBackend()
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState<Post[]>([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const { ref, inView } = useInView()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const getPosts = async (page: number, perPage: number, query: string) => {
      try {
        setIsFetching(true)
        const res = await backend.get("/classroom/posts", {
          params: {
            p: page,
            pp: perPage,
            q: query,
          },
        })

        if (res.data.data.length > 0) {
          setPosts((prevPosts) => [...prevPosts, ...res.data.data])
          setHasNextPage((_) => res.data.nextPage || false)
        } else {
          setHasNextPage((_) => false)
        }
      } catch (err: unknown) {
        console.log(err)
      } finally {
        setIsFetching(false)
      }
    }

    if (inView && hasNextPage && !isFetching) {
      const query = inputRef.current?.value || ""
      getPosts(page, 2, query)
      setPage((p) => p + 1)
    }
  }, [inView, hasNextPage, page, backend, isFetching])

  const reloadPosts = () => {
    if (inputRef.current) {
      setPage((_) => 1)
      setPosts([])
      setHasNextPage(true)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mt-2 mb-4">Postagens</h1>

      <div className="flex justify-center mb-8 mt-4 gap-1">
        <Input placeholder="Pesquisar" className="w-3/4 lg:w-2/4" ref={inputRef} />
        <Tooltip message="Pesquisar">
          <Button onClick={reloadPosts} color="primary" disabled={isFetching}>
            <FaSearch />
          </Button>
        </Tooltip>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>

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
