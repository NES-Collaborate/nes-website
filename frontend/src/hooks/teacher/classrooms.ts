import { useBackend } from "@/contexts/backend"
import { fetchClassrooms } from "@/schemas/classrooms"
import { Classroom } from "@/types/entities"
import { useQuery } from "@tanstack/react-query"

export const useClassrooms = () => {
  const { backend, isLogged } = useBackend()

  return useQuery<Classroom[]>({
    queryKey: ["classrooms"],
    queryFn: () => fetchClassrooms(backend),
    enabled: isLogged,
  })
}