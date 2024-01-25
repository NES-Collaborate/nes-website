import AttachmentModal from "@/components/AttachmentModal"
import { EXPENSE_LOG_QUERY_TYPES } from "@/data/translations"
import { Attach } from "@/types/entities"
import { ExpenseLog, ExpenseLogType } from "@/types/finance"
import { axiosServer } from "@/utils/axiosClient"
import clsx from "clsx"
import { useCallback, useEffect, useState } from "react"
import { Alert, Button, Input, Join, Select } from "react-daisyui"
import { IoMdEye } from "react-icons/io"

type QueryType = {
  type: ExpenseLogType | "all"
  input: string
  startDate: Date
}

const ExpenseLogs = () => {
  const [log, setLog] = useState<ExpenseLog[]>([])
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
      setLog(res.data)
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

        {log && (
          <div className="overflow-x-auto mt-3">
            <table className="table table-sm text-center table-zebra-zebra">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Valor</th>
                  <th>Categoria</th>
                  <th>Comprovante</th>
                  <th>Detalhes</th>
                </tr>
              </thead>
              <tbody>
                {log.map((exp, i) => (
                  <tr key={i}>
                    <td>{exp.createdAt}</td>
                    <td
                      className={clsx("font-semibold", {
                        "text-error": exp.type === "removal",
                        "text-success": exp.type === "deposit",
                      })}
                    >
                      R$ {exp.value}
                    </td>
                    <td>{exp.category.name}</td>
                    <td>
                      <Button
                        color="info"
                        onClick={() => exp.proof && setProof(exp.proof)}
                        disabled={!exp.proof}
                      >
                        <IoMdEye size={25} />
                      </Button>
                    </td>
                    <td>
                      <Button>Detalhes</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {errorLog && (
              <Alert status="error" className="my-3">
                {errorLog}
              </Alert>
            )}
          </div>
        )}
      </div>

      {proof && (
        <AttachmentModal attach={proof} setAttach={setProof} title="Comprovante" />
      )}
    </>
  )
}

export default ExpenseLogs
