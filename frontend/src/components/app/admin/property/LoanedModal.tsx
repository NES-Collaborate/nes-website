import { User } from "@/types/user"
import { getUserPhotoUrl } from "@/utils/client"
import Image from "next/image"
import { Button, Modal } from "react-daisyui"
import { IoMdClose } from "react-icons/io"

type Props = {
  loanedTo: User | null
  setLoanedTo: (user: User | null) => void
  loanedAt: string // "2024-01-10T01:54:29.495787"
}

const LoanedModal = ({ loanedTo, setLoanedTo, loanedAt }: Props) => {
  const closeModal = () => setLoanedTo(null)

  const formatDate = (date: string) => {
    const dateObj = new Date(date)
    const month = dateObj.toLocaleString("default", { month: "short" })
    return `${dateObj.getDate()}/${month}/${dateObj.getFullYear()} às ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`
  }

  return (
    <Modal open={!!loanedTo} responsive>
      <Button
        onClick={closeModal}
        className="absolute right-2 top-2"
        color="error"
        shape="circle"
        size="xs"
      >
        <IoMdClose />
      </Button>

      <Modal.Header className="font-bold">
        {loanedTo?.name} (ID: {loanedTo?.id})
      </Modal.Header>

      <Modal.Body>
        {loanedTo ? (
          <div className="flex flex-col items-center space-y-4">
            <Image
              src={getUserPhotoUrl(loanedTo)}
              alt={`${loanedTo.name}'s photo`}
              width={50}
              height={50}
              className="w-24 h-24 rounded-full border-4 border-primary"
            />

            <div className="text-xl font-bold">{loanedTo.name}</div>

            <div className="text-gray-600">
              {loanedTo.emails && loanedTo.emails.length > 0 && (
                <p>Email: {loanedTo.emails[0].value}</p>
              )}
              {loanedTo.phones && loanedTo.phones.length > 0 && (
                <p>Telefone: {loanedTo.phones[0].value}</p>
              )}
              {loanedTo.address && <p>Endereço: {loanedTo.address.street}</p>}
              {loanedTo.serie && <p>Serie: {loanedTo.serie}</p>}
            </div>

            <p className="text-gray-500">Data do Empréstimo: {formatDate(loanedAt)}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Nenhuma informação para usuário fornecido.
          </p>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default LoanedModal
