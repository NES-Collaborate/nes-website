import { ExpenseLog } from "@/types/finance"
import { createContext, useContext, useState } from "react"

type ExpenseLogs = {
  logs: ExpenseLog[]
  setLogs: React.Dispatch<React.SetStateAction<ExpenseLog[]>>
}

export const expenseLogsContext = createContext<ExpenseLogs>({
  logs: [],
  setLogs: () => {},
})

export const ExpenseLogsProvider = ({ children }: { children: React.ReactNode }) => {
  const [logs, setLogs] = useState<ExpenseLog[]>([])

  return (
    <expenseLogsContext.Provider value={{ logs, setLogs }}>
      {children}
    </expenseLogsContext.Provider>
  )
}

/**
 * Hook to save and get expense logs
 * @returns {ExpenseLogs} Current expense logs
 */
export const useExpenseLogs = () => useContext(expenseLogsContext)
