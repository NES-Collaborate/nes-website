import { useBackend } from "@/contexts/backend"
import { SERIES, USER_TYPES } from "@/data/constants"
import { Serie, UserType } from "@/types/constants"
import { Address } from "@/types/entities"
import { User } from "@/types/user"
import { getUserPhotoUrl } from "@/utils/client"
import { Dispatch, useEffect, useRef, useState } from "react"
import { Button, Input, Select, Tooltip } from "react-daisyui"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"

type Props = {
  user: User
  setUser: Dispatch<React.SetStateAction<User>>
  action: "create" | "edit"
  setToast: (toast: string) => void
  users: User[]
  setUsers: (users: User[]) => void
  addressModalOpen: boolean
  setAddressModalOpen: (open: boolean) => void
  addressModal: Address
}

const UserForm = ({
  user,
  setUser,
  action,
  setToast,
  users,
  setUsers,
  addressModalOpen,
  setAddressModalOpen,
  addressModal,
}: Props) => {
  const [loading, setLoading] = useState(false)
  const { backend } = useBackend()
  const emailInput = useRef<HTMLInputElement>(null)
  const phoneInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // when the Address Modal closes.
    if (!addressModalOpen) setUser((prevUser) => ({ ...prevUser, address: addressModal }))
  }, [addressModalOpen, addressModal, setUser])

  const createUser = async () => {
    try {
      const res = await backend.post("/admin/users", user)
      setUsers([...users, res.data.user])
      setToast("Usuário criado com sucesso!")
    } catch {
      setToast("Erro ao criar usuário.")
    }
  }

  const editUser = async () => {
    try {
      const res = await backend.put(`/admin/users/${user.id}`, user)
      setUsers(users.map((u) => (u.id == user.id ? res.data.user : u)))
      setToast("Usuário editado com sucesso!")
    } catch {
      setToast("Erro ao editar usuário.")
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    // TODO: Add filled fields verification
    switch (action) {
      case "create":
        await createUser()
        break
      case "edit":
        await editUser()
        break
    }
    setLoading(false)
  }

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Nome</span>
          </div>
          <Input
            placeholder="Nome do Usuário"
            size="md"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            color="primary"
            disabled={loading}
            bordered
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Foto</span>
          </div>
          <Input
            placeholder="URL da Foto"
            size="md"
            value={user.photo?.location}
            onChange={(e) =>
              setUser({ ...user, photo: { location: e.target.value, type: "Link" } })
            }
            color="primary"
            disabled={loading}
            bordered
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Emails</span>
          </div>
          <Input
            placeholder="Lista de Emails"
            size="md"
            ref={emailInput}
            onKeyDown={(e) => {
              const email = emailInput.current?.value
              if (e.key == "Enter" && email) {
                setUser({ ...user, emails: [...(user.emails || []), { value: email }] })
                emailInput.current.value = ""
              }
            }}
            color="primary"
            disabled={loading}
            bordered
          />
          <ul>
            {(user.emails || []).map((email) => (
              <li key={email.id}>
                {email.value}
                <Tooltip message="Remover este email">
                  <Button
                    size="xs"
                    onClick={() =>
                      setUser({
                        ...user,
                        emails: (user.emails || []).filter((e) => e !== email),
                      })
                    }
                  >
                    <FaTrash />
                  </Button>
                </Tooltip>
              </li>
            ))}
          </ul>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Telefones</span>
          </div>
          <Input
            placeholder="Lista de Telefones"
            size="md"
            ref={phoneInput}
            onKeyDown={(e) => {
              const phone = phoneInput.current?.value
              if (e.key == "Enter" && phone) {
                setUser({
                  ...user,
                  phones: [...(user.phones || []), { value: phone, isEmergency: false }],
                })
                phoneInput.current.value = ""
              }
            }}
            color="primary"
            disabled={loading}
            bordered
          />
          <ul>
            {(user.phones || []).map((phone) => (
              <li key={phone.id}>
                {phone.value}
                <Tooltip message="Remover este Telefone">
                  <Button
                    size="xs"
                    onClick={() =>
                      setUser({
                        ...user,
                        phones: (user.phones || []).filter((n) => n !== phone),
                      })
                    }
                  >
                    <FaTrash />
                  </Button>
                </Tooltip>
              </li>
            ))}
          </ul>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Endereço</span>
          </div>
          <Input
            size="md"
            value={
              user.address
                ? `${user.address.street}, ${user.address.number}, ${user.address.neighborhood} (${user.address.complement}) ${user.address.city} (${user.address.state} - ${user.address.cep})`
                : "Sem endereço"
            }
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            color="primary"
            disabled
            bordered
          />
          <Button onClick={() => setAddressModalOpen(true)}>
            <FaEdit />
          </Button>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">CPF</span>
          </div>
          <Input
            placeholder="CPF"
            size="md"
            value={user.cpf}
            onChange={(e) => setUser({ ...user, cpf: e.target.value })}
            color="primary"
            disabled={loading}
            bordered
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Senha</span>
          </div>
          {/* TODO: Hide/Unhide button for password */}
          <Input
            placeholder="Senha"
            size="md"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            color="primary"
            disabled={loading}
            bordered
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Data de Nascimento</span>
          </div>
          <Input
            placeholder="DD/MM/AAAA"
            size="md"
            value={user.birthdate}
            onChange={(e) => setUser({ ...user, birthdate: e.target.value })}
            color="primary"
            disabled={loading}
            bordered
          />
        </label>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Tipo de Usuário</span>
          </label>
          <Select
            defaultValue={"default"}
            onChange={(e) => {
              const value = e.target.value
              if (value !== "default") {
                setUser({ ...user, type: value as UserType })
              }
            }}
          >
            <Select.Option value={"default"} disabled>
              Selecione um Tipo
            </Select.Option>
            {USER_TYPES.map((serie) => (
              <Select.Option key={serie} value={serie}>
                {serie}
              </Select.Option>
            ))}
          </Select>
        </div>

        {user.type === "student" && (
          <>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Série</span>
              </label>
              <Select
                color="primary"
                defaultValue={"default"}
                onChange={(e) => {
                  const value = e.target.value
                  if (value !== "default") {
                    setUser({ ...user, serie: value as Serie })
                  }
                }}
              >
                <Select.Option value={"default"} disabled>
                  Selecione uma Série
                </Select.Option>
                {SERIES.map((serie) => (
                  <Select.Option
                    key={serie}
                    value={serie}
                    selected={serie === user.serie}
                  >
                    {serie}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Valor da Bolsa</span>
              </div>
              <Input
                placeholder="MONEYYY $$$"
                size="md"
                value={user.scholarship}
                onChange={(e) => {
                  const value = parseFloat(e.target.value)
                  setUser({ ...user, scholarship: value || 0 })
                }}
                color="primary"
                disabled={loading}
                bordered
              />
            </label>
          </>
        )}

        <Button variant="outline" color="accent" onClick={handleSubmit}>
          {action === "create" ? (
            <>
              <FaPlus /> Criar
            </>
          ) : (
            <>
              <FaEdit /> Editar
            </>
          )}
        </Button>
      </div>
    </>
  )
}

export default UserForm
