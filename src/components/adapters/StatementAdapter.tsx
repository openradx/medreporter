import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { useIsDesigning } from "~/hooks/useIsDesigning"
import { StatementNode } from "~/schemas/report"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { Statement } from "../template/Statement"

interface StatementAdapterProps {
  node: StatementNode
}

export const StatementAdapter = ({ node }: StatementAdapterProps) => {
  const isDesigning = useIsDesigning()
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

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return <Statement link={node.link ?? undefined} hidden={hidden} content={content} />
}
