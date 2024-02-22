import { EXPENSE_LOG_QUERY_TYPES } from "@/data/translations"
import { ExpenseLog } from "@/types/finance"
import clsx from "clsx"
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
              <div className="flex flex-col" key={exp.id}>
                <h2 className="card-title flex items-center gap-2 text-3xl">
                  {exp.category.name}
                </h2>
                <p className="mb-4">{exp.comment}</p>

                <div className="flex flex-wrap justify-evenly mb-4">
                  <p>
                    <strong>Adicionado por:</strong> {exp.addedBy.name}
                  </p>
                  <p>
                    <strong>Criado em:</strong>{" "}
                    {new Date(exp.createdAt).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex flex-wrap justify-evenly">
                  {exp.paidTo ? (
                    <div>
                      <strong>Pago à:</strong>

                      <Link
                        href={`/app/profile?userId=${exp.paidTo.id}`}
                        className="p-2 flex flex-col items-center"
                      >
                        <Button shape="circle">
                          {exp.paidTo?.photo?.location && (
                            <Image
                              src={exp.paidTo?.photo?.location}
                              alt={`${exp.paidTo?.name} profile photo`}
                              width={50}
                              height={50}
                              className="rounded-full"
                            />
                          )}
                        </Button>
                        <span className="text-md text-center">{exp.paidTo?.name}</span>
                      </Link>
                    </div>
                  ) : null}

                  {exp.proof?.location && (
                    <div className="flex flex-col items-center">
                      <strong>Comprovante:</strong>

                      <Image
                        src={exp.proof.location}
                        alt={`${exp.proof.name} proof`}
                        width={75}
                        height={75}
                      />
                    </div>
                  )}
                </div>

                <div
                  className={clsx(
                    exp.type === "Removal" ? "text-error" : "text-success",
                    "flex flex-col items-end text-2xl"
                  )}
                >
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
