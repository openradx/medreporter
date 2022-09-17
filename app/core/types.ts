import { BlitzPage } from "@blitzjs/next"
import { CombinedState, PreloadedState } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"
import { Resource } from "i18next"
import { ReactElement, ReactNode } from "react"
import { SiteLanguage, StructuredReportLanguage } from "types"

export interface I18nSiteProps {
  _i18nSite: {
    initialSiteLanguage: SiteLanguage
    supportedSiteLanguages: SiteLanguage[]
    siteNamespaces: string[]
    siteStore: Resource
  }
}

export interface I18nStructuredReportProps {
  _i18nStructuredReport: {
    initialStructureLanguage: StructuredReportLanguage
    initialReportLanguage: StructuredReportLanguage
    supportedStructuredReportLanguages: StructuredReportLanguage[]
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
