import Toast from "@/components/Toast"
import { useSession } from "@/contexts/session"
import { ScolarshipQuery } from "@/types/queries"
import { User } from "@/types/user"
import { axiosServer } from "@/utils/axiosClient"
import { getUserPhotoUrl } from "@/utils/client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Tooltip } from "react-daisyui"

type Props = {
  query: ScolarshipQuery
}

type Student = User & { alreadyPaid: boolean }

const ScolarshipList = ({ query }: Props) => {
  const session = useSession()
  const [students, setStudents] = useState<Student[]>([])
  const [toast, setToast] = useState<string>("")
  const everyAlreadyPaid = students.every((s) => s.alreadyPaid)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axiosServer.get("/admin/finance/students", {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
          params: query,
        })
        setStudents(res.data.students)
        if (res.data.students.length === 0) setToast("Nenhum estudante encontrado.")
      } catch (error) {
        console.error(error)
      }
    }

    fetchStudents()
  }, [query, session.token])

  const handlePayEveryStudent = async () => {
    if (everyAlreadyPaid) return
    try {
      await axiosServer.post(
        "/admin/finance/students/pay",
        {
          ids: students.filter((s) => !s.alreadyPaid).map((s) => s.id),
          month: query.month,
          year: query.year,
        },
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      setStudents(
        students.map((s) => {
          return { ...s, alreadyPaid: true }
        })
      )
      setToast(
        `Todos os estudantes foram marcados como pagos referente à mês de ${query.month}/${query.year}.`
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handlePayStudent = async (id: number) => {
    if (students.find((s) => s.id === id)?.alreadyPaid) return
    try {
      await axiosServer.post(
        "/admin/finance/students/pay",
        {
          ids: [id],
          month: query.month,
          year: query.year,
        },
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      setStudents(students.map((s) => (s.id === id ? { ...s, alreadyPaid: true } : s)))
      setToast(
        `Estudante ${
          students.find((s) => s.id === id)?.name
        } marcado como pago referente à mês de ${query.month}/${query.year}.`
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="overflow-x-auto my-4">
      <table className="table table-zebra text-center">
        <thead>
          <tr>
            <th>
              <Tooltip message="Marcar TODOS como PAGOS" color="warning" position="right">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={everyAlreadyPaid}
                  disabled={everyAlreadyPaid}
                  onClick={handlePayEveryStudent}
                />
              </Tooltip>
            </th>
            <th>Aluno</th>
            <th>Bolsa (R$)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <th>
                <input
                  type="checkbox"
                  className="checkbox"
                  disabled={student.alreadyPaid}
                  checked={student.alreadyPaid}
                  onClick={() => handlePayStudent(student.id)}
                />
              </th>
              <th>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <Image
                        width={56}
                        height={56}
                        src={getUserPhotoUrl(student)}
                        alt="User photo"
                      />
                    </div>
                  </div>
                  <div className="font-bold">{student.name}</div>
                </div>
              </th>
              <th>
                {student.scolarship.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </th>
            </tr>
          ))}
        </tbody>
      </table>

      <Toast message={toast} setMessage={setToast} vertical="top" />
    </div>
  )
}

export default ScolarshipList
