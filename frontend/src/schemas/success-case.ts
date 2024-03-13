import { z } from "zod"

export const successCaseSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório!"),
  city: z.string().min(1, "Cidade - Estado é obrigatório!"),
  results: z.string().min(1, "Resultados é obrigatório!"),
  difficulties: z.string().min(1, "Dificuldades é obrigatório!"),
  phrase: z.string().min(1, "Frase de Efeito é obrigatório!"),
  imagePath: z
    .custom<FileList>()
    .transform((file) => file.length > 0 && file.item(0))
    .refine((file) => !!file && file.type?.startsWith("image/"), {
      message: "Somente imagens são permitidas",
    }),
})

export type SuccessCaseFormData = z.infer<typeof successCaseSchema>
