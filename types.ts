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

type SupportedResourceLanguageCodes =
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
  supportedResourceLanguageCodes: SupportedResourceLanguageCodes
}
