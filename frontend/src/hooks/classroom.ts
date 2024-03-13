import { useBackend } from "@/contexts/backend"
import { fetchClassroomPosts } from "@/services/classroom"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useClassroomPosts = (query: string, perPage: number = 10) => {
  const { backend, isLogged } = useBackend()

  return useInfiniteQuery({
    queryKey: ["classroom-posts", perPage, query],
    queryFn: ({ pageParam }) => fetchClassroomPosts(backend, pageParam, perPage, query),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: isLogged,
  })
}
