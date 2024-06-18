import { useState } from "react"
import { useEvaluatedBoolean } from "~/hooks/useEvaluatedBoolean"
import { TimeFieldNode } from "~/schemas/structure"
import { TimeField } from "../fields/TimeField"
import { Info } from "../template/Info"
import { FieldInstanceError } from "./FieldInstanceError"

interface TimeFieldInstanceProps {
  node: TimeFieldNode
}

export const TimeFieldInstance = ({ node }: TimeFieldInstanceProps) => {
  const [error, setError] = useState<Error | null>(null)

  const disabled = useEvaluatedBoolean(node.disabled, false, setError)
  const hidden = useEvaluatedBoolean(node.hidden, false, setError)

  if (error) {
    return <FieldInstanceError error={error} />
  }

  return (
    <TimeField
      id={node.fieldId}
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={disabled}
      hidden={hidden}
      width={node.width}
      withSeconds={node.withSeconds}
      defaultValue={node.default}
    />
  )
}
