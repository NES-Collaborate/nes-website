import { ConfirmModal } from "@/components/ConfirmModal"
import Loading from "@/components/Loading"
import Toast from "@/components/Toast"
import { useUsers } from "@/hooks/admin/users"
import { User } from "@/types/user"
import { getUserPhotoUrl, maskCPF } from "@/utils/client"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Button, Table, Tooltip } from "react-daisyui"
import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa"
import UserModal from "./UserModal"

type Props = {
  query: string
}

export interface ModalState {
  user: User | null
  action: "create" | "edit"
  isOpen: boolean
}

const UsersList = ({ query }: Props) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  const [modalState, setModalState] = useState<ModalState>({
    user: null,
    action: "create",
    isOpen: false,
  })

  const openModal = (action: "create" | "edit", user: User | null) =>
    setModalState({
      user,
      action,
      isOpen: true,
    })

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 500)
    return () => clearTimeout(handler)
  }, [query])

  const { data: users, isLoading, isError, error } = useUsers(debouncedQuery)

  return (
    <div className="overflow-x-auto mt-4 h-96">
      <Table zebra size="md">
        <Table.Head className="text-center">
          <span>*</span>
          <span>Usuário</span>
          <span>CPF</span>
          <span>Ações</span>
        </Table.Head>

        <Table.Body>
          {isLoading ? (
            <tr>
              <td colSpan={4}>
                <Loading text="Carregando usuários..." center />
              </td>
            </tr>
          ) : isError && error instanceof Error ? (
            <tr>
              <td colSpan={4}>{error.message}</td>
            </tr>
          ) : (
            users?.map((user) => (
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
                      onClick={() => openModal("edit", user)}
                      className="mr-2"
                      color="primary"
                    >
                      <FaEdit />
                    </Button>
                  </Tooltip>

                  <Tooltip message="Excluir">
                    <ConfirmModal
                      title="Excluir Usuário"
                      description={`Tem certeza que deseja excluir o usuário ${user.name}?`}
                    >
                      {(show) => (
                        <Button onClick={show(() => {})} color="error" className="mr-2">
                          <FaTrash />
                        </Button>
                      )}
                    </ConfirmModal>
                  </Tooltip>

                  <Tooltip message="Ver Perfil">
                    <Link
                      href={`/app/profile?userId=${user.id}`}
                      passHref
                      target="_blank"
                    >
                      <Button color="secondary">
                        <FaEye />
                      </Button>
                    </Link>
                  </Tooltip>
                </span>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>

      <Tooltip
        message="Criar Usuário"
        position="left"
        className="fixed bottom-11 right-20"
      >
        <Button
          onClick={() => openModal("create", null)}
          color="success"
          className="fixed bottom-5 right-5"
        >
          <FaPlus />
        </Button>
      </Tooltip>

      <UserModal
        user={modalState.user}
        action={modalState.action}
        isOpen={modalState.isOpen}
        setModalState={setModalState}
      />
    </div>
  )
}

export default UsersList
