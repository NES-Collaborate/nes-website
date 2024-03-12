import { ExpenseLogFormData } from "@/schemas/finance"
import { AxiosInstance } from "axios"

export const getStats = async (
  client: AxiosInstance
): Promise<{
  currentBalance: number
  totalExpenses: number
}> => {
  return (await client.get("/admin/finance/stats")).data
}

export const createExpenseLog = async (
  client: AxiosInstance,
  formData: Omit<ExpenseLogFormData, "proof"> & { proof: number }
) => {
  const res = await client.post("/admin/finance", formData)
  return res.data
}
