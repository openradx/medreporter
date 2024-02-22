import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NumberFieldNode } from "~/schemas/structure"
import { NumberPropertyInput } from "./NumberPropertyInput"

interface MinPropertyProps {
  node: NumberFieldNode
}

export const MinProperty = ({ node }: MinPropertyProps) => {
  const { t } = useSiteTranslation()

  return (
    <NumberPropertyInput
      name="min"
      label={t("MinProperty.label")}
      precision={node.precision}
      max={node.max ?? undefined}
    />
  )
}
