import { useBackend } from "@/contexts/backend"
import { createClassroom, fetchClassrooms, updateClassroom } from "@/services/classroom"
import { Classroom } from "@/types/entities"
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useClassrooms = () => {
  const { backend, isLogged } = useBackend()

  return useInfiniteQuery({
    queryKey: ["classrooms"],
    queryFn: ({ pageParam }) => fetchClassrooms(backend, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: isLogged,
  })
}

export const useClassroomMutation = () => {
  const { backend } = useBackend()
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: (data: Omit<Classroom, "id">) => createClassroom(backend, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classrooms"],
      })
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: Classroom) => updateClassroom(backend, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classrooms"],
      })
    },
  })

  return { createMutation, updateMutation }
}
