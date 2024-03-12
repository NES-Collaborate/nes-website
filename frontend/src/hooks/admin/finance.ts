import { useBackend } from "@/contexts/backend"
import { ExpenseLogFormData } from "@/schemas/finance"
import { createExpenseLog, getStats } from "@/services/admin/finance"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useFinanceStats = () => {
  const { backend, isLogged } = useBackend()

  return useQuery({
    queryFn: () => getStats(backend),
    initialData: () => ({ currentBalance: 0, totalExpenses: 0 }),
    queryKey: ["finance-stats"],
    enabled: isLogged,
  })
}

export const useFinanceMutation = () => {
  const { backend } = useBackend()
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: (data: Omit<ExpenseLogFormData, "proof"> & { proof: number }) =>
      createExpenseLog(backend, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["finance-stats"],
      })
    },
  })

  return { createMutation }
}
