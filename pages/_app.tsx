import { ErrorBoundary, ErrorComponent, ErrorFallbackProps, Routes } from "@blitzjs/next"
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { NotificationsProvider } from "@mantine/notifications"
import { compose } from "@reduxjs/toolkit"
import { AuthenticationError, AuthorizationError } from "blitz"
import { getCookie, setCookie } from "cookies-next"
import { enableMapSet, enablePatches } from "immer"
import { GetServerSidePropsContext } from "next"
import { AppProps } from "next/app"
import Head from "next/head"
import { NextRouter, useRouter } from "next/router"
import { useState } from "react"
import { withBlitz } from "app/blitz-client"
import { withInitialPublicData } from "app/core/hocs/withInitialPublicData"
import { withReduxState } from "app/core/hocs/withReduxState"
import { withTranslations } from "app/core/hocs/withTranslations"
import { PageWithLayout } from "app/core/types"

// Enable additional Immer.js features
enablePatches() // for undo / redo
enableMapSet() // for TransformerRegistry

const fontFamily =
  "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif"

const createRootErrorFallback = (router: NextRouter) => {
  const RootErrorFallback = ({ error }: ErrorFallbackProps) => {
    if (error instanceof AuthenticationError) {
      router.push(Routes.LoginPage())
      return <div>You are not authenticated. Redirecting to login page.</div>
    }

    if (error instanceof AuthorizationError) {
      return (
        <ErrorComponent
          statusCode={error.statusCode}
          title="You are not authorized to access this page."
        />
      )
    }

    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
  return RootErrorFallback
}

interface MyAppProps extends AppProps {
  colorScheme: ColorScheme
  Component: PageWithLayout
}

const MyApp = ({ Component, pageProps, colorScheme: initialColorScheme }: MyAppProps) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(initialColorScheme)

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === "dark" ? "light" : "dark")
    setColorScheme(nextColorScheme)
    setCookie("mantine-color-scheme", nextColorScheme, { maxAge: 60 * 60 * 24 * 30 })
  }

  const router = useRouter()

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <ErrorBoundary FallbackComponent={createRootErrorFallback(router)}>
      <Head>
        <title key="title">MedReporter - A medical structured reporting platform</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{ colorScheme, cursorType: "pointer", fontFamily, headings: { fontFamily } }}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider>
            <ModalsProvider>{getLayout(<Component {...pageProps} />)}</ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </ErrorBoundary>
  )
}

MyApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
})

export default compose(withInitialPublicData, withTranslations, withReduxState, withBlitz)(MyApp)
