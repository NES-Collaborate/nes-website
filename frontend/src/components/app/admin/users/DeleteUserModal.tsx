import { ConfirmModal } from "@/components/ConfirmModal"
import { User } from "@/types/user"

const DeleteUserModal = ({ user }: { user: User }) => {
  return (
    <ConfirmModal
      title="Excluir Usuário"
      description="Tem certeza que deseja excluir este usuário?"
    >
      {(show) => {}}
    </ConfirmModal>
  )
}
