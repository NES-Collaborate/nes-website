import { Address } from "@/types/entities"
import { useState } from "react"
import { Button, Input, Modal } from "react-daisyui"
import { FaEdit } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  address: Address
  setAddress: (address: Address) => void
}

// TODO: Fill the values from API by CEP
// TODO: Add verifications of the filled values
// TODO: Add input-select for Cities and States (UF)
const AddressModal = ({ open, setOpen, address, setAddress }: Props) => {
  const [loading, setLoading] = useState(false) // will be used when the API is being called

  return (
    <Modal open={open} responsive>
      <Button
        onClick={() => setOpen(false)}
        className="absolute right-2 top-2"
        color="error"
        shape="circle"
        size="xs"
      >
        <IoMdClose />
      </Button>

      <Modal.Header className="font-bold">Endereço</Modal.Header>

      <Modal.Body>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Endereço</span>
            </div>
            <Input
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
              disabled={loading}
              bordered
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Bairro</span>
            </div>
            <Input
              value={address.neighborhood}
              onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
              disabled={loading}
              bordered
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Número</span>
            </div>
            <Input
              value={address.number || ""}
              onChange={(e) => {
                const number = e.target.value
                if (number === "") setAddress({ ...address, number: undefined })
                else setAddress({ ...address, number: parseInt(number) || undefined })
              }}
              disabled={loading}
              bordered
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Complemento</span>
            </div>
            <Input
              value={address.complement || ""}
              onChange={(e) => setAddress({ ...address, complement: e.target.value })}
              disabled={loading}
              bordered
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Cidade</span>
            </div>
            <Input
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              disabled={loading}
              bordered
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Estado</span>
            </div>
            <Input
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
              disabled={loading}
              bordered
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">CEP</span>
            </div>
            <Input
              value={address.cep}
              onChange={(e) => setAddress({ ...address, cep: e.target.value })}
              disabled={loading}
              bordered
            />
          </label>

          <Button
            variant="outline"
            color="accent"
            onClick={() => setOpen(false)}
            className="col-span-full"
          >
            <>
              <FaEdit /> Salvar
            </>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default AddressModal
