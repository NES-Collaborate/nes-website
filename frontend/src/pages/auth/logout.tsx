import { useSession } from "@/contexts/session"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loading } from "react-daisyui"

const LogOut = () => {
  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    session.logOut && session.logOut()
    router.push("/auth/login")
  }, [router, session])

  return (
    <div className="text-3xl flex justify-center items-center h-screen gap-3">
      <Loading /> <span>Saindo...</span>
    </div>
  )
}

export default LogOut

export const getServerSideProps = ({ req, res }: GetServerSidePropsContext) => {
  res.setHeader("Set-Cookie", "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;")
  return { props: {} }
}
