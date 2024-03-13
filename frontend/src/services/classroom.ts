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
