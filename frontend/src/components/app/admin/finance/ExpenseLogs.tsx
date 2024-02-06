import AttachmentModal from "@/components/AttachmentModal"
import { useSession } from "@/contexts/session"
import { Attach } from "@/types/entities"
import { ExpenseLog } from "@/types/finance"
import { ExpenseLogQuery } from "@/types/queries"
import { axiosServer } from "@/utils/axiosClient"
import { useCallback, useEffect, useState } from "react"
import { Alert } from "react-daisyui"
import ExpenseLogFilter from "./ExpenseLogFilter"
import ExpenseLogTable from "./ExpenseLogTable"

const ExpenseLogs = () => {
  const [logs, setLogs] = useState<ExpenseLog[]>([])
  const [errorLog, setErrorLog] = useState("")
  const [proof, setProof] = useState<Attach | null>(null)
  const [query, setQuery] = useState<ExpenseLogQuery>({
    type: "all",
    input: "",
  })
  const { token } = useSession()

  const fetchLog = useCallback(async () => {
    if (!token) return
    try {
      const res = await axiosServer.get<{ logs: ExpenseLog[] }>("/admin/finance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setLogs(res.data.logs)
      if (res.data.logs.length === 0) setErrorLog("Nenhum movimentação encontrada.")
    } catch {
      setErrorLog("Erro ao carregar movimentações")
    }
  }, [token])

  useEffect(() => {
    fetchLog()
  }, [fetchLog])

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
