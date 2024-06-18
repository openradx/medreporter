import { useState } from "react"
import { useEvaluatedBoolean } from "~/hooks/useEvaluatedBoolean"
import { FreeTextFieldNode } from "~/schemas/structure"
import { FreeTextField } from "../fields/FreeTextField"
import { Info } from "../template/Info"
import { FieldInstanceError } from "./FieldInstanceError"

interface FreeTextFieldInstanceProps {
  node: FreeTextFieldNode
}

export const FreeTextFieldInstance = ({ node }: FreeTextFieldInstanceProps) => {
  const [error, setError] = useState<Error | null>(null)

  const disabled = useEvaluatedBoolean(node.disabled, false, setError)
  const hidden = useEvaluatedBoolean(node.hidden, false, setError)

  if (error) {
    return <FieldInstanceError error={error} />
  }

  return (
    <FreeTextField
      id={node.fieldId}
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={disabled}
      hidden={hidden}
      width={node.width}
      defaultValue={node.default}
      multiline={node.multiline}
      grow={node.grow}
      rows={node.rows}
      minRows={node.minRows}
      maxRows={node.maxRows}
    />
  )
}
