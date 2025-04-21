import { useLingui } from "@lingui/react/macro"
import { NumberFieldNode } from "~/schemas/structure"
import { NumberPropertyInput } from "./NumberPropertyInput"

interface MinPropertyProps {
  node: NumberFieldNode
}

export const MinProperty = ({ node }: MinPropertyProps) => {
  const { t } = useLingui()

  return (
    <NumberPropertyInput
      name="min"
      label={t`Minimum value`}
      precision={node.precision}
      max={node.max ?? undefined}
    />
  )
}
