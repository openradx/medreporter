import { AppConfig } from "~/types/general"

const appConfig: AppConfig = {
  medreporterTitle: "MedReporter",
  debugTranslations: true,
  defaultSiteLanguage: "en",
  reactHookFormDevToolsEnabled: false, // Cave, makes site slow
  supportedSiteLanguages: ["de", "en"],
  supportedTemplateLanguages: ["en", "en-US", "en-GB", "de", "es", "fr", "it", "nl", "pt", "sv"],
  availableCategories: {
    examinations: ["angiography", "ct", "fluoroscopy", "mri", "us", "xray"],
    organs: [
      "adrenal",
      "arteries",
      "brain",
      "heart",
      "kidney",
      "liver",
      "lowerExtremity",
      "lung",
      "pancreas",
      "prostate",
      "spleen",
      "upperExtremity",
      "veins",
    ],
    specialties: ["internalMedicine", "radiology", "surgery"],
  },
}

export default appConfig
