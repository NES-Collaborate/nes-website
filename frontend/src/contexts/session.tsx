import { User } from "@/types/user"
import { axiosApi } from "@/utils/axiosClient"
import { createContext, useContext, useEffect, useState } from "react"

export type SessionContext = {
  user: User | null
  setUser?: (newUser: User | null) => void
  logOut?: () => void
  token?: string
  setToken?: (newToken: string) => void
}

const sessionContext = createContext<SessionContext>({ user: null })

export const SessionProvider = ({
  children,
  serverUser,
}: {
  children: React.ReactNode
  serverUser?: User | null
}) => {
  const [user, setUser] = useState<User | null>(serverUser || null)
  const [token, setToken] = useState<string>("")

  useEffect(() => {
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
    },
    token,
    setToken,
  }

  return <sessionContext.Provider value={session}>{children}</sessionContext.Provider>
}

export const useSession = () => useContext(sessionContext)
