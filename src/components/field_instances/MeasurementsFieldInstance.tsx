import { useState } from "react"
import { useEvaluatedBoolean } from "~/hooks/useEvaluatedBoolean"
import { MeasurementsFieldNode } from "~/schemas/structure"
import { MeasurementsField } from "../fields/MeasurementsField"
import { Info } from "../template/Info"
import { FieldInstanceError } from "./FieldInstanceError"

interface MeasurementsFieldInstanceProps {
  node: MeasurementsFieldNode
}

export const MeasurementsFieldInstance = ({ node }: MeasurementsFieldInstanceProps) => {
  const [error, setError] = useState<Error | null>(null)

  const disabled = useEvaluatedBoolean(node.disabled, false, setError)
  const hidden = useEvaluatedBoolean(node.hidden, false, setError)

  if (error) {
    return <FieldInstanceError error={error} />
  }

  return (
    <MeasurementsField
      id={node.fieldId}
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={disabled}
      hidden={hidden}
      defaultValue={node.default}
    />
  )
}
