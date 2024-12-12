import { TemplateTranslationProvider } from "~/components/template/TemplateTranslationProvider"
import { GfrTemplate } from "./GfrTemplate"
import { i18nReport, i18nStructure } from "./locales"

export const Gfr = () => (
  <TemplateTranslationProvider i18nStructure={i18nStructure} i18nReport={i18nReport}>
    <GfrTemplate />
  </TemplateTranslationProvider>
)
