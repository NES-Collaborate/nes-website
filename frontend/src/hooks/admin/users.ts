import { useBackend } from "@/contexts/backend"
import { fetchUsers } from "@/services/admin/users"
import { User } from "@/types/user"
import { useQuery } from "@tanstack/react-query"

export const useUsers = (q: string) => {
  const { backend, isLogged } = useBackend()

  return useQuery<User[]>({
    queryKey: ["users", q],
    queryFn: () => fetchUsers(backend, q),
    enabled: isLogged,
  })
}
