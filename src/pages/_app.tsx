import { MantineProvider, ColorScheme, ColorSchemeProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { NotificationsProvider } from "@mantine/notifications"
import { compose } from "@reduxjs/toolkit"
import { getCookie, setCookies } from "cookies-next"
import { enablePatches, enableMapSet } from "immer"
import { GetServerSidePropsContext } from "next"
import { AppProps } from "next/app"
import Head from "next/head"
import { useState } from "react"
import { appWithReduxState } from "../hocs/appWithReduxState"
import { appWithSiteTranslations } from "../hocs/appWithSiteTranslations"
import { appWithStructuredReportTranslations } from "../hocs/appWithStructuredReportTranslations"
import { NextPageWithLayout } from "../types"

// Enable additional Immer.js features
enablePatches() // for undo / redo
enableMapSet() // for TransformerRegistry

const fontFamily =
  "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif"

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
    setCookies("mantine-color-scheme", nextColorScheme, { maxAge: 60 * 60 * 24 * 30 })
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
          theme={{ colorScheme, fontFamily, headings: { fontFamily } }}
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
  appWithReduxState,
  appWithSiteTranslations,
  appWithStructuredReportTranslations
)(MyApp)
