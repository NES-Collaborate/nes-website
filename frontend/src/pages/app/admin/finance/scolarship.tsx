import ScolarshipList from "@/components/app/admin/finance/ScolarshipList"
import ScolarshipParams from "@/components/app/admin/finance/ScolarshipParams"
import { ScolarshipQuery } from "@/types/queries"
import { withAuth } from "@/utils/auth"
import { useState } from "react"

const Scolarship = () => {
  const [query, setQuery] = useState<ScolarshipQuery>({} as ScolarshipQuery)
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-center my-3">Pagamento de Bolsas</h1>
      <ScolarshipParams query={query} setQuery={setQuery} />

      <ScolarshipList query={query} />
    </div>
  )
}

export default Scolarship

export const getServerSideProps = withAuth({ allowedUsers: ["admin"] })
