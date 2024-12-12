import { TemplateTranslationProvider } from "~/components/template/TemplateTranslationProvider"
import { AdrenalWashoutTemplate } from "./AdrenalWashoutTemplate"
import { i18nReport, i18nStructure } from "./locales"

export const AdrenalWashout = () => (
  <TemplateTranslationProvider i18nStructure={i18nStructure} i18nReport={i18nReport}>
    <AdrenalWashoutTemplate />
  </TemplateTranslationProvider>
)
