import { useState } from "react"
import { useEvaluatedBoolean } from "~/hooks/useEvaluatedBoolean"
import { HintNode } from "~/schemas/structure"
import { Hint } from "../template/Hint"
import { FieldInstanceError } from "./FieldInstanceError"

interface HintInstanceProps {
  node: HintNode
}

export const HintInstance = ({ node }: HintInstanceProps) => {
  const [error, setError] = useState<Error | null>(null)

  const hidden = useEvaluatedBoolean(node.hidden, false, setError)

  if (error) {
    return <FieldInstanceError error={error} />
  }

  return <Hint level={node.level} hidden={hidden} content={node.content} />
}
