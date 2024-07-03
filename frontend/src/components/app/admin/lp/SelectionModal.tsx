import { Selection } from "@/types/constants"
import { useEffect, useState } from "react"
import { Button, Modal } from "react-daisyui"
import { IoMdClose } from "react-icons/io"
import SelectionForm from "./SelectionForm"

type Props = {
  selections: Selection[]
  action: "create" | "edit"
  index: number
  setIndex: (index: number) => void
  setToast: (toast: string) => void
}

const SelectionModal = ({ selections, action, index, setIndex, setToast }: Props) => {
  const isOpen = (action == "create" && index == -1) || (action == "edit" && index != -1)

  const [selection, setSelection] = useState<Selection>({
    id: 0,
    year: "",
    isOpen: true,
    subscriptionUrl: "",
    programUrl: "",
    schedule: [],
    results: [],
  })

  useEffect(() => {
    if (action == "edit" && index != -1) {
      const selection = selections.find((n) => n.id == index)
      if (selection) setSelection(selection)
    } else
      setSelection({
        id: 0,
        year: "",
        isOpen: true,
        subscriptionUrl: "",
        programUrl: "",
        schedule: [],
        results: [],
      })
  }, [setSelection, selections, index, action])

  const closeModal = () => {
    switch (action) {
      case "create":
        setIndex(-2)
        break
      case "edit":
        setIndex(-1)
    }
  }

  return (
    <Modal open={isOpen} className="h-3/4" responsive>
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
        {action == "create" ? "Adicionar Processo Seletivo" : "Editar Processo Seletivo"}
      </Modal.Header>

      <Modal.Body>
        <SelectionForm selection={selection} action={action} setToast={setToast} />
      </Modal.Body>
    </Modal>
  )
}

export default SelectionModal
