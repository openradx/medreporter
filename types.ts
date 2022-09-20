import { SimpleRolesIsAuthorized } from "@blitzjs/auth"
import { Institute, MembershipRole, User, UserRole } from "./db"

type Role = MembershipRole | UserRole

declare module "@blitzjs/auth" {
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User["id"]
      username: User["username"]
      email: User["email"]
      roles: Array<Role>
      currentInstituteId: Institute["id"] | null
      views?: number
    }
  }
}

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
