import { User } from "@/types/user"
import { FaTimes } from "react-icons/fa"
import UserForm from "./UserForm"
import { ModalState } from "./UsersList"

export type UserModalProps = {
  user: User | null
  action: "create" | "edit"
  isOpen: boolean
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>
}

const UserModal = ({ user, action, isOpen, setModalState }: UserModalProps) => {
  return (
    <>
      <input
        type="checkbox"
        id="user-modal"
        className="modal-toggle"
        checked={isOpen}
        onChange={() => setModalState((prevState) => ({ ...prevState, isOpen: false }))}
      />
      <div className="modal" role="dialog">
        <div className="modal-box w-11/12 max-w-5xl">
          <button
            className="btn btn-sm btn-circle bth-ghost absolute right-2 top-2"
            onClick={() =>
              setModalState((prevState) => ({
                ...prevState,
                user: null,
                isOpen: false,
              }))
            }
          >
            <FaTimes />
          </button>
          <h3 className="font-bold text-lg">
            {action === "create" ? "Criar Usuário" : "Editar Usuário"}
          </h3>

          <UserForm user={user} action={action} setModalState={setModalState} />
        </div>
      </div>
    </>
  )
}

export default UserModal
