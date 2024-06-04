import { useBackend } from "@/contexts/backend"
import { useClassroomMutation } from "@/hooks/teacher/classrooms"
import { ClassroomFormData, classroomSchema } from "@/schemas/classroom"
import { fetchUserSuggestions } from "@/services/admin/users"
import { Classroom } from "@/types/entities"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { FaPlus } from "react-icons/fa"
import { AutoCompleteInput, Suggestion } from "../ui/forms/AutoCompleteInput"
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
    control,
    setValue,
    formState: { errors },
  } = useForm<ClassroomFormData>({
    resolver: zodResolver(classroomSchema),
    defaultValues: {
      name: classroom?.name || "",
      id: classroom?.id || 0,
      members: classroom?.members || [{ userId: 0, role: "teacher" }],
    },
  })

  const { backend } = useBackend()

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "members",
  })

  const { createMutation, updateMutation } = useClassroomMutation()

  const onSubmitHandler: SubmitHandler<ClassroomFormData> = async (data) => {
    if (classroom) {
      await updateMutation.mutateAsync(data as Classroom)
    } else {
      await createMutation.mutateAsync(data)
    }

    setIsOpen(false)
  }

  const handleUserSelect = (suggestion: Suggestion, index: number) => {
    update(index, { userId: parseInt(suggestion.value), role: "teacher" })
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

            <div className="flex flex-col gap-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-1">
                  <AutoCompleteInput
                    label="Professor"
                    fetchSuggestions={(query) => fetchUserSuggestions(backend, query)}
                    onSuggestionSelect={(suggestion) =>
                      handleUserSelect(suggestion, index)
                    }
                    errors={errors?.members?.[index]?.userId}
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-error"
                    onClick={() => remove(index)}
                  >
                    x
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-sm btn-secondary flex items-center gap-1"
                onClick={() => append({ userId: 0, role: "teacher" })}
              >
                <FaPlus />
                Adicionar Professor
              </button>
            </div>

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
