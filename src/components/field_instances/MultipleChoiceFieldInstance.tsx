import { useState } from "react"
import { useEvaluatedBoolean } from "~/hooks/useEvaluatedBoolean"
import { MultipleChoiceFieldNode } from "~/schemas/structure"
import { MultipleChoiceField } from "../fields/MultipleChoiceField"
import { Figure } from "../template/Figure"
import { Info } from "../template/Info"
import { FieldInstanceError } from "./FieldInstanceError"

interface MultipleChoiceFieldInstanceProps {
  node: MultipleChoiceFieldNode
}

export const MultipleChoiceFieldInstance = ({ node }: MultipleChoiceFieldInstanceProps) => {
  const [error, setError] = useState<Error | null>(null)

  const disabled = useEvaluatedBoolean(node.disabled, false, setError)
  const hidden = useEvaluatedBoolean(node.hidden, false, setError)

  const extras = (
    <>
      {node.info?.trim() && <Info>{node.info}</Info>}
      {node.figure?.trim() && <Figure>{node.figure}</Figure>}
    </>
  )

  if (error) {
    return <FieldInstanceError error={error} />
  }

  return (
    <MultipleChoiceField
      id={node.fieldId}
      label={node.label}
      variant={node.variant}
      extras={extras}
      disabled={disabled}
      hidden={hidden}
      width={node.width}
      options={node.options}
      defaultValue={node.default}
    />
  )
}
