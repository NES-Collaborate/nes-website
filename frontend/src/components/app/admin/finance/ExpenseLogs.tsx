import AttachmentModal from "@/components/AttachmentModal"
import Loading from "@/components/Loading"
import { useExpenseLogs } from "@/hooks/admin/finance"
import { Attach } from "@/types/entities"
import { ExpenseLogQuery } from "@/types/queries"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Alert } from "react-daisyui"
import ExpenseLogFilter from "./ExpenseLogFilter"
import ExpenseLogTable from "./ExpenseLogTable"

const ExpenseLogs = () => {
  const [proof, setProof] = useState<Attach | null>(null)
  const [query, setQuery] = useState<ExpenseLogQuery>({
    type: "all",
  })
  const [debouncedQuery, setDebouncedQuery] = useState<ExpenseLogQuery>(query)
  const queryClient = useQueryClient()

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, 700)

    return () => clearTimeout(handler)
  }, [query, queryClient])

  const { data: logs = [], isFetching } = useExpenseLogs(debouncedQuery)

  return (
    <>
      <div className="my-3">
        <h2 className="text-xl text-center">Movimentações</h2>
        <ExpenseLogFilter query={query} setQuery={setQuery} />
        <ExpenseLogTable logs={logs} setProof={setProof} />
        {logs.length === 0 && !isFetching && (
          <Alert status="error" className="my-3">
            Nenhuma movimentação encontrada
          </Alert>
        )}

        {isFetching && <Loading center />}
      </div>

      <AttachmentModal attach={proof} setAttach={setProof} title="Comprovante" />
    </>
  )
}

export default ExpenseLogs
