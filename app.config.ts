import { AppConfig } from "~/types/general"

const appConfig: AppConfig = {
  debugTranslations: true,
  reactHookFormDevToolsEnabled: false, // Cave, make site slow
  supportedLanguages: ["de", "en", "en-US", "es", "fr", "it", "nl", "pt", "sv"],
  fallbackLanguages: ["en", "en-US"],
}

export default appConfig
