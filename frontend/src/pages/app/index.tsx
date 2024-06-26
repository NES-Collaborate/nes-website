import Classrooms from "@/components/app/Classrooms"
import { withAuth } from "@/utils/auth"

const App = () => {
  return <Classrooms />
}

export default App

export const getServerSideProps = withAuth()
