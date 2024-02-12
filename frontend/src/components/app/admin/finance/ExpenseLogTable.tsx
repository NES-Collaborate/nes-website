import { Attach } from "@/types/entities"
import { ExpenseLog } from "@/types/finance"
import clsx from "clsx"
import { Button } from "react-daisyui"
import { IoMdEye } from "react-icons/io"

type Props = {
  logs: ExpenseLog[]
  setProof: React.Dispatch<React.SetStateAction<Attach | null>>
}

const ExpenseLogTable = ({ logs, setProof }: Props) => {
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
              <td>
                {new Date(exp.createdAt).toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td
                className={clsx("font-semibold", {
                  "text-error": exp.type === "Removal",
                  "text-success": exp.type === "Deposit",
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
                <Button>Detalhes</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ExpenseLogTable
