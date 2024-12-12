import { TemplateTranslationProvider } from "~/components/template/TemplateTranslationProvider"
import { KidneyVolumeTemplate } from "./KidneyVolumeTemplate"
import { i18nReport, i18nStructure } from "./locales"

export const KidneyVolume = () => (
  <TemplateTranslationProvider i18nStructure={i18nStructure} i18nReport={i18nReport}>
    <KidneyVolumeTemplate />
  </TemplateTranslationProvider>
)
