import { z } from "zod"

export const noticeSchema = z.object({
  url: z.string().url({ message: "URL inválida" }),
  title: z.string().min(1, "Título é obrigatório!"),
  description: z.string().min(1, "Descrição é obrigatória!"),
  image: z
    .custom<FileList>()
    .transform((file) => file.length > 0 && file.item(0))
    .refine((file) => !file || (!!file && file.type?.startsWith("image/")), {
      message: "Somente imagens são permitidas",
    }),
})

export type NoticeFormData = z.infer<typeof noticeSchema>
