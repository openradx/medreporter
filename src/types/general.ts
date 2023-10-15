import { CombinedState, PreloadedState } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"
import { Resource } from "i18next"
import { NextPage } from "next"
import { Session } from "next-auth"
import { ReactElement, ReactNode } from "react"

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

export type PreloadedReduxState = PreloadedState<CombinedState<RootState>>

export interface ServerSideProps {
  session?: Session | null
  i18nSite?: I18nSite
  preloadedReduxState?: PreloadedReduxState
}

export interface StaticProps {
  i18nSite?: I18nSite
}

export type PageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type OutputFormat = "html" | "plain"
