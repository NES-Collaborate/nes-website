import { getUserSession } from "@/utils/auth"
import { GetServerSidePropsContext } from "next"
import { Loading } from "react-daisyui"

const Main = () => {
  return (
    <div className="flex items-center justify-center h-[75vh]">
      <Loading />
      <span className="ml-3 text-2xl">Redirecionando...</span>
    </div>
  )
}
export default Main

export const getServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
  const user = await getUserSession(req)
  return {
    redirect: {
      destination: user ? "/app" : "/nes",
      permanent: false,
    },
  }
}
