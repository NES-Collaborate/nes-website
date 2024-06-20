import { withAuth } from "@/utils/auth"
import Link from "next/link"

const PAGES = [
  {
    name: "Gestão da Landing Page",
    description:
      "Algumas funcionalidades para modificar a página inicial da aplicação que sera mostrada aos visitantes, novos alunos, possíveis doadores, etc.",
    subpages: [
      {
        name: "Gestão de Notícias",
        path: "/app/admin/notices",
        description: "Permite gerenciar as notícias da landing page.",
      },
      {
        name: "Gestão de Casos de Sucesso",
        path: "/app/admin/success-cases",
        description: "Permite gerenciar os casos de sucesso da landing page.",
      },
    ],
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
  {
    name: "Gestão Financeira",
    path: "/app/admin/finance",
    description:
      "Permite movimentar dinheiro da conta corrente podendo adicionar, remover e fazer pagamento de bolsas em lote.",
  },
]

const Admin = () => {
  return (
    <>
      <h1 className="text-3xl text-center my-3">Administração</h1>

      <div className="flex flex-wrap flex-row justify-center mt-4">
        {PAGES.map((page, i) => (
          <div className="w-11/12" key={i}>
            {page.subpages ? (
              <div className="collapse collapse-arrow bg-base-200 hover:bg-base-300">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">{page.name}</div>
                <div className="collapse-content">
                  {page.subpages.map((subpage, j) => (
                    <Link
                      href={subpage.path}
                      className="title text-xl font-medium p-4 tooltip w-full text-start mt-4 bg-base-200 hover:bg-base-300 rounded-2xl"
                      data-tip={subpage.description}
                      key={j}
                    >
                      {subpage.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                href={page.path}
                className="title text-xl font-medium p-4 tooltip w-full text-start mt-4 bg-base-200 hover:bg-base-300 rounded-2xl"
                data-tip={page.description}
              >
                {page.name}
              </Link>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default Admin

export const getServerSideProps = withAuth({ allowedUsers: ["admin"] })
