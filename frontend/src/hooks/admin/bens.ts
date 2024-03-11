import { useBackend } from "@/contexts/backend"
import {
  createProperty,
  deleteProperty,
  fetchBens,
  updateProperty,
} from "@/services/admin/bens"
import { Property } from "@/types/entities"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useBens = (q: string) => {
  const { backend, isLogged } = useBackend()

  return useQuery({
    queryKey: ["bens"],
    queryFn: () => fetchBens(backend, q),
    enabled: isLogged,
  })
}

export const useBensMutations = () => {
  const { backend } = useBackend()
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: (data: Omit<Property, "id">) => createProperty(backend, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bens"],
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (propertyId: number) => deleteProperty(backend, propertyId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bens"],
      })
    },
  })

  const editMutation = useMutation({
    mutationFn: (data: Property) => updateProperty(backend, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bens"],
      })
    },
  })

  return { createMutation, deleteMutation, editMutation }
}
