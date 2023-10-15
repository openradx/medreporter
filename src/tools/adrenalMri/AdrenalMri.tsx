import { TemplateTranslationProvider } from "~/components/template/TemplateTranslationProvider"
import { AdrenalMriTemplate } from "./AdrenalMriTemplate"
import { i18nReport, i18nStructure } from "./locales"

export const AdrenalMri = () => (
  <TemplateTranslationProvider i18nStructure={i18nStructure} i18nReport={i18nReport}>
    <AdrenalMriTemplate />
  </TemplateTranslationProvider>
)
