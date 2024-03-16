import { MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"
import { ModalsProvider } from "@mantine/modals"
import { Notifications } from "@mantine/notifications"
import "@mantine/notifications/styles.css"
import { getCookie } from "cookies-next"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { enableMapSet, enablePatches } from "immer"
import { GetServerSidePropsContext } from "next"
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import Head from "next/head"
import { compose } from "redux"
import { appConfig } from "~/appConfig"
import "~/global.css"
import { withReduxState } from "~/hocs/withReduxState"
import { withTranslations } from "~/hocs/withTranslations"
import { theme } from "~/theme"
import { PageWithLayout } from "~/types/general"
import { trpc } from "~/utils/trpc"

// Enable additional Immer.js features
enablePatches() // for undo / redo
enableMapSet() // for TransformerRegistry

// Allow dayjs to use custom format
dayjs.extend(customParseFormat)

export interface MyAppProps extends AppProps {
  Component: PageWithLayout
}

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: MyAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>{appConfig.medreporterTitle}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <SessionProvider session={session}>
        <Notifications />
        <ModalsProvider>{getLayout(<Component {...pageProps} />)}</ModalsProvider>
      </SessionProvider>
    </MantineProvider>
  )
}

MyApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
})

export default compose(trpc.withTRPC, withReduxState, withTranslations)(MyApp)
