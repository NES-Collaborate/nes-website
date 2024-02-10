import Link from "next/link"
import { useState } from "react"
import { Button, Tooltip } from "react-daisyui"
import {
  IoIosAddCircle,
  IoIosAnalytics,
  IoMdCash,
  IoMdEye,
  IoMdEyeOff,
} from "react-icons/io"
import ExpenseLogModal from "./ExpenseLogModal"

type Props = {
  currentBalance: number
  totalExpenses: number
}

const ExpenseLogStats = ({ currentBalance = 0, totalExpenses = 0 }: Props) => {
  const [hideBalance, setHideBalance] = useState(false)
  const [expenseLogModal, setExpenseLogModal] = useState(false)

  const toggleExpenseLogModal = () => setExpenseLogModal((_) => !_)
  const toggleHideBalance = () => setHideBalance((_) => !_)

  const formattedBalance = currentBalance.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
  const hiddenBalance = "●".repeat(formattedBalance.length - 3)

  return (
    <div className="stats bg-base-200 shadow w-full">
      <div className="stat">
        <div className="stat-title">Saldo</div>
        <div className="stat-value flex gap-3 items-center">
          {hideBalance ? hiddenBalance : formattedBalance}
          <Tooltip message={hideBalance ? "Mostrar" : "Ocultar"} position="right">
            <div className="cursor-pointer" onClick={toggleHideBalance}>
              {hideBalance ? <IoMdEye /> : <IoMdEyeOff />}
            </div>
          </Tooltip>
        </div>
        <div className="stat-actions">
          <Button color="accent">
            <IoIosAnalytics size={25} />
            <Link href="/app/admin/finance/stats">Estatísticas</Link>
          </Button>
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Total Gasto</div>
        <div className="stat-value">
          {totalExpenses.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
        <div className="stat-actions flex justify-end gap-3">
          <Button color="secondary" onClick={toggleExpenseLogModal}>
            <IoIosAddCircle size={25} /> Adicionar Registro
          </Button>
          <Link href={"/app/admin/finance/scolarship"} className="btn btn-primary">
            <IoMdCash size={25} />
            Pagar Bolsas
          </Link>
        </div>
      </div>

      <ExpenseLogModal isOpen={expenseLogModal} toggle={toggleExpenseLogModal} />
    </div>
  )
}

export default ExpenseLogStats
