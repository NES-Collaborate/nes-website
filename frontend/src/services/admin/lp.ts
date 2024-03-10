import { Notice } from "@/types/constants"
import { AxiosInstance } from "axios"

export const fetchNotices = async (client: AxiosInstance): Promise<Notice[]> => {
  const res = await client.get("/notice/all")
  return res.data.notices || []
}

export const deleteNotice = async (
  client: AxiosInstance,
  noticeId: number
): Promise<void> => {
  await client.delete(`/notice/${noticeId}`)
}

export const createNotice = async (
  client: AxiosInstance,
  notice: Omit<Notice, "id">
): Promise<Notice> => {
  const res = await client.post("/notice/add", notice)
  return res.data.notice
}

export const editNotice = async (
  client: AxiosInstance,
  notice: Notice
): Promise<Notice> => {
  const res = await client.put(`/notice/${notice.id}`, notice)
  return res.data.notice
}
