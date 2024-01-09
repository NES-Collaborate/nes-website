import DrawerNES from "@/components/DrawerNES"
import { SessionProvider } from "@/contexts/session"
import { ThemeProvider } from "@/contexts/theme"
import "@/styles/globals.css"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <DrawerNES>
          <Component {...pageProps} />
        </DrawerNES>
      </ThemeProvider>
    </SessionProvider>
  )
}
