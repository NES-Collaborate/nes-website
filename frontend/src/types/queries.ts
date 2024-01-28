import { ExpenseLogType } from "./finance"

/**
 * Query representation to the ExpenseLog API
 */
export type ExpenseLogQuery = {
  type: ExpenseLogType | "all"
  input: string
}
