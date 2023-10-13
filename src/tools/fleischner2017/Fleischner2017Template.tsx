import { Template } from "~/components/template/Template"
import { useStructureTranslation } from "~/hooks/useStructureTranslation"
import { Fleischner2017Report } from "./Fleischner2017Report"
import { Fleischner2017Structure } from "./Fleischner2017Structure"
import fleischner2017Info_en from "./fleischner2017Info_en.md"

export const Fleischner2017Template = () => {
  const { t } = useStructureTranslation()

  return (
    <Template title={t("Fleischner2017.toolTitle")} info={fleischner2017Info_en}>
      <Fleischner2017Structure />
      <Fleischner2017Report />
    </Template>
  )
}
