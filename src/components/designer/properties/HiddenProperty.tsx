import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { ScriptEditorMetaProperty } from "./ScriptEditorMetaProperty"

export const HiddenProperty = () => {
  const { t } = useSiteTranslation()

  return <ScriptEditorMetaProperty name="hidden" label={t("HiddenProperty.label")} />
}
