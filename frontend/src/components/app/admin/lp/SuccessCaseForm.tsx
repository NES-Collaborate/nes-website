import { FileInputField } from "@/components/ui/forms/FileInputField"
import { InputField } from "@/components/ui/forms/InputField"
import { TextAreaField } from "@/components/ui/forms/TextAreaField"
import { useSession } from "@/contexts/session"
import { useSuccessCasesMutations } from "@/hooks/admin/lp"
import { SuccessCaseFormData, successCaseSchema } from "@/schemas/success-case"
import { SuccessCase } from "@/types/constants"
import { getAttachmentUrl, uploadAttach } from "@/utils/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Button } from "react-daisyui"
import { SubmitHandler, useForm } from "react-hook-form"
import { FaEdit, FaPlus } from "react-icons/fa"

type Props = {
  successCase: SuccessCase
  action: "create" | "edit"
  setToast: (toast: string) => void
  successCases: SuccessCase[]
}

const SuccessCaseForm = ({ successCase, action, setToast }: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SuccessCaseFormData>({
    resolver: zodResolver(successCaseSchema),
    values: {
      name: successCase.name,
      city: successCase.city,
      results: successCase.results,
      difficulties: successCase.difficulties,
      phrase: successCase.phrase,
      imagePath: false,
    },
  })

  const { token } = useSession()

  const { createMutation, editMutation } = useSuccessCasesMutations()

  const submit: SubmitHandler<SuccessCaseFormData> = async (data) => {
    setIsLoading(true)
    var formData = {
      ...data,
      id: successCase.id,
      imagePath: successCase.imagePath,
    } as SuccessCase

    if (action == "create" && !data.imagePath) {
      setIsLoading(false)
      return setError("imagePath", {
        message: "Imagem é obrigatória!",
      })
    }

    if (data.imagePath) {
      const attach = await uploadAttach(data.imagePath, token)
      if (typeof attach === "string") {
        return setToast(attach)
      }
      formData = {
        ...formData,
        imagePath: getAttachmentUrl(attach),
      }
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
    <form className="flex flex-col items-center gap-0.5" onSubmit={handleSubmit(submit)}>
      <InputField label="Nome" {...register("name")} errors={errors.name} />

      <InputField
        label="Cidade - Estado"
        helpText="Use o padrão Cidade - UF (ex.: Maceió - AL)"
        {...register("city")}
        errors={errors.city}
      />

      <TextAreaField
        label="Resultados"
        {...register("results")}
        errors={errors.results}
      />

      <TextAreaField
        label="Dificuldades"
        {...register("difficulties")}
        errors={errors.difficulties}
      />

      <TextAreaField
        label="Frase"
        helpText="Uma frase de efeito!"
        {...register("phrase")}
        errors={errors.phrase}
      />

      <FileInputField
        label="Foto da Pessoa"
        {...register("imagePath")}
        errors={errors.imagePath}
      />

      <Button variant="outline" color="accent" type="submit" disabled={isLoading}>
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

export default SuccessCaseForm
