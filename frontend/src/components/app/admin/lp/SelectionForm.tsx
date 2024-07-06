import { InputField } from "@/components/ui/forms/InputField"
import { useSession } from "@/contexts/session"
import { useSelectionMutations } from "@/hooks/admin/lp"
import { SelectionFormData, selectionSchema } from "@/schemas/selections"
import { Selection } from "@/types/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "react-daisyui"
import { SubmitHandler, useForm } from "react-hook-form"
import { FaEdit, FaPlus } from "react-icons/fa"

type Props = {
  selection: Selection
  action: "create" | "edit"
  setToast: (toast: string) => void
}

const SelectionForm = ({ selection, action, setToast }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SelectionFormData>({
    resolver: zodResolver(selectionSchema),
    values: { ...selection },
  })

  const { token } = useSession()

  const { createMutation, editMutation } = useSelectionMutations()

  const createSelection = async (formData: Selection) => {
    try {
      await createMutation.mutateAsync(formData)
      setToast("Processo Seletivo criado com sucesso!")
    } catch {
      setToast("Erro ao criar processo seletivo.")
    }
  }

  const updateSelection = async (formData: Selection) => {
    try {
      await editMutation.mutateAsync(formData)
      setToast("Processo Seletivo editado com sucesso!")
    } catch {
      setToast("Erro ao editar processo seletivo.")
    }
  }

  const submitForm: SubmitHandler<SelectionFormData> = async (data) => {
    var formData = {} as Selection
    if (action === "create") {
      formData = {
        ...data,
        id: selection.id,
      }
      await createSelection(formData)
    } else if (action === "edit") {
      formData = {
        ...data,
        id: selection.id,
      }
    }
    await updateSelection(formData)
  }

  return (
    <form
      className="flex flex-col items-center gap-2"
      onSubmit={handleSubmit(submitForm)}
    >
      <InputField label="Ano" {...register("year")} errors={errors.year} />

      <label className="flex items-center gap-2">
        <input type="checkbox" {...register("isOpen")} />
        Aberto
      </label>

      <InputField
        label="Link"
        helpText="Link para o formulário de inscrição (URL)"
        {...register("subscriptionUrl")}
        errors={errors.subscriptionUrl}
      />

      <InputField
        label="Link"
        helpText="Link para a ementa (URL)"
        {...register("programUrl")}
        errors={errors.programUrl}
      />

      <Button variant="outline" color="accent">
        {action === "create" ? (
          <>
            <FaPlus /> Criar
          </>
        ) : (
          <>
            <FaEdit /> Editar
          </>
        )}
      </Button>
    </form>
  )
}

export default SelectionForm
