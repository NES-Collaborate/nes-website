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
export type PostType = "Notice" | "ClassMaterial" | "Activity" | "Test"

/**
 * Post representation in the database
 */
export type Post = {
  id: number
  title: string
  content: string
  postBy: {
    name: string
    email: string
    photo?: string
  }
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
