import { useSession } from "@/contexts/session"
import { redirect } from "next/navigation"

const Main = () => {
  const session = useSession()
  return redirect(session.user ? "/app" : "/nes")
}
export default Main
