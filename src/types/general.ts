import { CombinedState, PreloadedState } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"
import { Resource } from "i18next"
import { NextPage } from "next"
import { Session } from "next-auth"
import { ReactElement, ReactNode } from "react"

export type SiteLanguage = "de" | "en"

export interface AppConfig {
  debugTranslations: boolean
  reactHookFormDevToolsEnabled: boolean
}
export type SiteLanguageOption = SiteLanguage | "cimode"

export interface I18nSite {
  initialSiteLanguage: SiteLanguageOption
  supportedSiteLanguages: SiteLanguageOption[]
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
