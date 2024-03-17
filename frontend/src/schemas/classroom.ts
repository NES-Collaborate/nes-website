import { z } from "zod"

export const classroomSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Nome deve ser preenchido"),
})

export type ClassroomFormData = z.infer<typeof classroomSchema>
