import AttachmentModal from "@/components/AttachmentModal"
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

  const fetchLog = useCallback(async () => {
    try {
      const res = await axiosServer.get<{ logs: ExpenseLog[] }>("/admin/finance")
      setLogs(res.data.logs)
    } catch {
      setErrorLog("Erro ao carregar movimentações")
    }
  }, [])

  useEffect(() => {
    fetchLog()
  })

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
