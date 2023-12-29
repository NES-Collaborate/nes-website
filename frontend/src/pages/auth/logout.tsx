import { cookies } from "next/headers"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const LogOut = () => {
  const router = useRouter()

  useEffect(() => {
    router.push("/auth/login")
  }, [router])

  return <>Saindo...</>
}

export default LogOut

export const getServerSideProps = () => {
  cookies().delete("_token")

  return { props: {} }
}
