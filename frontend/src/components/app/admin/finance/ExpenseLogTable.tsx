import { Attach } from "@/types/entities"
import { ExpenseLog } from "@/types/finance"
import { toLocalDate } from "@/utils/client"
import clsx from "clsx"
import { useState } from "react"
import { Button } from "react-daisyui"
import { IoMdEye } from "react-icons/io"
import ExpenseLogDetailsModal from "./ExpenseLogDetailsModal"

type Props = {
  logs: ExpenseLog[]
  setProof: React.Dispatch<React.SetStateAction<Attach | null>>
}

const ExpenseLogTable = ({ logs, setProof }: Props) => {
  const [detailsModal, setDetailsModal] = useState(false)
  const [expenseId, setExpenseId] = useState(-1)

  const handleClick = (id: number) => {
    setExpenseId(id)
    setDetailsModal((_) => !_)
  }

  const toggleDetailsModal = () => setDetailsModal((_) => !_)
  return (
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
          {logs.map((exp, i) => (
            <tr key={i}>
              <td>{toLocalDate(exp.createdAt)}</td>
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
                  variant="outline"
                >
                  <IoMdEye size={25} />
                </Button>
              </td>
              <td>
                <Button onClick={() => handleClick(exp.id)}>Detalhes</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ExpenseLogDetailsModal
        isOpen={detailsModal}
        toggle={toggleDetailsModal}
        logs={logs}
        expenseId={expenseId}
      />
    </div>
  )
}

export default ExpenseLogTable
