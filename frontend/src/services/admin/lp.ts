import { Notice, SuccessCase } from "@/types/constants"
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

export const updateNotice = async (
  client: AxiosInstance,
  notice: Notice
): Promise<Notice> => {
  const res = await client.put(`/notice/${notice.id}`, notice)
  return res.data.notice
}

export const fetchSuccessCases = async (client: AxiosInstance): Promise<SuccessCase[]> => {
  const res = await client.get("/success-case/all")
  return res.data.successCases || []
}

export const deleteSuccessCase = async (client: AxiosInstance, successCaseId: number) => {
  await client.delete(`/success-case/${successCaseId}`)
}

export const createSuccessCase = async (
  client: AxiosInstance,
  successCase: Omit<SuccessCase, "id">
) => {
  const res = await client.post("/success-case/add", successCase)
  return res.data.successCase
}

export const updateSuccessCase = async (
  client: AxiosInstance,
  successCase: SuccessCase
) => {
  const res = await client.put(`/success-case/${successCase.id}`, successCase)
  return res.data.successCase
}
