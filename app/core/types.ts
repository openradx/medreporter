import { BlitzPage } from "@blitzjs/next"
import { CombinedState, PreloadedState } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"
import { Resource } from "i18next"
import { ReactElement, ReactNode } from "react"
import { SiteLanguage, StructuredReportLanguage } from "types"

export type SiteLanguageOption = SiteLanguage | "cimode"

export type StructuredReportLanguageOption = StructuredReportLanguage | "cimode" | "asSite"

export type SupportedLanguageOption = SiteLanguageOption | StructuredReportLanguageOption

export interface I18nSiteProps {
  _i18nSite: {
    initialSiteLanguage: SiteLanguageOption
    supportedSiteLanguages: SiteLanguageOption[]
    siteNamespaces: string[]
    siteStore: Resource
  }
}

export interface I18nStructuredReportProps {
  _i18nStructuredReport: {
    initialStructureLanguage: StructuredReportLanguageOption
    initialReportLanguage: StructuredReportLanguageOption
    supportedStructuredReportLanguages: StructuredReportLanguageOption[]
    structuredReportNamespaces: string[]
    structuredReportStore: Resource
  }
}

export type PageWithLayout = BlitzPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export interface ReduxStateProps {
  _preloadedReduxState: PreloadedState<CombinedState<RootState>>
}
