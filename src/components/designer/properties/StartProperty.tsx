import { useLingui } from "@lingui/react/macro"
import { NumberFieldNode } from "~/schemas/structure"
import { NumberPropertyInput } from "./NumberPropertyInput"

interface StartPropertyProps {
  node: NumberFieldNode
}

export const StartProperty = ({ node }: StartPropertyProps) => {
  const { t } = useLingui()

  return (
    <NumberPropertyInput
      name="start"
      label={t`Start`}
      precision={node.precision}
      min={node.min ?? undefined}
      max={node.max ?? undefined}
    />
  )
}
