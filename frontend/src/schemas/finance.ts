import { z } from "zod"

export const expenseLogSchema = z.object({
  value: z.preprocess(
    (value) =>
      typeof value === "string" && value
        ? parseFloat(value.replace(".", "").replace(",", "."))
        : 0,
    z.number().min(1, "O valor deve ser preenchido")
  ),
  category: z
    .string()
    .min(1, "A categoria é origatória!")
    .transform((value) => {
      return { id: 0, name: value.trim(), description: "" }
    }),
  type: z.enum(["removal", "deposit"]).default("removal"),
  comment: z.string().optional(),
  proof: z
    .custom<FileList>()
    .refine((file) => file.length > 0, {
      message: "O Comprovante é obrigatório!",
    })
    .transform((file) => file.item(0)),
})

export type ExpenseLogFormData = z.infer<typeof expenseLogSchema>
