import { Loading } from "@/components/Loading"
import { useSession } from "@/contexts/session"
import { Post } from "@/types/entities"
import { axiosServer } from "@/utils/axiosClient"
import { useEffect, useState } from "react"
import { Alert, Pagination } from "react-daisyui" // Removed Button
import { PostCard } from "./PostCard"

export type PostsPagination = {
  data: Post[]
  nextPage?: number
  page: number
  prevPage?: number
  total: number
}

export const Posts = () => {
  const [postsPagination, setPostsPagination] = useState<PostsPagination>({
    data: [],
    page: 1,
    total: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const session = useSession()
  const [error, setError] = useState<string>("")

  useEffect(() => {
    setIsLoading(true)
    const fetchPosts = async () => {
      try {
        const res = await axiosServer.get("/student/posts", {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        })

        setPostsPagination(res.data as PostsPagination)
      } catch {
        setError("Erro ao carregar postagens. Tente novamente mais tarde.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [setPostsPagination, session.token])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-semibold mt-2 mb-4">Postagens</h1>

      {/* TODO: Add filters here to fetch posts */}

      {/* TODO: Add infinity scroll here */}
      {postsPagination.total > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {postsPagination.data.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      )}

      {error && (
        <Alert status="error" className="mt-4">
          {error}
        </Alert>
      )}

      {isLoading && (
        <div className="mt-4">
          <Loading text="Carregando..." textClassName="text-xl" center />
        </div>
      )}
    </div>
  )
}
