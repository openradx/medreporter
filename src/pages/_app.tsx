import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { NotificationsProvider } from "@mantine/notifications"
import { getCookie, setCookie } from "cookies-next"
import { enableMapSet, enablePatches } from "immer"
import { GetServerSidePropsContext } from "next"
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import Head from "next/head"
import { useState } from "react"
import { compose } from "redux"
import { withReduxState } from "~/hocs/withReduxState"
import { withTranslations } from "~/hocs/withTranslations"
import { PageWithLayout } from "~/types"
import { trpc } from "~/utils/trpc"

// Enable additional Immer.js features
enablePatches() // for undo / redo
enableMapSet() // for TransformerRegistry

const fontFamily =
  "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif"

export interface MyAppProps extends AppProps {
  colorScheme: ColorScheme
  Component: PageWithLayout
}

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
  colorScheme: initialColorScheme,
}: MyAppProps) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(initialColorScheme)

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === "dark" ? "light" : "dark")
    setColorScheme(nextColorScheme)
    setCookie("mantine-color-scheme", nextColorScheme, { maxAge: 60 * 60 * 24 * 30 })
  }

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <Head>
        <title>Medreporter</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <SessionProvider session={session}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ colorScheme, cursorType: "pointer", fontFamily, headings: { fontFamily } }}
          >
            <NotificationsProvider>
              <ModalsProvider>{getLayout(<Component {...pageProps} />)}</ModalsProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </SessionProvider>
    </>
  )
}

MyApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
})

export default compose(trpc.withTRPC, withReduxState, withTranslations)(MyApp)
