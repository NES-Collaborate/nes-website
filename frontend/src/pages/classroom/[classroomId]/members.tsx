import MinimalUserPresentation from "@/components/MinimalUserPresentation"
import { USER_PAGES } from "@/data/constants"
import {
  useClassroom,
  useClassroomStudents,
  useClassroomTeachers,
} from "@/hooks/classroom"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Page() {
  const router = useRouter()
  const [classroomId, setClassroomId] = useState<number>(0)

  useEffect(() => {
    setClassroomId(Number(router.query.classroomId))
  }, [router.query.classroomId])

  const { data: classroom } = useClassroom(classroomId)
  const { data: teacherData } = useClassroomTeachers(classroom?.id)
  const { data: studentsData } = useClassroomStudents(classroomId)

  const teachers = teacherData?.pages.flatMap((p) => p.data) ?? []
  const students = studentsData?.pages.flatMap((p) => p.data) ?? []

  return (
    <div className="mx-2 lg:mx-20 my-2">
      <div className="mb-10">
        <div className="ml-5 mt-6 mb-2">
          <p className="text-primary font-semibold text-2xl">Professores</p>
        </div>
        <div className="h-[2px] bg-primary mb-4" />
        <div className="gap-2">
          {teachers.map((teacher, index) => (
            <Link key={index} href={`${USER_PAGES[1].url}?userId=${teacher.id}`}>
              <MinimalUserPresentation type="full" user={teacher} key={index} />
            </Link>
          ))}
        </div>
      </div>

      <div>
        <div className="ml-5 mt-6 mb-2">
          <p className="text-primary font-semibold text-2xl">Estudantes</p>
        </div>
        <div className="h-[2px] bg-primary mb-4" />
        <div>
          {students.map((student, index) => (
            <Link key={index} href={`${USER_PAGES[1].url}?userId=${student.id}`}>
              <MinimalUserPresentation type="full" user={student} key={index} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
