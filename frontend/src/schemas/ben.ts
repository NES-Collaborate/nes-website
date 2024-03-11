import { z } from "zod"

export const benSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório!"),
  type: z.string().min(1, "Tipo é obrigatório!"),
  // photo: ...
  loanedTo: z.string().optional(),
})

export type BenFormData = z.infer<typeof benSchema>
