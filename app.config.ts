import { AppConfig } from "~/types/general"

const appConfig: AppConfig = {
  medreporterTitle: "MedReporter",
  debugTranslations: true,
  reactHookFormDevToolsEnabled: false, // Cave, make site slow
  supportedTemplateLanguages: ["en", "en-US", "en-GB", "de", "es", "fr", "it", "nl", "pt", "sv"],
  availableCategories: {
    specialties: ["internalMedicine", "radiology", "surgery"],
    modalities: ["ct", "mri", "us", "xray"],
    organs: ["kidney", "liver", "lung"],
  },
}

export default appConfig
