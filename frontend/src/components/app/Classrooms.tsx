import Loading from "@/components/Loading"
import { useBackend } from "@/contexts/backend"
import { useSession } from "@/contexts/session"
import { Classroom } from "@/types/entities"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Alert } from "react-daisyui"
import { FaDoorOpen, FaEdit } from "react-icons/fa"
import { MdErrorOutline } from "react-icons/md"

const Classrooms = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [classrooms, setClassrooms] = useState<Classroom[]>([])
  const { backend } = useBackend()
  const { user } = useSession()

  useEffect(() => {
    setIsLoading(true)
    const fetchClassrooms = async () => {
      try {
        const res = await backend.get("/teacher/classrooms")
        setClassrooms(res.data)
        setError(null)
      } catch {
        setError("Erro ao carregar turmas. Tente novamente mais tarde.")
      }
    }
    fetchClassrooms()
    setIsLoading(false)
  }, [backend])

  return (
    <div className="text-center mt-2">
      <h1 className="text-3xl font-bold">Turmas</h1>
      {error && (
        <div className="my-4 mx-2 lg:mx-4">
          <Alert status="error" icon={<MdErrorOutline />}>
            {error}
          </Alert>
        </div>
      )}

      {isLoading && <Loading text="Carregando turmas..." center />}

      {!isLoading && (
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {!classrooms.length && (
              <p className="text-xl my-4">Nenhuma turma encontrada</p>
            )}

            {classrooms.map((classroom) => (
              <div className="card w-96 bg-base-100 shadow-xl" key={classroom.id}>
                <div className="card-body">
                  <h2 className="card-title">{classroom.name}</h2>
                  <div className="card-actions justify-center">
                    <Link
                      href={`/app/classrooms/${classroom.id}`}
                      className="btn btn-primary"
                    >
                      <FaDoorOpen />
                      Acessar
                    </Link>

                    {user?.type === "admin" && (
                      <Link
                        href={`/app/classrooms/${classroom.id}/edit`}
                        className="btn btn-secondary"
                      >
                        <FaEdit /> Editar
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Classrooms
