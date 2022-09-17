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

// TODO: do we need asSite and cimode here too?
export type StructuredReportLanguage =
  | "de"
  | "en"
  | "en-US"
  | "es"
  | "fr"
  | "it"
  | "nl"
  | "pt"
  | "se"

export interface AppConfig {
  debugTranslations: boolean
  reactHookFormDevToolsEnabled: boolean
  structuredReportLanguages: StructuredReportLanguage[]
}
