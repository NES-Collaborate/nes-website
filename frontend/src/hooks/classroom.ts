import { useBackend } from "@/contexts/backend"
import {
  fetchClassroom,
  fetchClassroomMembers,
  fetchClassroomPosts,
} from "@/services/classroom"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

export const useClassroomPosts = ({
  perPage = 10,
  query = "",
  classroomId,
}: {
  classroomId?: number
  perPage?: number
  query?: string
}) => {
  const { backend, isLogged } = useBackend()

  return useInfiniteQuery({
    queryKey: ["classroom-posts", perPage, query],
    queryFn: ({ pageParam }) =>
      fetchClassroomPosts(backend, classroomId as number, pageParam, perPage, query),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: isLogged && !!classroomId,
  })
}

export const useClassroom = (classroomId: number) => {
  const { backend, isLogged } = useBackend()

  return useQuery({
    queryKey: ["classroom", classroomId],
    queryFn: () => fetchClassroom(backend, classroomId),
    enabled: isLogged && !!classroomId,
  })
}

export const useClassroomTeachers = (classroomId?: number) => {
  const { backend, isLogged } = useBackend()

  return useInfiniteQuery({
    queryKey: ["classroom-teachers", classroomId],
    queryFn: ({ pageParam }) =>
      fetchClassroomMembers(backend, classroomId as number, pageParam, "teacher"),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: isLogged && !!classroomId,
  })
}

export const useClassroomStudents = (classroomId?: number) => {
  const { backend, isLogged } = useBackend()

  return useInfiniteQuery({
    queryKey: ["classroom-students", classroomId],
    queryFn: ({ pageParam }) =>
      fetchClassroomMembers(backend, classroomId as number, pageParam, "student"),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: isLogged && !!classroomId,
  })
}
