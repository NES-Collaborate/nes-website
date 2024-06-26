import Loading from "@/components/Loading"
import { useClassrooms } from "@/hooks/teacher/classrooms"
import { cn } from "@/utils/client"
import Link from "next/link"
import { useRouter } from "next/router"
import { Alert } from "react-daisyui"
import { MdErrorOutline } from "react-icons/md"

export const ClassroomInfinityScroll = () => {
  const router = useRouter()
  const { data, isFetching, error, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useClassrooms()

  const { classroomId } = router.query

  const classrooms = data?.pages.flatMap((page) => page.data) ?? []

  return (
    <div>
      {error && (
        <div className="my-4 mx-2 lg:mx-4">
          <Alert status="error" icon={<MdErrorOutline />}>
            {error.message}
          </Alert>
        </div>
      )}

      {isFetching && (
        <Loading text="Carregando turmas..." textClassName="text-xl" center />
      )}

      {classrooms.map((classroom) => (
        <div
          className={cn(
            "bg-base-200 p-2",
            classroom.id.toString() === classroomId &&
              "border-l-4 rounded-l border-primary text-success"
          )}
          key={classroom.id}
        >
          <Link href={`/classroom/${classroom.id}`}>
            <span className="text-lg font-medium">{classroom.name}</span>
          </Link>
        </div>
      ))}

      {hasNextPage && (
        <div className="text-center my-4">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Carregando..."
              : hasNextPage
              ? "Carregar mais turmas"
              : "Sem mais turmas"}
          </button>
        </div>
      )}
    </div>
  )
}
