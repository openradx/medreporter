import { useState } from "react"
import { useEvaluatedBoolean } from "~/hooks/useEvaluatedBoolean"
import { NumberFieldNode } from "~/schemas/structure"
import { NumberField } from "../fields/NumberField"
import { Info } from "../template/Info"
import { FieldInstanceError } from "./FieldInstanceError"

interface NumberFieldInstanceProps {
  node: NumberFieldNode
}

export const NumberFieldInstance = ({ node }: NumberFieldInstanceProps) => {
  const [error, setError] = useState<Error | null>(null)

  const disabled = useEvaluatedBoolean(node.disabled, false, setError)
  const hidden = useEvaluatedBoolean(node.hidden, false, setError)

  if (error) {
    return <FieldInstanceError error={error} />
  }

  return (
    <NumberField
      id={node.fieldId}
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={disabled}
      hidden={hidden}
      width={node.width}
      defaultValue={node.default}
      min={node.min ?? undefined}
      max={node.max ?? undefined}
      precision={node.precision}
      start={node.start ?? undefined}
      step={node.step ?? undefined}
    />
  )
}
