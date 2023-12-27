import { User } from "@/types/user"
import { GetSession } from "@/utils/auth"
import { createContext, useContext, useState } from "react"

type SessionContext = {
  user: User | null | undefined
  logOut: () => void
}

const sessionContext = createContext<SessionContext>({ user: null, logOut: () => {} })

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(GetSession())

  const session = {
    user,
    logOut: () => setUser(null),
  }

  return <sessionContext.Provider value={session}>{children}</sessionContext.Provider>
}

export const useSession = () => useContext(sessionContext)
