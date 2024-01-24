import { Address } from "@/types/entities"
import { User } from "@/types/user"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { Button, Modal } from "react-daisyui"
import { IoMdClose } from "react-icons/io"
import AddressModal from "./AddressModal"
import UserDeleteConfirmation from "./UserDeleteConfirmation"
import UserForm from "./UserForm"

type Props = {
  users: User[]
  setUsers: (users: User[]) => void
  action: "create" | "edit" | "delete"
  userId: number
  setUserId: (userId: number) => void
  setToast: (toast: string) => void
}

const UserModal = ({ users, setUsers, action, userId, setUserId, setToast }: Props) => {
  const open =
    (action === "create" && userId === -1) ||
    (action === "edit" && userId !== -1) ||
    (action === "delete" && userId !== -1)

  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    photo: undefined,
    emails: [],
    phones: [],
    cpf: "",
    birthdate: "",
    scolarship: 0,
    type: "student",
  })

  const [addressModalOpen, setAddressModalOpen] = useState(false)
  const [addressModal, setAddressModal] = useState<Address>({
    id: user.address?.id || 0,
    name: user.address?.name || "",
    neighborhood: user.address?.neighborhood || "",
    number: user.address?.number || 0,
    complement: user.address?.complement || "",
    city: user.address?.city || "",
    state: user.address?.state || "",
    cep: user.address?.cep || "",
  })

  useEffect(() => {
    if (action !== "create" && userId !== -1) {
      const user = users.find((n) => n.id === userId)
      if (user) setUser(user)
    }
  }, [userId, action, users])

  const closeModal = () => {
    switch (action) {
      case "create":
        setUserId(0)
        break
      case "edit":
        setUserId(-1)
        break
      case "delete":
        setUserId(-1)
        break
    }
  }

  return (
    <>
      <Modal open={open} responsive>
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
          {clsx({
            "Criar Usuário": action === "create",
            "Editar Usuário": action === "edit",
            "Confirmação de Exclusão": action === "delete",
          })}
        </Modal.Header>

        <Modal.Body>
          {action === "delete" ? (
            <UserDeleteConfirmation
              user={user}
              setUser={setUser}
              users={users}
              setUsers={setUsers}
              setToast={setToast}
            />
          ) : (
            <UserForm
              user={user}
              setUser={setUser}
              action={action}
              setToast={setToast}
              users={users}
              setUsers={setUsers}
              addressModalOpen={addressModalOpen}
              setAddressModalOpen={setAddressModalOpen}
              addressModal={addressModal}
            />
          )}
        </Modal.Body>
      </Modal>

      <AddressModal
        open={addressModalOpen}
        setOpen={setAddressModalOpen}
        address={addressModal}
        setAddress={setAddressModal}
      />
    </>
  )
}

export default UserModal
