import { CombinedState, PreloadedState } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"
import { Resource } from "i18next"
import { NextPage } from "next"
import { ReactElement, ReactNode } from "react"

export interface I18nSiteProps {
  _i18nSite: {
    initialSiteLocale: string
    supportedSiteLocales: string[]
    siteNamespaces: string[]
    siteStore: Resource
  }
}

export interface I18nStructuredReportProps {
  _i18nStructuredReport: {
    initialStructureLocale: string
    initialReportLocale: string
    supportedStructuredReportLocales: string[]
    structuredReportNamespaces: string[]
    structuredReportStore: Resource
  }
}

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export interface ReduxStateProps {
  _preloadedReduxState: PreloadedState<CombinedState<RootState>>
}