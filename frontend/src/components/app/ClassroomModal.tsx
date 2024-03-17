import { useClassroomMutation } from "@/hooks/teacher/classrooms"
import { ClassroomFormData, classroomSchema } from "@/schemas/classroom"
import { Classroom } from "@/types/entities"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { InputField } from "../ui/forms/InputField"

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  classroom: Classroom | null
}

export const ClassroomModal = ({ isOpen, setIsOpen, classroom }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassroomFormData>({
    resolver: zodResolver(classroomSchema),
    values: { name: classroom?.name || "", id: classroom?.id || 0 },
  })

  const { createMutation, updateMutation } = useClassroomMutation()

  const onSubmitHandler: SubmitHandler<ClassroomFormData> = async (data) => {
    if (classroom) {
      await updateMutation.mutateAsync(data as Classroom)
    } else {
      await createMutation.mutateAsync({ name: data.name })
    }

    setIsOpen(false)
  }

  return (
    <>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={isOpen}
        onChange={() => setIsOpen(false)}
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle bth-ghost fixed top-2 right-2"
            onClick={() => setIsOpen(false)}
          >
            x
          </button>

          <h3 className="font-bold text-lg">
            {classroom ? `Editar ${classroom.name}` : "Criar Turma"}
          </h3>

          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <input type="hidden" {...register("id")} />

            <InputField label="Nome" {...register("name")} errors={errors.name} />

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                {classroom ? "Salvar" : "Criar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
