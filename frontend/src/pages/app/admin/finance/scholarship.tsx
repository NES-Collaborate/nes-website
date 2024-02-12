import ScholarshipList from "@/components/app/admin/finance/ScholarshipList"
import ScholarshipParams from "@/components/app/admin/finance/ScholarshipParams"
import { ScholarshipQuery } from "@/types/queries"
import { withAuth } from "@/utils/auth"
import { useState } from "react"

const Scholarship = () => {
  const [query, setQuery] = useState<ScholarshipQuery>({} as ScholarshipQuery)
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-center my-3">Pagamento de Bolsas</h1>
      <ScholarshipParams query={query} setQuery={setQuery} />

      <ScholarshipList query={query} />
    </div>
  )
}

export default Scholarship

export const getServerSideProps = withAuth({ allowedUsers: ["admin"] })
