import { BlitzPage } from "@blitzjs/next"
import { CombinedState, PreloadedState } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"
import { Resource } from "i18next"
import { ReactElement, ReactNode } from "react"
import { SiteLanguageOption, StructuredReportLanguageOption } from "types"

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
