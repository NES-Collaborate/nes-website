import { User } from "@/types/user"
import { axiosApi } from "@/utils/axiosClient"
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
    const token = localStorage.getItem("token")
    if (!token) return
    setToken(token)
  }, [])

  useEffect(() => {
    if (!token) return
    localStorage.setItem("token", token)
    axiosApi
      .get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => null)
  }, [token])

  const session = {
    user,
    setUser,
    logOut: () => {
      setUser(null)
      setToken("")
      localStorage.setItem("token", "")
      axiosApi
        .get("/auth/logout")
        .then(() => {})
        .catch(() => {})
    },
    token,
    setToken,
  }

  return <sessionContext.Provider value={session}>{children}</sessionContext.Provider>
}

export const useSession = () => useContext(sessionContext)
