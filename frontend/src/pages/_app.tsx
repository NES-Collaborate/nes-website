import DrawerNES from "@/components/DrawerNES"
import { BackendProvider } from "@/contexts/backend"
import { SessionProvider } from "@/contexts/session"
import { ThemeProvider } from "@/contexts/theme"
import "@/styles/globals.css"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <BackendProvider>
        <ThemeProvider>
          <DrawerNES>
            <Component {...pageProps} />
          </DrawerNES>
        </ThemeProvider>
      </BackendProvider>
    </SessionProvider>
  )
}
