import { Loading } from "@/components/Loading"
import { getUserSession } from "@/utils/auth"
import { GetServerSidePropsContext } from "next"

const Main = () => {
  return (
    <div className="h-[75vh]">
      <Loading text="Redirecionando..." textClassName="ml-3 text-2xl" center />
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
