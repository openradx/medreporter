import { AppConfig } from "~/types/general"

const appConfig: AppConfig = {
  medreporterTitle: "MedReporter",
  debugTranslations: true,
  reactHookFormDevToolsEnabled: false, // Cave, make site slow
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
