import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NumberFieldNode } from "~/schemas/structure"
import { NumberPropertyInput } from "./NumberPropertyInput"

interface StartPropertyProps {
  node: NumberFieldNode
}
export const StartProperty = ({ node }: StartPropertyProps) => {
  const { t } = useSiteTranslation()
  return (
    <NumberPropertyInput
      name="start"
      label={t("StartProperty.label")}
      precision={node.precision}
      min={node.min ?? undefined}
      max={node.max ?? undefined}
    />
  )
}
