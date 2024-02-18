import UsersList from "@/components/app/admin/users/UsersList"
import { withAuth } from "@/utils/auth"
import { useState } from "react"
import { Input } from "react-daisyui"

const AdminUsers = () => {
  const [query, setQuery] = useState("")

  return (
    <>
      <h1 className="text-3xl text-center my-3">Gestão de Usuários</h1>

      <div className="flex justify-center items-center">
        <Input
          className="w-3/4"
          placeholder="Pesquisar usuário (nome, cpf, email, telefone) ..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <UsersList query={query} />
    </>
  )
}

export default AdminUsers

export const getServerSideProps = withAuth({ allowedUsers: ["admin"] })
