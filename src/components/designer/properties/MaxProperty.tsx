import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NumberFieldNode } from "~/schemas/structure"
import { NumberMetaProperty } from "./NumberMetaProperty"

interface MaxPropertyProps {
  node: NumberFieldNode
}
export const MaxProperty = ({ node }: MaxPropertyProps) => {
  const { t } = useSiteTranslation()
  return (
    <NumberMetaProperty
      name="max"
      label={t("MaxProperty.label")}
      precision={node.precision}
      min={node.min ?? undefined}
    />
  )
}
