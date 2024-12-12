import { TemplateTranslationProvider } from "~/components/template/TemplateTranslationProvider"
import { LungRads2022Template } from "./LungRads2022Template"
import { i18nReport, i18nStructure } from "./locales"

export const LungRads2022 = () => (
  <TemplateTranslationProvider i18nStructure={i18nStructure} i18nReport={i18nReport}>
    <LungRads2022Template />
  </TemplateTranslationProvider>
)
