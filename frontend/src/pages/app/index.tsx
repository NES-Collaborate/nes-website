import { useSession } from "@/contexts/session"
import { withAuth } from "@/utils/auth"

const App = () => {
  const session = useSession()
  return (
    <div className="text-3xl h-screen flex justify-center items-center">
      Welcome, {session.user?.name}
    </div>
  )
}

export default App

export const getServerSideProps = withAuth()
