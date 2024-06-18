import { useState } from "react"
import { useEvaluatedBoolean } from "~/hooks/useEvaluatedBoolean"
import { FindingFieldNode } from "~/schemas/structure"
import { FindingField } from "../fields/FindingField"
import { Info } from "../template/Info"
import { FieldInstanceError } from "./FieldInstanceError"

interface FindingFieldInstanceProps {
  node: FindingFieldNode
  children?: React.ReactNode
}

export const FindingFieldInstance = ({ node, children }: FindingFieldInstanceProps) => {
  const [error, setError] = useState<Error | null>(null)

  const disabled = useEvaluatedBoolean(node.disabled, false, setError)

  const hidden = useEvaluatedBoolean(node.hidden, false, setError)

  if (error) {
    return <FieldInstanceError error={error} />
  }

  return (
    <FindingField
      id={node.fieldId}
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={disabled}
      hidden={hidden}
      direction={node.direction}
      defaultValue={node.default}
    >
      {children}
    </FindingField>
  )
}
