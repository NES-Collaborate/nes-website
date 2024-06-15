import LayoutDefault from "@/components/layout/Layout"
import { ReactElement } from "react"

export const defaultLayout = (page: ReactElement) => (
  <LayoutDefault type="default">{page}</LayoutDefault>
)

export const classroomLayout = (page: ReactElement) => (
  <LayoutDefault type="classroom">{page}</LayoutDefault>
)
