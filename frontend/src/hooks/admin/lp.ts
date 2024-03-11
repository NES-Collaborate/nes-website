import {
  createNotice,
  createSuccessCase,
  deleteNotice,
  fetchNotices,
  updateNotice,
  updateSuccessCase,
} from "@/services/admin/lp"
import { Notice, SuccessCase } from "@/types/constants"
import { axiosApi } from "@/utils/axiosClient"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useNotices = () => {
  return useQuery<Notice[]>({
    queryKey: ["notices"],
    queryFn: () => fetchNotices(axiosApi),
  })
}

export const useNoticeMutations = () => {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: (noticeId: number) => deleteNotice(axiosApi, noticeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notices"],
      })
    },
  })

  const editMutation = useMutation({
    mutationFn: (notice: Notice) => updateNotice(axiosApi, notice),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notices"],
      })
    },
  })

  const createMutation = useMutation({
    mutationFn: (notice: Omit<Notice, "id">) => createNotice(axiosApi, notice),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notices"],
      })
    },
  })

  return { deleteMutation, editMutation, createMutation }
}

export const useSuccessCases = () => {
  return useQuery<Notice[]>({
    queryKey: ["success-cases"],
    queryFn: () => fetchNotices(axiosApi),
  })
}

export const useSuccessCasesMutations = () => {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: (successCaseId: number) => deleteNotice(axiosApi, successCaseId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["success-cases"],
      })
    },
  })

  const editMutation = useMutation({
    mutationFn: (successCase: SuccessCase) => updateSuccessCase(axiosApi, successCase),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["success-cases"],
      })
    },
  })

  const createMutation = useMutation({
    mutationFn: (successCase: Omit<SuccessCase, "id">) =>
      createSuccessCase(axiosApi, successCase),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["success-cases"],
      })
    },
  })

  return { deleteMutation, editMutation, createMutation }
}
