import { fetchMe, logOut } from "@/services/general"
import { User } from "@/types/user"
import { axiosServer } from "@/utils/axiosClient"
import Cookies from "js-cookie"
import { createContext, useContext, useEffect, useState } from "react"

export type SessionContext = {
  user: User | null
  setUser: (newUser: User | null) => void
  logOut: () => void
  token: string
  setToken: (newToken: string) => void
}

const sessionContext = createContext<SessionContext>({
  user: null,
  setUser: () => {},
  logOut: () => {},
  token: "",
  setToken: () => {},
})

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string>("")

  useEffect(() => {
    const token = Cookies.get("_token")
    if (!token) return
    setToken(token)
  }, [])

  useEffect(() => {
    if (!token) return
    Cookies.set("_token", token)
    fetchMe(axiosServer, token).then((me) => setUser(me))
  }, [token])

  const session = {
    user,
    setUser,
    logOut: () => {
      setUser(null)
      setToken("")
      Cookies.remove("_token")
      logOut(axiosServer).then(() => {})
    },
    token,
    setToken,
  }

  return <sessionContext.Provider value={session}>{children}</sessionContext.Provider>
}

export const useSession = () => useContext(sessionContext)
