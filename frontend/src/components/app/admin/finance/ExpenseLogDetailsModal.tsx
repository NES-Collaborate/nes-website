import { EXPENSE_LOG_QUERY_TYPES } from "@/data/translations"
import { ExpenseLog } from "@/types/finance"
import { getAttachmentUrl, getUserPhotoUrl } from "@/utils/client"
import Image from "next/image"
import Link from "next/link"
import { Button, Modal } from "react-daisyui"
import { IoMdClose } from "react-icons/io"

type Props = {
  isOpen: boolean
  toggle: () => void
  logs: ExpenseLog[]
  expenseId: number
}

const ExpenseLogDetailsModal = ({ isOpen, toggle, logs, expenseId }: Props) => {
  const expense = logs.find((log) => log.id === expenseId)

  return (
    <Modal open={isOpen} className="!max-w-5xl mx-auto">
      <Modal.Body className="space-y-4">
        <div className="flex justify-between items-start">
          <Modal.Header className=" font-bold text-2xl">Detalhes da Despesa</Modal.Header>
          <Button onClick={toggle} className="btn-circle btn-error" size="xs">
            <IoMdClose />
          </Button>
        </div>
        {expense && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-200 p-4 rounded-box">
            <div>
              <h2 className="font-semibold text-xl mb-2">{expense.category.name}</h2>
              <p className="text-base mb-4">{expense.comment}</p>
              <div className="space-y-2">
                <p className="flex items-center space-x-2">
                  <strong>Adicionado por:</strong>
                  <Link
                    className="text-accent underline flex items-center gap-1"
                    href={`/app/profile?userId=${expense.addedBy.id}`}
                    target="_blank"
                  >
                    {expense.addedBy.name}
                    <Image
                      src={getUserPhotoUrl(expense.addedBy)}
                      alt={`${expense.addedBy.name} profile photo`}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </Link>
                </p>
                <p>
                  <strong className="mr-2">Criado em:</strong>
                  {new Date(expense.createdAt).toLocaleDateString("pt-BR", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                {expense.paidTo && (
                  <div className="flex items-center space-x-2">
                    <strong>Pago à:</strong>
                    <Link
                      className="text-accent underline flex items-center gap-1"
                      href={`/app/profile?userId=${expense.paidTo.id}`}
                      target="_blank"
                    >
                      {expense.paidTo.name}
                      <Image
                        src={getUserPhotoUrl(expense.paidTo)}
                        alt={`${expense.paidTo.name} profile photo`}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div>
              {expense.proof?.location && (
                <div className="mb-4">
                  <p className="font-semibold ">Comprovante:</p>
                  <Image
                    src={getAttachmentUrl(expense.proof)}
                    alt={`${expense.proof.name} proof`}
                    width={400}
                    height={400}
                    className="rounded-lg"
                  />
                </div>
              )}
              <div
                className={`text-xl ${
                  expense.type === "Removal" ? "text-error" : "text-success"
                }`}
              >
                <p>
                  <strong>Tipo:</strong> {EXPENSE_LOG_QUERY_TYPES[expense.type]}
                </p>
                <p>
                  <strong className="mr-2">Valor:</strong>
                  {expense.value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default ExpenseLogDetailsModal
