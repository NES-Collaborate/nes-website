import { Post } from "@/types/entities"
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
