import { ExpenseLogFormData } from "@/schemas/finance"
import { ExpenseLog } from "@/types/finance"
import { ExpenseLogQuery, ScholarshipQuery } from "@/types/queries"
import { User } from "@/types/user"
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

export const fetchExpenseLogs = async (
  client: AxiosInstance,
  query: ExpenseLogQuery
): Promise<ExpenseLog[]> => {
  const res = await client.get<{ logs: ExpenseLog[] }>("/admin/finance", {
    params: query,
  })
  return res.data.logs
}

export const fetchStudents = async (
  client: AxiosInstance,
  query: ScholarshipQuery
): Promise<(User & { alreadyPaid: boolean })[]> => {
  if (query.classroomId === 0) return []
  const res = await client.get("/admin/finance/students", {
    params: query,
  })

  return res.data
}

export const payStudents = async (
  client: AxiosInstance,
  ids: number[],
  month: number,
  year: number
) => {
  await client.post("/admin/finance/students/pay", {
    ids,
    month,
    year,
  })
}
