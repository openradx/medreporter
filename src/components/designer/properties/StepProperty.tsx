import { useLingui } from "@lingui/react/macro"
import { NumberFieldNode } from "~/schemas/structure"
import { NumberPropertyInput } from "./NumberPropertyInput"

interface StepPropertyProps {
  node: NumberFieldNode
}
export const StepProperty = ({ node }: StepPropertyProps) => {
  const { t } = useLingui()

  return <NumberPropertyInput name="step" label={t`Step`} min={0} precision={node.precision} />
}
