import {
  createNotice,
  deleteNotice,
  fetchNotices,
  updateNotice,
} from "@/services/admin/lp"
import { Notice } from "@/types/constants"
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
