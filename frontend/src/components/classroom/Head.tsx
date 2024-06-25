import { useClassroomTeachers } from "@/hooks/classroom"
import { Classroom } from "@/types/entities"
import { useState } from "react"
import { FaPen, FaVideo } from "react-icons/fa"
import MinimalUserPresentation from "../MinimalUserPresentation"
import CreatePostModal from "./CreatePostModal"

type Props = {
  classroom?: Classroom
}

const Head = ({ classroom }: Props) => {
  const { data: teacherData } = useClassroomTeachers(classroom?.id)

  const teachers = teacherData?.pages.flatMap((p) => p.data) ?? []

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="card bg-base-200">
      <div className="card-body py-2 px-3">
        <h2 className="card-title flex justify-between">
          <span>{classroom?.name}</span>
          <div className="card-actions">
            {/* TODO: Add modal */}
            {/* TODO: Add conditional rendering based on the role of the user in relation of the classroom */}
            <button className="btn btn-ghost btn-sm" onClick={() => setIsOpen(true)}>
              <FaPen /> Adicionar Postagem
            </button>
            <button className="btn btn-primary btn-sm btn-circle">
              <FaVideo />
            </button>
          </div>
        </h2>

        <div className="flex justify-end">
          {teachers.map((teacher) => (
            <MinimalUserPresentation type="small" user={teacher} key={teacher.id} />
          ))}
        </div>
      </div>

      <CreatePostModal isOpen={isOpen} setIsOpen={setIsOpen} classroom={classroom} />
    </div>
  )
}

export default Head
