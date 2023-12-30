import { NavBar } from "@/components/NavBar"
import { SessionProvider } from "@/contexts/session"
import { ThemeProvider } from "@/contexts/theme"
import "@/styles/globals.css"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider serverUser={pageProps.serverUser}>
      <ThemeProvider>
        <NavBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}
