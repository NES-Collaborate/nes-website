import { ExpenseLogType } from "./finance"

/**
 * Query representation to the ExpenseLog API
 */
export type ExpenseLogQuery = {
  type: ExpenseLogType | "all"
  category?: string
  paidTo?: string
  addedBy?: string
  comment?: string
}

/**
 * Query representation to the Scolarship get users API
 */
export type ScolarshipQuery = {
  year: number
  month: number
  classroomId: number
}
