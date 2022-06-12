import { CombinedState, PreloadedState } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"
import { Resource } from "i18next"
import { NextPage } from "next"
import { ReactElement, ReactNode } from "react"

export interface AppConfig {
  debugTranslations: boolean
  reactHookFormDevToolsEnabled: boolean
}

export interface I18nSiteProps {
  _i18nSite: {
    initialSiteLocale: string
    supportedSiteLocales: string[]
    siteNamespaces: string[]
    siteStore: Resource
  }
}

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export interface ReduxStateProps {
  _preloadedReduxState: PreloadedState<CombinedState<RootState>>
}
