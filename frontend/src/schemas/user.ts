import { SERIES, USER_TYPES } from "@/data/constants"
import { z } from "zod"

const attachSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  location: z.string().min(1, "Localização da imagem não pode ser vazia"),
  type: z.enum(["File", "Link"]),
})

const emailSchema = z.object({
  id: z.number().optional(),
  value: z
    .string({ required_error: "Email deve ser preenchido" })
    .email("Email inválido"),
})

const phoneNumberSchema = z.object({
  id: z.number().optional(),
  value: z.string().min(1, "Número de telefone inválido"),
  isEmergency: z.boolean().optional().default(false),
})

const addressSchema = z.object({
  id: z.number().optional(),
  street: z.string().min(1, "Rua deve ser preenchida"),
  neighborhood: z.string().min(1, "Bairro deve ser preenchido"),
  number: z.preprocess(
    (value) => (typeof value === "string" && value ? parseInt(value) : undefined),
    z.number().optional()
  ),
  complement: z.string().optional(),
  city: z.string().min(1, "Cidade deve ser preenchida"),
  state: z.string().min(1, "Estado deve ser preenchido").max(2, "Estado é UF"),
  cep: z
    .string()
    .min(1, "CEP deve ser preenchido")
    .max(9, "CEP inválido")
    .regex(/^\d{5}-\d{3}$/, "CEP não está no formato correto"),
})

const userBaseSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Nome deve ser preenchido"),
  photo: attachSchema.optional(),
  emails: z.preprocess(
    (value) => {
      if (typeof value === "string") {
        return []
      }
      return value
    },
    z
      .array(emailSchema)
      .optional()
      .transform((emails) => emails || [])
  ),
  phones: z.preprocess(
    (value) => {
      if (typeof value === "string") {
        return []
      }
      return value
    },
    z
      .array(phoneNumberSchema)
      .optional()
      .transform((phones) => phones || [])
  ),
  address: addressSchema.optional(),
  password: z.string().min(5, "Senha deve ter pelo menos 5 dígitos"),
  cpf: z
    .string({ required_error: "CPF deve ser preenchido" })
    .min(1, "CPF deve ser preenchido")
    .regex(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/, "CPF inválido"),
  birthdate: z
    .string({ required_error: "Data de nascimento deve ser preenchida" })
    .min(1, "Data de nascimento deve ser preenchida")
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data inválida"),

  type: z.enum(USER_TYPES),
})

const scholarshipSchema = z.preprocess((value) => {
  if (typeof value === "string") {
    const parsedValue = parseFloat(value.replace(".", "").replace(",", "."))
    return isNaN(parsedValue) ? value : parsedValue
  }
  return value
}, z.number().min(0, "Bolsa não pode ser negativa"))

const studentSchema = z.object({
  responsible_name: z.string().min(1, "Nome do responsável deve ser preenchido"),
  responsible_phone: z.string().min(1, "Telefone do responsável deve ser preenchido"),
  serie: z.enum(SERIES),
  scholarship: scholarshipSchema,
  classroom: z.preprocess(
    (value) => {
      if (typeof value === "string") {
        return { id: parseInt(value) }
      }
      return value
    },
    z.object({
      id: z.number(),
    })
  ),
})

export const userSchema = z.discriminatedUnion("type", [
  userBaseSchema
    .extend({
      type: z.literal("student"),
    })
    .merge(studentSchema),

  userBaseSchema.extend({
    type: z.enum(["other", "admin"]),
  }),
])

type UserFormData = z.infer<typeof userSchema & typeof studentSchema>
type EmailFormData = z.infer<typeof emailSchema>
type PhoneNumberFormData = z.infer<typeof phoneNumberSchema>

export type { EmailFormData, PhoneNumberFormData, UserFormData }
