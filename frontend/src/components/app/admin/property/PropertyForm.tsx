import { InputField } from "@/components/ui/forms/InputField"
import { useBensMutations } from "@/hooks/admin/bens"
import { BenFormData, benSchema } from "@/schemas/ben"
import { Property } from "@/types/entities"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Button } from "react-daisyui"
import { SubmitHandler, useForm } from "react-hook-form"
import { FaEdit, FaPlus } from "react-icons/fa"
// import UserSearchInput from "../../UserSearchInput"

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
  } = useForm<BenFormData>({
    resolver: zodResolver(benSchema),
    values: {
      name: property.name,
      type: property.type,
      loanedTo: property.loanedTo?.id.toString() || "",
    },
  })

  const { createMutation, editMutation } = useBensMutations()

  const submit: SubmitHandler<BenFormData> = async (data) => {
    setIsLoading(true)
    switch (action) {
      case "create":
        await createMutation.mutateAsync(property)
        break
      case "edit":
        await editMutation.mutateAsync(property)
        break
    }
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col items-center gap-0.5">
      <InputField label="Nome" {...register("name")} errors={errors.name} />

      <InputField
        label="Tipo"
        helpText="Caso não existe, será criado!"
        {...register("type")}
        errors={errors.type}
      />

      <InputField
        label="Emprestado a"
        {...register("loanedTo")}
        errors={errors.loanedTo}
      />

      <Button
        variant="outline"
        color="accent"
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
