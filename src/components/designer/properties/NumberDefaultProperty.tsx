import { useLingui } from "@lingui/react/macro"
import { NumberFieldNode } from "~/schemas/structure"
import { NumberPropertyInput } from "./NumberPropertyInput"

export type NumberDefaultPropertyProps = {
  node: NumberFieldNode
}

export const NumberDefaultProperty = ({ node }: NumberDefaultPropertyProps) => {
  const { t } = useLingui()

  return (
    <NumberPropertyInput
      name="default"
      label={t`Default value`}
      precision={node.precision}
      min={node.min ?? undefined}
      max={node.max ?? undefined}
    />
  )
}
