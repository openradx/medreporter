import { MantineProvider, ColorScheme, ColorSchemeProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { NotificationsProvider } from "@mantine/notifications"
import { compose } from "@reduxjs/toolkit"
import { getCookie, setCookie } from "cookies-next"
import { enablePatches, enableMapSet } from "immer"
import { GetServerSidePropsContext } from "next"
import { AppProps } from "next/app"
import Head from "next/head"
import { useState } from "react"
import { withBlitz } from "../app/blitz-client"
import { withReduxState } from "../app/core/hocs/withReduxState"
import { withSiteTranslations } from "../app/core/hocs/withSiteTranslations"
import { withStructuredReportTranslations } from "../app/core/hocs/withStructuredReportTranslations"
import { NextPageWithLayout } from "../app/core/types"

// Enable additional Immer.js features
enablePatches() // for undo / redo
enableMapSet() // for TransformerRegistry

const fontFamily =
  "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif"

if (process.env.NODE_ENV !== "production") {
  if (typeof window !== "undefined") {
    const { applyClientHMR } = require("i18next-hmr/client")
    applyClientHMR(() => i18n)
  } else {
    const { applyServerHMR } = require("i18next-hmr/server")
    applyServerHMR(() => i18n)
  }
}

interface MyAppProps extends AppProps {
  colorScheme: ColorScheme
  Component: NextPageWithLayout
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
    <>
      <Head>
        <title>MedReporter</title>
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
    </>
  )
}

MyApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
})

export default compose(
  withSiteTranslations,
  withStructuredReportTranslations,
  withReduxState,
  withBlitz
)(MyApp)
