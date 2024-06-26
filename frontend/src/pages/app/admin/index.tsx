import { withAuth } from "@/utils/auth"
import Link from "next/link"
import {
  FaHome,
  FaMedal,
  FaMoneyBill,
  FaNewspaper,
  FaTools,
  FaUsers,
} from "react-icons/fa"

const PAGES = [
  {
    name: "Landing Page",
    description:
      "Algumas funcionalidades para modificar a página inicial da aplicação que sera mostrada aos visitantes, novos alunos, possíveis doadores, etc.",
    icon: <FaHome />,
    subpages: [
      {
        name: "Notícias",
        path: "/app/admin/notices",
        description: "Permite gerenciar as notícias da landing page.",
        icon: <FaNewspaper />,
      },
      {
        name: "Casos de Sucesso",
        path: "/app/admin/success-cases",
        description: "Permite gerenciar os casos de sucesso da landing page.",
        icon: <FaMedal />,
      },
    ],
  },
  {
    name: "Bens",
    path: "/app/admin/bens",
    description:
      "Permite criar, editar e deletar propriedades (bens materiais) sobre posse do NES além de atribuir determinados bens aos alunos.",
    icon: <FaTools />,
  },
  {
    name: "Usuários",
    path: "/app/admin/users",
    description:
      "Permite adicionar, pesquisar com filtros, editar e deletar todos os usuários da aplicação.",
    icon: <FaUsers />,
  },
  {
    name: "Gestão Financeira",
    path: "/app/admin/finance",
    description:
      "Permite movimentar dinheiro da conta corrente podendo adicionar, remover e fazer pagamento de bolsas em lote.",
    icon: <FaMoneyBill />,
  },
]

const Admin = () => {
  return (
    <>
      <h1 className="text-3xl text-center my-3">Administração</h1>

      <div className="flex flex-col items-center h-full mt-8 justify-center gap-3">
        {PAGES.map((page, i) => (
          <div className="w-11/12" key={i}>
            {page.subpages ? (
              <div className="collapse collapse-arrow bg-base-200 hover:bg-base-300 transition-all duration-250 transform hover:scale-105">
                <input type="checkbox" />
                <div className="collapse-title font-medium flex items-center justify-between">
                  <div className="flex items-center">
                    {page.icon}
                    <span className="ml-2">{page.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{page.description}</span>
                </div>
                <div className="collapse-content">
                  {page.subpages.map((subpage, j) => (
                    <Link
                      href={subpage.path}
                      className="title font-medium p-4 w-full text-start mt-4 bg-base-200 hover:bg-base-300 rounded-2xl transition-all duration-250 transform hover:scale-105 flex items-center justify-between"
                      key={j}
                    >
                      <div className="flex items-center">
                        {subpage.icon}
                        <span className="ml-2">{subpage.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{subpage.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                href={page.path}
                className="title font-medium p-4 w-full text-start mt-4 bg-base-200 hover:bg-base-300 rounded-2xl transition-all duration-250 transform hover:scale-105 flex items-center gap-2 justify-between"
                key={i}
              >
                <div className="flex items-center">
                  {page.icon}
                  <span className="ml-2">{page.name}</span>
                </div>
                <span className="text-sm text-gray-500">{page.description}</span>
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
