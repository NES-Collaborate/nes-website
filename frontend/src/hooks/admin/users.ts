import { useBackend } from "@/contexts/backend"
import { UserFormData } from "@/schemas/user"
import { createUser, deleteUser, editUser, fetchUsers } from "@/services/admin/users"
import { User } from "@/types/user"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useUsers = (q: string, userId?: number) => {
  const { backend, isLogged } = useBackend()

  return useQuery<User[]>({
    queryKey: ["users", q],
    queryFn: () => fetchUsers(backend, q, userId),
    enabled: isLogged,
  })
}

export const useUserMutations = () => {
  const { backend } = useBackend()
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: (data: UserFormData) => createUser(backend, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      })
    },
  })

  const editMutation = useMutation({
    mutationFn: (data: UserFormData) => editUser(backend, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (userId: number) => deleteUser(backend, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      })
    },
  })

  return {
    createMutation,
    editMutation,
    deleteMutation,
  }
}
