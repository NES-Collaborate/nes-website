import { z } from "zod"

export const enrollmentSchema = z.object({
  userId: z.number(),
  role: z.string().default("teacher"),
})

export const classroomSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Nome deve ser preenchido"),
  members: z.array(enrollmentSchema).nonempty("Deve haver pelo menos um professor"),
})

export type ClassroomFormData = z.infer<typeof classroomSchema>
