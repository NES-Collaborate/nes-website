import { ConfirmModal } from "@/components/ConfirmModal"
import Toast from "@/components/Toast"
import { useSession } from "@/contexts/session"
import { USER_TYPES_MASK } from "@/data/constants"
import { useUserMutations, useUsers } from "@/hooks/admin/users"
import { User } from "@/types/user"
import { withAuth } from "@/utils/auth"
import { getUserPhotoUrl, maskCEP, maskCPF, maskPhone } from "@/utils/client"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Button, Tooltip } from "react-daisyui"
import {
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaChartLine,
  FaEdit,
  FaEnvelope,
  FaExclamationCircle,
  FaIdCard,
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaUserCircle,
  FaUserTag,
  FaUserTie,
} from "react-icons/fa"
import { FaSackDollar, FaTrashCan } from "react-icons/fa6"

const UserProfile = () => {
  const router = useRouter()
  const session = useSession()
  const { userId } = router.query
  const [requestedUserId, setRequestedUserId] = useState(0)
  const [user, setUser] = useState<User | null>(null)
  const [toastMessage, setToastMessage] = useState("")

  const { deleteMutation } = useUserMutations()

  const { data: users = [] } = useUsers("", requestedUserId)

  useEffect(() => {
    if (users?.length > 0) {
      setUser(users[0])
    }
  }, [users])

  useEffect(() => {
    if (session.user?.type === "student" && session.user.id !== requestedUserId) {
      router.push("/app")
    }

    if (typeof userId === "string") {
      setRequestedUserId(parseInt(userId))
    } else {
      setRequestedUserId(session.user?.id as number)
    }
  }, [session.user, requestedUserId, router, userId])

  if (!user) return <>Not found user with id: {requestedUserId}</>

  const handleConfirmDelete = () => {
    deleteMutation.mutate(user.id, {
      onSuccess: () => {
        setToastMessage("Usuário excluído com sucesso")
      },
      onError: (err) => {
        const detail = (err.response?.data as { detail?: string })?.detail
        if (detail) {
          setToastMessage(detail)
        } else {
          setToastMessage(err.message)
        }
      },
    })
  }

  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-200 shadow-xl">
        <Tooltip
          message="Excluir Usuário"
          className="absolute right-2 top-2"
          position="bottom"
          color="accent"
        >
          <ConfirmModal
            title="Excluir Usuário"
            description="Tem certeza que deseja excluir este usuário?"
          >
            {(show) => (
              <Button color="error" shape="circle" onClick={show(handleConfirmDelete)}>
                <FaTrashCan size={15} />
              </Button>
            )}
          </ConfirmModal>
        </Tooltip>

        <div className="card-body">
          <h2 className="card-title flex items-center gap-2 text-3xl">
            <FaUserCircle />
            Perfil do Usuário
          </h2>

          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
            <div className="col-span-1 lg:col-span-3 flex flex-col items-center">
              <Image
                src={getUserPhotoUrl(user)}
                alt="Foto do perfil"
                width={144}
                height={144}
                className="rounded-full border-accent border-4"
              />
              <p className="text-lg font-bold mt-2">{user.name}</p>
            </div>
            <p>
              <FaIdCard className="inline mr-2" />
              <strong>CPF:</strong> {maskCPF(user.cpf)}
            </p>
            <p>
              <FaCalendarAlt className="inline mr-2" />
              <strong>Nascimento:</strong> {user.birth}
            </p>
            <p>
              <FaSackDollar className="inline mr-2" />
              <strong>Bolsa:</strong> {user.scholarshipValue}
            </p>
            {user.type === "student" && (
              <p>
                <FaChalkboardTeacher className="inline mr-2" />
                <strong>Série:</strong> {user.serie}
              </p>
            )}
            <p>
              <FaUserTag className="inline mr-2" />
              <strong>Tipo:</strong> {USER_TYPES_MASK[user.type]}
            </p>
          </div>

          {/* Contatos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
            <h3 className="col-span-full flex items-center gap-2 text-xl">
              <FaPhone className="text-accent" /> Contatos
            </h3>
            <p>
              <FaEnvelope className="inline mr-2" />
              <strong>E-mails:</strong>{" "}
              {(user.emails || []).map((e) => e.value).join(", ")}
            </p>
            {(user.phones || []).map((phone, index) => (
              <p key={index}>
                <FaPhone className="inline mr-2" />
                <strong>Telefone {index + 1}:</strong> {maskPhone(phone.value)}
                {phone.isEmergency && (
                  <Tooltip message="Telefone de emergência">
                    <FaExclamationCircle className="ml-2 text-red-500" />
                  </Tooltip>
                )}
              </p>
            ))}
          </div>

          {/* Endereço */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
            <h3 className="col-span-full flex items-center gap-2 text-xl">
              <FaMapMarkerAlt className="text-accent" /> Endereço
            </h3>
            <p>
              <strong>Rua/Avenida:</strong> {user.address?.street || "-"}
            </p>
            <p>
              <strong>Bairro:</strong> {user.address?.neighborhood || "-"}
            </p>
            <p>
              <strong>Numero:</strong> {user.address?.number || "-"}
            </p>
            <p>
              <strong>CEP:</strong> {maskCEP(user.address?.cep || "-")}
            </p>
            <p>
              <strong>Complemento:</strong> {user.address?.complement || "-"}
            </p>
            <p>
              <strong>Cidade:</strong> {user.address?.city || "-"}
            </p>
            <p>
              <strong>Estado:</strong> {user.address?.state || "-"}
            </p>
          </div>

          {/* Informações do Responsável */}
          {user.type === "student" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
              <h3 className="col-span-full flex items-center gap-2 text-xl">
                <FaUserTie className="text-accent" /> Responsável
              </h3>
              <p>
                <strong>Nome:</strong> {user.responsibleName}
              </p>
              <p>
                <strong>Telefone:</strong> {maskPhone(user.responsibleNumber || "")}
              </p>
            </div>
          )}

          {/* Botões de Ação */}
          <div className="flex justify-end gap-4 mt-4">
            <button className="btn btn-primary gap-2">
              <FaEdit />
              Editar
            </button>
            <button className="btn btn-secondary gap-2">
              <FaLock />
              Mudar Senha
            </button>
            {user.type === "student" && (
              <button className="btn btn-accent gap-2">
                <FaChartLine />
                Ver Desempenho Acadêmico
              </button>
            )}
          </div>
        </div>
      </div>

      <Toast
        message={toastMessage}
        setMessage={setToastMessage}
        alert="warning"
        vertical="top"
        horizontal="center"
      />
    </div>
  )
}

export default UserProfile

export const getServerSideProps = withAuth()
