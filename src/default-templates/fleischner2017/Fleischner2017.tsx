import { TemplateTranslationProvider } from "~/components/template/TemplateTranslationProvider"
import { Fleischner2017Template } from "./Fleischner2017Template"
import { i18nReport, i18nStructure } from "./locales"

export const Fleischner2017 = () => (
  <TemplateTranslationProvider i18nStructure={i18nStructure} i18nReport={i18nReport}>
    <Fleischner2017Template />
  </TemplateTranslationProvider>
)
