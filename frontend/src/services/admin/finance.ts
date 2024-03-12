import { AxiosInstance } from "axios"

export const getStats = async (
  client: AxiosInstance
): Promise<{
  currentBalance: number
  totalExpenses: number
}> => {
  return (await client.get("/admin/finance/stats")).data
}
