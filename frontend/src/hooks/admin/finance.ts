import { useBackend } from "@/contexts/backend"
import { getStats } from "@/services/admin/finance"
import { useQuery } from "@tanstack/react-query"

export const useFinanceStats = () => {
  const { backend, isLogged } = useBackend()

  return useQuery({
    queryFn: () => getStats(backend),
    initialData: () => ({ currentBalance: 0, totalExpenses: 0 }),
    queryKey: ["finance-stats"],
    enabled: isLogged,
  })
}
