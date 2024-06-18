import { useState } from "react"
import { useEvaluatedBoolean } from "~/hooks/useEvaluatedBoolean"
import { GroupNode } from "~/schemas/structure"
import { Group } from "../template/Group"
import { Info } from "../template/Info"
import { FieldInstanceError } from "./FieldInstanceError"

interface GroupInstanceProps {
  node: GroupNode
  children: React.ReactNode
}

export const GroupInstance = ({ node, children }: GroupInstanceProps) => {
  const [error, setError] = useState<Error | null>(null)

  const disabled = useEvaluatedBoolean(node.disabled, false, setError)
  const hidden = useEvaluatedBoolean(node.hidden, false, setError)

  if (error) {
    return <FieldInstanceError error={error} />
  }

  return (
    <Group
      _id={node.fieldId}
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={disabled}
      hidden={hidden}
      direction={node.direction}
      border={node.border}
    >
      {children}
    </Group>
  )
}
