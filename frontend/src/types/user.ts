import { Serie, UserType } from "./constants"
import { Address } from "./entities"

export type User = {
  id: number
  name: string
  photo?: string
  emails: string[]
  phones: string[]
  address?: Address
  cpf: string
  birthdate: string
  scolarship: number
  serie?: Serie
  type: UserType
}
