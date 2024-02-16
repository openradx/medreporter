import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NumberFieldNode } from "~/schemas/structure"
import { NumberMetaProperty } from "./NumberMetaProperty"

interface StartPropertyProps {
  node: NumberFieldNode
}
export const StartProperty = ({ node }: StartPropertyProps) => {
  const { t } = useSiteTranslation()
  return (
    <NumberMetaProperty
      name="start"
      label={t("StartProperty.label")}
      precision={node.precision}
      min={node.min ?? undefined}
      max={node.max ?? undefined}
    />
  )
}
