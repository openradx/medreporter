import { useState } from "react"
import { useEvaluatedBoolean } from "~/hooks/useEvaluatedBoolean"
import { useEvaluatedString } from "~/hooks/useEvaluatedString"
import { StatementNode } from "~/schemas/report"
import { Statement } from "../template/Statement"
import { FieldInstanceError } from "./FieldInstanceError"

interface StatementInstanceProps {
  node: StatementNode
}

export const StatementInstance = ({ node }: StatementInstanceProps) => {
  const [error, setError] = useState<Error | null>(null)

  const hidden = useEvaluatedBoolean(node.hidden, false, setError)

  const content = useEvaluatedString(node.content.contentValue, "", setError)

  if (error) {
    return <FieldInstanceError error={error} />
  }

  return <Statement link={node.link ?? undefined} hidden={hidden} content={content} />
}
