import Toast from "@/components/Toast"
import { useBackend } from "@/contexts/backend"
import { User } from "@/types/user"
import { getUserPhotoUrl, maskCPF } from "@/utils/client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button, Table, Tooltip } from "react-daisyui"
import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa"
import UserModal from "./UserModal"

type Props = {
  query: string
}

const UsersList = ({ query }: Props) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  const debounceDelay = 500
  const { backend } = useBackend()
  const [users, setUsers] = useState<User[]>([])
  const [targetUserId, setTargetUserId] = useState(-1)
  const [modelAction, setModelAction] = useState<"create" | "edit" | "delete">("edit")
  const [toast, setToast] = useState("")

  useEffect(() => {
    const timer = setInterval(() => setDebouncedQuery(query), debounceDelay)

    return () => clearInterval(timer)
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await backend.get("/admin/users", {
          params: { q: debouncedQuery },
        })

        setUsers(res.data.users as User[])
      } catch (err: unknown) {
        // TODO: Set some error message here
        console.log(err)
      }
    }

    fetchUsers()
  }, [debouncedQuery, backend])

  const openCreateModal = () => {
    setTargetUserId(-1)
    setModelAction("create")
  }

  const openEditModal = (userId: number) => {
    setTargetUserId(userId)
    setModelAction("edit")
  }

  const openDeleteModal = (userId: number) => {
    setTargetUserId(userId)
    setModelAction("delete")
  }

  return (
    <div className="overflow-x-auto mt-4">
      <Table zebra size="md">
        <Table.Head className="text-center">
          <span>*</span>
          <span>Usuário</span>
          <span>CPF</span>
          <span>Ações</span>
        </Table.Head>

        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.id} className="text-center">
              <span className="flex justify-center">
                <Image
                  src={getUserPhotoUrl(user)}
                  alt={user.name}
                  width={45}
                  height={45}
                  className="rounded-full"
                />
              </span>
              <span>
                <span className="font-bold">{user.name}</span>
              </span>
              <span>{maskCPF(user.cpf)}</span>
              <span>
                <Tooltip message="Editar">
                  <Button
                    onClick={() => openEditModal(user.id)}
                    className="mr-2"
                    color="primary"
                  >
                    <FaEdit />
                  </Button>
                </Tooltip>

                <Tooltip message="Excluir">
                  <Button
                    onClick={() => openDeleteModal(user.id)}
                    color="error"
                    className="mr-2"
                  >
                    <FaTrash />
                  </Button>
                </Tooltip>

                <Tooltip message="Ver Perfil">
                  <Button color="secondary">
                    <Link href={`/app/profile?userId=${user.id}`} target="_blank">
                      <FaEye />
                    </Link>
                  </Button>
                </Tooltip>
              </span>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Tooltip
        message="Criar Usuário"
        position="left"
        className="fixed bottom-11 right-20"
      >
        <Button
          color="success"
          className="fixed bottom-5 right-5"
          onClick={openCreateModal}
        >
          <FaPlus />
        </Button>
      </Tooltip>

      <UserModal
        users={users}
        setUsers={setUsers}
        action={modelAction}
        userId={targetUserId}
        setUserId={setTargetUserId}
        setToast={setToast}
      />

      <Toast message={toast} setMessage={setToast} vertical="top" />
    </div>
  )
}

export default UsersList
