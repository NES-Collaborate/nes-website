import { NavBar } from "@/components/NavBar"
import { SessionProvider } from "@/contexts/session"
import "@/styles/globals.css"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <NavBar />
      <Component {...pageProps} />
    </SessionProvider>
  )
}
