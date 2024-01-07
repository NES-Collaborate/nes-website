import PropertyList from "@/components/app/admin/property/PropertyList"
import { withAuth } from "@/utils/auth"
import { useState } from "react"
import { Input } from "react-daisyui"

const AdminProperties = () => {
  const [query, setQuery] = useState("")

  return (
    <>
      <h1 className="text-3xl text-center my-3">Gestão de Bens</h1>

      <div className="flex justify-center my-3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisar"
          className="w-3/4"
        />
      </div>

      <PropertyList query={query} />
    </>
  )
}

export default AdminProperties

export const getServerSideProps = withAuth({ allowedUsers: ["admin"] })
