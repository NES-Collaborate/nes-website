import DrawerNES from "@/components/DrawerNES"
import { BackendProvider } from "@/contexts/backend"
import { SessionProvider } from "@/contexts/session"
import { ThemeProvider } from "@/contexts/theme"
import "@/styles/globals.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { AppProps } from "next/app"

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <BackendProvider>
          <ThemeProvider>
            <DrawerNES>
              <Component {...pageProps} />
            </DrawerNES>
          </ThemeProvider>
        </BackendProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}
