import { withAuth } from "@/utils/auth"
import Link from "next/link"

const PAGES = [
  {
    name: "Gestão da Landing Page",
    path: "/app/admin/lp",
    description:
      "Algumas funcionalidades para modificar a página inicial da aplicação que sera mostrada aos visitantes, novos alunos, possíveis doadores, etc.",
  },
  {
    name: "Gestão de Bens",
    path: "/app/admin/bens",
    description:
      "Permite criar, editar e deletar propriedades (bens materiais) sobre posse do NES além de atribuir determinados bens aos alunos.",
  },
  {
    name: "Gestão de Usuários",
    path: "/app/admin/users",
    description:
      "Permite adicionar, pesquisar com filtros, editar e deletar todos os usuários da aplicação.",
  },
]

const Admin = () => {
  return (
    <>
      <h1 className="text-3xl text-center my-3">Administração</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {PAGES.map((page, i) => (
          <div className="card w-96 bg-base-100 shadow-xl hover:bg-base-200" key={i}>
            <div className="card-body">
              <h2 className="card-title">{page.name}</h2>
              <p>{page.description}</p>
              <div className="card-actions justify-end">
                <Link href={page.path} className="btn btn-primary">
                  Ir
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Admin

export const getServerSideProps = withAuth({ allowedUsers: ["admin"] })
