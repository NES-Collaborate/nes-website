import { ConfirmModal } from "@/components/ConfirmModal"
import Toast from "@/components/Toast"
import { useFinanceMutation, useStudents } from "@/hooks/admin/finance"
import { ScholarshipQuery } from "@/types/queries"
import { getUserPhotoUrl, toReal } from "@/utils/client"
import Image from "next/image"
import { useState } from "react"
import { Tooltip } from "react-daisyui"

type Props = {
  query: ScholarshipQuery
}

const ScholarshipList = ({ query }: Props) => {
  const { data: students = [] } = useStudents(query)
  const [toast, setToast] = useState<string>("")
  const { payStudentsMutation } = useFinanceMutation()
  const everyAlreadyPaid = students.every((s) => s.alreadyPaid)

  const handlePayEveryStudent = async () => {
    if (everyAlreadyPaid) return
    await payStudentsMutation.mutateAsync({
      studentIds: students.filter((s) => !s.alreadyPaid).map((s) => s.id),
      month: query.month,
      year: query.year,
    })
    setToast("Estudantes marcados como pagos.")
  }

  const handlePayStudent = async (id: number) => {
    const student = students.find((s) => s.id === id)
    if (student?.alreadyPaid) return
    await payStudentsMutation.mutateAsync({
      studentIds: [id],
      month: query.month,
      year: query.year,
    })
    setToast(`Estudante ${student?.name} marcado como pago.`)
  }

  return (
    <div className="overflow-x-auto my-4">
      <table className="table table-zebra text-center">
        <ConfirmModal
          title="Pagamento de Bolsa"
          description={`Você tem certeza que deseja marcar TODOS os alunos desta turma como PAGOS no mês ${query.month}/${query.year}?`}
        >
          {(show) => (
            <thead>
              <tr>
                <th>
                  <Tooltip
                    message="Marcar TODOS como PAGOS"
                    color="warning"
                    position="right"
                  >
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={everyAlreadyPaid}
                      disabled={everyAlreadyPaid}
                      onClick={show(handlePayEveryStudent)}
                    />
                  </Tooltip>
                </th>
                <th>Aluno</th>
                <th>Bolsa (R$)</th>
              </tr>
            </thead>
          )}
        </ConfirmModal>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <th>
                <ConfirmModal
                  title="Confirmação de Pagamento"
                  description={`Você tem certeza que deseja marcar o estudante ${student.name} como PAGO no mês ${query.month}/${query.year}?`}
                >
                  {(show) => (
                    <input
                      type="checkbox"
                      className="checkbox"
                      disabled={student.alreadyPaid}
                      checked={student.alreadyPaid}
                      onClick={show(() => handlePayStudent(student.id))}
                    />
                  )}
                </ConfirmModal>
              </th>
              <th className="flex items-center justify-center gap-3">
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
              </th>
              <th>{toReal(student.scholarshipValue)}</th>
            </tr>
          ))}
        </tbody>
      </table>

      <Toast message={toast} setMessage={setToast} vertical="top" />
    </div>
  )
}

export default ScholarshipList
