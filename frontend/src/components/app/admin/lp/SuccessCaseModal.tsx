import { SuccessCase } from "@/types/constants"
import { useEffect, useState } from "react"
import { Button, Modal } from "react-daisyui"
import { IoMdClose } from "react-icons/io"
import SuccessCaseForm from "./SuccessCaseForm"

type Props = {
  successCases: SuccessCase[]
  action: "create" | "edit"
  index: number
  setIndex: (index: number) => void
  setToast: (toast: string) => void
}

const SuccessCaseModal = ({ successCases, action, index, setIndex, setToast }: Props) => {
  const isOpen = (action == "create" && index == -1) || (action == "edit" && index != -1)

  const [successCase, setSuccessCase] = useState<SuccessCase>({
    id: 0,
    imagePath: "",
    name: "",
    city: "",
    results: "",
    difficulties: "",
    phrase: "",
  })

  useEffect(() => {
    if (action == "edit") {
      const successCase = successCases.find((n) => n.id == index)
      if (successCase) setSuccessCase(successCase)
    } else
      setSuccessCase({
        id: 0,
        imagePath: "",
        name: "",
        city: "",
        results: "",
        difficulties: "",
        phrase: "",
      })
  }, [setSuccessCase, successCases, index, action])

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
        {action == "create" ? "Adicionar Caso de Sucesso" : "Editar Caso de Sucesso"}
      </Modal.Header>

      <Modal.Body>
        <SuccessCaseForm
          successCase={successCase}
          action={action}
          setToast={setToast}
          successCases={successCases}
        />
      </Modal.Body>
    </Modal>
  )
}

export default SuccessCaseModal
