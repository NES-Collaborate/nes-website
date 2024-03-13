import { AutoCompleteInput } from "@/components/ui/forms/AutoCompleteInput"
import { InputField } from "@/components/ui/forms/InputField"
import { useBackend } from "@/contexts/backend"
import { useBensMutations } from "@/hooks/admin/bens"
import { BenFormData, benSchema } from "@/schemas/ben"
import { fetchUsers } from "@/services/admin/users"
import { Property } from "@/types/entities"
import { User } from "@/types/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Button } from "react-daisyui"
import { SubmitHandler, useForm } from "react-hook-form"
import { FaEdit, FaPlus } from "react-icons/fa"

type Props = {
  property: Property
  action: string
  setToast: (toast: string) => void
}

const PropertyForm = ({ property, action }: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BenFormData>({
    resolver: zodResolver(benSchema),
    values: {
      name: property.name,
      type: property.type,
      loanedTo: property.loanedTo || { name: "" },
    },
  })

  const { backend } = useBackend()
  const { createMutation, editMutation } = useBensMutations()

  const submit: SubmitHandler<BenFormData> = async (data) => {
    setIsLoading(true)

    const formData = {
      id: property.id,
      name: data.name,
      type: data.type,
      loanedTo: data.loanedTo as User,
    }

    switch (action) {
      case "create":
        await createMutation.mutateAsync(formData)
        break
      case "edit":
        await editMutation.mutateAsync(formData)
        break
    }
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <InputField label="Nome" {...register("name")} errors={errors.name} />

      <InputField
        label="Tipo"
        helpText="Caso não exista, será criado!"
        {...register("type")}
        errors={errors.type}
      />

      <AutoCompleteInput
        label="Emprestado para"
        helpText="Pessoa a quem foi emprestado"
        {...register("loanedTo")}
        fetchSuggestions={async (query) =>
          (await fetchUsers(backend, query)).map((u) => ({
            label: u.name,
            value: u.id.toString(),
          }))
        }
        onSuggestionSelect={(suggestion) => {
          setValue(
            "loanedTo",
            {
              id: parseInt(suggestion.value),
              name: suggestion.label,
            },
            { shouldValidate: true }
          )
        }}
        errors={errors.loanedTo}
      />

      <Button
        variant="outline"
        color="accent"
        className="flex items-center gap-2"
        onClick={handleSubmit(submit)}
        disabled={isLoading}
      >
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
    </div>
  )
}

export default PropertyForm
