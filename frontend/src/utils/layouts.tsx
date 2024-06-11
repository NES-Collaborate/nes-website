import ClassroomLayout from "@/components/layout/Classroom"
import LayoutDefault from "@/components/layout/Default"
import { ReactElement } from "react"

export const defaultLayout = (page: ReactElement) => <LayoutDefault>{page}</LayoutDefault>

export const classroomLayout = (page: ReactElement) => (
  <ClassroomLayout>{page}</ClassroomLayout>
)
