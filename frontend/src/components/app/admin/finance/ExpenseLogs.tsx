import AttachmentModal from "@/components/AttachmentModal"
import { useExpenseLogs } from "@/contexts/expenseLogs"
import { useSession } from "@/contexts/session"
import { Attach } from "@/types/entities"
import { ExpenseLog } from "@/types/finance"
import { ExpenseLogQuery } from "@/types/queries"
import { axiosServer } from "@/utils/axiosClient"
import { useEffect, useState } from "react"
import { Alert } from "react-daisyui"
import ExpenseLogFilter from "./ExpenseLogFilter"
import ExpenseLogTable from "./ExpenseLogTable"

const ExpenseLogs = () => {
  const { logs, setLogs } = useExpenseLogs()
  const [errorLog, setErrorLog] = useState("")
  const [proof, setProof] = useState<Attach | null>(null)
  const [query, setQuery] = useState<ExpenseLogQuery>({
    type: "all",
  })
  const { token } = useSession()

  useEffect(() => {
    if (!token) return
    const fetch = async () => {
      try {
        const res = await axiosServer.get<{ logs: ExpenseLog[] }>("/admin/finance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: query,
        })
        setLogs(res.data.logs)
        if (res.data.logs.length === 0) setErrorLog("Nenhum movimentação encontrada.")
      } catch {
        setErrorLog("Erro ao carregar movimentações")
      }
    }
    const timer = setTimeout(() => fetch(), 500)
    return () => clearTimeout(timer)
  }, [query, token, setLogs])

  return (
    <>
      <div className="my-3">
        <h2 className="text-xl text-center">Movimentações</h2>
        <ExpenseLogFilter query={query} setQuery={setQuery} />
        <ExpenseLogTable logs={logs} setProof={setProof} />
        {errorLog && (
          <Alert status="error" className="my-3">
            {errorLog}
          </Alert>
        )}
      </div>

      <AttachmentModal attach={proof} setAttach={setProof} title="Comprovante" />
    </>
  )
}

export default ExpenseLogs
