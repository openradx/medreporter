import { useLingui } from "@lingui/react/macro"
import { NumberFieldNode } from "~/schemas/structure"
import { NumberPropertyInput } from "./NumberPropertyInput"

interface MaxPropertyProps {
  node: NumberFieldNode
}

export const MaxProperty = ({ node }: MaxPropertyProps) => {
  const { t } = useLingui()

  return (
    <NumberPropertyInput
      name="max"
      label={t`Maximum value`}
      precision={node.precision}
      min={node.min ?? undefined}
    />
  )
}
