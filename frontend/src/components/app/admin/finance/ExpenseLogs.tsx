import AttachmentModal from "@/components/AttachmentModal"
import { EXPENSE_LOG_QUERY_TYPES } from "@/data/translations"
import { Attach } from "@/types/entities"
import { ExpenseLog, ExpenseLogType } from "@/types/finance"
import { axiosServer } from "@/utils/axiosClient"
import { useCallback, useEffect, useState } from "react"
import { Alert, Input, Join, Select } from "react-daisyui"
import ExpenseLogTable from "./ExpenseLogTable"

type QueryType = {
  type: ExpenseLogType | "all"
  input: string
  startDate: Date
}

const ExpenseLogs = () => {
  const [logs, setLogs] = useState<ExpenseLog[]>([])
  const [errorLog, setErrorLog] = useState("")
  const [proof, setProof] = useState<Attach | null>(null)
  const [query, setQuery] = useState<QueryType>({
    type: "all",
    input: "",
    startDate: new Date("1970-01-01"),
  })

  const fetchLog = useCallback(async () => {
    try {
      const res = await axiosServer.get<ExpenseLog[]>("/admin/finance")
      setLogs(res.data)
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
        <Join>
          <Input
            size="sm"
            value={query.input}
            onChange={(e) => setQuery({ ...query, input: e.target.value.trim() })}
            placeholder="Pesquisar..."
            className="join-item"
            bordered
          />
          <Select
            size="sm"
            className="join-item"
            value={query.type}
            onChange={(e) =>
              setQuery({ ...query, type: e.target.value as QueryType["type"] })
            }
          >
            {Object.keys(EXPENSE_LOG_QUERY_TYPES).map((k, i) => (
              <Select.Option key={i} value={k}>
                {EXPENSE_LOG_QUERY_TYPES[k as ExpenseLogType]}
              </Select.Option>
            ))}
          </Select>

          {/* TODO: Add date picker with start and end date filters */}
        </Join>

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
