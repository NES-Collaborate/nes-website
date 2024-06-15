import BottomMenu from "@/components/classroom/BottomMenu"
import Head from "@/components/classroom/Head"
import { useClassroom } from "@/hooks/classroom"
import { withAuth } from "@/utils/auth"
import { classroomLayout } from "@/utils/layouts"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { NextPageWithLayout } from "../_app"

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const [classroomId, setClassroomId] = useState<number>(0)

  useEffect(() => {
    setClassroomId(Number(router.query.classroomId))
  }, [router.query.classroomId])

  const { data: classroom } = useClassroom(classroomId)

  return (
    <>
      <Head classroom={classroom} />
      {/* alguns filtros para as postagens (pesquisar, ordenar, bla bla bla) */}

      <p className="flex items-center justify-center h-full">
        As postagens aparecerão aqui.
      </p>

      <BottomMenu classrooom={classroom} />
    </>
  )
}

Page.getLayout = classroomLayout

export const getServerSideProps = withAuth()

export default Page
