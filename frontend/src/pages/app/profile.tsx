import { useBackend } from "@/contexts/backend"
import { useSession } from "@/contexts/session"
import { USER_TYPES_MASK } from "@/data/constants"
import { User } from "@/types/user"
import { withAuth } from "@/utils/auth"
import { getUserPhotoUrl } from "@/utils/client"
import { getUser } from "@/utils/user"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Tooltip } from "react-daisyui"
import {
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaChartLine,
  FaEdit,
  FaEnvelope,
  FaExclamationCircle,
  FaIdCard,
  FaInfo,
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaUserCircle,
  FaUserTag,
} from "react-icons/fa"
import { FaSackDollar } from "react-icons/fa6"

const UserProfile = () => {
  const router = useRouter()
  const session = useSession()
  const { backend, isLogged } = useBackend()
  const { userId } = router.query
  const [requestedUserId, setRequestedUserId] = useState(0)
  const [user, setUser] = useState<User | null>(null)

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

  useEffect(() => {
    if (!isLogged) return
    getUser(requestedUserId, backend).then((res) => {
      setUser(res)
    })
  }, [requestedUserId, backend, isLogged])

  if (!user) return <>Not found user with id: {requestedUserId}</>

  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-100 shadow-xl">
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
                className="rounded-full"
              />
              <p className="text-lg font-bold mt-2">{user.name}</p>
            </div>
            <p>
              <FaIdCard className="inline mr-2" />
              <strong>CPF:</strong> {user.cpf}
            </p>
            <p>
              <FaCalendarAlt className="inline mr-2" />
              <strong>Nascimento:</strong> {user.birthdate}
            </p>
            <p>
              <FaSackDollar className="inline mr-2" />
              <strong>Bolsa:</strong> {user.scholarship}
            </p>
            <p>
              <FaChalkboardTeacher className="inline mr-2" />
              <strong>Série:</strong> {user.serie}
            </p>
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
                <strong>Telefone {index + 1}:</strong> {phone.value}
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
              <strong>Rua/Avenida:</strong> {user.address?.street}
            </p>
            <p>
              <strong>Bairro:</strong> {user.address?.neighborhood}
            </p>
            <p>
              <strong>Numero:</strong> {user.address?.number}
            </p>
            <p>
              <strong>CEP:</strong> {user.address?.cep}
            </p>
            <p>
              <strong>Complemento:</strong> {user.address?.complement || "-"}
            </p>
            <p>
              <strong>Cidade:</strong> {user.address?.city}
            </p>
            <p>
              <strong>Estado:</strong> {user.address?.state}
            </p>
          </div>

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
    </div>
  )
}

export default UserProfile

export const getServerSideProps = withAuth()
