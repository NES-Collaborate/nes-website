import { FileInputField } from "@/components/ui/forms/FileInputField"
import { InputField } from "@/components/ui/forms/InputField"
import { SwapField } from "@/components/ui/forms/SwapField"
import { useSession } from "@/contexts/session"
import { useFinanceMutation } from "@/hooks/admin/finance"
import { ExpenseLogFormData, expenseLogSchema } from "@/schemas/finance"
import { maskMoney, uploadAttach } from "@/utils/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Button } from "react-daisyui"
import { SubmitHandler, useForm } from "react-hook-form"
import { FaPlus } from "react-icons/fa"

type Props = {
  toggle: () => void
}

const ExpenseLogForm = ({ toggle }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { token } = useSession()

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<ExpenseLogFormData>({
    resolver: zodResolver(expenseLogSchema),
  })

  const { createMutation } = useFinanceMutation()

  const submit: SubmitHandler<ExpenseLogFormData> = async (data) => {
    setIsLoading(true)

    const attach = await uploadAttach(data.proof, token)
    if (typeof attach === "string") {
      setError(attach)
      return
    }

    const formData = { ...data, proof: attach.id! }

    await createMutation.mutateAsync(formData)

    toggle()
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      {error && <div className="alert alert-error shadow-lg">{error}</div>}
      <InputField
        label="Valor"
        helpText="R$"
        mask={maskMoney}
        {...register("value")}
        errors={errors.value}
      />

      <InputField
        label="Categoria"
        helpText="Caso não exista, será criada automaticamente"
        {...register("category")}
        errors={errors.category}
      />

      <SwapField
        label="Tipo"
        swapOn="Entrada"
        swapOff="Saida"
        onCheck={(checked) => {
          setValue("type", checked ? "deposit" : "removal")
        }}
      />

      <InputField label="Comentário" {...register("comment")} errors={errors.comment} />

      <FileInputField label="Comprovante" {...register("proof")} errors={errors.proof} />

      <div className="flex justify-center">
        <Button disabled={isLoading}>
          <FaPlus /> Inserir
        </Button>
      </div>
    </form>
  )
}

export default ExpenseLogForm
