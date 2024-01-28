import { Button, Modal } from "react-daisyui"
import { IoMdClose } from "react-icons/io"
import ExpenseLogForm from "./ExpenseLogForm"

type Props = {
  isOpen: boolean
  toggle: () => void
}

const ExpenseLogModal = ({ isOpen, toggle }: Props) => {
  return (
    <Modal open={isOpen} responsive>
      <Button
        onClick={toggle}
        className="absolute right-2 top-2"
        color="error"
        shape="circle"
        size="xs"
      >
        <IoMdClose />
      </Button>

      <Modal.Header className="font-bold">Adicionar Registro de Despesa</Modal.Header>

      <Modal.Body>
        <ExpenseLogForm toggle={toggle} />
      </Modal.Body>
    </Modal>
  )
}

export default ExpenseLogModal
