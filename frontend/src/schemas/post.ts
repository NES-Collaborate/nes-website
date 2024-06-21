import { z } from "zod"

// TODO: Implementar o resto das coisas, tem bem mais do que isso num post.
export const postSchema = z.object({
  title: z.string().min(1, "Título deve ser preenchido"),
  content: z.string().optional(),
})

export type PostFormData = z.infer<typeof postSchema>
