import { useSession } from "@/contexts/session"
import { withAuth } from "@/utils/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loading } from "react-daisyui"

const LogOut = () => {
  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    session.logOut()
    router.push("/auth/login")
  }, [router, session])

  return (
    <div className="text-3xl flex justify-center items-center h-screen gap-3">
      <Loading /> <span>Saindo...</span>
    </div>
  )
}

export default LogOut

export const getServerSideProps = withAuth()
