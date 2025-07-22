import { useState } from "react"
import { useContent } from "~/hooks/useContent"
import { useEvaluatedBoolean } from "~/hooks/useEvaluatedBoolean"
import { StatementNode } from "~/schemas/report"
import { Statement } from "../template/Statement"
import { FieldInstanceError } from "./FieldInstanceError"

interface StatementInstanceProps {
  node: StatementNode
}

export const StatementInstance = ({ node }: StatementInstanceProps) => {
  const [error, setError] = useState<Error | null>(null)

  const hidden = useEvaluatedBoolean(node.hidden, false, setError)

  const content = useContent(node.content, setError)

  if (error) {
    return <FieldInstanceError error={error} />
  }

  return <Statement link={node.link ?? undefined} hidden={hidden} content={content} />
}
