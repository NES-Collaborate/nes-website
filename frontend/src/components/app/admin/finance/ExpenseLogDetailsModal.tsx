import { EXPENSE_LOG_QUERY_TYPES } from "@/data/translations"
import { ExpenseLog } from "@/types/finance"
import { Button, Modal } from "react-daisyui"
import { IoMdClose } from "react-icons/io"

type Props = {
  isOpen: boolean
  toggle: () => void
  logs: ExpenseLog[]
  expenseId: number
}

const ExpenseLogDetailsModal = ({ isOpen, toggle, logs, expenseId }: Props) => {
  return (
    <Modal open={isOpen} responsive className="!w-5/6 !max-w-full">
      <Button
        onClick={toggle}
        className="absolute right-2 top-2"
        color="error"
        shape="circle"
        size="xs"
      >
        <IoMdClose />
      </Button>

      <Modal.Header className="font-bold">Detalhes da Despesa</Modal.Header>

      <Modal.Body className="container mx-auto p-4">
        {logs.map((exp) => {
          if (exp.id === expenseId) {
            return (
              //TODO: Style this modal
              <div className="flex flex-col" key={exp.id}>
                <h2 className="card-title flex items-center gap-2 text-3xl mb-4">
                  {exp.category.name}
                </h2>

                <div>
                  <p>
                    <strong>Adicionado por:</strong> {exp.addedBy.name}
                  </p>
                  <p>
                    <strong>Comentário:</strong> {exp.comment}
                  </p>
                  <p>
                    <strong>Criado em:</strong>{" "}
                    {new Date(exp.createdAt).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>

                  {/* TODO: Show to whom it was paid and add a button to redirect to its profile */}
                  {exp.paidTo !== null ? (
                    <p>
                      <strong>Pago à:</strong> {exp.paidTo?.name}
                    </p>
                  ) : null}

                  <p>
                    <strong>Comprovante:</strong> exp.proof
                  </p>
                  <p>
                    <strong>Tipo:</strong> {EXPENSE_LOG_QUERY_TYPES[exp.type]}
                  </p>
                  <p>
                    {exp.value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              </div>
            )
          }
          return null
        })}
      </Modal.Body>
    </Modal>
  )
}

export default ExpenseLogDetailsModal
