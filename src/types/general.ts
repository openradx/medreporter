import type { Messages } from "@lingui/core"
import type { NextPage } from "next"
import type { Session } from "next-auth"
import type { ReactElement, ReactNode } from "react"
import type { RootState } from "~/state/store"

export interface AppConfig {
  medreporterTitle: string
  debugTranslations: boolean
  defaultSiteLanguage: string
  reactHookFormDevToolsEnabled: boolean
  supportedSiteLanguages: string[]
  supportedTemplateLanguages: string[]
  availableCategories: Record<string, string[]>
}

export interface ServerSideProps {
  session?: Session | null
  translation?: Messages
  preloadedReduxState?: Partial<RootState>
}

export interface StaticProps {
  translation?: Messages
}

export type PageWithLayout<P = unknown> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type OutputFormat = "html" | "plain"
