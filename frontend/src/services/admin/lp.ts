import { Notice, Selection, SuccessCase } from "@/types/constants"
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

export const fetchSuccessCases = async (
  client: AxiosInstance
): Promise<SuccessCase[]> => {
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

export const fetchSelections = async (client: AxiosInstance): Promise<Selection[]> => {
  const res = await client.get("/selection/all")
  return res.data.selections || []
}

export const deleteSelection = async (
  client: AxiosInstance,
  selectionId: number
): Promise<void> => {
  await client.delete(`/selection/${selectionId}`)
}

export const createSelection = async (
  client: AxiosInstance,
  selection: Omit<Selection, "id">
): Promise<Selection> => {
  const res = await client.post("/selection/add", selection)
  return res.data.selection
}

export const updateSelection = async (
  client: AxiosInstance,
  selection: Selection
): Promise<Selection> => {
  const res = await client.put(`/selection/${selection.id}`, selection)
  return res.data.selection
}
