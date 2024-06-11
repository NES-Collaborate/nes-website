import { withAuth } from "@/utils/auth"
import { classroomLayout } from "@/utils/layouts"
import { useRouter } from "next/router"
import { NextPageWithLayout } from "../_app"

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  return (
    <>
      <h1 className="mt-32 text-center text-xl">Classroom aqui sem layout</h1>
      {/* thumbnail aqui com informações sobre o classroom */}

      {/* alguns filtros para as postagens (pesquisar, ordenar, bla bla bla) */}

      {/* postagens */}

      {/* menu-down para navegar entre postagens, listas (no caso de professor teria como visualizar submissões e ver/editar notas), pessoas (memebros do classroom) */}
    </>
  )
}

Page.getLayout = classroomLayout

export const getServerSideProps = withAuth()

export default Page
