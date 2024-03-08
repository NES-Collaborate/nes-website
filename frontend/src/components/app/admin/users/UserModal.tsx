import { User } from "@/types/user"
import { ModalState } from "./UsersList"

type Props = {
  user: User | null
  action: "create" | "edit"
  isOpen: boolean
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>
}

const UserModal = ({ user, action, isOpen, setModalState }: Props) => {
  return <></>
}

export default UserModal
