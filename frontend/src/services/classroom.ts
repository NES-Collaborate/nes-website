import { Classroom, Post } from "@/types/entities"
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

export const fetchClassrooms = async (client: AxiosInstance): Promise<Classroom[]> => {
  const res = await client.get("/teacher/classrooms")
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
