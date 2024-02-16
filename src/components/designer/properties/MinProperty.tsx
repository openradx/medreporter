import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NumberFieldNode } from "~/schemas/structure"
import { NumberMetaProperty } from "./NumberMetaProperty"

interface MinPropertyProps {
  node: NumberFieldNode
}
export const MinProperty = ({ node }: MinPropertyProps) => {
  const { t } = useSiteTranslation()
  return (
    <NumberMetaProperty
      name="min"
      label={t("MinProperty.label")}
      precision={node.precision}
      max={node.max ?? undefined}
    />
  )
}
