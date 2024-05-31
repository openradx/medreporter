import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { StatementNode } from "~/schemas/report"
import { Statement } from "../template/Statement"

interface StatementInstanceProps {
  node: StatementNode
}

export const StatementInstance = ({ node }: StatementInstanceProps) => {
  const interpreter = useInterpreter()
  const fieldsCode = useFieldsCode()

  const hidden = useMemo(
    () => interpreter.evalCodeToBoolean(fieldsCode, node.hidden),
    [interpreter, fieldsCode, node.hidden]
  )

  const content = useMemo(
    () => interpreter.evalCodeToString(fieldsCode, node.content),
    [interpreter, fieldsCode, node.content]
  )

  return <Statement link={node.link ?? undefined} hidden={hidden} content={content} />
}
