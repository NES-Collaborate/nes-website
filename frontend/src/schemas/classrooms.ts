import { Classroom } from "@/types/entities"
import { AxiosInstance } from "axios"

export const fetchClassrooms = async (client: AxiosInstance): Promise<Classroom[]> => {
  const res = await client.get("/teacher/classrooms")
  return res.data
}
