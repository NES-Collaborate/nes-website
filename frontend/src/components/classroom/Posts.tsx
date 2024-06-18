import { useClassroomPosts } from "@/hooks/classroom"
import { Classroom } from "@/types/entities"
import { useEffect, useRef, useState } from "react"
import { Button, Input, Tooltip } from "react-daisyui"
import { FaSearch } from "react-icons/fa"
import { useInView } from "react-intersection-observer"
import Loading from "../Loading"
import PostCard from "./PostCard"

type Props = {
  classroom?: Classroom
}

const Posts = ({ classroom }: Props) => {
  const { ref, inView } = useInView()
  const [query, setQuery] = useState("")

  const inputRef = useRef<HTMLInputElement>(null)

  const { data, refetch, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } =
    useClassroomPosts({ classroomId: classroom?.id, query })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage])

  const reloadPosts = () => {
    setQuery(inputRef.current?.value ?? "")
    refetch()
  }

  return (
    <div className="container mx-auto px-4 mt-1">
      <div className="join flex justify-center mb-8 gap-1">
        <Input
          ref={inputRef}
          size="sm"
          placeholder="Pesquisar"
          className="w-3/4 lg:w-2/4 join-item"
          onKeyDown={(e) => {
            if (e.key === "Enter") reloadPosts()
          }}
        />
        <Tooltip message="Pesquisar">
          <Button
            onClick={reloadPosts}
            size="sm"
            color="primary"
            disabled={isFetching}
            className="join-item"
          >
            <FaSearch />
          </Button>
        </Tooltip>
      </div>

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
