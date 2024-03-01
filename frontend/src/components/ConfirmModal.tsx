import { useState } from "react"
import { Button, Modal } from "react-daisyui"
import { IoClose } from "react-icons/io5"

type Callback = {
  run: () => void
}

export const ConfirmModal = ({
  children,
  title,
  description,
}: {
  children: (show: (callback: (event?: any) => void) => () => void) => React.ReactNode
  description: string
  title: string
}) => {
  const [open, setOpen] = useState(false)
  const [callback, setCallback] = useState<Callback | null>(null)

  const show = (callback: (event?: any) => void) => () => {
    event?.preventDefault()
    setOpen(true)

    setCallback({
      run: () => callback(event),
    })
  }

  const hide = () => {
    setCallback(null)
    setOpen(false)
  }

  const confirm = () => {
    callback?.run()
    hide()
  }

  return (
    <>
      {children(show)}
      <Modal open={open} responsive>
        <Button shape="circle" className="absolute right-2 top-2" onClick={hide}>
          <IoClose size={15} />
        </Button>

        <Modal.Header>
          <h1 className="text-2xl">{title}</h1>
          <p>{description}</p>
        </Modal.Header>

        <Modal.Body></Modal.Body>

        <Modal.Actions>
          <Button onClick={hide} color="error">
            Cancelar
          </Button>
          <Button onClick={confirm} color="primary">
            Confirmar
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}
