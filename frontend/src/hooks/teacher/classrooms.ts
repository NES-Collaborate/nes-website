import { useBackend } from "@/contexts/backend"
import { createClassroom, fetchClassrooms, updateClassroom } from "@/services/classroom"
import { Classroom } from "@/types/entities"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useClassrooms = () => {
  const { backend, isLogged } = useBackend()

  return useQuery<Classroom[]>({
    queryKey: ["classrooms"],
    queryFn: () => fetchClassrooms(backend),
    enabled: isLogged,
  })
}

export const useClassroomMutation = () => {
  const { backend, isLogged } = useBackend()
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
