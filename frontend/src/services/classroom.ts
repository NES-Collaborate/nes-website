import { Classroom, Post } from "@/types/entities"
import { User } from "@/types/user"
import { AxiosInstance } from "axios"

type PostsPagination = {
  data: Post[]
  nextPage?: number
}

export const fetchClassroomPosts = async (
  client: AxiosInstance,
  page: number,
  perPage: number,
  query: string
): Promise<PostsPagination> => {
  const res = await client.get("/classroom/posts", {
    params: {
      p: page,
      pp: perPage,
      q: query,
    },
  })
  return res.data
}

type ClassroomPage = {
  data: Classroom[]
  nextPage?: number
}

export const fetchClassrooms = async (
  client: AxiosInstance,
  pageParam: number
): Promise<ClassroomPage> => {
  const res = await client.get("/teacher/classrooms", {
    params: {
      p: pageParam,
    },
  })
  return res.data
}

export const createClassroom = async (
  client: AxiosInstance,
  classroom: Omit<Classroom, "id">
): Promise<Classroom> => {
  const res = await client.post("/teacher/classrooms", classroom)
  return res.data
}

export const updateClassroom = async (
  client: AxiosInstance,
  classroom: Classroom
): Promise<Classroom> => {
  const res = await client.put(`/teacher/classrooms/${classroom.id}`, classroom)
  return res.data
}

export const fetchClassroom = async (
  client: AxiosInstance,
  classroomId: number
): Promise<Classroom> => {
  const res = await client.get(`/classroom/${classroomId}`)
  return res.data
}

type MemberPage = {
  data: User[]
  nextPage?: number
}

export const fetchClassroomMembers = async (
  client: AxiosInstance,
  classroomId: number,
  page: number,
  role?: "admin" | "teacher" | "student"
): Promise<MemberPage> => {
  const res = await client.get(`/classroom/${classroomId}/members`, {
    params: {
      role,
      p: page,
    },
  })
  return res.data
}
