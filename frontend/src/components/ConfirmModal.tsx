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
      <div>
        <input type="checkbox" className="modal-toggle" checked={open} />

        <div className="modal" role="dialog">
          <div className="modal-box">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={hide}
            >
              <IoClose />
            </button>

            <h1 className="text-2xl">{title}</h1>

            <p className="text-lg text-secondary !break-words">{description}</p>

            <div className="modal-action">
              <button className="btn btn-error" onClick={hide}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={confirm}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
