import type { Resource } from "i18next"
import type { NextPage } from "next"
import type { Session } from "next-auth"
import type { ReactElement, ReactNode } from "react"
import type { RootState } from "~/state/store"

export interface AppConfig {
  debugTranslations: boolean
  reactHookFormDevToolsEnabled: boolean
}

export interface I18nSite {
  initialSiteLanguage: string
  supportedSiteLanguages: string[]
  siteNamespaces: string[]
  siteStore: Resource
}

export interface ServerSideProps {
  session?: Session | null
  i18nSite?: I18nSite
  preloadedReduxState?: Partial<RootState>
}

export interface StaticProps {
  i18nSite?: I18nSite
}

export type PageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type OutputFormat = "html" | "plain"
