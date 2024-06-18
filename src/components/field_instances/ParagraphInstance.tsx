import { useState } from "react"
import { useEvaluatedBoolean } from "~/hooks/useEvaluatedBoolean"
import { ParagraphNode } from "~/schemas/report"
import { Paragraph } from "../template/Paragraph"
import { FieldInstanceError } from "./FieldInstanceError"

interface ParagraphInstanceProps {
  node: ParagraphNode
  children?: React.ReactNode
}

export const ParagraphInstance = ({ node, children }: ParagraphInstanceProps) => {
  const [error, setError] = useState<Error | null>(null)

  const hidden = useEvaluatedBoolean(node.hidden, false, setError)

  if (error) {
    return <FieldInstanceError error={error} />
  }

  return (
    <Paragraph title={node.title} link={node.link ?? undefined} hidden={hidden} list={node.list}>
      {children}
    </Paragraph>
  )
}
