import { axiosServer } from "@/utils/axiosClient"
import axios, { AxiosInstance } from "axios"
import { createContext, useContext, useState } from "react"
import { useSession } from "./session"

type Backend = {
  backend: AxiosInstance
  isLogged: boolean
}

const backendContext = createContext<Backend>({
  backend: axiosServer,
  isLogged: false,
})

const BackendProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useSession()
  const isLogged = !!token
  const backend = axios.create({
    baseURL: axiosServer.defaults.baseURL,
    headers: {
      ...axiosServer.defaults.headers.common,
      Authorization: `Bearer ${token}`,
    },
  })

  return (
    <backendContext.Provider value={{ backend, isLogged }}>
      {children}
    </backendContext.Provider>
  )
}

const useBackend = () => useContext(backendContext)

export { BackendProvider, useBackend }
