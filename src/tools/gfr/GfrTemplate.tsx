import { Template } from "~/components/template/Template"
import { useMicroTranslation } from "~/hooks/useMicroTranslation"
import { GfrReport } from "./GfrReport"
import { GfrStructure } from "./GfrStructure"
import { i18nStructure } from "./locales"

export const GfrTemplate = () => {
  const { t } = useMicroTranslation(i18nStructure)

  return (
    <Template title={t("Gfr.toolTitle")} name="gfr">
      <GfrStructure />
      <GfrReport />
    </Template>
  )
}
