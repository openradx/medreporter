import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NumberFieldNode } from "~/schemas/structure"
import { NumberPropertyInput } from "./NumberPropertyInput"

export type NumberDefaultPropertyProps = {
  node: NumberFieldNode
}

export const NumberDefaultProperty = ({ node }: NumberDefaultPropertyProps) => {
  const { t } = useSiteTranslation()

  return (
    <NumberPropertyInput
      name="default"
      label={t("NumberDefaultProperty.label")}
      precision={node.precision}
      min={node.min ?? undefined}
      max={node.max ?? undefined}
    />
  )
}
