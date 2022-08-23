import { ErrorBoundary, ErrorComponent, ErrorFallbackProps } from "@blitzjs/next"
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
import { useState } from "react"
import { withBlitz } from "app/blitz-client"
import { withInitialPublicData } from "app/core/hocs/withInitialPublicData"
import { withReduxState } from "app/core/hocs/withReduxState"
import { withSiteTranslations } from "app/core/hocs/withSiteTranslations"
import { withStructuredReportTranslations } from "app/core/hocs/withStructuredReportTranslations"
import { PageWithLayout } from "app/core/types"

// Enable additional Immer.js features
enablePatches() // for undo / redo
enableMapSet() // for TransformerRegistry

const fontFamily =
  "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif"

const RootErrorFallback = ({ error }: ErrorFallbackProps) => {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  }

  if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
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

interface MyAppProps extends AppProps {
  colorScheme: ColorScheme
  Component: PageWithLayout
}

const MyApp = (props: MyAppProps) => {
  const { Component, pageProps } = props
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme)

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === "dark" ? "light" : "dark")
    setColorScheme(nextColorScheme)
    setCookie("mantine-color-scheme", nextColorScheme, { maxAge: 60 * 60 * 24 * 30 })
  }

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
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

export default compose(
  withInitialPublicData,
  withSiteTranslations,
  withStructuredReportTranslations,
  withReduxState,
  withBlitz
)(MyApp)
