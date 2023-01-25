import { CombinedState, PreloadedState } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"
import { Resource } from "i18next"
import { NextPage } from "next"
import { Session } from "next-auth"
import { ReactElement, ReactNode } from "react"

export type SiteLanguage = "de" | "en"

export type StructuredReportLanguage =
  | "de"
  | "en"
  | "en-US"
  | "es"
  | "fr"
  | "it"
  | "nl"
  | "pt"
  | "sv"
  | "other"

export type SupportedLanguage = SiteLanguage | StructuredReportLanguage

export interface AppConfig {
  debugTranslations: boolean
  reactHookFormDevToolsEnabled: boolean
  structuredReportLanguages: [StructuredReportLanguage, ...StructuredReportLanguage[]]
}
export type SiteLanguageOption = SiteLanguage | "cimode"

export type StructuredReportLanguageOption = StructuredReportLanguage | "cimode" | "asSite"

export type SupportedLanguageOption = SiteLanguageOption | StructuredReportLanguageOption

export interface I18nSite {
  initialSiteLanguage: SiteLanguageOption
  supportedSiteLanguages: SiteLanguageOption[]
  siteNamespaces: string[]
  siteStore: Resource
}

export interface I18nStructuredReport {
  initialStructureLanguage: StructuredReportLanguageOption
  initialReportLanguage: StructuredReportLanguageOption
  supportedStructuredReportLanguages: StructuredReportLanguageOption[]
  structuredReportNamespaces: string[]
  structuredReportStore: Resource
}

export type PreloadedReduxState = PreloadedState<CombinedState<RootState>>

export interface ServerSideProps {
  session?: Session | null
  i18nSite?: I18nSite
  i18nStructuredReport?: I18nStructuredReport
  preloadedReduxState?: PreloadedReduxState
}

export type PageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type OutputFormat = "html" | "plain"
