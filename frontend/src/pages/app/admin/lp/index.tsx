import { withAuth } from "@/utils/auth"
import Link from "next/link"

const PAGES = [
  {
    name: "Gestão de Notícias",
    path: "/app/admin/lp/notices",
    description: "Permite gerenciar as notícias da landing page.",
  },
  {
    name: "Gestão de Casos de Sucesso",
    path: "/app/admin/lp/success-cases",
    description: "Permite gerenciar os casos de sucesso da landing page.",
  },
]

const LandingPage = () => {
  return (
    <>
      <h1 className="text-3xl text-center my-3">Gerenciamento Landing Page</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {PAGES.map((page, i) => (
          <div className="card w-96 bg-base-200 shadow-xl hover:bg-base-300" key={i}>
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

export default LandingPage

export const getServerSideProps = withAuth({ allowedUsers: ["admin"] })
