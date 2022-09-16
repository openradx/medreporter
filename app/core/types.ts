import { BlitzPage } from "@blitzjs/next"
import { CombinedState, PreloadedState } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"
import { Resource } from "i18next"
import { ReactElement, ReactNode } from "react"

export interface I18nSiteProps {
  _i18nSite: {
    initialSiteLanguage: string
    supportedSiteLanguages: string[]
    siteNamespaces: string[]
    siteStore: Resource
  }
}

export interface I18nStructuredReportProps {
  _i18nStructuredReport: {
    initialStructureLanguage: string
    initialReportLanguage: string
    supportedStructuredReportLanguages: string[]
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
