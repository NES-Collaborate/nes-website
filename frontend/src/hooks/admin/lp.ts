import {
  createNotice,
  createSelection,
  createSuccessCase,
  deleteNotice,
  deleteSelection,
  deleteSuccessCase,
  fetchNotices,
  fetchSelections,
  fetchSuccessCases,
  updateNotice,
  updateSelection,
  updateSuccessCase,
} from "@/services/admin/lp"
import { Notice, Selection, SuccessCase } from "@/types/constants"
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
  return useQuery<SuccessCase[]>({
    queryKey: ["success-cases"],
    queryFn: () => fetchSuccessCases(axiosApi),
  })
}

export const useSuccessCasesMutations = () => {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: (successCaseId: number) => deleteSuccessCase(axiosApi, successCaseId),
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

export const useSelections = () => {
  return useQuery<Selection[]>({
    queryKey: ["selections"],
    queryFn: () => fetchSelections(axiosApi),
  })
}

export const useSelectionMutations = () => {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: (selectionId: number) => deleteSelection(axiosApi, selectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["selections"],
      })
    },
  })

  const editMutation = useMutation({
    mutationFn: (selection: Selection) => updateSelection(axiosApi, selection),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["selections"],
      })
    },
  })

  const createMutation = useMutation({
    mutationFn: (selection: Omit<Selection, "id">) =>
      createSelection(axiosApi, selection),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["selections"],
      })
    },
  })

  return { deleteMutation, editMutation, createMutation }
}
