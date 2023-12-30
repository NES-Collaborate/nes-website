import { withAuth } from "@/utils/auth"

const App = () => {
  return "Protected Route for Logged Users"
}

export default App

export const getServerSideProps = withAuth()
