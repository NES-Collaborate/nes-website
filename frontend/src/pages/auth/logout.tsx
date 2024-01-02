import { Loading } from "@/components/Loading"
import { useSession } from "@/contexts/session"
import { withAuth } from "@/utils/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const LogOut = () => {
  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    session.logOut()
    router.push("/auth/login")
  }, [router, session])

  return (
    <div className="h-screen">
      <Loading text="Saindo..." textClassName="text-3xl" />
    </div>
  )
}

export default LogOut

export const getServerSideProps = withAuth()
