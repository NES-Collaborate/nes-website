import Loading from "@/components/Loading"
import { useSession } from "@/contexts/session"
import { useClassrooms } from "@/hooks/teacher/classrooms"
import { Classroom } from "@/types/entities"
import Link from "next/link"
import { useState } from "react"
import { Alert, Tooltip } from "react-daisyui"
import { FaChalkboardTeacher, FaDoorOpen, FaEdit } from "react-icons/fa"
import { MdErrorOutline } from "react-icons/md"
import { ClassroomModal } from "./ClassroomModal"

const Classrooms = () => {
  const { data: classrooms = [], isFetching, error } = useClassrooms()
  const { user } = useSession()

  const [openModal, setOpenModal] = useState(false)
  const [modalTargetClassroom, setModalTargetClassroom] = useState<Classroom | null>(null)

  const toggleCreateModal = () => {
    setModalTargetClassroom(null)
    setOpenModal(!openModal)
  }

  const toggleEditModal = (classroom: Classroom) => {
    setModalTargetClassroom(classroom)
    setOpenModal(!openModal)
  }

  return (
    <>
      <div className="text-center my-2">
        <h1 className="text-xl text-center font-bold">Turmas</h1>
        {error && (
          <div className="my-4 mx-2 lg:mx-4">
            <Alert status="error" icon={<MdErrorOutline />}>
              {error.message}
            </Alert>
          </div>
        )}
      </div>

      {isFetching && <Loading text="Carregando turmas..." center />}

      {!isFetching && (
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {!classrooms.length && (
              <p className="text-xl my-4">Nenhuma turma encontrada</p>
            )}

            {classrooms.map((classroom) => (
              <div className="card w-96 bg-base-200 shadow-xl" key={classroom.id}>
                <div className="card-body">
                  <h2 className="card-title">{classroom.name}</h2>
                  <div className="card-actions justify-center">
                    <Link
                      href={`/classroom/${classroom.id}`}
                      className="btn btn-primary"
                    >
                      <FaDoorOpen />
                      Acessar
                    </Link>

                    {user?.type === "admin" && (
                      <button
                        onClick={() => toggleEditModal(classroom)}
                        className="btn btn-secondary"
                      >
                        <FaEdit /> Editar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Tooltip message="Criar turma" className="fixed bottom-5 right-5">
        <button className="btn btn-accent btn-sm" onClick={toggleCreateModal}>
          <FaChalkboardTeacher size={20} />
        </button>
      </Tooltip>

      <ClassroomModal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        classroom={modalTargetClassroom}
      />
    </>
  )
}

export default Classrooms
