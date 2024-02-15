import { Serie, UserType } from "./constants"
import { Address, Attach } from "./entities"

/**
 * Email representation on DB
 */
export type Email = {
  id?: number
  value: string
}

/**
 * Phone Number Representation on DB
 */
export type PhoneNumber = {
  id?: number
  value: string
  isEmergency?: boolean
}

/**
 * User Representation on DB
 */
export type User = {
  id: number
  name: string
  photo?: Attach
  emails?: Email[]
  phones?: PhoneNumber[]
  address?: Address
  password?: string
  responsible_name?: string
  responsible_phone?: string
  cpf: string
  birthdate: string
  scholarship: number
  serie?: Serie
  type: UserType
}
