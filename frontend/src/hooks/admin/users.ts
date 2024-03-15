import { useBackend } from "@/contexts/backend"
import { createUser, deleteUser, editUser, fetchUsers } from "@/services/admin/users"
import { User, UserFormDataBackend } from "@/types/user"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

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

  

  const createMutation = useMutation<User, AxiosError, UserFormDataBackend>({
    mutationFn: (data: UserFormDataBackend) => createUser(backend, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      })
    },
  })

  const editMutation = useMutation({
    mutationFn: (data: UserFormDataBackend) => editUser(backend, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      })
    },
  })

  const deleteMutation = useMutation<void, AxiosError, number>({
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
