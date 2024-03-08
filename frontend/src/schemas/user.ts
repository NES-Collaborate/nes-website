import { SERIES, USER_TYPES } from "@/data/constants"
import { z } from "zod"

const AttachSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  location: z.string().min(1, "Localização da imagem não pode ser vazia"),
  type: z.enum(["File", "Link"]),
})

const EmailSchema = z.object({
  id: z.number().optional(),
  value: z.string().email("Email inválido"),
})

const PhoneNumberSchema = z.object({
  id: z.number().optional(),
  value: z.string().min(1, "Número de telefone inválido"),
  isEmergency: z.boolean().optional().default(false),
})

const AddressSchema = z.object({
  id: z.number().optional(),
  street: z.string().min(1, "Rua deve ser preenchida"),
  neighborhood: z.string().min(1, "Bairro deve ser preenchido"),
  number: z.number().min(1, "Número não pode ser negativo").optional(),
  complement: z.string().optional(),
  city: z.string().min(1, "Cidade deve ser preenchida"),
  state: z.string().min(1, "Estado deve ser preenchido").max(2, "Estado é UF"),
  cep: z.string().min(1, "CEP deve ser preenchido").max(9, "CEP inválido"),
})

const UserBaseSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Nome deve ser preenchido"),
  photo: AttachSchema.optional(),
  emails: z
    .array(EmailSchema)
    .optional()
    .transform((emails) => emails || []),
  phones: z
    .array(PhoneNumberSchema)
    .optional()
    .transform((phones) => phones || []),
  address: AddressSchema.optional(),
  password: z.string().optional(),
  cpf: z
    .string()
    .min(1, "CPF deve ser preenchido")
    .regex(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/, "CPF inválido"),
  birthdate: z
    .string()
    .min(1, "Data de nascimento deve ser preenchida")
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data inválida"),

  type: z.enum(USER_TYPES),
})

const StudentSchema = z.object({
  responsible_name: z.string().min(1, "Nome do responsável deve ser preenchido"),
  responsible_phone: z.string().min(1, "Telefone do responsável deve ser preenchido"),
  serie: z.enum(SERIES),
  scholarship: z.number().min(0, "Bolsa não pode ser negativa"),
  classroom: z.object({
    id: z.number(),
    name: z.string(),
  }),
})

export const UserSchema = UserBaseSchema.and(
  z.union([
    z.object({
      type: z.literal("student").and(StudentSchema),
    }),
    z.object({
      type: z.enum(["admin", "other"]),
    }),
  ])
)
