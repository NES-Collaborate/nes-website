import { z } from "zod"

export const selectionSchema = z.object({
  year: z.string().min(1, "Ano é obrigatório!"),
  isOpen: z.boolean(),
  subscriptionUrl: z
    .string()
    .url({ message: "URL para o formulário de inscrição inválida" }),
  programUrl: z.string().url({ message: "URL para a ementa inválida" }),
})

export type SelectionFormData = z.infer<typeof selectionSchema>
