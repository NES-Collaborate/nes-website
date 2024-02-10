import { axiosServer } from "@/utils/axiosClient"
import axios, { AxiosInstance } from "axios"
import { createContext, useContext } from "react"
import { useSession } from "./session"

const backendContext = createContext<AxiosInstance>(axiosServer)

const BackendProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useSession()
  const backend = axios.create({
    baseURL: axiosServer.defaults.baseURL,
    headers: {
      ...axiosServer.defaults.headers.common,
      Authorization: `Bearer ${token}`,
    },
  })

  return <backendContext.Provider value={backend}>{children}</backendContext.Provider>
}

const useBackend = () => useContext(backendContext)

export { BackendProvider, useBackend }
