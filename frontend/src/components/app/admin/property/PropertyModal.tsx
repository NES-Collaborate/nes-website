import { Property } from "@/types/entities"
import { useEffect, useState } from "react"
import { Button, Modal } from "react-daisyui"
import { IoMdClose } from "react-icons/io"
import PropertyForm from "./PropertyForm"

type Props = {
  properties: Property[]
  setProperties: (properties: Property[]) => void
  action: "create" | "edit"
  index: number
  setIndex: (index: number) => void
  setToast: (toast: string) => void
}

const PropertyModal = ({
  properties,
  setProperties,
  action,
  index,
  setIndex,
  setToast,
}: Props) => {
  const isOpen = (action == "create" && index == -1) || (action == "edit" && index != -1)

  const [property, setProperty] = useState<Property>({
    id: 0,
    name: "",
    type: "",
  })

  useEffect(() => {
    if (action == "edit" && index != -1) {
      const property = properties.find((n) => n.id == index)
      if (property) setProperty(property)
    }
  }, [setProperties, action, index, properties])

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
    <Modal open={isOpen} responsive>
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
        {action == "create" ? "Adicionar Bem" : "Editar Bem"}
      </Modal.Header>

      <Modal.Body>
        <PropertyForm
          property={property}
          setProperty={setProperty}
          action={action}
          setToast={setToast}
          properties={properties}
          setProperties={setProperties}
        />
      </Modal.Body>
    </Modal>
  )
}

export default PropertyModal
