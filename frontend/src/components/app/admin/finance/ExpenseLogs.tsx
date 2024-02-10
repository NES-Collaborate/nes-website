import AttachmentModal from "@/components/AttachmentModal"
import { useBackend } from "@/contexts/backend"
import { useExpenseLogs } from "@/contexts/expenseLogs"
import { Attach } from "@/types/entities"
import { ExpenseLog } from "@/types/finance"
import { ExpenseLogQuery } from "@/types/queries"
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
  const backend = useBackend()

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await backend.get<{ logs: ExpenseLog[] }>("/admin/finance", {
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
  }, [query, backend, setLogs])

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
