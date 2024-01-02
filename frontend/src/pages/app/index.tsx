import { Classrooms } from "@/components/app/Classrooms"
import { Posts } from "@/components/app/Posts"
import { useSession } from "@/contexts/session"
import { withAuth } from "@/utils/auth"

const App = () => {
  const session = useSession()

  switch (session.user?.type) {
    case "student":
      return <Posts />
    default:
      return <Classrooms />
  }
}

export default App

export const getServerSideProps = withAuth()
