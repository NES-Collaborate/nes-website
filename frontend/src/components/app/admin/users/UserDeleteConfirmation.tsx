import { useSession } from "@/contexts/session"
import { User } from "@/types/user"
import { axiosServer } from "@/utils/axiosClient"
import { Button } from "react-daisyui"
import { FaTrash } from "react-icons/fa"

type Props = {
  user: User
  setUser: (user: User) => void
  users: User[]
  setUsers: (users: User[]) => void
  setToast: (toast: string) => void
}

const UserDeleteConfirmation = ({ user, setUser, users, setUsers, setToast }: Props) => {
  const { token } = useSession()

  const deleteUser = async () => {
    try {
      const res = await axiosServer.delete(`/admin/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUsers(users.filter((u) => u.id !== user.id))
      setToast("Usuário deletado com sucesso!")
    } catch {
      setToast("Erro ao deletar usuário.")
    }
  }

  const closeModal = () => {
    deleteUser()
    setUser({ ...user, id: -1 })
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl text-red-500">
        Tem certeza que deseja <span className="font-bold text-red-700">deletar</span> o
        usuário {user.name} - {user.cpf} (ID: {user.id})
      </h1>

      <Button onClick={closeModal} size="lg" color="error">
        SIM
        <FaTrash />
      </Button>
    </div>
  )
}

export default UserDeleteConfirmation
