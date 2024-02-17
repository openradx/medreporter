import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NumberFieldNode } from "~/schemas/structure"
import { NumberPropertyInput } from "./NumberPropertyInput"

interface MaxPropertyProps {
  node: NumberFieldNode
}
export const MaxProperty = ({ node }: MaxPropertyProps) => {
  const { t } = useSiteTranslation()
  return (
    <NumberPropertyInput
      name="max"
      label={t("MaxProperty.label")}
      precision={node.precision}
      min={node.min ?? undefined}
    />
  )
}
