export type User = {
  id: number
  name: string
  photo?: string
  emails: string[]
  phones: string[]
  address?: string
  cpf: string
  birthdate: string
  scolarship: number
  serie?: string
  type: "admin" | "other" | "student" | "responsible"
}
