import { BackendProvider } from "@/contexts/backend"
import { SessionProvider } from "@/contexts/session"
import { ThemeProvider } from "@/contexts/theme"
import "@/styles/globals.css"
import { defaultLayout } from "@/utils/layouts"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { NextPage } from "next"
import type { AppProps } from "next/app"
import { ReactElement, ReactNode } from "react"

const queryClient = new QueryClient()

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? defaultLayout

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <BackendProvider>
          <ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
        </BackendProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}
