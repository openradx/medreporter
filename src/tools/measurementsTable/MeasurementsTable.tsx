import { TemplateTranslationProvider } from "~/components/template/TemplateTranslationProvider"
import { MeasurementsTableTemplate } from "./MeasurementsTableTemplate"
import { i18nReport, i18nStructure } from "./locales"

export const MeasurementsTable = () => (
  <TemplateTranslationProvider i18nStructure={i18nStructure} i18nReport={i18nReport}>
    <MeasurementsTableTemplate />
  </TemplateTranslationProvider>
)
