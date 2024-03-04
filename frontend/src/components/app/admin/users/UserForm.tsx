import { useBackend } from "@/contexts/backend"
import { SERIES, USER_TYPES, USER_TYPES_MASK } from "@/data/constants"
import { Serie, UserType } from "@/types/constants"
import { Address, Classroom } from "@/types/entities"
import { User } from "@/types/user"
import { maskPhone } from "@/utils/client"
import clsx from "clsx"
import { Dispatch, useEffect, useRef, useState } from "react"
import { Button, FileInput, Select, Tooltip } from "react-daisyui"
import { FaEdit, FaEye, FaEyeSlash, FaPlus, FaTrash } from "react-icons/fa"
import InputMask from "react-input-mask"

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
  closeModal: () => void
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
  closeModal,
  addressModal,
}: Props) => {
  const [loading, setLoading] = useState(false)
  const { backend, isLogged } = useBackend()
  const emailInput = useRef<HTMLInputElement>(null)
  const [currentPhone, setCurrentPhone] = useState("")
  const [hidePassword, setHidePassword] = useState(true)
  const [fillName, setFillName] = useState(false)
  const [fillCPF, setFillCPF] = useState(false)
  const [fillBirthdate, setFillBirthdate] = useState(false)
  const [fillScholarship, setFillScholarship] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [classrooms, setClassrooms] = useState<Classroom[]>([])

  useEffect(() => {
    setIsLoading(true)
    const fetchClassrooms = async () => {
      if (!isLogged) return
      try {
        const res = await backend.get("/teacher/classrooms")
        setClassrooms(res.data)
      } catch {
        // TODO: Set some error message here
      }
    }
    fetchClassrooms()
    setIsLoading(false)
  }, [backend, isLogged])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setUser((prevUser) => ({
          ...prevUser,
          photo: { location: reader.result as string, type: "Link" },
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    // when the Address Modal closes.
    if (!addressModalOpen) setUser((prevUser) => ({ ...prevUser, address: addressModal }))
  }, [addressModalOpen, addressModal, setUser])

  const createUser = async () => {
    try {
      const res = await backend.post("/admin/users", {
        ...user,
        cpf: user.cpf.replace(/\D/g, ""),
        phones: (user.phones || []).map((phone) => ({
          ...phone,
          value: phone.value.replace(/\D/g, ""),
        })),
        address: {
          ...user.address,
          cep: user.address?.cep.replace(/\D/g, ""),
        },
        responsible_phone: (user.responsible_phone || "").replace(/\D/g, ""),
      })
      setUsers([...users, res.data.user])
      setToast("Usuário criado com sucesso!")
      closeModal()
    } catch {
      setToast("Erro ao criar usuário.")
    }
  }

  const editUser = async () => {
    try {
      const res = await backend.put(`/admin/users/${user.id}`, {
        ...user,
        cpf: user.cpf.replace(/\D/g, ""),
        phones: (user.phones || []).map((phone) => ({
          ...phone,
          value: phone.value.replace(/\D/g, ""),
        })),
        address: {
          ...user.address,
          cep: user.address?.cep.replace(/\D/g, ""),
        },
        responsible_phone: (user.responsible_phone || "").replace(/\D/g, ""),
      })
      setUsers(users.map((u) => (u.id == user.id ? res.data.user : u)))
      setToast("Usuário editado com sucesso!")
    } catch {
      setToast("Erro ao editar usuário.")
    }
  }

  const verifyFields = (
    comparison: boolean,
    message: string,
    setEmpty: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (comparison) {
      setToast(`Por favor, informe ${message} do usuário.`)
      setEmpty(true)
      setLoading(false)
      return true
    } else {
      setEmpty(false)
      return false
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    if (
      verifyFields(user.name.trim() === "", "o nome", setFillName) ||
      verifyFields(user.cpf.trim() === "", "o CPF", setFillCPF) ||
      verifyFields(
        user.birthdate.trim() === "",
        "a data de nascimento",
        setFillBirthdate
      ) ||
      verifyFields(
        user.scholarship === 0 && user.type === "student",
        "a bolsa",
        setFillScholarship
      )
    ) {
      return
    }

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
      <div className="grid grid-cols-2 gap-3 space-y-3">
        <div className="form-control col-span-full">
          <label className="label">
            <span className="label-text">Tipo de Usuário</span>
          </label>
          <Select
            value={user.type}
            onChange={(e) => {
              const value = e.target.value
              if (value !== "default") {
                setUser({ ...user, type: value as UserType })
              }
            }}
          >
            <Select.Option disabled>Selecione um Tipo</Select.Option>
            {USER_TYPES.map((type, i) => (
              <Select.Option key={i} value={type}>
                {USER_TYPES_MASK[type as UserType]}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div className="form-control col-span-full">
          <label className="label">
            <span className={clsx("label-text", fillName && "text-error")}>Nome*</span>
          </label>
          <input
            className={clsx("input input-bordered", fillName && "input-error")}
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Foto de Perfil</span>
          </label>
          <FileInput onChange={handleImageChange} disabled={loading} />
        </div>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className={clsx("label-text", fillCPF && "text-error")}>CPF*</span>
          </div>
          <InputMask
            mask="999.999.999-99"
            className={clsx("input input-bordered", fillCPF && "input-error")}
            value={user.cpf}
            onChange={(e) => setUser({ ...user, cpf: e.target.value })}
            disabled={loading}
          />
        </label>

        <div className="form-control">
          <label className="label">
            <span className="label-text">E-mails</span>
          </label>
          <input
            className="input input-bordered"
            placeholder="Insira Email + Enter"
            type="email"
            ref={emailInput}
            onKeyDown={(e) => {
              const email = emailInput.current?.value
              // TODO: Add a email validator here.
              if (!email?.includes("@") || email?.endsWith("@")) return
              if (e.key == "Enter" && email) {
                setUser({ ...user, emails: [...(user.emails || []), { value: email }] })
                emailInput.current.value = ""
              }
            }}
            color="primary"
            disabled={loading}
          />
          <ul className="mt-1 ml-2">
            {(user.emails || []).map((email, i) => (
              <li key={i}>
                {email.value}
                <Tooltip message="Remover">
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
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Telefones</span>
          </label>
          <InputMask
            mask="(99) 99999-9999"
            placeholder="Insira Telefone + Enter"
            className="input input-bordered"
            onChange={(e) => setCurrentPhone(e.target.value)}
            value={currentPhone}
            onKeyDown={(e) => {
              if (e.key == "Enter" && currentPhone) {
                setUser({
                  ...user,
                  phones: [
                    ...(user.phones || []),
                    { value: currentPhone, isEmergency: false },
                  ],
                })
                setCurrentPhone(() => "")
              }
            }}
            color="primary"
            disabled={loading}
          />
          <ul className="mt-1 ml-2">
            {(user.phones || []).map((phone, i) => (
              <li key={i}>
                {maskPhone(phone.value)}
                <Tooltip message="Remover">
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
        </div>

        <label className="form-control col-span-full">
          <div className="label">
            <span className="label-text">
              Endereço
              <Button
                onClick={() => setAddressModalOpen(true)}
                color="primary"
                size="xs"
                className="ml-2"
              >
                <FaEdit />
              </Button>
            </span>
          </div>
          <input
            className="input input-bordered btn text-left"
            value={
              user.address
                ? `${user.address.street}, ${user.address.number}, ${user.address.neighborhood} (${user.address.complement}) ${user.address.city} (${user.address.state} - ${user.address.cep})`
                : "Sem endereço"
            }
            disabled
          />
        </label>

        <div className="form-control w-full col-span-full">
          <label className="label">
            <span className="label-text">Senha</span>
          </label>
          <label className="input-group flex">
            <input
              type={hidePassword ? "password" : "text"}
              className="input input-bordered w-full"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button
              onClick={() => setHidePassword(!hidePassword)}
              className="btn btn-square btn-ghost"
            >
              {hidePassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </label>
        </div>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className={clsx("label-text", fillBirthdate && "text-error")}>
              Data de Nascimento*
            </span>
          </div>
          {/* TODO: Add a JQuery Mask here (https://github.com/igorescobar/jQuery-Mask-Plugin) */}
          <InputMask
            mask="99/99/9999"
            placeholder="dd/mm/aaaa"
            className={clsx("input input-bordered", fillBirthdate && "input-error")}
            type="text"
            value={user.birthdate}
            onChange={(e) => setUser({ ...user, birthdate: e.target.value })}
          />
        </label>

        {user.type === "student" && (
          <>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Série</span>
              </label>
              <Select
                value={user.serie || "default"}
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
                  <Select.Option key={serie} value={serie}>
                    {serie}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className={clsx("label-text", fillScholarship && "text-error")}>
                  Valor da Bolsa*
                </span>
              </div>
              <input
                type="number"
                className={clsx("input input-bordered", fillScholarship && "input-error")}
                value={user.scholarship}
                onChange={(e) =>
                  setUser({ ...user, scholarship: Number(e.target.value) })
                }
                step={0.01}
                min={0}
              />
            </label>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Nome do Responsável</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={user.responsible_name}
                onChange={(e) => setUser({ ...user, responsible_name: e.target.value })}
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Número do Responsável</span>
              </label>
              <InputMask
                mask="(99) 99999-9999"
                type="text"
                className="input input-bordered"
                value={user.responsible_phone}
                onChange={(e) => setUser({ ...user, responsible_phone: e.target.value })}
              />
            </div>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Turma</span>
              </div>
              <select
                className="select select-bordered join-item"
                onChange={(e) => {
                  const value = parseInt(e.target.value)
                  const classroom = classrooms.find((classroom) => classroom.id === value)
                  setUser({ ...user, classroom: classroom })
                }}
                value={user.classroom?.id}
                disabled={isLoading}
              >
                <option disabled selected value={0}>
                  Selecione uma Turma
                </option>
                {classrooms.map((classroom) => (
                  <option key={classroom.id} value={classroom.id}>
                    {classroom.name}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}

        <Button
          variant="outline"
          color="accent"
          onClick={handleSubmit}
          className="col-span-full"
        >
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
