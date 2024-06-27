import { useClassroomPosts } from "@/hooks/classroom"
import { Classroom } from "@/types/entities"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useDebounceValue } from "usehooks-ts"
import Loading from "../Loading"
import PostCard from "./PostCard"
import PostsFilter from "./PostsFilter"

type Props = {
  classroom?: Classroom
}

const Posts = ({ classroom }: Props) => {
  const { ref, inView } = useInView()
  const [query, setQuery] = useDebounceValue("", 500)

  const { data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } =
    useClassroomPosts({ classroomId: classroom?.id, query })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage])

  return (
    <div className="container mx-auto px-4 mt-1">
      <PostsFilter query={[query, setQuery]} isFetching={isFetching} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.pages.map((page) =>
          page.data.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>

      <div className="my-3" ref={ref}>
        {hasNextPage || isFetching ? (
          <Loading text="Carregando..." textClassName="text-lg" center />
        ) : (
          <p className="text-center text-lg">Sem mais postagens</p>
        )}
      </div>
    </div>
  )
}

export default Posts
