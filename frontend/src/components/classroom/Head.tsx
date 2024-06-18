import { useClassroomTeachers } from "@/hooks/classroom"
import { Classroom } from "@/types/entities"
import { FaPen, FaVideo } from "react-icons/fa"
import MinimalUserPresentation from "../MinimalUserPresentation"

type Props = {
  classroom?: Classroom
}

const Head = ({ classroom }: Props) => {
  const { data: teacherData } = useClassroomTeachers(classroom?.id)

  const teachers = teacherData?.pages.flatMap((p) => p.data) ?? []

  return (
    <div className="card bg-base-200">
      <div className="card-body py-2 px-3">
        <h2 className="card-title flex justify-between">
          <span>{classroom?.name}</span>
          <div className="card-actions">
            {/* TODO: Add modal */}
            {/* TODO: Add conditional rendering based on the role of the user in relation of the classroom */}
            <button className="btn btn-ghost btn-sm">
              <FaPen /> Adicionar Postagem
            </button>
            <button className="btn btn-primary btn-sm btn-circle">
              <FaVideo />
            </button>
          </div>
        </h2>

        <div className="flex justify-end">
          {teachers.map((teacher) => (
            <MinimalUserPresentation user={teacher} key={teacher.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Head
