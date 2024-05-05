import { User } from "./user"

/**
 * Classroom representation in the database
 */
export type Classroom = {
  id: number
  name: string
}

/**
 * Post types
 */
export type PostType = "notice" | "class material" | "activity" | "test"

/**
 * Post representation in the database
 */
export type Post = {
  id: number
  title: string
  content: string
  postBy: User
  type: PostType
  endsOn?: string
  createdAt: string
  maxGrade?: number
  penality?: {
    a: number
    b: number
  }
  weight?: number
  subject?: {
    id: number
    name: string
  }
}

/**
 * Attach types
 */
export type AttachType = "file" | "link"

/**
 * Attach Representation
 */
export type Attach = {
  id?: number
  name?: string
  location: string
  type: AttachType
}

/**
 * Property Representation
 */
export type Property = {
  id: number
  photo?: Attach
  name: string
  type: string
  loanedTo?: User
  loanedAt?: string
}

/**
 * Address representation
 */
export type Address = {
  id: number
  street: string // nome da rua
  neighborhood: string // bairro
  number?: number
  complement?: string
  city: string
  state: string // char(2) | UF
  cep: string // char(10)
}
