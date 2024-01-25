import { Attach } from "./entities"
import { User } from "./user"

export type ExpenseCategory = {
  id: number
  name: string
  description?: string
}

export type ExpenseLogType = "deposit" | "removal"

export type ExpenseLog = {
  id: number
  value: number
  addedBy: User
  category: ExpenseCategory
  type: ExpenseLogType
  proof?: Attach
  comment?: string
  paidTo?: User
  createdAt: string
}
